let frases = ["ola meu nome e diego","compre uma banana","leia o livro recomendado"];
let objetivo = document.getElementById("txtObjetivo");
let campo = document.getElementById("txtCampo");
let resultado = document.getElementById("resultado");
let medidor = document.getElementById("medidor");
let body = document.getElementsByTagName("body")[0];

let inicio;
let fim;
let terminou = false;

var cronometro=3;
var cronInicio;
const url = "https://type.fit/api/quotes";
const buscarFrases = new  Promise(async (resolve,reject) => {
    const res = await fetch(url);
    resolve(res.json());
});

function checar() {
    var texto = objetivo.innerText;
    var escrevendo =  campo.value;
    if(texto.substring(0,escrevendo.length) == escrevendo){
        campo.style.color = "black";
        var novoMedidor = (100*(texto.length-(texto.length-escrevendo.length)))/texto.length;
        medidor.style.width = novoMedidor.toString()+"%";
    }
    else{
        campo.style.color = "red";
        console.log('errado');
    }
    if(texto == escrevendo && terminou == false){
        campo.disabled = true;
        campo.style.display = "none";
        terminou = true;
        fim = new Date();
        let diferenca = fim-inicio;
        diferenca /= 1000;
        
        var resu = texto.length/diferenca;
                
        var tempoPlacar = document.createElement("p");
        var tempoRelativo = document.createElement("p");
        var recordePlacar = document.createElement("p");
        var recorde = parseFloat(localStorage.getItem("recorde")) || resu-1;
                
        if(resu > recorde){
            recorde = resu;
            localStorage.setItem("recorde",recorde);
            console.log(recorde);
        }
        tempoPlacar.innerHTML = "Tempo total: " + diferenca.toFixed(3) + " segundos";
        tempoRelativo.innerHTML = "velocidade: " + resu.toFixed(3) + " L/S";
        recordePlacar.innerHTML = "recorde de veloscidade: " + recorde.toFixed(3) + " L/S";
        resultado.appendChild(tempoPlacar);
        resultado.appendChild(tempoRelativo);
        resultado.appendChild(recordePlacar);
    }
}

function novaFrase() {
    medidor.style.width = "0";
    campo.style.display = "block";
    terminou = false;
    campo.value = "";
    campo.disabled = true;
    resultado.innerHTML="";
    objetivo.innerText = frases[Math.floor(Math.random()*frases.length)].text;
    cronometro=3;
    clearInterval(cronInicio)
    cronInicio = setInterval(inicializando,1000);
}

function inicializando() {
    if(cronometro==0) {
        campo.disabled = false;
        campo.focus();
        resultado.innerHTML = '';
        inicio = new Date();
        clearInterval(cronInicio)
    }
    else{
        resultado.innerHTML = cronometro;
        cronometro--;
    }
}

async function carregando(){
    frases = await buscarFrases
    .then(res => {
        return res
    });

    await novaFrase();
}
body.addEventListener("load",carregando());