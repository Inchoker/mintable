import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";

// AWS.config.update({ region: 'us-east-1' });
const dynamoDB = new DocumentClient();
type NFTType = {
    name:string;
    desc:string;
    img:string;
}

export const saveToDynamoDB: APIGatewayProxyHandler = async (event) => {
    console.log(event)
    try {
        if(!event.body){
            throw new Error()
        }
        const requestBody = JSON.parse(event.body);
        const item: NFTType ={
            name:requestBody.name,
            desc: requestBody.desc,
            img:requestBody.img,
        }

        const params: DocumentClient.PutItemInput = {
            TableName: 'nft',
            Item: item,
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
