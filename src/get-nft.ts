import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        const response = {
            statusCode: 200,
            body: JSON.stringify({ message: 'Hello, World!' }),
        };
        return response;
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
