import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

/** Focus the destination without overriding the router's history scroll restoration. */
export function RouteFocus() {
  const location = useLocation();
  const previousKey = useRef(location.key);

  useEffect(() => {
    if (previousKey.current === location.key) return;
    previousKey.current = location.key;
    const target = (location.hash && document.getElementById(location.hash.slice(1)))
      || document.getElementById('contenido');
    if (!target) return;
    const needsTabIndex = !target.hasAttribute('tabindex');
    if (needsTabIndex) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    return () => { if (needsTabIndex) target.removeAttribute('tabindex'); };
  }, [location.key, location.hash]);

  return null;
}
