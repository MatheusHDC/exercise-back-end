class Data {
  private _dia: number;
  private _mes: number;
  private _ano: number;

  constructor(data: string) {
    const regex = /(\d{2})[-.\/](\d{2})[-.\/](\d{4})/;

    if (regex.test(data)) data = '01/01/1900';

    let [dia, mes, ano] = data.split('/');

    if (
      +dia < 1 || +dia > 31
      || +mes < 1 || +mes > 12
      || +ano < 1000
    ) dia = '01', mes = '01', ano = '1900';

    this._dia = +dia;
    this._mes = +mes;
    this._ano = +ano;
  }

  get mesName() {
    const meses = [
      "Janeiro", "Fevereiro", "Março", "Abril",
      "Maio", "Junho", "Julho", "Agosto",
      "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    return meses[this._mes - 1];
  };

  get isLeapano() {
    if ((this._ano % 4 === 0 && this._ano % 100 !== 0) || this._ano % 400 === 0) {
      return true;
    } else {
      return false;
    }
  }

  get ano() { return this._ano };
  get dia() { return this._dia };
  get mes() { return this._mes };

  compare(p: Data) {
    const tData = +('' + this._ano + this._mes + this._dia);
    const pData = +('' + p.ano + p.mes + p.dia);

    if (tData === pData) return 0;
    if (tData > pData) return 1;
    return -1
  }

  format(formatting: string): string {
    const conditions: boolean[] = [
      (!formatting.match(/a{2,4}/g)), // verifica se possui o ano na formatação
      (!formatting.match(/m{2}/g) && !formatting.match(/M{1}/g)), // verifica se tem o mês na formatação
      (!formatting.match(/d{2}/g)), // verifica se tem o dia na formatação
    ];

    if (conditions.every((cond) => cond)) {
      throw new Error(`O formato passado é inválido: ${formatting}`);
    }

    const dia = this.dia > 9 ? this.dia.toString() : `0${this.dia.toString()}`;
    const mes = this.mes > 9
      ? this.mes.toString()
      : `0${this.mes.toString()}`;

    const ano = this.ano.toString();

    const dateFormatting = formatting
      .replace('dd', dia).replace('mm', mes)
      .replace('M', this.mesName).replace('aaaa', ano)
      .replace('aa', ano.substr(-2));

    return dateFormatting;
  }
}