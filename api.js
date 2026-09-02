// api.js
// Rama sugerida: feature/normalizacion (esta funcionalidad es la base que
// necesitan las demás ramas, por eso conviene mergearla primero a main).
//
// Responsabilidad: consumir la API de Rick and Morty y traer TODOS los
// personajes, sin hardcodear el número de páginas.

const BASE_URL = "https://rickandmortyapi.com/api/character";

/**
 * Trae la primera página para descubrir cuántas páginas existen en total.
 */
async function obtenerInfoPaginacion() {
  const respuesta = await fetch(BASE_URL);
  if (!respuesta.ok) {
    throw new Error(`Error al consultar la API: ${respuesta.status}`);
  }
  const datos = await respuesta.json();
  return datos.info; // { count, pages, next, prev }
}

/**
 * Estrategia 1 - SECUENCIAL
 * Pide cada página con await dentro de un ciclo, una después de otra.
 */
async function obtenerTodosSecuencial() {
  const inicio = Date.now();

  const primeraPagina = await fetch(BASE_URL).then((r) => r.json());
  const totalPaginas = primeraPagina.info.pages;

  let personajes = [...primeraPagina.results];

  for (let pagina = 2; pagina <= totalPaginas; pagina++) {
    const respuesta = await fetch(`${BASE_URL}?page=${pagina}`);
    const datos = await respuesta.json();
    personajes = personajes.concat(datos.results);
  }

  const tiempoMs = Date.now() - inicio;
  return { personajes, tiempoMs, totalPaginas };
}

/**
 * Estrategia 2 - CONCURRENTE (la que exige el enunciado como solución final)
 * Genera las URLs de todas las páginas y las consulta en paralelo con
 * Promise.all().
 */
async function obtenerTodosConcurrente() {
  const inicio = Date.now();

  const info = await obtenerInfoPaginacion();
  const totalPaginas = info.pages;

  // Genera un arreglo de promesas: una petición fetch por cada página.
  const promesas = [];
  for (let pagina = 1; pagina <= totalPaginas; pagina++) {
    promesas.push(
      fetch(`${BASE_URL}?page=${pagina}`).then((r) => r.json())
    );
  }

  const resultados = await Promise.all(promesas);

  // Cada resultado trae su propio "results"; se aplanan en un solo arreglo.
  const personajes = resultados.flatMap((pagina) => pagina.results);

  const tiempoMs = Date.now() - inicio;
  return { personajes, tiempoMs, totalPaginas };
}

export { obtenerInfoPaginacion, obtenerTodosSecuencial, obtenerTodosConcurrente };
