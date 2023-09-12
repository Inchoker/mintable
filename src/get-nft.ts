import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, QueryCommand, ScanCommand} from "@aws-sdk/lib-dynamodb";

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
    const query = event.queryStringParameters;
    const command = new ScanCommand({
        TableName: "nft",
        FilterExpression:"#name = :n",
        ExpressionAttributeNames: {
          "#name":"name",
        },
        ExpressionAttributeValues:{
            ":n": query.name,
        }
    });

    const response = await docClient.send(command);
    console.log(response);
    return {
        statusCode: 200,
        body: JSON.stringify({ nft: response}),
    };
};
