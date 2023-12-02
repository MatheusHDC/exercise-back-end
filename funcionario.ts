interface Employee {
  registration: string;
  salary: number;
  admissionDate: Date;

  generateRegistration(): string;
};

class Subject {
  _name: string;

  constructor(n: string) {
    this.nameValidation(n);
    this._name = n;
  }

  get name() { return this._name };
  set name(n: string) {
    this.nameValidation(n);
    this._name = n
  }

  private nameValidation(name: string): void {
    if (name.length < 3) throw new Error('nome deve ter no minimo 3 letras');
  }
};

class Teacher extends Person implements Employee {
  private _registration!: string;
  private _subject: Subject;
  private _admissionDate: Date;

  constructor(n: string, b: Date, sa: number, su: Subject) {
    super(n, b);

    this._subject = su;
    this.salary = sa;
    this._admissionDate = new Date();
    this.registration = this.generateRegistration();
  }

  get subject(): Subject {
    return this._subject;
  }

  set subject(value: Subject) {
    this._subject = value;
  }

  get registration(): string {
    return this._registration;
  }

  set registration(value: string) {
    if (value.length < 16) throw new Error('O registro deve possuir no mínimo 16 caracteres.');

    this._registration = value;
  }

  get salary(): number {
    return this.salary;
  }

  set salary(value: number) {
    if (value < 0) throw new Error('O salário não pode ser negativo.');

    this.salary = value;
  }

  get admissionDate(): Date {
    return this._admissionDate;
  }

  set admissionDate(value: Date) {
    if (value.getTime() > new Date().getTime()) throw new Error('A data de admissão não pode ser uma data no futuro.');

    this._admissionDate = value;
  }

  generateRegistration(): string {
    const randomStr = String(Date.now() * (Math.random() + 1)).replace(/\W/g, '');

    return `PRF${randomStr}`;
  }
}