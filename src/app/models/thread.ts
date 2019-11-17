import { Message } from './message';

export class Thread {
    threadId: string;
    threadParticipants = [];
    messages = [];

    threadToObject(thread: Thread) {
        const threadObject = {
            threadParticipants: thread.threadParticipants,
            threadId: thread.threadId,
            messages: []
        }

        const messageRef = new Message();

        thread.messages.forEach((message: Message) => {
            const messageObject = messageRef.messageToObject(message);
            threadObject.messages.push(messageObject)
        })

        return threadObject;
    }

    objectToThread(threadObject) {
        const thread = new Thread();

        thread.threadId = threadObject.threadId;
        thread.threadParticipants = threadObject.threadParticipants;
        thread.messages = threadObject.messages;

        return thread;
    }

    constructor() {}
}
