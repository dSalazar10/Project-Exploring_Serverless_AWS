import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Item } from '../models/Item'
import {ItemRequest} from "../requests/ItemRequest";

export class ItemAccess {

  constructor(
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly itemsTable = process.env.ITEM_TABLE) {
  }

  async getItem(itemId): Promise<Item> {
    console.log('Getting an item ', itemId);
    const result = await this.docClient.get({
      TableName: this.itemsTable,
      Key: { id: itemId }
    }).promise();
    return result.Item as Item;
  }

  async getItems(): Promise<Item[]> {
    console.log('Getting all groups');
    const result = await this.docClient.scan({
      TableName: this.itemsTable
    }).promise();

    const items = result.Items;
    return items as Item[]
  }

  async createItem(item: Item): Promise<Item> {
    console.log('Creating an item ', item);
    await this.docClient.put({
      TableName: this.itemsTable,
      Item: item
    }).promise();
    return item
  }

  async updateItem(itemId: string, item: ItemRequest) {
    console.log('Getting an item ', itemId);
    await this.docClient.update({
      TableName: this.itemsTable,
      Key: { id: itemId },
      UpdateExpression: 'SET #name = :name, #description = :description',
      ExpressionAttributeValues: {
        ':name' : item.name,
        ':description' : item.description
      },
      ExpressionAttributeNames: {
        "#name": "name",
        "#description": "description"
      }
    }).promise();
    return itemId;

  }

  async deleteItem(itemId): Promise<number> {
    console.log('Getting an item ', itemId);
    await this.docClient.delete({
      TableName: this.itemsTable,
      Key: { id: itemId }
    }).promise();
    return itemId;
  }
}
