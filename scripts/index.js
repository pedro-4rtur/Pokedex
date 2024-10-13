var pokemons = [];
let geracoes = [];
geracoes.push(151, 100)
let container = document.querySelector('.container')

window.addEventListener("load", getPokemons);

var query = location.search.slice(1);
var partes = query.split('&');
var data = {}
partes.forEach(function (parte) {
    var chaveValor = parte.split('=');
    var chave = chaveValor[0];
    var valor = chaveValor[1];
    data[chave] = valor;
});

async function getPokemons() {
    let url = "https://pokeapi.co/api/v2/pokemon/"
    let contador = 1

    for(contador; contador<=geracoes[0]; contador++) {
        let response = await fetch(url+contador)
        let pokemon = await response.json()
        pokemons.push(pokemon)
    }
    if(data["pokemon"] == undefined) {
        pokemons.forEach(pokemon => {
            montacard(pokemon)
        })
    } else {
        document.querySelector(".dropdown").style.display = "none"
        document.querySelector(".perfil-view").style.display = "block"

        let prox = (parseInt(data["pokemon"]) == pokemons.length) ? 1 : parseInt(data["pokemon"]) + 1
        let ant = (parseInt(data["pokemon"]) == 1) ? pokemons.length : parseInt(data["pokemon"]) - 1

        document.querySelector("#btnAnt").href = `./index.html?pokemon=${ant}`
        document.querySelector("#btnProx").href = `./index.html?pokemon=${prox}`

        let id = data["pokemon"]
        if(data["pokemon"] < 10) id = `00${data["pokemon"]}`
        if(data["pokemon"] > 9 && data["pokemon"] < 100) id = `0${data["pokemon"]}`
        document.querySelector("#numero").innerHTML = `N° ${id}`

        document.querySelector(".pokemon-image > img").src = pokemons[id-1]["sprites"]["front_default"]

        document.querySelector(".pokemon-info .nome-pokemon").innerHTML = pokemons[id-1]["name"]

        //set tipos
        for(let i=0; i < pokemons[id-1]["types"].length; i++) {
            let p = document.createElement("p");
            p.classList.add("tipo", pokemons[id-1]["types"][i]["type"]["name"]);
            document.querySelector(".perfil-content .container-tipo").appendChild(p);
        }

        let pesoAltura = document.querySelectorAll(".info p")
        pesoAltura[0].innerHTML = pokemons[id-1]["height"]
        pesoAltura[1].innerHTML = pokemons[id-1]["weight"]

        //set status
        //vida
        let docvida = document.querySelector(".perfil-content .barra-vida .status");
        let spanvida = document.querySelector(`.perfil-content .barra-vida .qtd-status`);
        let vida = pokemons[id-1]["stats"][0]["base_stat"];
        docvida.style.width = vida+"%";
        if(vida > 100) {
            docvida.style.width = "100%";
        }
        spanvida.innerHTML = vida;

        //ataque
        let docataque = document.querySelector(`.perfil-content .barra-ataque .status`);
        let spanataque = document.querySelector(`.perfil-content .barra-ataque .qtd-status`);
        let ataque = pokemons[id-1]["stats"][1]["base_stat"];
        docataque.style.width = ataque+"%";
        if(ataque > 100) {
            docataque.style.width = "100%";
        }
        spanataque.innerHTML = ataque;

        //defesa
        let docdefesa = document.querySelector(`.perfil-content .barra-defesa .status`);
        let spandefesa = document.querySelector(`.perfil-content .barra-defesa .qtd-status`);
        let defesa = pokemons[id-1]["stats"][2]["base_stat"];
        docdefesa.style.width = defesa+"%";
        if(defesa > 100) {
            docdefesa.style.width = "100%";
        }
        spandefesa.innerHTML = defesa;

        //velocidade
        let docvelocidade = document.querySelector(`.perfil-content .barra-velocidade .status`);
        let spanvelocidade = document.querySelector(`.perfil-content .barra-velocidade .qtd-status`);
        let velocidade = pokemons[id-1]["stats"][5]["base_stat"];
        docvelocidade.style.width = velocidade+"%";
        if(velocidade > 100) {
            docvelocidade.style.width = "100%";
        }
        spanvelocidade.innerHTML = velocidade;
    }
}

