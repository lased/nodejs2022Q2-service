export const MESSAGE = {
  NOT_EXISTS: (id: string, type: string) =>
    `'${id}' do not exists in '${type}'`,
  NOT_FOUND: (id: string, type: string) =>
    `'${id}' do not found in '${type}' favorites`,
};
