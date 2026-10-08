---
icon: lucide/flask-conical
---

# Verificación reproducible

## Rendimiento y comportamiento general

```bash
pnpm build
node scripts/serve-audit.cjs
```

Abrir `http://127.0.0.1:4173/` para el build y `http://127.0.0.1:4173/?audit`
para la auditoría local. El panel mide LCP/CLS y eventos, fuerza las mismas
reglas CSS de movimiento reducido y permite ralentizar animaciones a 5×. No
forma parte de `dist`. El máximo de eventos es un diagnóstico, no el INP de
campo; la medición depende del equipo y la red.

Probar menú con Tab/Enter/Escape, pasos rápidos de demo, detalles de
ciudades, FAQ con teclado, errores de campos, revisión y conservación entre
perfiles. Revisar 320, 375/390, 768, 1024 y 1440 px y pantalla baja. El
informe registra lo comprobado y las limitaciones del navegador usado; se
guarda localmente en `output/verification/`, que no se versiona.

## Página 404 (Snake)

Pruebas de reglas del juego, sin navegador:

```bash
node --experimental-strip-types --test scripts/snake-engine.test.mjs
```

Requiere Node 22. Prueba de navegador contra una vista previa, con
[Playwright][playwright]:

```bash
node scripts/verify-snake.cjs <node_modules-con-playwright> [origen]
```

Usa Edge, teclado y eventos táctiles nativos emulados, y guarda
resultados/capturas en `output/playwright/`. Ver también
[la página 404](../diseno/pagina-404.md).

## Páginas del footer

Con `pnpm build` se comprueba TypeScript y se genera la producción. Con
`pnpm preview --host 127.0.0.1`, ejecutar:

```bash
node scripts/verify-footer-pages.cjs <directorio-node_modules-con-playwright> [origen]
```

El script usa Edge en modo headless y revisa enlaces desde el footer,
navegación entre páginas, teclado y foco, historial y scroll, regreso a la
demo, URL directa y recarga, metadatos, correo sin enviarlo, páginas
pendientes y 404. Comprueba anchos de 320, 768, 1024 y 1440 px y guarda
capturas/resultados en `output/playwright/` (ignorado por Git). No comprueba
entrega de correo ni un despliegue remoto. Ver también
[la arquitectura de páginas del footer](../arquitectura/paginas.md).

Los scripts de auditoría son herramientas locales y no se incluyen en `dist`.
