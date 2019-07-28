import * as uuid from 'uuid'
import {Item} from '../models/Item'
import {ItemAccess} from "../dataLayer/ItemAccess";
import {ItemRequest} from "../requests/ItemRequest";

const itemAccess = new ItemAccess();

export async function getItems(): Promise<Item[]> {
  return itemAccess.getItems();
}

export async function getItem(itemId): Promise<Item> {
    return itemAccess.getItem(itemId);
}
export async function createItem(itemRequest: ItemRequest): Promise<Item> {
  const itemId = uuid.v4();
  return await itemAccess.createItem({
      id: itemId,
      name: itemRequest.name,
      description: itemRequest.description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
  });
}

export function updateItem(itemId: string, item: ItemRequest) {
    return itemAccess.updateItem(itemId, item);
}

export function deleteItem(itemId: string) {
    return itemAccess.deleteItem(itemId);
}