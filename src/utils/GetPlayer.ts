import { IPlayer } from "@/types/types";

export const getPlayer = (player: IPlayer) => {
  let currentPlayer: IPlayer;
  if (localStorage.getItem('player')) {
    currentPlayer = JSON.parse(localStorage.getItem('player'));
  } else if (player) {
    currentPlayer = player;
  }

  return currentPlayer;
}