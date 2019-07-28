import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Item } from '../models/Item'
import {ItemRequest} from "../requests/ItemRequest";

export class ItemAccess {

  constructor(
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly itemsTable = process.env.ITEM_TABLE) {
  }

  async getItem(itemId, userId: string): Promise<Item> {
    console.log('Getting an item ', itemId, userId);
    const result = await this.docClient.get({
      TableName: this.itemsTable,
      Key: { id: itemId }
    }).promise();
    return result.Item as Item;
  }

  async getItems(userId: string): Promise<Item[]> {
    console.log('Getting all groups', userId);
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

  async updateItem(itemId: string, item: ItemRequest, userId: string) {
    console.log('Getting an item ', itemId, userId);
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
    /*
    * .query({
    TableName: 'table-name',
    IndexName: 'index-name',
    KeyConditionExpression: 'paritionKey = :paritionKey',
    ExpressionAttributeValues: {
      ':paritionKey': partitionKeyValue
    }
    * */
    return itemId;

  }

  async deleteItem(itemId, userId: string): Promise<number> {
    console.log('Getting an item ', itemId, userId);
    await this.docClient.delete({
      TableName: this.itemsTable,
      Key: { id: itemId }
    }).promise();
    return itemId;
  }
}
