import { useId } from 'react';
import type { GameState } from './snake-engine';
import { BOARD_SIZE } from './snake-engine';

const rotations = { up: -90, right: 0, down: 90, left: 180 };

export function SnakeBoard({ game }: { game: GameState }) {
  const gridId = useId();
  const head = game.body[0];
  return <svg viewBox={`0 0 ${BOARD_SIZE} ${BOARD_SIZE}`} aria-hidden="true" focusable="false" className="snake-board-art">
    <defs><pattern id={gridId} width="1" height="1" patternUnits="userSpaceOnUse">
      <path d="M 1 0 L 0 0 0 1" fill="none" className="snake-grid" strokeWidth="0.035" />
    </pattern></defs>
    <rect width={BOARD_SIZE} height={BOARD_SIZE} fill={`url(#${gridId})`} />
    <polyline points={game.body.map(point => `${point.x + .5},${point.y + .5}`).join(' ')} className="snake-route" fill="none" strokeWidth=".54" strokeLinejoin="round" strokeLinecap="round" />
    {game.body.map((point, index) => <rect key={`${point.x}-${point.y}`} x={point.x + .09} y={point.y + .09} width=".82" height=".82" rx=".22" className={index === 0 ? 'snake-head' : 'snake-segment'} />)}
    <g transform={`translate(${head.x + .5} ${head.y + .5}) rotate(${rotations[game.direction]})`}>
      <path d="M -.09 -.18 L .1 0 L -.09 .18" className="snake-heading" fill="none" strokeWidth=".085" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    {game.marker && <g transform={`translate(${game.marker.x + .5} ${game.marker.y + .5})`} className={`snake-marker snake-marker--${game.score % 2 === 0 ? 'green' : 'yellow'}`}>
      <path d="M 0 .44 C -.14 .29 -.35 .04 -.35 -.12 A .35 .35 0 0 1 .35 -.12 C .35 .04 .14 .29 0 .44 Z" strokeWidth=".045" />
      <circle cy="-.12" r=".105" className="snake-marker-center" />
    </g>}
  </svg>;
}
