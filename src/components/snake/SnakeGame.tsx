import { useEffect, useReducer, useRef } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import isotipo from '@/assets/isotipo-kplan.svg';
import { createGame, gameReducer, keyDirection, STEP_MS, swipeDirection } from './snake-engine';
import { SnakeBoard } from './SnakeBoard';

export function SnakeGame() {
  const [game, dispatch] = useReducer(gameReducer, undefined, createGame);
  const board = useRef<HTMLDivElement>(null);
  const control = useRef<HTMLButtonElement>(null);
  const controlIntent = useRef<'pause' | 'resume' | 'start' | null>(null);
  const gesture = useRef<{ id: number; x: number; y: number; used: boolean } | null>(null);
  const running = game.status === 'running';

  useEffect(() => {
    if (!running) return;
    // Randomness is supplied by the timer so the reducer remains pure in StrictMode.
    const timer = window.setInterval(() => dispatch({ type: 'step', random: Math.random() }), STEP_MS);
    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => {
    const pause = () => { gesture.current = null; dispatch({ type: 'pause' }); };
    const visibility = () => { if (document.hidden) pause(); };
    const outside = (event: globalThis.PointerEvent) => {
      if (event.target instanceof Node && !board.current?.contains(event.target) && !control.current?.contains(event.target)) pause();
    };
    window.addEventListener('blur', pause);
    document.addEventListener('visibilitychange', visibility);
    document.addEventListener('pointerdown', outside);
    return () => {
      window.removeEventListener('blur', pause);
      document.removeEventListener('visibilitychange', visibility);
      document.removeEventListener('pointerdown', outside);
    };
  }, []);

  const activate = () => {
    // Preserve the intended action if focusing the button has already paused the board.
    const action = controlIntent.current ?? (running ? 'pause' : game.status === 'paused' ? 'resume' : 'start');
    controlIntent.current = null;
    dispatch({ type: action });
    if (action === 'pause') {
      control.current?.focus({ preventScroll: true });
    } else {
      board.current?.focus({ preventScroll: true });
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!running || event.altKey || event.ctrlKey || event.metaKey) return;
    const direction = keyDirection(event.key);
    if (direction) {
      event.preventDefault();
      if (!event.repeat) dispatch({ type: 'turn', direction });
    } else if (event.key === 'Escape') {
      event.preventDefault();
      dispatch({ type: 'pause' });
      control.current?.focus({ preventScroll: true });
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!running || event.pointerType === 'mouse' || !event.isPrimary || gesture.current) return;
    board.current?.focus({ preventScroll: true });
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, used: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = gesture.current;
    if (!running || !start || start.id !== event.pointerId || start.used) return;
    const direction = swipeDirection(event.clientX - start.x, event.clientY - start.y);
    if (direction) {
      start.used = true;
      dispatch({ type: 'turn', direction });
    }
  };
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    onPointerMove(event);
    if (gesture.current?.id === event.pointerId) gesture.current = null;
  };

  const scoreText = `${game.score} ${game.score === 1 ? 'parada' : 'paradas'}`;
  const ended = game.status === 'over';
  const completed = game.ending === 'complete';
  const actionLabel = running ? 'Pausar' : game.status === 'paused' ? 'Reanudar' : ended ? 'Volver a jugar' : 'Jugar';
  const ActionIcon = running ? Pause : ended ? RotateCcw : Play;
  const statusText = running ? `En recorrido. ${scoreText}.` : game.status === 'paused' ? `Partida en pausa. ${scoreText}.`
    : ended ? `${completed ? 'Completaste el tablero' : 'Fin de la partida'}. ${scoreText}. Podés volver a jugar.`
      : 'Partida lista. Pulsá Jugar para empezar.';

  return <section className="snake-game" aria-labelledby="snake-title" data-status={game.status}>
    <div className="snake-topline">
      <div className="snake-title"><img src={isotipo} width="20" height="32" alt="" /><h2 id="snake-title">Trazá tu ruta</h2></div>
      <p className="snake-score"><span>Paradas</span><strong>{String(game.score).padStart(2, '0')}</strong></p>
    </div>
    <div ref={board} id="snake-play-area" className="snake-board" tabIndex={0} role="application" aria-label="Snake: tablero de 18 por 18 casillas" aria-describedby="snake-instructions snake-rules"
      data-running={running} onKeyDown={onKeyDown} onBlur={() => dispatch({ type: 'pause' })}
      onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}
      onPointerCancel={() => { gesture.current = null; dispatch({ type: 'pause' }); }}>
      <SnakeBoard game={game} />
      {!running && <div className="snake-overlay" aria-hidden="true">
        <span className="snake-overlay-label">{game.status === 'ready' ? 'Un desvío para jugar' : game.status === 'paused' ? 'Tomate una pausa' : completed ? '¡Ruta completa!' : 'Hasta aquí llegó la ruta'}</span>
        <p>{game.status === 'ready' ? 'Cada parada abre camino.' : game.status === 'paused' ? 'Tu ruta te espera.' : `${scoreText}. ¿Otro recorrido?`}</p>
      </div>}
    </div>
    <div className="snake-actions">
      <button ref={control} type="button" className={`button ${running ? 'button--secondary' : 'button--primary'}`} onClick={activate}
        onPointerDown={() => { controlIntent.current = running ? 'pause' : game.status === 'paused' ? 'resume' : 'start'; }}
        onPointerCancel={() => { controlIntent.current = null; }} onKeyDown={() => { controlIntent.current = null; }} aria-controls="snake-play-area">
        <ActionIcon size={16} aria-hidden="true" />{actionLabel}
      </button>
      <p id="snake-rules">Recogé marcadores. Evitá los bordes y tu propia ruta.</p>
    </div>
    <p id="snake-instructions" className="snake-instructions">Usá las flechas o W/A/S/D. En pantalla táctil, deslizá sobre el tablero. Esc pausa la partida.</p>
    <p role="status" aria-live="polite" aria-atomic="true" className="snake-sr-only">{statusText}</p>
  </section>;
}
