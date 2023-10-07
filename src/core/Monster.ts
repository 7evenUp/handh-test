import { Creature, CreatureConstructorArgs } from "./Creature"

export class Monster extends Creature {
  constructor({ ...args }: CreatureConstructorArgs) {
    super({ ...args })
  }
}
