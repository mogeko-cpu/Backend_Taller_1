const BASE_URL = "https://rickandmortyapi.com/api/character";

const FETCH_OPTIONS = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    Accept: "application/json",
    "Accept-Language": "es-CO,es;q=0.9,en;q=0.8",
    Referer: "https://rickandmortyapi.com/",
    "sec-ch-ua": '"Chromium";v="120", "Not_A Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
  },
};

async function fetchJson(url, intentosRestantes = 5, intentoNumero = 0) {
  const respuesta = await fetch(url, FETCH_OPTIONS);

  if (respuesta.status === 429 && intentosRestantes > 0) {
    const esperaMs = 3000 * 2 ** intentoNumero;
    await new Promise((resolve) => setTimeout(resolve, esperaMs));
    return fetchJson(url, intentosRestantes - 1, intentoNumero + 1);
  }

  const contentType = respuesta.headers.get("content-type") || "";
  if (!respuesta.ok || !contentType.includes("application/json")) {
    const textoRecibido = await respuesta.text();
    throw new Error(
      `Respuesta inesperada de ${url} (status ${respuesta.status}, content-type "${contentType}"). ` +
        `Primeros caracteres recibidos: ${textoRecibido.slice(0, 120)}`
    );
  }

  return respuesta.json();
}

async function obtenerInfoPaginacion() {
  const datos = await fetchJson(BASE_URL);
  return datos.info; 
}

async function obtenerTodosSecuencial() {
  const inicio = Date.now();

  const primeraPagina = await fetchJson(BASE_URL);
  const totalPaginas = primeraPagina.info.pages;

  let personajes = [...primeraPagina.results];

  for (let pagina = 2; pagina <= totalPaginas; pagina++) {
    const datos = await fetchJson(`${BASE_URL}?page=${pagina}`);
    personajes = personajes.concat(datos.results);
  }

  const tiempoMs = Date.now() - inicio;
  return { personajes, tiempoMs, totalPaginas };
}

async function obtenerTodosConcurrente() {
  const inicio = Date.now();

  const info = await obtenerInfoPaginacion();
  const totalPaginas = info.pages;

  const TAMANO_LOTE = 3;
  const PAUSA_ENTRE_LOTES_MS = 1500;
  let personajes = [];

  for (let inicioLote = 1; inicioLote <= totalPaginas; inicioLote += TAMANO_LOTE) {
    const finLote = Math.min(inicioLote + TAMANO_LOTE - 1, totalPaginas);

    const promesasDelLote = [];
    for (let pagina = inicioLote; pagina <= finLote; pagina++) {
      promesasDelLote.push(fetchJson(`${BASE_URL}?page=${pagina}`));
    }

    const resultadosDelLote = await Promise.all(promesasDelLote);
    personajes = personajes.concat(
      resultadosDelLote.flatMap((pagina) => pagina.results)
    );

    if (finLote < totalPaginas) {
      await new Promise((resolve) => setTimeout(resolve, PAUSA_ENTRE_LOTES_MS));
    }
  }

  const tiempoMs = Date.now() - inicio;
  return { personajes, tiempoMs, totalPaginas };
}

export { obtenerInfoPaginacion, obtenerTodosSecuencial, obtenerTodosConcurrente };