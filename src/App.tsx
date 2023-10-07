import { useState } from "react"
import { Button, Flex, Grid, Text, Box, Heading } from "@radix-ui/themes"

import FightStartDialog from "./components/FightStartDialog"

import { Player } from "./core/Player"
import { Monster } from "./core/Monster"
import { CreatureConstructorArgs } from "./core/Creature"

const createPlayer = () =>
  new Player({
    attack: 10,
    damage: { min: 2, max: 5 },
    defense: 6,
    hp: 15,
  })

let player = createPlayer()

const App = () => {
  const [monster, setMonster] = useState<Monster | null>(null)
  const [rememberDificulty, setRememberDificulty] =
    useState<CreatureConstructorArgs | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [battleLogs, setBattleLogs] = useState("")
  const [playerStats, setPlayerStats] = useState("")
  const [monsterStats, setMonsterStats] = useState("")
  const [isBattleBegun, setIsBattleBegun] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [gameOverMsg, setGameOverMsg] = useState("")

  const initPlayer = () => {
    setPlayerStats(`
    <p>Attack: ${player.attack}</p>
    <p>Defense: ${player.defense}</p>
    <p>Damage: ${player.damage.min}-${player.damage.max}</p>
    <p>Health: ${player.hp}</p>
    <p>Heal amount: ${player.healAmount}</p>
    `)
  }

  const initMonster = () => {
    setMonsterStats(`
    <p>Attack: ${monster!.attack}</p>
    <p>Defense: ${monster!.defense}</p>
    <p>Damage: ${monster!.damage.min}-${monster!.damage.max}</p>
    <p>Health: ${monster!.hp}</p>
    `)
  }

  const startFight = () => {
    initPlayer()
    initMonster()
    setIsBattleBegun(true)
  }

  const retry = () => {
    player = createPlayer()
    setMonster(new Monster({ ...rememberDificulty! }))
    setIsBattleBegun(false)
    setIsGameOver(false)
    setBattleLogs("")
  }

  const changeDificulty = () => {
    player = createPlayer()
    setMonster(null)
    setIsBattleBegun(false)
    setIsGameOver(false)
    setBattleLogs("")
  }

  const log = (log: string) => {
    setBattleLogs((prev) => (prev += `<p>${log}</p>`))
  }

  const heal = () => {
    log("Using heal...")
    log("==================")
    player.heal()
    initPlayer()
  }

  const hit = () => {
    log("Hitting a monster...")

    const isHit = player.hit(monster!)
    log(isHit ? "You smashed him" : "You missed :(")
    log("==================")
    initMonster()

    if (monster!.isDead()) {
      log("Seems you killed him.. Grats!!!")
      setIsGameOver(true)
      setGameOverMsg("You won!")
      return
    }

    log("Monster hits you back!")
    const isMonsterHit = monster!.hit(player)
    log(isMonsterHit ? "Monster smashed you" : "Monster missed :)")
    log("==================")
    initPlayer()

    if (player.isDead()) {
      log("Oh, monster killed you :(")
      setIsGameOver(true)
      setGameOverMsg("You lost! Do not forget to use Heal power")
      return
    }
  }

  return (
    <Grid gap="8" columns="3" style={{ minHeight: "100vh" }}>
      <Flex direction="column" justify="center" gap="4" className="py-10">
        <Heading size="7" weight="light" align="center">
          Battle logs
        </Heading>
        <Box
          className="border h-[500px] py-2 px-3 rounded-xl text-sm overflow-y-auto"
          dangerouslySetInnerHTML={{ __html: battleLogs }}
        />
      </Flex>
      <Flex direction="column" justify="center" gap="9">
        {monster === null ? (
          <>
            <Button onClick={() => setOpenDialog(true)}>
              Choose dificulty
            </Button>
            <FightStartDialog
              open={openDialog}
              setOpen={setOpenDialog}
              createMonster={setMonster}
              remember={setRememberDificulty}
            />
          </>
        ) : !isBattleBegun ? (
          <Button onClick={startFight}>Fight!</Button>
        ) : (
          <>
            <Flex gap="4" justify="between">
              <div className="flex flex-col gap-1 flex-1">
                <Text as="p" className="w-full text-center">
                  Player
                </Text>
                <Box
                  className="border flex-1 py-1 px-2 rounded-xl text-sm"
                  dangerouslySetInnerHTML={{ __html: playerStats }}
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <Text as="p" className="w-full text-center">
                  Monster
                </Text>
                <Box
                  className="border flex-1 py-1 px-2 rounded-xl text-sm"
                  dangerouslySetInnerHTML={{ __html: monsterStats }}
                />
              </div>
            </Flex>
            {isGameOver ? (
              <Flex direction="column" gap="2">
                <Text align="center" size="1">
                  {gameOverMsg}
                </Text>
                <Flex gap="6" justify="between">
                  <Button className="flex-1" onClick={retry}>
                    Try again
                  </Button>
                  <Button className="flex-1" onClick={changeDificulty}>
                    Change dificulty
                  </Button>
                </Flex>
              </Flex>
            ) : (
              <Flex direction="column" gap="2">
                <Button disabled={!player.isAbleToHeal()} onClick={heal}>
                  Heal
                </Button>
                <Text align="center" size="1">
                  Or
                </Text>
                <Button onClick={hit}>Hit</Button>
              </Flex>
            )}
          </>
        )}
      </Flex>
    </Grid>
  )
}

export default App
