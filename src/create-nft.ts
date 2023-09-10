import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";

AWS.config.update({ region: 'your-aws-region' });
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const saveToDynamoDB: APIGatewayProxyHandler = async (event) => {
    try {
        if(!event.body){
            throw new Error()
        }
        const requestBody = JSON.parse(event.body);

        const params: DocumentClient.PutItemInput = {
            TableName: 'nft',
            Item: {
                id: requestBody.id,
                name: requestBody.name,
                // Add more attributes as needed
            },
        };

        await dynamoDB.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Data saved to DynamoDB successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'An error occurred while saving to DynamoDB' }),
        };
    }
};
