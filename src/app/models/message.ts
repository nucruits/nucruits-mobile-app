export class Message {
    body: string;
    date;
    from: string;

    objectToMessage(messageObject) {
        const messageModel = new Message();
        messageModel.body = messageObject.body;
        messageModel.date = messageObject.date;
        messageModel.from = messageObject.from;

        return messageModel;
    }

    messageToObject(messageModel: Message) {
        const messageObject = {
            body: messageModel.body,
            date: messageModel.date,
            from: messageModel.from
        };

        return messageObject;
    }

    constructor() {}
}
