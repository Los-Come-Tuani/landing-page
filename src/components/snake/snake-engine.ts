export const BOARD_SIZE = 18;
export const STEP_MS = 160;
export type Point = { x: number; y: number };
export type Direction = 'up' | 'right' | 'down' | 'left';
export type GameState = {
  body: Point[];
  direction: Direction;
  turn: Direction | null;
  marker: Point | null;
  score: number;
  status: 'ready' | 'running' | 'paused' | 'over';
  ending: 'wall' | 'self' | 'complete' | null;
};
export type GameAction =
  | { type: 'start' }
  | { type: 'pause' }
  | { type: 'resume' }
  | { type: 'turn'; direction: Direction }
  | { type: 'step'; random: number };

const vectors: Record<Direction, Point> = {
  up: { x: 0, y: -1 }, right: { x: 1, y: 0 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 },
};
const opposites: Record<Direction, Direction> = { up: 'down', down: 'up', left: 'right', right: 'left' };
const samePoint = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

export function createGame(): GameState {
  return {
    body: [{ x: 6, y: 9 }, { x: 5, y: 9 }, { x: 4, y: 9 }, { x: 3, y: 9 }],
    direction: 'right', turn: null, marker: { x: 10, y: 9 }, score: 0, status: 'ready', ending: null,
  };
}

export function placeMarker(body: Point[], random: number): Point | null {
  const occupied = new Set(body.map(point => point.y * BOARD_SIZE + point.x));
  const free: Point[] = [];
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      if (!occupied.has(y * BOARD_SIZE + x)) free.push({ x, y });
    }
  }
  return free[Math.min(free.length - 1, Math.floor(Math.max(0, random) * free.length))] ?? null;
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  if (action.type === 'start') return { ...createGame(), status: 'running' };
  if (action.type === 'pause') return state.status === 'running' ? { ...state, status: 'paused', turn: null } : state;
  if (action.type === 'resume') return state.status === 'paused' ? { ...state, status: 'running' } : state;
  if (state.status !== 'running') return state;
  if (action.type === 'turn') {
    if (state.turn || action.direction === state.direction || action.direction === opposites[state.direction]) return state;
    return { ...state, turn: action.direction };
  }

  const direction = state.turn ?? state.direction;
  const vector = vectors[direction];
  const head = { x: state.body[0].x + vector.x, y: state.body[0].y + vector.y };
  if (head.x < 0 || head.y < 0 || head.x >= BOARD_SIZE || head.y >= BOARD_SIZE) {
    return { ...state, status: 'over', ending: 'wall', turn: null };
  }
  const collected = state.marker !== null && samePoint(head, state.marker);
  // A moving tail vacates its cell on this tick, unless the route grows.
  const collisionBody = collected ? state.body : state.body.slice(0, -1);
  if (collisionBody.some(point => samePoint(point, head))) {
    return { ...state, status: 'over', ending: 'self', turn: null };
  }
  const body = [head, ...state.body];
  if (!collected) body.pop();
  const marker = collected ? placeMarker(body, action.random) : state.marker;
  return {
    ...state, body, direction, turn: null, marker, score: state.score + Number(collected),
    status: marker === null ? 'over' : 'running', ending: marker === null ? 'complete' : null,
  };
}

export function keyDirection(key: string): Direction | undefined {
  const directions: Record<string, Direction> = {
    ArrowUp: 'up', ArrowRight: 'right', ArrowDown: 'down', ArrowLeft: 'left',
    w: 'up', d: 'right', s: 'down', a: 'left',
  };
  return directions[key] ?? directions[key.toLowerCase()];
}

export function swipeDirection(dx: number, dy: number): Direction | undefined {
  const x = Math.abs(dx);
  const y = Math.abs(dy);
  if (Math.max(x, y) < 18 || Math.max(x, y) < Math.min(x, y) * 1.2) return undefined;
  return x > y ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
}
