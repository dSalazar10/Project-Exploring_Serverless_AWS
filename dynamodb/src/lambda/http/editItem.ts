import {APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import 'source-map-support/register'
import {ItemRequest} from "../../requests/ItemRequest";
import {editItem} from "../../businessLogic/items";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Processing event: ', event);
    const itemId = event.pathParameters.itemId;
    const item: ItemRequest = JSON.parse(event.body);
    // const authorization = event.headers.Authorization;
    // const split = authorization.split(' ');
    // const jwtToken = split[1];
    const results = await editItem(itemId, item/*, jwtToken*/);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
          results
      })
    }
};
