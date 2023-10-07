import { getRandomInteger } from "../utils/getRandomInteger"
import { throwCube } from "../utils/cube"

export type Damage = {
  min: number
  max: number
}

export interface CreatureConstructorArgs {
  attack: number
  defense: number
  damage: Damage
  hp: number
}

export class Creature {
  private _attack: number // 1-30
  private _defense: number // 1-30
  private _damage: Damage // M - N (1-6)
  protected _hp: number // 0 - N

  get attack() {
    return this._attack
  }
  get defense() {
    return this._defense
  }
  get damage() {
    return this._damage
  }
  get hp() {
    return this._hp
  }

  constructor({ attack, defense, damage, hp }: CreatureConstructorArgs) {
    this._attack = attack
    this._defense = defense
    this._damage = { ...damage }
    this._hp = hp
  }

  // returns true if hit was successful
  public hit = (target: Creature): boolean => {
    let cubesToThrow: number

    const modifier = this._attack - target._defense + 1

    if (modifier <= 1) cubesToThrow = 1
    else cubesToThrow = modifier

    const isHitSuccessful = throwCube(cubesToThrow)

    if (isHitSuccessful) {
      const damage = getRandomInteger(this._damage.min, this._damage.max)
      target._hp -= damage
      return true
    }

    return false
  }

  // returns true if dead
  public isDead = (): boolean => {
    return this._hp <= 0
  }
}
