import React from "react"
import { Dialog, Flex, Text } from "@radix-ui/themes"

import { CreatureConstructorArgs } from "../core/Creature"
import { Monster } from "../core/Monster"

const FightStartDialog = ({
  open,
  setOpen,
  createMonster,
  remember,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  createMonster: React.Dispatch<React.SetStateAction<Monster | null>>
  remember: React.Dispatch<React.SetStateAction<CreatureConstructorArgs | null>>
}) => {
  const createEasyMonster = () => {
    const options = {
      attack: 6,
      damage: { min: 1, max: 6 },
      defense: 5,
      hp: 18,
    }
    createMonster(new Monster({ ...options }))
    remember(options)
    setOpen(false)
  }

  const createMediumMonster = () => {
    const options = {
      attack: 7,
      damage: { min: 4, max: 7 },
      defense: 7,
      hp: 21,
    }
    createMonster(new Monster({ ...options }))
    remember(options)
    setOpen(false)
  }

  const createHardMonster = () => {
    const options = {
      attack: 8,
      damage: { min: 5, max: 8 },
      defense: 9,
      hp: 24,
    }
    createMonster(new Monster({ ...options }))
    remember(options)
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Content style={{ maxWidth: 700 }}>
        <Dialog.Title>Select monster</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Choose who you will fight against.
        </Dialog.Description>
        <Flex justify="between" gap="8">
          <button
            className="flex flex-col gap-2 flex-1 border rounded-lg py-2 px-3 hover:bg-zinc-50 active:bg-zinc-100"
            onClick={createEasyMonster}
          >
            <Text weight="medium">Easy</Text>
            <Flex direction="column" gap="1" align="start">
              <Text size="1">Attack: 6</Text>
              <Text size="1">Defense: 5</Text>
              <Text size="1">Damage: 1-6</Text>
              <Text size="1">Health Points: 18</Text>
            </Flex>
          </button>
          <button
            className="flex flex-col gap-2 flex-1 border rounded-lg py-2 px-3 hover:bg-zinc-50 active:bg-zinc-100"
            onClick={createMediumMonster}
          >
            <Text weight="medium">Medium</Text>
            <Flex direction="column" gap="1" align="start">
              <Text size="1">Attack: 7</Text>
              <Text size="1">Defense: 7</Text>
              <Text size="1">Damage: 4-7</Text>
              <Text size="1">Health Points: 21</Text>
            </Flex>
          </button>
          <button
            className="flex flex-col gap-2 flex-1 border rounded-lg py-2 px-3 hover:bg-zinc-50 active:bg-zinc-100"
            onClick={createHardMonster}
          >
            <Text weight="medium">Hard</Text>
            <Flex direction="column" gap="1" align="start">
              <Text size="1">Attack: 8</Text>
              <Text size="1">Defense: 9</Text>
              <Text size="1">Damage: 5-8</Text>
              <Text size="1">Health Points: 24</Text>
            </Flex>
          </button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default FightStartDialog
