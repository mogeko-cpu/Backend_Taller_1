// estadisticas.js
// Rama sugerida: feature/estadisticas
// Parte C del taller: ejecuta ambas estrategias y reporta el tiempo de cada una.

import { obtenerTodosSecuencial, obtenerTodosConcurrente } from "./api.js";

async function compararEstrategias() {
  console.log("Ejecutando estrategia SECUENCIAL...");
  const secuencial = await obtenerTodosSecuencial();
  console.log(
    `-> Secuencial: ${secuencial.personajes.length} personajes en ${secuencial.tiempoMs} ms (${secuencial.totalPaginas} páginas)`
  );

  console.log("Ejecutando estrategia CONCURRENTE...");
  const concurrente = await obtenerTodosConcurrente();
  console.log(
    `-> Concurrente: ${concurrente.personajes.length} personajes en ${concurrente.tiempoMs} ms (${concurrente.totalPaginas} páginas)`
  );

  const mejora = secuencial.tiempoMs - concurrente.tiempoMs;
  console.log(
    `\nLa estrategia concurrente fue ${mejora > 0 ? "más rápida" : "más lenta"} por ${Math.abs(mejora)} ms.`
  );

  return { secuencial, concurrente };
}

export { compararEstrategias };
