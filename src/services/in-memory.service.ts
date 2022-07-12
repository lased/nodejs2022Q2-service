import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryStore<T extends { id: string }> {
  private list: T[] = [];

  create(item: T) {
    this.list.push(item);

    return item;
  }

  findAll() {
    return this.list;
  }

  findOne(filter: Partial<T>) {
    const entry = this.list.find((item) =>
      Object.keys(filter).every((key) => item[key] === filter[key]),
    );

    return entry || null;
  }

  findById(id: string) {
    const entry = this.list.find((item) => item.id === id);

    return entry || null;
  }

  async update(id: string, receivedItem: Partial<T>) {
    const item = this.findById(id);

    if (!item) {
      return null;
    }

    Object.assign(item, receivedItem);

    return item;
  }

  remove(id: string) {
    const deletedItem = this.findById(id);

    if (!deletedItem) {
      return null;
    }

    this.list = this.list.filter((item) => item.id !== id);

    return deletedItem;
  }
}
