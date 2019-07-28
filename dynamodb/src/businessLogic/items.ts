import * as uuid from 'uuid'
import {Item} from '../models/Item'
import {ItemAccess} from "../dataLayer/ItemAccess";
import {ItemRequest} from "../requests/ItemRequest";
import {getUserId} from "../auth/utils";

const itemAccess = new ItemAccess();

export async function getItems(jwtToken: string): Promise<Item[]> {
    const userId = getUserId(jwtToken);
    return itemAccess.getItems(userId);
}

export async function getItem(itemId, jwtToken: string): Promise<Item> {
    const userId = getUserId(jwtToken);
    return itemAccess.getItem(itemId, userId);
}
export async function createItem(itemRequest: ItemRequest, jwtToken: string): Promise<Item> {
    const itemId = uuid.v4();
    const userId = getUserId(jwtToken);
    return await itemAccess.createItem({
      itemId: itemId,
      userId: userId,
      name: itemRequest.name,
      description: itemRequest.description,
      timestamp: new Date().toISOString(),
    });
}

export function updateItem(itemId: string, item: ItemRequest, jwtToken: string) {
    const userId = getUserId(jwtToken);
    return itemAccess.updateItem(itemId, item, userId);
}

export function deleteItem(itemId: string, jwtToken: string) {
    const userId = getUserId(jwtToken);
    return itemAccess.deleteItem(itemId, userId);
}
