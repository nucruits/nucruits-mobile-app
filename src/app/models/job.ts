import { Application } from './application';

export class Job {
    jobId: string;
    employer: string;
    positionTitle: string;
    state: string;
    city: string;
    description: string;
    tagline: string;
    hired: boolean;
    applicants = [];
    intendedMajors = [];
    date;

    objectToJob(jobObject) {
        const jobModel = new Job();
        jobModel.jobId = jobObject.jobId;
        jobModel.employer = jobObject.employer;
        jobModel.positionTitle = jobObject.positionTitle;
        jobModel.state = jobObject.state;
        jobModel.city = jobObject.city;
        jobModel.description = jobObject.description;
        jobModel.tagline = jobObject.tagline;
        jobModel.hired = jobObject.hired;
        jobModel.date = jobObject.date;
        jobModel.applicants = jobObject.applicants;
        jobModel.intendedMajors = jobObject.intendedMajors;
        return jobModel;
    }

    jobToObject(jobModel: Job) {
        const jobObject = {
            jobId: jobModel.jobId,
            employer: jobModel.employer,
            positionTitle: jobModel.positionTitle,
            state: jobModel.state,
            city: jobModel.city,
            description: jobModel.description,
            tagline: jobModel.tagline,
            hired: jobModel.hired,
            applicants: jobModel.applicants,
            intendedMajors: jobModel.intendedMajors,
            date: jobModel.date
        };
        return jobObject;
    }

    getApplications() {
        const applicants = []
        this.applicants.forEach((app) => {
            applicants.push(app.applicationToObject(app))
        })
    }

    constructor() {

    }
}
