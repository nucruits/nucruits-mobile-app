export class Application {
    jobId: string;
    uid: string;
    messageToEmployer: string;
    date;

    objectToApplication(applicationObject) {
        const applicationModel = new Application();
        applicationModel.jobId = applicationObject.jobId;
        applicationModel.uid = applicationObject.uid;
        applicationModel.messageToEmployer = applicationObject.messageToEmployer;
        applicationModel.date = applicationObject.date;
        return applicationModel;
    }

    applicationToObject(applicationModel: Application) {
        const applicationObject = {
            jobId: applicationModel.jobId,
            uid: applicationModel.uid,
            messageToEmployer: applicationModel.messageToEmployer,
            date: applicationModel.date,
        };
        return applicationObject;
    }

    constructor() {

    }
}
