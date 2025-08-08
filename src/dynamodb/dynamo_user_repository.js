const {
  PutCommand,
  ScanCommand,
  GetCommand,
  DeleteCommand,
  UpdateCommand,
  DynamoDBDocumentClient
} = require('@aws-sdk/lib-dynamodb');

const client = require('./dynamo_client'); 
const ddb = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.USER_TABLE || 'users';

class UserRepository {
  async saveUser(user) {
    await ddb.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: user,
    }));
    return user;
  }

  async getAllUsers() {
    const result = await ddb.send(new ScanCommand({ TableName: TABLE_NAME }));
    return result.Items;
  }

  async getUserById(id) {
    const result = await ddb.send(new GetCommand({ TableName: TABLE_NAME, Key: { id } }));
    return result.Item;
  }

  async updateUser(id, data) {
    const updateExpr = [];
    const exprAttrValues = {};
    for (const [key, value] of Object.entries(data)) {
      updateExpr.push(`#${key} = :${key}`);
      exprAttrValues[`:${key}`] = value;
    }
    const result = await ddb.send(new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: `SET ${updateExpr.join(', ')}`,
      ExpressionAttributeNames: Object.keys(data).reduce((acc, k) => ({ ...acc, [`#${k}`]: k }), {}),
      ExpressionAttributeValues: exprAttrValues,
      ReturnValues: 'ALL_NEW'
    }));
    return result.Attributes;
  }

  async deleteUser(id) {
    await ddb.send(new DeleteCommand({ TableName: TABLE_NAME, Key: { id } }));
    return { message: 'Usuario eliminado' };
  }
}

module.exports = UserRepository;
