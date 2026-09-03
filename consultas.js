

function vivosHumanos(personajes) {
  return personajes.filter(
    (p) => p.estado === "Alive" && p.especie === "Human"
  );
}


function conVeinteOMasEpisodios(personajes) {
  return personajes.filter((p) => p.cantidadEpisodios >= 20);
}


function primerAlienFemale(personajes) {
  return personajes.find(
    (p) => p.especie === "Alien" && p.genero === "Female"
  );
}


function existeAlgunoConTipo(personajes) {
  return personajes.some((p) => p.tipo && p.tipo.trim() !== "");
}


function todosTienenImagenYEpisodio(personajes) {
  return personajes.every(
    (p) => Boolean(p.imagen) && p.cantidadEpisodios >= 1
  );
}


function agruparPorEspecie(personajes) {
  const acumuladoPorEspecie = personajes.reduce((acumulador, p) => {
    const especie = p.especie || "Desconocida";

    if (!acumulador[especie]) {
      acumulador[especie] = {
        cantidad: 0,
        sumaEpisodios: 0,
        vivos: 0,
      };
    }

    acumulador[especie].cantidad += 1;
    acumulador[especie].sumaEpisodios += p.cantidadEpisodios;
    if (p.estado === "Alive") {
      acumulador[especie].vivos += 1;
    }

    return acumulador;
  }, {});

 
  const resultado = {};
  for (const especie in acumuladoPorEspecie) {
    const { cantidad, sumaEpisodios, vivos } = acumuladoPorEspecie[especie];
    resultado[especie] = {
      cantidad,
      promedioEpisodios: Number((sumaEpisodios / cantidad).toFixed(1)),
      vivos,
    };
  }

  return resultado;
}


function clasificarPorRangoEpisodios(personajes) {
  return personajes.reduce(
    (acumulador, p) => {
      const n = p.cantidadEpisodios;
      if (n >= 1 && n <= 5) acumulador["1-5"] += 1;
      else if (n >= 6 && n <= 15) acumulador["6-15"] += 1;
      else if (n >= 16 && n <= 30) acumulador["16-30"] += 1;
      else if (n > 30) acumulador["30+"] += 1;

      return acumulador;
    },
    { "1-5": 0, "6-15": 0, "16-30": 0, "30+": 0 }
  );
}

export {
  vivosHumanos,
  conVeinteOMasEpisodios,
  primerAlienFemale,
  existeAlgunoConTipo,
  todosTienenImagenYEpisodio,
  agruparPorEspecie,
  clasificarPorRangoEpisodios,
};
