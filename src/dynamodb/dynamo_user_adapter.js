const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const dynamodb = new AWS.DynamoDB();

const TABLE_NAME = 'users';

class DynamoUserAdapter {
  async ensureTableExists() {
    try {
      await dynamodb.describeTable({ TableName: TABLE_NAME }).promise();
    } catch (error) {
      if (error.code === 'ResourceNotFoundException') {
        await dynamodb.createTable({
          TableName: TABLE_NAME,
          AttributeDefinitions: [
            { AttributeName: 'id', AttributeType: 'S' },
          ],
          KeySchema: [
            { AttributeName: 'id', KeyType: 'HASH' },
          ],
          BillingMode: 'PAY_PER_REQUEST'
        }).promise();

        await dynamodb.waitFor('tableExists', { TableName: TABLE_NAME }).promise();
      } else {
        throw error;
      }
    }
  }

  async createUser(user) {
    await this.ensureTableExists(); // <-- Se asegura de que exista la tabla
    const params = {
      TableName: TABLE_NAME,
      Item: user,
    };
    await docClient.put(params).promise();
    return user;
  }

  async getAllUsers() {
    await this.ensureTableExists();
    const result = await docClient.scan({ TableName: TABLE_NAME }).promise();
    return result.Items || [];
  }

  async getUserById(id) {
    await this.ensureTableExists();
    const result = await docClient.get({
      TableName: TABLE_NAME,
      Key: { id },
    }).promise();
    return result.Item;
  }

  async updateUser(id, data) {
    await this.ensureTableExists();
    const updateParams = {
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: 'set #name = :name, email = :email',
      ExpressionAttributeNames: {
        '#name': 'name',
      },
      ExpressionAttributeValues: {
        ':name': data.name,
        ':email': data.email,
      },
      ReturnValues: 'ALL_NEW',
    };
    const result = await docClient.update(updateParams).promise();
    return result.Attributes;
  }

  async deleteUser(id) {
    await this.ensureTableExists();
    await docClient.delete({
      TableName: TABLE_NAME,
      Key: { id },
    }).promise();
    return { id };
  }
}

module.exports = DynamoUserAdapter;