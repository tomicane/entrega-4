async function buscarPokemon() {
    // Limpiar mensajes de error anteriores
    document.getElementById("error-message").innerHTML = "";
  
    // Obtener el número del Pokémon desde el input
    const numeroPokemon = document.getElementById("numeroInput").value;
  
    // Verificar si se ingresó un número
    if (isNaN(numeroPokemon) || numeroPokemon === "") {
      mostrarError("Por favor, ingresa un número válido.");
      return;
    }
  
    // Construir la URL de la PokeAPI para obtener los datos del Pokémon
    const url = `https://pokeapi.co/api/v2/pokemon/${numeroPokemon}/`;
  
    try {
      // Realizar la solicitud a la API
      const response = await fetch(url);
  
      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        mostrarError("No se encontró ningún Pokémon con ese número.");
        return;
      }
  
      const data = await response.json();
  
      // Crear la tarjeta del Pokémon
      const pokemonCard = document.getElementById("pokemon-card");
      pokemonCard.innerHTML = `
          <h2>${data.name}</h2>
          <p>Tipo: ${data.types.map((type) => type.type.name).join(", ")}</p>
          <p>Altura: ${data.height / 10} metros</p>
          <p>Peso: ${data.weight / 10} kg</p>
          <img id="pokemon-image" src="${data.sprites.front_default}" alt="${
        data.name
      }">
        `;
    } catch (error) {
      console.error("Error al obtener datos del Pokémon:", error);
      mostrarError("Ocurrió un error al obtener datos del Pokémon.");
    }
  }
  
  function mostrarError(mensaje) {
    // Mostrar mensaje de error
    const errorMessageContainer = document.getElementById("error-message");
    errorMessageContainer.innerHTML = `<p>${mensaje}</p>`;
  }