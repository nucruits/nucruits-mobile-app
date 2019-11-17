import { Message } from '../models/message';
import { Thread } from '../models/thread';
import { AngularFirestore } from '@angular/fire/firestore';

export class Messenger {
    uid;
    threads = [];
    afs: AngularFirestore;

    getAllThreads() {
        const messageArray = [];
        return new Promise((resolve) => {
            this.afs.collection('messages').valueChanges().subscribe((allMessages) => {
                allMessages.forEach((message) => {
                    // @ts-ignore
                    message.threadParticipants.forEach((participant) => {
                        if (participant === this.uid) {
                            messageArray.push(message);
                        }
                    })
                })
                resolve(messageArray);
            })
        })
    }

    getThread(threadId) {
        return new Promise((resolve) => {
            this.afs.collection('messages').doc(threadId).get().subscribe((threadObj) => {
                let thread = threadObj.data();
                resolve(thread);
            })
        })
    }

    sendMessage(message: Message, threadId) {
        const refMessage = new Message();
        this.afs.collection('messages').doc(threadId).get().subscribe((threadObj) => {
            let thread = threadObj.data();
            const newThread = thread;
            // @ts-ignore
            newThread.messages.push(refMessage.messageToObject(message));
            this.afs.collection('messages').doc(threadId).set(newThread);
        })
    }

    
    createThread(message: Message, uid) {
        let thread = new Thread();
        thread.messages.push(message);
        thread.threadParticipants.push(uid);
        thread.threadParticipants.push(this.uid);
        thread.threadId = this.createThreadId();
        this.afs.collection('messages').doc(thread.threadId).set(thread.threadToObject(thread));
    }

    createThreadId() {
        const length = 14;
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    
    initialize(afs) {
        this.afs = afs;
    }

    constructor(uid) {
        this.uid = uid;
    }
}
