const poke_api_url = "https://pokeapi.co/api/v2/pokemon/";
async function consumeEndpoint() {
    try {
        let response = await fetch(poke_api_url);
        let data = await response.json();
        try {
            for (let i = 0; i < data.results.length; i++) {
                let new_url = data.results[i].url;
                const response = await axios.get(new_url);
                let new_data = response.data;
                let sprites = new_data.sprites.front_default;
                let name = new_data.species.name;
                let array = [name, sprites];
                print_pokemons(array);
            }
        } catch (error) {
            console.log("Axios API error: ", error);
        }
    } catch (error) { 
        console.log("Fetch API error: ", error); 
    }
}

function print_pokemons(data) {
    let table = 
    `<div class="card">
    <img src="${[data[1]]}" alt="poke_img">
    <h2>${[data[0]]}</h2>
    </div>`;
    document.getElementById("pokemon-cards").innerHTML += table;
}

consumeEndpoint();