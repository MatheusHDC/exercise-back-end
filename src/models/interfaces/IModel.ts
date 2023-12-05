export interface IModelReader<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>
}

export interface IModelWriter<T, T2> {
  create(arg: T2): Promise<T>
  update(arg: T): Promise<T>
}
export interface IModelDelete {
  removeById(id: string): Promise<boolean>
}

export interface IModel<T, T2> extends
  IModelReader<T>,
  IModelWriter<T, T2>,
  IModelDelete {}
