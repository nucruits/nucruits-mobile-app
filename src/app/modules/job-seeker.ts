import { AngularFirestore } from '@angular/fire/firestore';

export class JobSeeker {
    uid;
    afs: AngularFirestore;
    allJobs = [];
    modifiedJobs = [];

    getAllJobs() {
        this.allJobs = [];
        this.afs.collection('jobs').get().subscribe((jobs) => {
            jobs.forEach((job) => {
                const jobData = job.data();
                this.allJobs.push(jobData);
            });
        });
    }

    getJobsAppliedTo() {}

    searchForJob() {}

    applyForJob(jobId, message) {
        this.afs.collection('jobs').doc(jobId).get().subscribe((jobData) => {
            const job = jobData.data();
            if (!job.applicants.includes(this.uid)) {
                console.log('applied');
                job.applicants.push({
                    uid: this.uid,
                    message: message
                });
                console.log(job);
                this.afs.collection('jobs').doc(jobId).set(job);
            }
        })
    }

    initialize(afs) {
        this.afs = afs;
    }

    constructor(uid) {
        this.uid = uid;
    }
}
