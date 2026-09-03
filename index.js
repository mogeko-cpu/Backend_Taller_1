

import { obtenerTodosConcurrente } from "./api.js";
import { normalizarPersonajes } from "./normalizacion.js";
import {
  vivosHumanos,
  conVeinteOMasEpisodios,
  primerAlienFemale,
  existeAlgunoConTipo,
  todosTienenImagenYEpisodio,
  agruparPorEspecie,
  clasificarPorRangoEpisodios,
} from "./consultas.js";
import { compararEstrategias } from "./estadisticas.js";

async function main() {
  console.log("=== Trayendo todos los personajes (Promise.all) ===");
  const { personajes: crudos, totalPaginas } = await obtenerTodosConcurrente();
  console.log(`Total de personajes obtenidos: ${crudos.length} (${totalPaginas} páginas)\n`);

  console.log("=== Parte A: Normalización (map) ===");
  const personajes = normalizarPersonajes(crudos);
  console.log("Ejemplo normalizado:", personajes[0], "\n");

  console.log("=== Parte B: Consultas ===");

  console.log("1) Vivos y Human:", vivosHumanos(personajes).length);

  console.log("2) >= 20 episodios:", conVeinteOMasEpisodios(personajes).length);

  console.log("3) Primer Alien Female:", primerAlienFemale(personajes)?.nombre);

  console.log("4) ¿Alguno tiene 'tipo'?:", existeAlgunoConTipo(personajes));

  console.log(
    "5) ¿Todos tienen imagen y >=1 episodio?:",
    todosTienenImagenYEpisodio(personajes)
  );

  console.log("6) Agrupado por especie:", agruparPorEspecie(personajes));

  console.log(
    "7) Clasificado por rango de episodios:",
    clasificarPorRangoEpisodios(personajes)
  );

  console.log("\n=== Parte C: Comparación de estrategias ===");
  await compararEstrategias();
}

main().catch((error) => {
  console.error("Ocurrió un error ejecutando el taller:", error);
});
