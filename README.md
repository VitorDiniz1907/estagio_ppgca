# Roteiro de Aula: Modelagem de Software e Sistemas

Aplicação web em **Angular** que apresenta, em uma única tela, o roteiro de duas aulas sobre **modelagem de software e sistemas** (modelagem conceitual, estrutural e comportamental).

O conteúdo teórico tem como referência o **Capítulo 5 – Modelagem de Sistemas** do livro *Engenharia de Software*, de Ian Sommerville. Os textos foram escritos com palavras próprias e os diagramas foram desenhados para este projeto, com um estudo de caso único (o sistema de empréstimos de uma biblioteca de campus).

---

## Sumário

1. [Resumo do que foi feito](#resumo-do-que-foi-feito)
2. [Conteúdo das aulas](#conteúdo-das-aulas)
3. [Como executar](#como-executar)
4. [Estrutura de arquivos](#estrutura-de-arquivos)
5. [Como o projeto funciona](#como-o-projeto-funciona)
6. [Como editar o conteúdo](#como-editar-o-conteúdo)
7. [Decisões de projeto](#decisões-de-projeto)
8. [Pendências e próximos passos](#pendências-e-próximos-passos)

---

## Resumo do que foi feito

- **Tela inicial em formato de roteiro**: cada tópico da aula é um cartão, exibido um por linha, já com o conteúdo visível (objetivo, conceitos e, quando existe, um diagrama).
- **Capa da disciplina** gerada por código, com gradiente, selo com a sigla e nome do curso. A paleta inteira deriva de um único parâmetro de cor (`matiz`), então trocar a cor da disciplina é mudar um número.
- **Conteúdo separado do código**: aulas, tópicos, textos e diagramas ficam em arquivos de dados (`aulas.data.ts` e `disciplinas.data.ts`). Editar a aula não exige mexer nos componentes.
- **Diagramas gerados a partir de dados**, em SVG, sem bibliotecas externas:
  - diagrama de contexto;
  - diagrama de casos de uso;
  - diagrama de sequência (com mensagens de retorno, autochamada e fragmento `alt`);
  - quadro "um sistema, quatro perspectivas".
- **Acessibilidade básica**: foco visível para teclado, rótulos descritivos nos diagramas (`role="img"` e `aria-label`) e respeito a `prefers-reduced-motion`.

## Conteúdo das aulas

O roteiro está dividido em duas aulas, alinhadas às seções do Capítulo 5 (confira a numeração na edição do livro que você usa, pois ela muda entre edições):

| Aula | Tópico | Perspectiva | Seção no livro |
|---|---|---|---|
| 1. Do contexto às interações | Por que modelar? | Contexto | 5 |
| | Modelos de contexto | Contexto | 5.1 |
| | Casos de uso | Interação | 5.2 |
| | Diagramas de sequência | Interação | 5.2 |
| 2. Estrutura e comportamento | Diagramas de classes | Estrutura | 5.3 |
| | Generalização e agregação | Estrutura | 5.3 |
| | Dados e eventos (estados) | Comportamento | 5.4 |
| | Engenharia dirigida a modelos | Comportamento | 5.5 |

Estado atual dos diagramas: **contexto**, **casos de uso**, **sequência** e **perspectivas** estão prontos. **Classes**, **estados** e **fluxo de dados** ainda não têm diagrama (ver [Pendências](#pendências-e-próximos-passos)).

## Como executar

**Pré-requisitos:** Node.js compatível com a versão do Angular usada no projeto (consulte o `package.json`) e npm.

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm start        # equivale a: ng serve

# 3. Abrir no navegador
# http://localhost:4200
```

Para gerar a versão de produção:

```bash
npm run build    # equivale a: ng build
```

> As fontes (Bricolage Grotesque e Public Sans) são carregadas do Google Fonts. Sem internet, a página continua funcionando com uma fonte reserva do sistema.

## Estrutura de arquivos

```text
aulas/
├── public/                          # Arquivos estáticos (favicon, imagens próprias)
├── src/
│   ├── index.html                   # Página base; inclui o carregamento das fontes
│   ├── main.ts                      # Ponto de entrada (navegador)
│   ├── main.server.ts               # Ponto de entrada (renderização no servidor)
│   ├── server.ts                    # Servidor SSR
│   ├── styles.scss                  # Estilos globais e variáveis de cor/tipografia
│   └── app/
│       ├── app.ts                   # Componente raiz
│       ├── app.html                 # Capa da disciplina + <router-outlet>
│       ├── app.scss
│       ├── app.config.ts            # Configuração da aplicação
│       ├── app.routes.ts            # Rotas do navegador
│       ├── app.routes.server.ts     # Modo de renderização por rota (SSR)
│       │
│       ├── core/                    # Modelos, dados e serviços
│       │   ├── aulas.model.ts       # Tipos: Aula, ItemRoteiro, dados dos diagramas
│       │   ├── aulas.data.ts        # Conteúdo das aulas e tópicos (edite aqui)
│       │   ├── aulas.ts             # Serviço que expõe as aulas aos componentes
│       │   ├── disciplina.model.ts  # Tipo Disciplina e função que gera a sigla
│       │   └── disciplinas.data.ts  # Dados da disciplina (nome, curso, período, cor)
│       │
│       ├── components/              # Componentes reutilizáveis
│       │   ├── capa-disciplina/         # Faixa de topo com selo e gradiente
│       │   ├── diagrama-contexto/       # Diagrama de contexto (SVG)
│       │   ├── diagrama-caso-de-uso/    # Diagrama de casos de uso (SVG)
│       │   ├── diagrama-sequencia/      # Diagrama de sequência (SVG)
│       │   └── perspectivas-modelo/     # Quadro das quatro perspectivas
│       │
│       └── pages/
│           ├── roteiro/             # Tela inicial: lista de aulas e cartões
│           └── topico/              # Página de tópico individual (reservada, sem uso hoje)
│
├── angular.json                     # Configuração do Angular CLI
├── package.json                     # Dependências e scripts
└── README.md                        # Este arquivo
```

Cada componente possui, como padrão do Angular CLI, quatro arquivos: `.ts` (lógica), `.html` (template), `.scss` (estilos) e `.spec.ts` (testes).

## Como o projeto funciona

1. `disciplinas.data.ts` descreve a disciplina; `aulas.data.ts` descreve as aulas e seus tópicos.
2. `app.html` exibe a **capa** (`CapaDisciplina`) e, abaixo, o `<router-outlet>`.
3. A rota raiz (`/`) carrega o componente `Roteiro`, que percorre as aulas e desenha um **cartão por tópico**.
4. Dentro do cartão, cada campo opcional do tópico (`diagramaContexto`, `diagramaCasoDeUso`, `diagramaSequencia`, `diagramaPerspectivas`) ativa o componente de diagrama correspondente.
5. Os diagramas recebem os dados por `input()` e calculam o layout com `computed()`. O resultado é desenhado em SVG e usa as variáveis de cor definidas em `styles.scss`.

### Paleta e tipografia

As variáveis ficam em `src/styles.scss`, no bloco `:root`: `--papel`, `--superficie`, `--tinta`, `--tinta-suave`, `--linha`, `--destaque` e `--feito`. A cor da disciplina vem da variável `--matiz`, definida pela capa a partir do campo `matiz` da disciplina.

Tipografia: **Bricolage Grotesque** (títulos) e **Public Sans** (texto corrido).
<!--
## Como editar o conteúdo

### Alterar o número ou o título de uma aula

Em `src/app/core/aulas.data.ts`, edite `id` e `titulo` da aula. O número exibido no chip ("Aula N") vem do `id`, e os `id` precisam ser diferentes entre si.

### Adicionar ou editar um tópico

Dentro de `topicos` de uma aula, cada tópico segue este formato:

```ts
{
  slug: 'identificador-unico',
  titulo: 'Título exibido no cartão',
  duracaoMin: 15,
  tipo: 'contexto',            // 'contexto' | 'interacao' | 'estrutura' | 'comportamento'
  secaoSommerville: '5.1',
  objetivo: 'Uma frase com o objetivo do tópico.',
  conceitos: [
    'Primeiro conceito, com suas palavras.',
    'Segundo conceito.',
  ],
  // opcional: um dos diagramas abaixo
}
```

Os campos `objetivo`, `conceitos` e os diagramas são opcionais. Os campos `duracaoMin`, `secaoSommerville` e `aplicacao` continuam no modelo, mas a tela atual não os exibe.

### Adicionar um diagrama a um tópico

Basta preencher o campo correspondente no tópico:

| Campo | Componente | Estrutura dos dados |
|---|---|---|
| `diagramaContexto` | `DiagramaContexto` | `sistema` e `vizinhos` (com `lado`, `fora` e `fluxos`) |
| `diagramaCasoDeUso` | `DiagramaCasoDeUso` | `sistema`, `atores`, `casos`, `associacoes`, `relacoes` |
| `diagramaSequencia` | `DiagramaSequencia` | `titulo`, `participantes`, `passos` (mensagens e blocos `alt`) |
| `diagramaPerspectivas` | `PerspectivasModelo` | `sistema` e `perspectivas` |

Os tipos completos estão em `src/app/core/aulas.model.ts`, e os exemplos prontos estão em `aulas.data.ts`.

### Trocar a disciplina ou a cor

Em `src/app/core/disciplinas.data.ts`, altere `nome`, `curso`, `periodo` e `matiz` (0 a 360). Exemplos: `160` é verde-azulado, `220` é azul e `20` é terracota. A sigla do selo é gerada automaticamente a partir do nome e pode ser fixada com o campo opcional `sigla`.

## Decisões de projeto

- **Componentes standalone e sinais (`signal`, `computed`, `input`)**: padrão das versões atuais do Angular, com menos código de configuração.
- **SVG gerado por código em vez de imagens estáticas**: o diagrama acompanha o tema, é editado mudando um texto, escala sem perder qualidade e é acessível a leitores de tela.
- **Sem bibliotecas de diagramas**: os diagramas de casos de uso, contexto e sequência são simples o bastante para serem calculados no próprio componente. Para classes e estados, o Mermaid é uma alternativa viável.
- **Conteúdo fora dos componentes**: separar dados de interface facilita revisar o material com o orientador sem risco de quebrar a tela.
- **Direitos autorais**: o livro é citado como referência (capítulo e seção), mas textos e figuras são originais deste projeto.

-->
## Referência

SOMMERVILLE, Ian. *Engenharia de Software*. Capítulo 5: Modelagem de Sistemas. Confira a edição utilizada para a numeração das seções.