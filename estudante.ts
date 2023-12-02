class Person {
  private _name: string;
  private _birthDate: Date;

  constructor(newName: string, newBirthDate: Date) {
    this.validateName(newName);
    this.validateBirthDate(newBirthDate);

    this._birthDate = newBirthDate;
    this._name = newName;
  };

  private validateBirthDate(date: Date) {
    if (date > new Date()) throw new Error('a data de nascimento deve ser menor do que a atual');
    if (date.getFullYear() - new Date().getFullYear() > 120) throw new Error('mumias não são permitidas');
  }

  private validateName(name: string) {
    if (name.length < 3) throw new Error('o no precisa de 3 ou mais caracteres');
  }

  get name() { return this._name };
  set name(newName) {
    this.validateName(newName);
    this._name = newName
  };
  get birthDate() { return this._birthDate };
  set birthDate(newBirthDate) {
    this.validateBirthDate(newBirthDate);
    this._birthDate = newBirthDate
  };
}

class PessoaEstudante extends Person {
  private _enrollment: string;
  private _examsGrades: number[];
  private _assignmentsGrades: number[];


  constructor(n: string, b: Date, m: string, p: number[], t: number[]) {
    super(n, b);

    this._enrollment = m;
    this._examsGrades = p;
    this._assignmentsGrades = t;
  }

  get total() {
    return [...this._examsGrades, ...this._assignmentsGrades].reduce((prev, curr) => prev + curr);
  }

  get media() {
    return this.total / (this._examsGrades.length + this._assignmentsGrades.length);
  }
};