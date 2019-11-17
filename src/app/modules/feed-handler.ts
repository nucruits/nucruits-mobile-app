import { AngularFirestore } from '@angular/fire/firestore';
import { FeedItem } from '../models/feed';
import * as firebase from 'firebase';

export class FeedHandler {
    uid;
    feedItems = [];
    myFeedItems = [];
    afs: AngularFirestore;
    tempIndex;

    getMyFeedItems() {
        this.myFeedItems = [];
        return new Promise((resolve) => {
            this.afs.collection('feed').doc(this.uid).get().subscribe((feed) => {
                const myFeed = feed.data();
                myFeed.feedArray.forEach(element => {
                    const feedItem = new FeedItem();
                    this.myFeedItems.push(feedItem.objectToFeed(element));
                });
                resolve(this.myFeedItems);
            });
        });
    }

    getFollowersFeedItems(followingArray: Array<any>) {
        let feedItems = new Array();
        let count = 0;
        return new Promise(resolve => {
            const length = followingArray.length;
            followingArray.forEach((follow) => {
                count++;
                this.afs.collection('feed').doc(follow).get().subscribe((feed) => {
                    const followerFeed = feed.data();
                    if (followerFeed.feedArray) {
                        followerFeed.feedArray.forEach(element => {
                            const feedItem = new FeedItem();
                            feedItems.push(feedItem.objectToFeed(element));
                        });
                    }
                    if (count === length) {
                        resolve(feedItems);
                    }

                });
            });
        })
    }

    getFeedItems(uid: string) {
        const feedItems = []
        return new Promise(resolve => {
            this.afs.collection('feed').doc(uid).get().subscribe((feed) => {
                const followerFeed = feed.data();
                if (followerFeed.feedArray) {
                    followerFeed.feedArray.forEach(element => {
                        const feedItem = new FeedItem();
                        feedItems.push(feedItem.objectToFeed(element));
                    });
                }
                resolve(feedItems);
            })
        })
    }

    postFeed(feedPost: FeedItem) {
        const feedList = [];
        this.afs.collection('feed').doc(this.uid).get().subscribe((feed) => {
            if (feed.exists) {
                const myFeed = feed.data();
                myFeed.feedArray.forEach(element => {
                    feedList.push(element);
                });
                console.log('before', feedList);
                feedList.push(feedPost.feedToObject(feedPost));
                const feedArrayObject = {
                    feedArray: feedList
                };
                console.log('after', feedArrayObject);
                this.afs.collection('feed').doc(this.uid).set(feedArrayObject);
            } else {
                const feedObject = feedPost.feedToObject(feedPost); 
                console.log(feedObject);
                feedList.push(feedObject);
                const feedArrayObject = {
                    feedArray: feedList
                };
                console.log('after', feedArrayObject);
                this.afs.collection('feed').doc(this.uid).set(feedArrayObject);
            }

        });
    }

    likePost(postId, creatorId, uid) {
        this.afs.collection('feed').doc(creatorId).get().subscribe((feedArray) => {
            const feedArrayData = feedArray.data();
            console.log(feedArrayData)
            let targetedPost;
            let isLiked = false;
            this.tempIndex = 0;
            let found = false;

            feedArrayData.feedArray.forEach(feedItem => {
                if (feedItem.postId === postId) {
                    targetedPost = feedItem
                }
            });

            targetedPost.likes.forEach(like => {
                if (!found) {
                    if (like === uid) {
                        console.log('working');
                        isLiked = true;
                        found = true;
                    } else {
                        this.tempIndex++;
                    }
                }
            });

            if (isLiked) {
                targetedPost.likes.splice(this.tempIndex, 1)
                console.log(this.tempIndex);
                console.log(targetedPost.likes);
                console.log(feedArrayData);
                // if (targetedPost.likes[0] === undefined) {
                //     targetedPost.likes = [];
                // }
                this.afs.collection('feed').doc(creatorId).set(feedArrayData);
            } else {
                targetedPost.likes.push(uid);
                this.afs.collection('feed').doc(creatorId).set(feedArrayData);
            }
        })
    }

    commentOnPost(postId, creatorId, uid, comment) {
        const commentObject = {
            content: comment,
            uid: uid,
            date: firebase.firestore.Timestamp.now()
        }

        this.afs.collection('feed').doc(creatorId).get().subscribe((feedArray) => {
            const feedArrayData = feedArray.data();
            console.log(feedArrayData)
            let targetedPost;

            feedArrayData.feedArray.forEach(feedItem => {
                if (feedItem.postId === postId) {
                    targetedPost = feedItem
                }
            });

            targetedPost.comments.push(commentObject);

            console.log(feedArrayData)

            this.afs.collection('feed').doc(creatorId).set(feedArrayData);
        })
    }

    getFeedByPostId(postId) {
        return new Promise(resolve => {
            this.afs.collection('feed').get().subscribe((feedItems) => {
                feedItems.docs.forEach((doc) => {
                    const feedArray = doc.data();
                    console.log(feedArray);
                    feedArray.feedArray.forEach((feed) => {
                        if (feed.postId === postId) {
                            resolve(feed)
                        }
                    })
                })
            })
        })
    }

    createPostId() {
        return 'p' + Date.now().toString() + this.uid;
    }

    initialize(afs) {
        this.afs = afs;
    }

    constructor(uid) {
        this.uid = uid;
    }
}
