# DevTech Academy — Gerenciamento de Alunos

**Aluno:** Guilherme Gomes Candini

## Sobre o Projeto

Sistema simples de gerenciamento de alunos, desenvolvido com HTML e JavaScript.

O sistema permite cadastrar, listar, editar e excluir alunos, além de gerar relatórios sobre notas, idades, alunos aprovados e cursos.

## Tecnologias Utilizadas

- HTML
- JavaScript
- Docker
- Git e GitHub

## Funcionalidades

- Cadastro, edição e exclusão de alunos (CRUD).
- Classe `Aluno` com construtor e métodos.
- Manipulação de eventos com JavaScript.
- Relatórios utilizando `filter`, `map`, `reduce`, `sort` e `forEach`.

## Como Executar

É necessário ter o **Docker Desktop** instalado e funcionando.

1. Baixe ou clone este repositório.
2. Abra o terminal na pasta do projeto.
3. Execute o comando:

```bash
docker compose up -d --build
```

4. Acesse no navegador:

http://localhost:8080

Para encerrar a aplicação:

```bash
docker compose down
```

## Observação

Os dados são armazenados temporariamente em um array JavaScript. Ao atualizar a página, os registros são perdidos, pois não existe banco de dados.

O projeto foi desenvolvido para atender aos quatro exercícios propostos no estudo de caso DevTech Academy.