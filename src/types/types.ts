export interface IPlayer {
  id: number
  name: string
  health: number
  damage: number
  action: number
  img: string,
  description: string
}

export interface IEnemy {
  id: number
  name: string
  health: number
  damage: number
  img: string
  description: string
}