import { getRandomInteger } from "./getRandomInteger"

const WIN_NUMBERS = [5, 6]

// returns true if cube got winable number
export const throwCube = (cubeAmount: number): boolean => {
  for (let i = 0; i < cubeAmount; i++) {
    const cubeValue = getRandomInteger(1, 6)

    if (WIN_NUMBERS.includes(cubeValue)) {
      return true
    }
  }

  return false
}