function montacard(pokemon) {

    const cardOriginal = document.querySelector("#original");

    let id = pokemon["id"];
    
    let clone = cardOriginal.cloneNode(true);
    clone.id = `card${id}`;

    clone.children[0].href = `./index.html?pokemon=${id}`

    container.appendChild(clone);
    setAtributes(pokemon);
}

function setAtributes(pokemon) {

    let card_id = "#"+document.querySelector(`#card${pokemon["id"]}`).id;
    //Set imagem
    document.querySelector(`${card_id} .frente > .imagens-pokemons`).src = pokemon["sprites"]["front_default"];
    
    //set status
    //vida
    let docvida = document.querySelector(`${card_id} .barra-vida .status`);
    let spanvida = document.querySelector(`${card_id} .barra-vida .qtd-status`);
    let vida = pokemon["stats"][0]["base_stat"];
    docvida.style.width = vida+"%";
    if(vida > 100) {
        docvida.style.width = "100%";
    }
    spanvida.innerHTML = vida;

    //ataque
    let docataque = document.querySelector(`${card_id} .barra-ataque .status`);
    let spanataque = document.querySelector(`${card_id} .barra-ataque .qtd-status`);
    let ataque = pokemon["stats"][1]["base_stat"];
    docataque.style.width = ataque+"%";
    if(ataque > 100) {
        docataque.style.width = "100%";
    }
    spanataque.innerHTML = ataque;

    //defesa
    let docdefesa = document.querySelector(`${card_id} .barra-defesa .status`);
    let spandefesa = document.querySelector(`${card_id} .barra-defesa .qtd-status`);
    let defesa = pokemon["stats"][2]["base_stat"];
    docdefesa.style.width = defesa+"%";
    if(defesa > 100) {
        docdefesa.style.width = "100%";
    }
    spandefesa.innerHTML = defesa;

    //velocidade
    let docvelocidade = document.querySelector(`${card_id} .barra-velocidade .status`);
    let spanvelocidade = document.querySelector(`${card_id} .barra-velocidade .qtd-status`);
    let velocidade = pokemon["stats"][5]["base_stat"];
    docvelocidade.style.width = velocidade+"%";
    if(velocidade > 100) {
        docvelocidade.style.width = "100%";
    }
    spanvelocidade.innerHTML = velocidade;

    //set N° e nome
    let idAux = pokemon["id"];
    if(pokemon["id"] < 10) idAux = "00"+pokemon["id"];
    if(pokemon["id"] > 9 && pokemon["id"] < 100) idAux = "0"+pokemon["id"];
    document.querySelector(`${card_id} .numero-pokemon`).innerHTML += idAux;
    document.querySelector(`${card_id} .nome-pokemon`).innerHTML = pokemon["name"];

    //set tipos
    for(let i=0; i < pokemon["types"].length; i++) {

        let p = document.createElement("p");
        p.classList.add("tipo", pokemon["types"][i]["type"]["name"]);
        document.querySelector(`${card_id} .container-tipo`).appendChild(p);
    }
}


//sugestoes de pesquisa
let input = document.querySelector("#pesquisa");
let datalist = document.querySelector("#lista");

