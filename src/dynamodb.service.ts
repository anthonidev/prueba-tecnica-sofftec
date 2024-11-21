import { Injectable } from '@nestjs/common';
import {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
} from '@aws-sdk/client-dynamodb';

@Injectable()
export class DynamoDBService {
  private client = new DynamoDBClient({ region: process.env.AWS_REGION });

  async saveData(tableName: string, item: Record<string, any>) {
    const command = new PutItemCommand({
      TableName: tableName,
      Item: item,
    });
    await this.client.send(command);
  }

  async queryData(
    tableName: string,
    keyConditionExpression: string,
    expressionAttributeValues: any,
  ) {
    const command = new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeValues: expressionAttributeValues,
    });
    return this.client.send(command);
  }
}
