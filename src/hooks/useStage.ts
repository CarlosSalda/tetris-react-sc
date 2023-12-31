import React from 'react';
import { createStage } from '../gameHelpers';
// Types
import type { PLAYER } from './usePlayer';

type STAGECELL = [string | number, string | number];
export type STAGE = STAGECELL[][];

export const useStage = (player: PLAYER, resetPlayer: () => void) => {
  const [stage, setStage] = React.useState(createStage());
  const [rowsCleared, setRowsCleared] = React.useState(0);

  React.useEffect(() => {
    if (!player.pos) return;

    setRowsCleared(0);

    const sweepRows = (newStage: STAGE): STAGE => {
      return newStage.reduce((ack, row) => {
        // If we don't find a 0 it means that the row is full and should be cleared
        if (row.findIndex(cell => cell[0] === 0) === -1) {
          setRowsCleared(prev => prev + 1);
          ack.unshift(new Array(newStage[0].length).fill([0, 'clear']) as STAGECELL[]);
          return ack;
        }

        ack.push(row);
        return ack;
      }, [] as STAGE);
    };

    const updateStage = (prevStage: STAGE): STAGE => {
        // First flush the stage
        const newStage: STAGE = prevStage.map(row =>
          row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
        );
      
        player.tetromino.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value !== 0) {
              newStage[y + player.pos.y][x + player.pos.x] = [value, `${player.collided ? 'merged' : 'clear'}`];
            }
          });
        });
      
        if (player.collided) {
          resetPlayer();
      
          return sweepRows(newStage);
        }
      
        return newStage;
      };
      
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setStage(prev => updateStage(prev));
  }, [player.collided, player.pos?.x, player.pos?.y, player.tetromino, player.pos, resetPlayer]);

  return { stage, setStage, rowsCleared };
};