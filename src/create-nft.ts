import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from 'uuid';

type NFTType = {
    name:string;
    desc:string;
    img:string;
    uuid:string;
    partition: string
}
const client = new DynamoDBClient({} as any);
const docClient = DynamoDBDocumentClient.from(client);

export const handler: APIGatewayProxyHandler = async (event) => {
    console.log(event)
    try {
        if(!event.body){
            throw new Error('No body in request')
        }
        const requestBody = JSON.parse(event.body);
        const item: NFTType ={
            name:requestBody.name,
            desc: requestBody.desc,
            img:requestBody.img,
            uuid: uuidv4(),
            partition:"1"
        }

        const command = new PutCommand({
            TableName: "nft",
            Item: item,
        });
        const response = await docClient.send(command);
        console.log(response);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Data saved to DynamoDB successfully' }),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'An error occurred while saving to DynamoDB',e }),
        };
    }
};
