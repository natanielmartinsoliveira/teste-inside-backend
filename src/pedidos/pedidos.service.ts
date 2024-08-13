import { Injectable, NotFoundException } from '@nestjs/common';
import { Pedido, Produto } from './pedido.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class PedidosService {
  private pedidos: Pedido[] = [];
  private nextId = 1;

  listarPedidos(): Pedido[] {
    return this.pedidos;
  }

  listarPedidosPorStatus(fechado: boolean): Pedido[] {
    return this.pedidos.filter(pedido => pedido.fechado == fechado);
  }

  iniciarPedido(): Pedido {
    const novoPedido: Pedido = { id: this.nextId++, produtos: [], fechado: false };
    this.pedidos.push(novoPedido);
    return novoPedido;
  }

  adicionarProduto(pedidoId: number, produto: Produto): void {
    if (produto.descricao.length > 50) {
      throw new Error('A descrição do produto não pode exceder 50 caracteres.');
    }

    const pedido = this.pedidos.find(p => p.id === Number(pedidoId));
    if (pedido && !pedido.fechado) {
      pedido.produtos.push(produto);
    } else {
      throw new NotFoundException('Pedido não encontrado ou já está fechado.');
    }
  }

  removerProduto(pedidoId: number, produtoId: number): void {
    const pedido = this.pedidos.find(p => p.id === Number(pedidoId));
    if (pedido && !pedido.fechado) {
      pedido.produtos = pedido.produtos.filter(p => p.id !== Number(produtoId));
    } else {
      throw new NotFoundException('Pedido não encontrado ou já está fechado.');
    }
  }

  fecharPedido(pedidoId: number): void {
    const pedido = this.pedidos.find(p => p.id === Number(pedidoId));
    if (pedido && pedido.produtos.length > 0) {
      pedido.fechado = true;
    } else {
      throw new Error('O pedido deve conter ao menos um produto para ser fechado.');
    }
  }
}
