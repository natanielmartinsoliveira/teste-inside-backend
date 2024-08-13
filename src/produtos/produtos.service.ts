import { Injectable } from '@nestjs/common';
import { Produto } from './produto.entity';

@Injectable()
export class ProdutosService {
  private produtos: Produto[] = [];
  private nextId = 1;

  listarProdutos(): Produto[] {
    return this.produtos;
  }

  adicionarProduto(nome: string, descricao: string, preco: number): Produto {
    const novoProduto: Produto = { id: this.nextId++, nome, descricao, preco };
    this.produtos.push(novoProduto);
    return novoProduto;
  }
}
