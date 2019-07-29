import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Item } from '../models/Item'
import {ItemRequest} from "../requests/ItemRequest";
// import {getUserId} from "../auth/utils";

export class ItemAccess {

  constructor(
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly itemsTable = process.env.ITEM_TABLE,
    /*private readonly itemsIdIndex = process.env.INDEX_NAME*/) {
  }

  async getItem(itemId): Promise<Item> {
    console.log('Getting an item ', itemId);

    // const result = await this.docClient.query({
    //   TableName: this.itemsTable,
    //   IndexName: this.itemsIdIndex,
    //   KeyConditionExpression: 'itemId = :itemId',
    //   ExpressionAttributeValues: {
    //     ':itemId': itemId
    //   }
    // }).promise();

    const result = await this.docClient.get({
      TableName: this.itemsTable,
          Key: {
              itemId: itemId
          }
    }).promise();
    return result.Item as Item;
  }

  async userExists(userId: string) {
      const result = await this.docClient.get({
          TableName: this.itemsTable,
          Key: {
              userId: userId
          }
      }).promise();
      console.log('Get user: ', result);
      return !!result.Item;
  }

  async getItemsPerUser(userId: string) {
    // Query the Table
    const result = await this.docClient.query({
        TableName: this.itemsTable,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId
        },
        // returns the latest images first
        ScanIndexForward: false
    }).promise();
    return result.Items;
  }

  async getItems(/*jwtToken: string*/): Promise<Item[]> {
    console.log('Getting all items');
    // const userId = getUserId(jwtToken);
    // const validUserId = this.userExists(userId);
    // if (!validUserId) {
    //   return []
    // }
    // const items = await this.getItemsPerUser(userId);
    // return items as Item[];

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

  async editItem(itemId: string, item: ItemRequest/*, userId: string*/) {
    console.log('Getting an item ', itemId);
    await this.docClient.update({
      TableName: this.itemsTable,
      Key: { itemId: itemId },
      UpdateExpression: 'set #name = :n, #description = :d',
      ExpressionAttributeValues: {
        ':n' : item.name,
        ':d' : item.description
      },
      ExpressionAttributeNames: {
        "#name": "name",
        "#description": "description"
      }
    }).promise();
    return itemId;
  }

  async deleteItem(itemId/*, userId: string*/): Promise<number> {
    console.log('Getting an item ', itemId);
    await this.docClient.delete({
      TableName: this.itemsTable,
      Key: { id: itemId }
    }).promise();
    return itemId;
  }
}
