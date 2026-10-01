import { Aula } from './aulas.model';
import { SEQUENCIA_BIBLIOTECA } from './plantuml.exemplos';

export const AULAS: Aula[] = [
  {
    id: 8,
    titulo: 'Do contexto às interações',
    topicos: [
      {
        slug: 'por-que-modelar',
        titulo: 'Por que modelar?',
        duracaoMin: 10,
        tipo: 'contexto',
        secaoSommerville: '5',
        objetivo:
          'Entender para que servem os modelos e por que um único diagrama nunca conta a história inteira do sistema.',
        conceitos: [
          'Modelo é uma abstração: deixa de fora os detalhes que não importam para a pergunta que se quer responder.',
          'Modelos servem para conversar com o cliente, discutir alternativas de projeto e documentar decisões.',
          'Cada perspectiva responde a uma pergunta: contexto (o que está dentro e fora), interação (quem faz o quê), estrutura (do que é feito) e comportamento (como reage).',
        ],
        aplicacao:
          'Vamos modelar o sistema de empréstimos da biblioteca do campus quatro vezes, uma por perspectiva.',
        
        diagramaPerspectivas: {
        sistema: 'Sistema de empréstimos da biblioteca',
        perspectivas: [
          { tipo: 'contexto', pergunta: 'O que está dentro do sistema e o que está fora dele?', diagrama: 'Diagrama de contexto' },
          { tipo: 'interacao', pergunta: 'Quem usa o sistema e em que ordem as coisas acontecem?', diagrama: 'Casos de uso e sequência' },
          { tipo: 'estrutura', pergunta: 'Quais são as coisas do sistema e como elas se relacionam?', diagrama: 'Diagrama de classes' },
          { tipo: 'comportamento', pergunta: 'Como o sistema reage a dados e eventos?', diagrama: 'Fluxo de dados e estados' },
        ],
      },
      
      },
      {
        slug: 'modelos-de-contexto',
        titulo: 'Modelos de contexto',
        duracaoMin: 15,
        tipo: 'contexto',
        secaoSommerville: '5.1',
        objetivo:
          'Definir a fronteira do sistema e mostrar com quais outros sistemas e processos ele se conecta.',
        conceitos: [
          'A fronteira nem sempre é técnica: custo, prazo e decisões da organização também definem o que entra no sistema.',
          'O diagrama de contexto mostra os sistemas vizinhos, mas não detalha como eles se comunicam entre si.',
          'Um modelo de processo de negócio complementa o contexto, mostrando em quais atividades o sistema é usado.',
        ],
        aplicacao:
          'O sistema de empréstimos conversa com o cadastro acadêmico (validar alunos) e com o setor financeiro (cobrar multas). O catálogo de outras bibliotecas fica fora da fronteira.',
      
        diagramaContexto: {
        sistema: 'Sistema de empréstimos',
        vizinhos: [
          {
            id: 'cad', nome: 'Cadastro acadêmico', lado: 'esq',
            fluxos: [
              { sentido: 'sai', texto: 'Consulta de vínculo' },
              { sentido: 'entra', texto: 'Dados do aluno' },
            ],
          },
          {
            id: 'fin', nome: 'Setor financeiro', lado: 'esq',
            fluxos: [
              { sentido: 'sai', texto: 'Multas a cobrar' },
              { sentido: 'entra', texto: 'Confirmação de pagamento' },
            ],
          },
          {
            id: 'bib', nome: 'Bibliotecário', lado: 'dir',
            fluxos: [
              { sentido: 'entra', texto: 'Empréstimos e devoluções' },
              { sentido: 'sai', texto: 'Comprovantes' },
            ],
          },
          {
            id: 'ext', nome: 'Catálogo de outras bibliotecas', lado: 'dir',
            fora: true, fluxos: [],
          },
        ],
      },
      },
      {
        slug: 'casos-de-uso',
        titulo: 'Casos de uso',
        duracaoMin: 15,
        tipo: 'interacao',
        secaoSommerville: '5.2',
        objetivo:
          'Descrever, do ponto de vista de quem usa, o que o sistema oferece.',
        conceitos: [
          'Ator é quem interage com o sistema: uma pessoa ou outro sistema.',
          'Cada caso de uso é uma tarefa com valor para o ator, como emprestar um livro ou reservar um exemplar.',
          'O diagrama dá a visão geral.',
        ],
        aplicacao:
          'Atores: aluno, bibliotecário e sistema acadêmico. Casos de uso: consultar acervo, emprestar, devolver, reservar e cobrar multa.',
        
        diagramaCasoDeUso: {
        sistema: 'Sistema de empréstimos',
        atores: [
          { id: 'aluno', nome: 'Aluno', lado: 'esq' },
          { id: 'acad', nome: 'Sistema acadêmico', lado: 'dir' },
          { id: 'bib', nome: 'Bibliotecário', lado: 'dir' },
        ],
        casos: [
          { id: 'consultar', nome: 'Consultar acervo' },
          { id: 'reservar', nome: 'Reservar exemplar' },
          { id: 'emprestar', nome: 'Emprestar livro' },
          { id: 'devolver', nome: 'Devolver livro' },
          { id: 'multa', nome: 'Cobrar multa' },
        ],
        associacoes: [
          { ator: 'aluno', caso: 'consultar' },
          { ator: 'aluno', caso: 'reservar' },
          { ator: 'acad', caso: 'emprestar' },
          { ator: 'bib', caso: 'emprestar' },
          { ator: 'bib', caso: 'devolver' },
        ],
        relacoes: [{ de: 'multa', para: 'devolver', tipo: 'extend' }],
        },
      },
      {
        slug: 'diagramas-de-sequencia',
        titulo: 'Diagramas de sequência',
        duracaoMin: 15,
        tipo: 'interacao',
        secaoSommerville: '5.2',
        objetivo:
          'Mostrar a ordem das mensagens trocadas entre atores e objetos em um cenário.',
        conceitos: [
          'Os participantes ficam no topo, cada um com uma linha de vida vertical, e o tempo corre de cima para baixo.',
          'Setas são mensagens, e setas de retorno mostram as respostas.',
          'Fragmentos como alt e loop representam decisões e repetições dentro do cenário.',
        ],
        aplicacao:
          'Cenário "emprestar livro": o bibliotecário informa aluno e exemplar, o sistema consulta o cadastro, verifica pendências e registra o empréstimo. Se houver multa, o pedido é recusado (fragmento alt).',
        
        diagramaSequencia: {
        titulo: 'Emprestar livro',
        participantes: [
          { id: 'bib', nome: 'Bibliotecário', tipo: 'ator' },
          { id: 'sis', nome: 'Sistema' },
          { id: 'cad', nome: 'Cadastro acadêmico' },
          { id: 'fin', nome: 'Financeiro' },
        ],
        passos: [
          { de: 'bib', para: 'sis', texto: 'Informa aluno e exemplar' },
          { de: 'sis', para: 'cad', texto: 'Valida vínculo' },
          { de: 'cad', para: 'sis', texto: 'Vínculo ativo', retorno: true },
          { de: 'sis', para: 'fin', texto: 'Consulta multas' },
          { de: 'fin', para: 'sis', texto: 'Situação', retorno: true },
          {
            alt: [
              {
                condicao: 'há multa pendente',
                mensagens: [
                  { de: 'sis', para: 'bib', texto: 'Empréstimo recusado', retorno: true },
                ],
              },
              {
                condicao: 'senão',
                mensagens: [
                  { de: 'sis', para: 'sis', texto: 'Registra empréstimo' },
                  { de: 'sis', para: 'bib', texto: 'Empréstimo confirmado', retorno: true },
                ],
              },
            ],
          },
        ],
      },
      exemploCodigo: {
      descricao: 'Exemplo de Diagrama de sequência gerado por código',
      url: 'https://plantuml.com/',
      codigo: SEQUENCIA_BIBLIOTECA,
      },
      
      },
    ],
  },
];