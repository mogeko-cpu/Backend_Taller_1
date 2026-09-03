# Taller 1 – Rick and Morty API

Consumo de la API de Rick and Morty, normalización y consultas con métodos
funcionales de arreglos (`map`, `filter`, `find`, `some`, `every`, `reduce`),
más comparación entre estrategia secuencial y concurrente (`Promise.all`).

## Requisitos

- Node.js 18 o superior (usa `fetch` nativo).

## Cómo ejecutar

```bash
npm install   # no hay dependencias externas, pero deja el proyecto listo
npm start
```

## Estructura del proyecto

```
api.js            -> consumo de la API (secuencial y concurrente)
normalizacion.js   -> Parte A: map
consultas.js        -> Parte B: filter, find, some, every, reduce
estadisticas.js      -> Parte C: comparación de tiempos
index.js              -> orquesta todo el flujo
ANALISIS.md            -> respuestas a las preguntas de análisis
```

## Cómo repartir el trabajo en equipo (GitHub Flow)

El enunciado exige que **nadie** commitee directo a `main` y que cada
funcionalidad se integre por Pull Request con revisión de otro integrante.
Sugerencia de orden:

1. **Un integrante** crea el repo, sube esta estructura base con
   `api.js` + `normalizacion.js` funcionando, en una rama
   `feature/normalizacion`, y abre el primer PR. Este PR debería mergearse
   primero porque las otras dos ramas dependen de él.
2. **Segundo integrante** trabaja `consultas.js` en la rama
   `feature/consultas`, partiendo de `main` ya con el paso 1 mergeado.
3. **Tercer integrante** trabaja `estadisticas.js` (Parte C) y el documento
   `ANALISIS.md` en la rama `feature/estadisticas`.
4. Cada PR necesita al menos un comentario o aprobación de otro integrante
   antes del merge — háganlo explícito en la conversación del PR, no solo
   verbalmente, porque es evidencia que se evalúa.
5. Verifiquen que el historial de commits muestre a los 3 integrantes
   commiteando desde sus propias ramas (no todo desde una sola cuenta).

## Notas técnicas

- La paginación se descubre automáticamente desde `info.pages` de la
  primera respuesta; no hay ningún número de páginas hardcodeado.
- `obtenerTodosConcurrente()` es la solución definitiva que pide el
  enunciado (usa `Promise.all`). `obtenerTodosSecuencial()` existe solo
  para poder comparar tiempos en la Parte C.
- Con una API pública, ejecutar `Promise.all` sobre muchas páginas a la vez
  puede toparse con límites de tasa (rate limiting) del servidor — es un
  punto válido para la pregunta 3 del análisis.
