export class FeedItem {
    postId: string;
    creator: string;
    postType: string;
    content: string;
    date;
    likes = [];
    comments = [];

    objectToFeed(feedObject) {
        const feedModel = new FeedItem();
        feedModel.postId = feedObject.postId;
        feedModel.creator = feedObject.creator;
        feedModel.postType = feedObject.postType;
        feedModel.content = feedObject.content;
        feedModel.date = feedObject.date;
        feedModel.likes = feedObject.likes;
        feedModel.comments = feedObject.comments;
        return feedModel;
    }

    feedToObject(feedModel: FeedItem) {
        const feedObject = {
            postId: feedModel.postId,
            creator: feedModel.creator,
            postType: feedModel.postType,
            content: feedModel.content,
            date: feedModel.date,
            likes: feedModel.likes,
            comments: feedModel.comments
        };
        return feedObject;
    }

    constructor() {

    }
}

export class FeedArray {
    feedArray = [];

    objectToFeedArray(feedArrayObject) {
        const feedArrayModel = new FeedArray();
        feedArrayObject.forEach(element => {
            const feedItem = new FeedItem();
            feedArrayModel.feedArray.push(feedItem.objectToFeed(element));
        });
        return feedArrayModel;
    }

    feedArrayToObject(feedModel: FeedArray) {
        const feedArrayAttr = [];
        feedModel.feedArray.forEach(element => {
            const feedItem = new FeedItem();
            feedArrayAttr.push(feedItem.feedToObject(element));
        });
        const feedArrayObject = {
            feedArray: feedArrayAttr
        };
        return feedArrayObject;
    }

    constructor() {

    }
}
