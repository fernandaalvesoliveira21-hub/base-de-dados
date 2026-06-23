// Banco de dados das perguntas do Quiz (Foco nos conceitos centrais)
const perguntas = [
    {
        texto: "O êxodo rural é o movimento de pessoas da cidade para o campo.",
        respostaCorreta: false,
        feedback: "O êxodo rural é a saída em massa do campo em direção às cidades."
    },
    {
        texto: "A agricultura familiar produz grande parte dos alimentos frescos que chegam às nossas mesas.",
        respostaCorreta: true,
        feedback: "A agricultura familiar é a base do abastecimento do mercado interno de alimentos."
    },
    {
        texto: "A tecnologia urbana, como drones e IoT (sensores), ajuda a otimizar a produção no campo.",
        respostaCorreta: true,
        feedback: "A inovação vinda dos centros urbanos moderniza e traz precisão para as práticas agrícolas."
    }
];

let indiceAtual = 0;
let pontuacao = 0;
let aguardandoProxima = false;

// Cache de elementos do DOM
const textoPergunta = document.getElementById("texto-pergunta");
const feedbackBox = document.getElementById("feedback");
const containerQuiz = document.getElementById("container-quiz");
const resultadoFinal = document.getElementById("resultado-final");
const pontuacaoTexto = document.getElementById("pontuacao-texto");
const botoesResposta = document.querySelectorAll(".botoes-quiz .btn-quiz");

function carregarPergunta() {
    aguardandoProxima = false;
    
    feedbackBox.classList.add("escondido");
    feedbackBox.className = ""; 
    feedbackBox.innerText = "";

    botoesResposta.forEach(btn => btn.removeAttribute("disabled"));

    if (indiceAtual < perguntas.length) {
        textoPergunta.innerText = perguntas[indiceAtual].texto;
    } else {
        mostrarResultado();
    }
}

function verificarResposta(respostaUsuario) {
    if (aguardandoProxima) return;
    aguardandoProxima = true;

    botoesResposta.forEach(btn => btn.setAttribute("disabled", "true"));

    const pergunta = perguntas[indiceAtual];
    feedbackBox.classList.remove("escondido");

    if (respostaUsuario === pergunta.respostaCorreta) {
        pontuacao++;
        feedbackBox.innerText = `✨ Correto! ${pergunta.feedback}`;
        feedbackBox.classList.add("feedback-correto");
    } else {
        feedbackBox.innerText = `❌ Incorreto. ${pergunta.feedback}`;
        feedbackBox.classList.add("feedback-incorreto");
    }

    // Avança para a próxima pergunta após 3 segundos
    setTimeout(() => {
        indiceAtual++;
        carregarPergunta();
    }, 3000);
}

function mostrarResultado() {
    containerQuiz.classList.add("escondido");
    resultadoFinal.classList.remove("escondido");
    pontuacaoTexto.innerText = `Você acertou ${pontuacao} de ${perguntas.length} perguntas!`;
}

function reiniciarQuiz() {
    indiceAtual = 0;
    pontuacao = 0;
    resultadoFinal.classList.add("escondido");
    containerQuiz.classList.remove("escondido");
    carregarPergunta();
}

// Inicializa o quiz quando o conteúdo estiver pronto
document.addEventListener("DOMContentLoaded", carregarPergunta);
