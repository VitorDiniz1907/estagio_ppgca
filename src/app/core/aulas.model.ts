export type TipoModelo = 'contexto' | 'interacao' | 'estrutura' | 'comportamento';

export interface ItemRoteiro {
  slug: string;
  titulo: string;
  duracaoMin: number;
  tipo: TipoModelo;
  secaoSommerville: string;
  objetivo?: string;
  conceitos?: string[];
  aplicacao?: string;
  diagramaCasoDeUso?: DadosCasoDeUso;
  diagramaSequencia?: DadosSequencia;
  diagramaContexto?: DadosContexto;
  diagramaPerspectivas?: DadosPerspectivas;
}

export interface Aula {
  id: number;
  titulo: string;
  topicos: ItemRoteiro[];
}

export interface DadosCasoDeUso {
  sistema: string;
  atores: { id: string; nome: string; lado: 'esq' | 'dir' }[];
  casos: { id: string; nome: string }[];
  associacoes: { ator: string; caso: string }[];
  // a seta vai de "de" para "para", como na notação UML
  relacoes?: { de: string; para: string; tipo: 'include' | 'extend' }[];
}

export interface MensagemSeq {
  de: string;
  para: string;
  texto: string;
  retorno?: boolean; // seta pontilhada (resposta)
}

export interface FragmentoAlt {
  // primeiro item = condição do "se", os seguintes = "senão"
  alt: { condicao: string; mensagens: MensagemSeq[] }[];
}

export interface DadosSequencia {
  titulo: string;
  participantes: { id: string; nome: string; tipo?: 'ator' | 'objeto' }[];
  passos: (MensagemSeq | FragmentoAlt)[];
}

export interface DadosContexto {
  sistema: string;
  vizinhos: {
    id: string;
    nome: string;
    lado: 'esq' | 'dir';
    fora?: boolean; // desenhado tracejado, sem ligações
    fluxos: { sentido: 'entra' | 'sai'; texto: string }[];
  }[];
}

export interface DadosPerspectivas {
  sistema: string;
  perspectivas: { tipo: TipoModelo; pergunta: string; diagrama: string }[];
}