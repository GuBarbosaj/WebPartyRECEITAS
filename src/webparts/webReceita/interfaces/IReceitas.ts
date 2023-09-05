export interface IReceitas {
    ID?: number,
    Receita: string,
    TipoReceita: string,
    Cara: boolean,
    DataTentativa: Date,
    DataTentativaString?: string;
    Anexo?: any
}