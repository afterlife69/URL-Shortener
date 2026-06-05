import { PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { dynamoClient } from "../config/dynamodb.js";
import env from "../config/cleanedenv.js";

export const createUrl = async (shortId, originalUrl) => {
  const command = new PutItemCommand({
    TableName: env.URLS_TABLE,
    Item: {
      id: {
        S: shortId,
      },
      originalUrl: {
        S: originalUrl,
      },
      createdAt: {
        S: new Date().toISOString(),
      },
    },
    ConditionExpression: "attribute_not_exists(id)",
  });

  await dynamoClient.send(command);
};

export const getOriginalUrl = async (shortId) => {
  const command = new GetItemCommand({
    TableName: env.URLS_TABLE,
    Key: {
      id: {
        S: shortId,
      },
    },
    ProjectionExpression: "originalUrl",
    ConsistentRead: true
  });

  const response = await dynamoClient.send(command);
  if (!response.Item) {
    return null;
  }
  return response.Item.originalUrl.S;
};