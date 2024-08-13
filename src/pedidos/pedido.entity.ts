export class Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
}
  
export class Pedido {
    id: number;
    produtos: Produto[];
    fechado: boolean;
}
  