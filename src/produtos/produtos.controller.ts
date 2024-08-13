import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { Produto } from './produto.entity';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  listarProdutos(): Produto[] {
    return this.produtosService.listarProdutos();
  }

  @Post()
  adicionarProduto(
    @Body('nome') nome: string,
    @Body('descricao') descricao: string,
    @Body('preco') preco: number
  ): Produto {
    return this.produtosService.adicionarProduto(nome, descricao, preco);
  }
}
