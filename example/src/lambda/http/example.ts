import {APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import 'source-map-support/register'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Processing event: ', event);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: 'Hello World!'
    }
};