input.addEventListener("keyup", function(event) {

    datalist.style.display = "block";
    datalist.innerHTML = "";

    let palavra;

    if(input.value == "") {
        datalist.style.display = "none";
    } else {
        palavra = `${input.value}`; 
    }

    palavra = palavra.toLowerCase();
    
    let contador = 0;

    for(let i=0; i < pokemons.length; i++) {
    
        if(contador < 4) {
    
            if((pokemons[i]['name'].match(palavra)) || ((pokemons[i]["id"].toString()).match(palavra))) {
    
                let option = document.createElement("option");
                option.innerHTML = pokemons[i]["name"];
                option.classList.add("option");
    
                datalist.appendChild(option);
                (datalist.lastChild).addEventListener("mousedown",function() {
                    input.value = pokemons[i]["name"];
                });
                (datalist.lastChild).addEventListener("click", pesquisa)
    
                contador++;
            }
        } else {
            break;
        }
    }

    if(datalist.lastChild == null) {
        
        let option = document.createElement("option");
        option.innerHTML = "Mals, nada encontrado :(";
        option.classList.add("option");

        datalist.appendChild(option);
    }
    
})

input.addEventListener("blur", () => {

    if(datalist.style.display != "none") {
        setTimeout(() => {
            datalist.style.display = "none";
        }, 300);
    }
})

//clique no botão pesquisa
let btnPesquisa = document.querySelector("#btnpesquisa")
btnPesquisa.addEventListener("click", pesquisa);

input.addEventListener("focus", () => {

    this.addEventListener("keyup", (event) => {

        if(event.key == "Enter") {
            pesquisa();
            datalist.style.display = "none";
        }
    })
})


function pesquisa() {

    let span = document.querySelector("#btnpesquisa>span")

    if(span.textContent == "close") {
        window.location.reload()
    } else if(input.value == "") {
        window.location.reload()
    } else {
        let pesquisa = input.value.toLowerCase();
        let pokeAux =  [];
    
        if(pesquisa != "") {
    
            for(let nome of pokemons) {
                if(nome["name"].match(pesquisa) || nome["id"].toString().match(pesquisa)) {
                    pokeAux.push(nome);
                }
            }
    
            if(pokeAux.length == 0) {
                datalist.style.display = "block";
                setTimeout(() => {
                    datalist.style.display = "none";
                }, 1500);
                
            } else {
    
                document.querySelector(".container").innerHTML = "";
    
                for(let pokemon of pokeAux) {
                    montacard(pokemon);
                }
            }
    
        }
        span.textContent = "search"
    }
}

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {

    // Get the button:
    let btn = document.getElementById("btntop");

    if (document.body.scrollTop > 2500 || document. documentElement.scrollTop > 2500) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
}

document.querySelector("#btntop").addEventListener("click", topFunction)

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    
}

document.querySelector(".dropdown").addEventListener("click", openDropdown)

function openDropdown() {
    let dropdown = document.querySelector('.dropdown-content')

    if(dropdown.style.display == "none") {
        dropdown.style.display = "block"
    } else {
        dropdown.style.display = "none"
    }
}

let items = document.querySelectorAll(".dropdown-item")
items.forEach(item => {
    item.addEventListener("click", ordenar)
})

function ordenar(e) {
    document.querySelector('.dropdown-button > span').innerHTML = e.target.innerHTML
    let ordem = e.target.dataset.ordem
    let container = document.querySelector('.container')

    container.innerText = ""

    if(ordem == "ncima") {
        let reverse = pokemons.toReversed()
        reverse.forEach(pokemon => {
            montacard(pokemon)
        });
    } else if(ordem == "nbaixo") {
        pokemons.forEach(pokemon => {
            montacard(pokemon)
        });
    } else {
        let nomes = []
        for(let pokemon of pokemons) {
            nomes.push(pokemon["name"])
        }
        let sorted = nomes.toSorted()
        let pokemonsAux = []

        if(ordem == "acima") sorted.reverse()

        for(let i=0; i<=151;i++) {
            if(sorted[i] == undefined) break;
            for(let j=0; j<=151;j++) {
                if(pokemons[j]["name"] == sorted[i]) {
                    pokemonsAux.push(pokemons[j])
                    break
                }
            }
        }

        pokemonsAux.forEach(pokemon => {
            montacard(pokemon)
        })
    }
}