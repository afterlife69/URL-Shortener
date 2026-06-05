import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { dynamoClient } from "../config/dynamodb.js";
import env from "../config/cleanedenv.js";

export const incrementCounter = async () => {
  const command = new UpdateItemCommand({
    TableName: env.COUNTER_TABLE,
    Key: {
      counter: {
        S: env.COUNTER_KEY,
      },
    },
    UpdateExpression: "ADD #value :increment",
    ExpressionAttributeNames: {
      "#value": "value",
    },
    ExpressionAttributeValues: {
      ":increment": {
        N: "1",
      },
    },
    ReturnValues: "UPDATED_NEW",
  });
  const response = await dynamoClient.send(command);
  return Number(response.Attributes.value.N);
};