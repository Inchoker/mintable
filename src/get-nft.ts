import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({} as any);
const docClient = DynamoDBDocumentClient.from(client);

export const handler: APIGatewayProxyHandler = async (event) => {
    console.log(event)
    if(!event.body){
        return {
            statusCode: 200,
            body: JSON.stringify({ nft: ""}),
        }
    }
    const requestBody = JSON.parse(event.body);
    console.log(requestBody.name)
    const command = new GetCommand({
        TableName: "nft",
        Key: {
            name: requestBody.name,
            partition:"1"
        }
    });

    const response = await docClient.send(command);
    console.log(response);
    return {
        statusCode: 200,
        body: JSON.stringify({ nft: response}),
    };
};
