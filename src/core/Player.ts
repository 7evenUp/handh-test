import { Creature, CreatureConstructorArgs } from "./Creature"

const HEAL_PERCENT = 30

export class Player extends Creature {
  readonly _maxHp: number // For heal() method
  private healAmount = 4

  constructor({ hp, ...args }: CreatureConstructorArgs) {
    super({ hp, ...args })

    this._maxHp = hp
  }

  // returns true if able
  public isAbleToHeal = () => {
    if (this.healAmount > 0 && !this.isDead()) return true

    return false
  }

  public heal = () => {
    if (!this.isAbleToHeal) return

    const healPower = Math.floor((this._maxHp * HEAL_PERCENT) / 100)

    if (this._hp + healPower > this._maxHp) this._hp = this._maxHp
    else this._hp += healPower

    this.healAmount -= 1
  }

  public toString = (): string => `Player: ${super.toString()}`
}
