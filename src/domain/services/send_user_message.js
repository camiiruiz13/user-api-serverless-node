const {SendMessageCommand } = require('@aws-sdk/client-sqs');
const sqsClient = require('../../sqs/sqs_client');

class SendUserMessage {
    constructor() {
        this.queueUrl = process.env.SQS_QUEUE_URL;
    }

    async send(userData) {
        const command = new SendMessageCommand({
            MessageBody: JSON.stringify(userData),
            QueueUrl: this.queueUrl,
        });

        await sqsClient.send(command);
    }
}
module.exports = SendUserMessage;