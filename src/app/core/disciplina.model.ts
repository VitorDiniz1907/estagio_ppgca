export interface Disciplina {
  nome: string;
  sigla?: string;        // se omitida, é derivada das iniciais
  curso: string;
  periodo: string;
  matiz: number;         // 0 a 360 (verde-azulado ≈ 160)
  imagemCapa?: string;   // opcional: substitui o gradiente gerado
}

export function siglaDe(nome: string): string {
  const ignorar = new Set(['de', 'da', 'do', 'das', 'dos', 'e']);
  return nome
    .split(/\s+/)
    .filter(p => !ignorar.has(p.toLowerCase()))
    .slice(0, 2)
    .map(p => p[0])
    .join('')
    .toUpperCase();
}