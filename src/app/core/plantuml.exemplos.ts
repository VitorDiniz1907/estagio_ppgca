export const SEQUENCIA_BIBLIOTECA = String.raw`@startuml
hide footbox

skinparam shadowing false
skinparam defaultFontName SansSerif
skinparam roundCorner 14
skinparam sequenceMessageAlign center

skinparam sequence {
  ArrowThickness 1.5
  LifeLineBorderThickness 1.5
  ParticipantBorderThickness 1.5
  ParticipantFontStyle bold
}

participant "Bibliotecário" as Bib
participant "Sistema" as Sis
participant "Cadastro acadêmico" as Cad
participant "Financeiro" as Fin

Bib -> Sis: Informa aluno e exemplar
Sis -> Cad: Valida vínculo
Cad -->> Sis: Vínculo ativo
Sis -> Fin: Consulta multas
Fin -->> Sis: Situação

alt há multa pendente
    Sis -->> Bib: Empréstimo recusado
else senão
    Sis -> Sis: Registra empréstimo
    Sis -->> Bib: Empréstimo confirmado
end

@enduml`;