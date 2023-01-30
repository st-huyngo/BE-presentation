import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  ScanCommand,
  GetCommand,
  PutCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import * as dotenv from "dotenv";
dotenv.config();

const REGION = "us-east-1";

export class DB {
  static DOC: DynamoDBClient = new DynamoDBClient({
    region: REGION,
    endpoint: process.env.END_POINT,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  static async scan(tableName: string) {
    const params: any = {
      TableName: tableName,
    };
    try {
      const data = await this.DOC.send(new ScanCommand(params));
      console.log(data);
      return data?.Items;
    } catch (err) {
      console.log("Error", err);
    }
  }

  static async findOne(tableName: string, id: number) {
    const params: any = {
      TableName: tableName,
      Key: {
        user_id: id,
      },
    };

    try {
      const data = await this.DOC.send(new GetCommand(params));
      return data?.Item;
    } catch (err) {
      console.log(err);
    }
  }

  static async createOrUpdate(tableName: string, data: any) {
    const params: any = {
      TableName: tableName,
      Item: {
        user_id: data?.user_id,
        user_name: data?.user_name,
        gender: data?.gender,
        age: data?.age,
      },
    };
    console.log("Params", params);

    try {
      const data = await this.DOC.send(new PutCommand(params));
      return params?.Item;
    } catch (err) {
      console.log("Error", err.stack);
    }
  }

  static async delete(tableName: string, id: any) {
    const params: any = {
      TableName: tableName,
      Key: {
        user_id: id,
      },
    };

    try {
      const res = await this.DOC.send(new DeleteCommand(params));
      console.log("Success - item deleted", res);
      const success = res.$metadata.httpStatusCode;
      if (success === 200) {
        return { status: 200 };
      }
    } catch (err) {
      console.log("Error", err);
    }
  }
}
