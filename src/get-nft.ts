import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, QueryCommand} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({} as any);
const docClient = DynamoDBDocumentClient.from(client);

export const handler: APIGatewayProxyHandler = async (event) => {
    console.log(event)
    if(!event.queryStringParameters){
        return {
            statusCode: 200,
            body: JSON.stringify({ nft: ""}),
        }
    }
    const query = JSON.parse(event.queryStringParameters);
    const command = new QueryCommand({
        TableName: "nft",
        KeyConditionExpression: "#uuid = :u",
        FilterExpression:"#name = :n",
        ExpressionAttributeNames: {
          "#name":"name",
            "#uuid": "uuid"
        },
        ExpressionAttributeValues:{
            ":n": query.name,
            ":u":"somevalue"
        }
    });

    const response = await docClient.send(command);
    console.log(response);
    return {
        statusCode: 200,
        body: JSON.stringify({ nft: response}),
    };
};
