// normalizacion.js
// Rama sugerida: feature/normalizacion
// Parte A del taller: transformar la respuesta cruda de la API en la
// estructura simplificada que pide el enunciado, usando map.

/**
 * @param {Array} personajesCrudos - arreglo "results" tal cual lo entrega la API
 * @returns {Array} arreglo normalizado
 */
function normalizarPersonajes(personajesCrudos) {
  return personajesCrudos.map((p) => ({
    id: p.id,
    nombre: p.name,
    estado: p.status,
    especie: p.species,
    tipo: p.type,
    genero: p.gender,
    origen: p.origin?.name ?? "",
    ubicacionActual: p.location?.name ?? "",
    cantidadEpisodios: p.episode?.length ?? 0,
    imagen: p.image,
  }));
}

export { normalizarPersonajes };
