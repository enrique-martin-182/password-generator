# Generador de Contraseñas (React + TypeScript + Vite + Tailwind)

Proyecto de ejemplo para portfolio: un generador de contraseñas seguro con opciones de usuario,
copiar al portapapeles y medición de robustez (zxcvbn).

## Tecnologías
- React + TypeScript
- Vite
- TailwindCSS
- Vitest + Testing Library (unit tests)
- Playwright Test (E2E)

## Scripts
- `npm run dev` - iniciar servidor en `http://localhost:5173`
- `npm run build` - crear build de producción
- `npm run preview` - previsualizar build
- `npm run typecheck` - comprobar tipos TS
- `npm run test:unit` - ejecutar tests unitarios (Vitest)
- `npm run test:e2e` - ejecutar tests E2E (Playwright). **Importante:** inicia `npm run dev` en otro terminal antes.
- `npm run test` - ejecutar unit + e2e

## Cómo usar
1. Clona el repo o descomprime el zip.
2. `npm install`
3. `npm run dev` (abre `http://localhost:5173`)
4. En otra terminal, `npm run test:e2e` para ejecutar las pruebas E2E.

## Notas y recomendaciones para tu portfolio
- Añade un badge de build / tests en el README del repo.
- Explica en el README la decisión de seguridad: uso de `crypto.getRandomValues()` y por qué `Math.random()` no es adecuado.
- Menciona la elección de zxcvbn para feedback realista; si prefieres liviandad para el deploy, quítala y usa la estimación por entropía.
- Para entrevistas: prepara la explicación sobre cómo garantizas que al menos un carácter de cada tipo seleccionado se incluya.

