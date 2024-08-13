import { Controller, Get, Post, Param, Body, Patch } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { Pedido, Produto } from './pedido.entity';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Get()
  listarPedidos(): Pedido[] {
    return this.pedidosService.listarPedidos();
  }

  @Get('status/:fechado')
  listarPedidosPorStatus(@Param('fechado') fechado: string): Pedido[] {
    return this.pedidosService.listarPedidosPorStatus(fechado === 'true');
  }

  @Post()
  iniciarPedido(): Pedido {
    return this.pedidosService.iniciarPedido();
  }

  @Post(':id/produtos')
  adicionarProduto(@Param('id') pedidoId: number, @Body() produto: Produto): void {
    this.pedidosService.adicionarProduto(pedidoId, produto);
  }

  @Patch(':pedidoId/produtos/:produtoId')
  removerProduto(@Param('pedidoId') pedidoId: number, @Param('produtoId') produtoId: number): void {
    this.pedidosService.removerProduto(pedidoId, produtoId);
  }

  @Patch(':id/fechar')
  fecharPedido(@Param('id') pedidoId: number): void {
    this.pedidosService.fecharPedido(pedidoId);
  }
}
