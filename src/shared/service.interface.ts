export interface IService<Model = unknown> {
  create: (data: any) => Model | Promise<Model>;
  findAll: () => Model[] | Promise<Model[]>;
  findById: (id: string) => Model | Promise<Model>;
  update: (id: string, data: any) => Model | Promise<Model>;
  remove: (id: string) => Model | Promise<Model> | Promise<boolean>;
}
