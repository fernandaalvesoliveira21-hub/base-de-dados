// Banco de dados centralizado das perguntas
const perguntas = [
    {
        texto: "O êxodo rural é o movimento de pessoas da cidade para o campo.",
        respostaCorreta: false,
        feedback: "O êxodo rural é a saída do campo em direção à cidade."
    },
    {
        texto: "A agricultura familiar produz grande parte dos alimentos que chegam às cidades.",
        respostaCorreta: true,
        feedback: "A agricultura familiar é a base do abastecimento do mercado interno."
    },
    {
        texto: "A tecnologia urbana, como drones e IoT, ajuda a otimizar a produção no campo.",
        respostaCorreta: true,
        feedback: "A inovação das cidades interliga e moderniza as práticas agrícolas."
    }
];

let indiceAtual = 0;
let pontuacao = 0;
let aguardandoProxima = false; // Flag para impedir cliques repetidos durante a transição

// Cache de elementos do DOM para melhor performance
const textoPergunta = document.getElementById("texto-pergunta");
const feedbackBox = document.getElementById("feedback");
const containerQuiz = document.getElementById("container-quiz");
const resultadoFinal = document.getElementById("resultado-final");
const pontuacaoTexto = document.getElementById("pontuacao-texto");
const botoesResposta = document.querySelectorAll(".botoes-quiz .btn-quiz");

function carregarPergunta() {
    aguardandoProxima = false;
    
    // Reseta o estado visual do feedback
    feedbackBox.classList.add("escondido");
    feedbackBox.className = ""; 
    feedbackBox.innerText = "";

    // Reativa os botões para a nova pergunta
    botoesResposta.forEach(btn => btn.removeAttribute("disabled"));

    if (indiceAtual < perguntas.length) {
        textoPergunta.innerText = perguntas[indiceAtual].texto;
    } else {
        mostrarResultado();
    }
}

function verificarResposta(respostaUsuario) {
    // Se o sistema já estiver processando a transição de pergunta, ignora novos cliques
    if (aguardandoProxima) return;
    aguardandoProxima = true;

    // Desativa os botões visualmente e funcionalmente
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

    // Transição suave após 3 segundos
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

// Inicialização segura assim que o DOM estiver pronto
document.addEventListener("DOMContentLoaded", carregarPergunta);
