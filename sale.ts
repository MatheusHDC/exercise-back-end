class PessoaCliente {
  private _nome: string;

  constructor(n: string) {
    this._nome = n;
  }
}

class Pedido {
  private _cliente: PessoaCliente;
  private _items: Item[];
  private _desconto?: number;

  constructor(c: PessoaCliente, i: Item[], d?: number) {
    this._cliente = c;
    this._items = i;
    this._desconto = d;
  }

  get total() {
    return this._items.reduce((prev, item) => prev + item.preco, 0);
  }

  get totalComDesconto() {
    if (!this._desconto) return;
    const valorDoDesconto = this.total * this._desconto;
    return this.total - valorDoDesconto;
  }
}

class Item {
  private _nomeDoPedido: string;
  private _preco: number;

  constructor(n: string, p: number) {
    this._nomeDoPedido = n;
    this._preco = p;
  }

  get preco() {
    return this._preco;
  }
}