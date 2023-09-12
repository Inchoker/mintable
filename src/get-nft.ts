import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, QueryCommand} from "@aws-sdk/lib-dynamodb";

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
    const command = new QueryCommand({
        TableName: "nft",
        KeyConditionExpression:"partition_key_attr = :partition_val",
        FilterExpression:"partition_key_attr = :partition_val AND #name = :n AND #uuid= :u",
        ExpressionAttributeNames: {
          "#name":"name",
            "#uuid": "uuid"
        },
        ExpressionAttributeValues:{
            ":partition_val":"somevalue",
            ":n": requestBody.name,
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
