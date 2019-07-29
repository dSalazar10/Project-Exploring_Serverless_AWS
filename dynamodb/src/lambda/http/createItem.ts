import {APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import 'source-map-support/register'
import {ItemRequest} from "../../requests/ItemRequest";
import {createItem} from "../../businessLogic/items";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Processing event: ', event);
    const newItem: ItemRequest = JSON.parse(event.body);
    // const authorization = event.headers.Authorization;
    // const split = authorization.split(' ');
    // const jwtToken = split[1];

    const results = await createItem(newItem/*, jwtToken*/);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: `Item ${results.name} added`
    }
};
