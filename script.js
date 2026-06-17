
// Lista de perguntas baseadas fielmente no texto do site
const perguntas = [
    {
        texto: "O campo e a cidade são totalmente independentes e prosperam sozinhos.",
        resposta: false, // Falso, pois o texto diz que "Nenhum dos dois lados prospera sozinho"
        explicacao: "Incorreto! O texto afirma que nenhum dos lados prospera sozinho, existindo uma interdependência entre eles."
    },
    {
        texto: "O campo garante a segurança alimentar e a sustentabilidade ambiental que abastecem as metrópoles.",
        resposta: true, // Verdadeiro
        explicacao: "Exato! É o campo que produz os alimentos e cuida do manejo sustentável da terra para abastecer as cidades."
    },
    {
        texto: "A cidade contribui desenvolvendo soluções tecnológicas, logística e inovação para o interior.",
        resposta: true, // Verdadeiro
        explicacao: "Perfeito! A cidade impulsiona o campo fornecendo tecnologia de ponta, inteligência de dados e maquinários."
    },
    {
        texto: "O uso de drones, sensores inteligentes (IoT) e automação são tecnologias que transformam o dia a dia rural.",
        resposta: true, // Verdadeiro
        explicacao: "Correto! Essas são as inovações urbanas aplicadas diretamente na produção de alimentos do campo."
    }
];

let indicePerguntaAtual = 0;
let pontuacao = 0;

// Elementos do HTML que o JavaScript vai controlar
const textoPerguntaElement = document.getElementById("texto-pergunta");
const feedbackElement = document.getElementById("feedback");
const containerQuizElement = document.getElementById("container-quiz");
const resultadoFinalElement = document.getElementById("resultado-final");
const pontuacaoTextoElement = document.getElementById("pontuacao-texto");

// Função para iniciar ou atualizar a pergunta na tela
function carregarPergunta() {
    if (indicePerguntaAtual < perguntas.length) {
        // Mostra a pergunta atual
        textoPerguntaElement.textContent = `${indicePerguntaAtual + 1}. ${perguntas[indicePerguntaAtual].texto}`;
        feedbackElement.className = "escondido"; // Esconde o feedback da pergunta anterior
        feedbackElement.textContent = "";
    } else {
        // Se acabarem as perguntas, mostra o resultado final
        mostrarResultadoFinal();
    }
}

// Função que verifica se o usuário clicou na resposta certa
function verificarResposta(respostaUsuario) {
    const perguntaAtual = perguntas[indicePerguntaAtual];
    
    // Impede cliques duplos enquanto exibe o feedback
    feedbackElement.classList.remove("escondido");
    
    if (respostaUsuario === perguntaAtual.resposta) {
        pontuacao++;
        feedbackElement.textContent = "✅ " + perguntaAtual.explicacao;
        feedbackElement.className = "feedback-correto";
    } else {
        feedbackElement.textContent = "❌ " + perguntaAtual.explicacao;
        feedbackElement.className = "feedback-errado";
    }

    // Espera 3.5 segundos para o usuário ler a explicação e passa para a próxima pergunta
    indicePerguntaAtual++;
    setTimeout(carregarPergunta, 3500);
}

// Mostra a tela de fim de jogo
function mostrarResultadoFinal() {
    containerQuizElement.style.display = "none";
    resultadoFinalElement.classList.remove("escondido");
    pontuacaoTextoElement.textContent = `Você acertou ${pontuacao} de ${perguntas.length} questões!`;
}

// Função para resetar o quiz se o usuário quiser jogar de novo
function reiniciarQuiz() {
    indicePerguntaAtual = 0;
    pontuacao = 0;
    containerQuizElement.style.display = "block";
    resultadoFinalElement.classList.add("escondido");
    carregarPergunta();
}

// Inicializa o quiz assim que a página carrega
window.onload = carregarPergunta;
