import { AngularFirestore } from '@angular/fire/firestore';
import { Connections } from '../models/connection';

export class ProfileManager {
    uid;
    afs: AngularFirestore;

    getAllJobs() {
        const allJobs = [];
        return new Promise((resolve) => {
            this.afs.collection('jobs').get().subscribe((jobs) => {
                jobs.forEach((job) => {
                    const jobData = job.data();
                    this.getUserInfo(jobData.employer).then((result) => {
                        //@ts-ignore
                        jobData.picture = result.profilePicture;
                        //@ts-ignore
                        jobData.employerName = result.companyName;
                    })
                    allJobs.push(jobData);
                });
                resolve(allJobs);
            });
        })
    }

    getAllUsers() {
        const allJobs = [];
        return new Promise((resolve) => {
            this.afs.collection('users').get().subscribe((jobs) => {
                jobs.forEach((job) => {
                    const jobData = job.data();
                    allJobs.push(jobData);
                });
                resolve(allJobs);
            });
        })
    }

    getUserInfo(id) {
        return new Promise((resolve) => {
            this.afs.collection('users').doc(id).get().subscribe((userObject) => {
                resolve(userObject.data());
            })
        })
    }

    getJob(jid) {
        return new Promise((resolve) => {
            this.afs.collection('jobs').doc(jid).get().subscribe((jobObject) => {
                resolve(jobObject.data());
            })
        })
    }

    getEmployerInfo(uid) {
        return new Promise((resolve) => {
            this.afs.collection('users').doc(uid).get().subscribe((user) => {
                const userData = user.data();
                const userObject = {
                    companyName: userData.companyName,
                    profilePicture: userData.profilePicture
                }
                resolve(userObject);
            })
        })
    }

    getStudentInfo(uid) {

    }

    follow(uid: string) {
        this.afs.collection('connections').doc(this.uid).get().subscribe((connectionsData) => {
            if (connectionsData.exists) {
                const connections = connectionsData.data();
                const isFollowing = connections.following.includes(uid);
                if (!isFollowing) {
                    connections.following.push(uid);
                } else {
                    console.log('already following')
                }
                this.afs.collection('connections').doc(this.uid).set(connections);

                this.afs.collection('connections').doc(uid).get().subscribe((connectionsData2) => {
                    const connection2 = connectionsData2.data();
                    connection2.followers.push(this.uid);
                    this.afs.collection('connections').doc(uid).set(connection2, {merge: true});
                })
            }
        })
    }

    unfollow(uid: string) {
        this.afs.collection('connections').doc(this.uid).get().subscribe((connectionsData) => {
            if (connectionsData.exists) {
                const connections = connectionsData.data();
                const newFollowingList = [];

                connections.following.forEach((followee) => {
                    if (followee !== uid) {
                        newFollowingList.push(followee)
                    }
                })

                connections.following = newFollowingList;
                this.afs.collection('connections').doc(this.uid).set(connections);

                let count = 0;

                this.afs.collection('connections').doc(uid).get().subscribe((connectionsData2) => {
                    count ++;
                    const connection2 = connectionsData2.data();
                    const tempArray = []
                    connection2.followers.forEach((follow) => {
                        if(follow !== this.uid) {
                            tempArray.push(follow)
                        }
                    })
                    connection2.followers = tempArray;
                    this.afs.collection('connections').doc(uid).set(connection2, {merge: true});
                })
            }
        })
    }

    getConnections(uid: string) {
        return new Promise((resolve) => {
            this.afs.collection('connections').doc(uid).get().subscribe((connectionsData) => {
                if (connectionsData.exists) {
                    const connections = connectionsData.data();
                    resolve(connections);
                }
            })
        })
    }
    
    // getFollowers() {}    
    // getFollowing() {}
    
    initialize(afs) {
        this.afs = afs;
    }

    updateProfileInformation(userObject) {
        this.afs.collection('users').doc(this.uid).set(userObject, { merge: true })
        .then(() => {
            window.alert("Update Successful")
        })
        .catch(() => {
            window.alert("Update Unsuccessful")
        })
    }

    constructor(uid) {
        this.uid = uid;
        console.log('working')
    }
}