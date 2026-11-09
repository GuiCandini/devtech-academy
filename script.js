
class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.notaFinal = notaFinal;
    }

    isAprovado() {
        return this.notaFinal >= 7;
    }

    toString() {
        return `${this.nome} - ${this.idade} anos - ` +
               `${this.curso} - Nota: ${this.notaFinal}`;
    }
}

let alunos = [];
let indiceEdicao = -1;

const formulario = document.getElementById("formAluno");
const tabela = document.getElementById("tabelaAlunos");

const campoNome = document.getElementById("nome");
const campoIdade = document.getElementById("idade");
const campoCurso = document.getElementById("curso");
const campoNota = document.getElementById("notaFinal");

const botaoCadastrar = document.getElementById("btnCadastrar");
const resultado = document.getElementById("resultadoRelatorio");

function atualizarTabela() {
    tabela.innerHTML = "";

    alunos.forEach((aluno, indice) => {
        const linha = document.createElement("tr");

        const dados = [
            aluno.nome,
            aluno.idade,
            aluno.curso,
            aluno.notaFinal,
            aluno.isAprovado() ? "Aprovado" : "Reprovado"
        ];

        dados.forEach((valor) => {
            const coluna = document.createElement("td");
            coluna.textContent = valor;
            linha.appendChild(coluna);
        });

        const colunaAcoes = document.createElement("td");

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";

        btnEditar.addEventListener("click", function() {
            editarAluno(indice);
        });

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";

        btnExcluir.addEventListener("click", function() {
            excluirAluno(indice);
        });

        colunaAcoes.appendChild(btnEditar);
        colunaAcoes.appendChild(btnExcluir);

        linha.appendChild(colunaAcoes);
        tabela.appendChild(linha);
    });
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = campoNome.value.trim();
    const idade = Number(campoIdade.value);
    const curso = campoCurso.value;
    const notaFinal = Number(campoNota.value);

    if (
        nome === "" ||
        !Number.isInteger(idade) ||
        idade <= 0 ||
        !Number.isFinite(notaFinal) ||
        notaFinal < 0 ||
        notaFinal > 10
    ) {
        alert("Preencha os dados corretamente!");
        return;
    }

    const aluno = new Aluno(
        nome, idade, curso, notaFinal
    );

    if (indiceEdicao === -1) {
        alunos.push(aluno);
        alert("Aluno cadastrado com sucesso!");
    } else {
        alunos[indiceEdicao] = aluno;
        indiceEdicao = -1;

        botaoCadastrar.textContent = "Cadastrar";
        alert("Aluno editado com sucesso!");
    }

    formulario.reset();
    atualizarTabela();
});

function editarAluno(indice) {
    const aluno = alunos[indice];

    campoNome.value = aluno.nome;
    campoIdade.value = aluno.idade;
    campoCurso.value = aluno.curso;
    campoNota.value = aluno.notaFinal;

    indiceEdicao = indice;
    botaoCadastrar.textContent = "Salvar Alterações";

    alert("Altere os dados e clique em Salvar Alterações.");
}

function excluirAluno(indice) {
    const aluno = alunos[indice];

    if (confirm(`Deseja excluir ${aluno.nome}?`)) {
        alunos.splice(indice, 1);

        indiceEdicao = -1;
        formulario.reset();
        botaoCadastrar.textContent = "Cadastrar";

        atualizarTabela();
        alert("Aluno excluído com sucesso!");
    }
}

document.getElementById("btnAprovados")
    .addEventListener("click", function() {

        const aprovados = alunos.filter(
            aluno => aluno.isAprovado()
        );

        if (aprovados.length === 0) {
            resultado.textContent =
                "Nenhum aluno aprovado.";
            return;
        }

        const nomes = aprovados.map(
            aluno => aluno.nome
        );

        resultado.textContent =
            "Alunos aprovados: " + nomes.join(", ");
    });

document.getElementById("btnMediaNotas")
    .addEventListener("click", function() {

        if (alunos.length === 0) {
            resultado.textContent =
                "Nenhum aluno cadastrado.";
            return;
        }

        const soma = alunos.reduce(
            (total, aluno) => total + aluno.notaFinal,
            0
        );

        const media = soma / alunos.length;

        resultado.textContent =
            "Média das notas: " + media.toFixed(2);
    });

document.getElementById("btnMediaIdades")
    .addEventListener("click", function() {

        if (alunos.length === 0) {
            resultado.textContent =
                "Nenhum aluno cadastrado.";
            return;
        }

        const soma = alunos.reduce(
            (total, aluno) => total + aluno.idade,
            0
        );

        const media = soma / alunos.length;

        resultado.textContent =
            "Média das idades: " + media.toFixed(2);
    });

document.getElementById("btnOrdem")
    .addEventListener("click", function() {

        const nomes = alunos
            .map(aluno => aluno.nome)
            .sort((a, b) => a.localeCompare(b, "pt-BR"));

        resultado.textContent = nomes.length > 0
            ? "Ordem alfabética: " + nomes.join(", ")
            : "Nenhum aluno cadastrado.";
    });

document.getElementById("btnCursos")
    .addEventListener("click", function() {

        const quantidade = {
            JavaScript: 0,
            Python: 0,
            Java: 0
        };

        alunos.forEach(aluno => {
            quantidade[aluno.curso]++;
        });

        resultado.innerHTML = "";

        const lista = document.createElement("ul");

        Object.entries(quantidade).forEach(
            ([curso, total]) => {
                const item = document.createElement("li");
                item.textContent = `${curso}: ${total} aluno(s)`;
                lista.appendChild(item);
            }
        );

        resultado.appendChild(lista);
    });
