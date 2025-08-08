const {SQSClient} = require('@aws-sdk/client-sqs');
const client = new SQSClient({ region: 'us-east-1' });
module.exports = client;