/**
 * @param {Array} personajesCrudos 
 * @returns {Array} 
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
