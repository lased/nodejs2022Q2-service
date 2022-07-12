export interface IService<Model = unknown> {
  create: (data: Model) => Model | Promise<Model>;
  findAll: () => Model[] | Promise<Model[]>;
  findById: (id: string) => Model | Promise<Model>;
  update: (id: string, data: Partial<Model>) => Model | Promise<Model>;
  remove: (id: string) => Model | Promise<Model>;
  updateWhere?: (
    filter: Partial<Model>,
    data: Partial<Model>,
  ) => Model[] | Promise<Model[]>;
}
