import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { ErrorScreen } from '@/components/layout/ErrorScreen';

/** Último recurso, por fuera del router: si todo lo demás falla, la página no queda en blanco. */
export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean; error: unknown }> {
  state = { failed: false, error: null as unknown };
  static getDerivedStateFromError(error: unknown) { return { failed: true, error }; }
  componentDidCatch(error: unknown, info: ErrorInfo) { if (import.meta.env.DEV) console.error(error, info.componentStack); }
  render() { return this.state.failed ? <ErrorScreen error={this.state.error} /> : this.props.children; }
}
