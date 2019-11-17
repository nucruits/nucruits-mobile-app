import { Messenger } from '../modules/messager';
import { FeedHandler } from '../modules/feed-handler';
import { JobInteractor } from '../modules/job-interaction';
import { ProfileManager } from '../modules/profile-manager';

export class Employer {
    uid: string;
    accountType = 'employer';
    email: string;
    companyName: string;
    companyWebsite: string;
    companyValues: string;
    missionStatement: string;
    industry: string;
    city: string;
    state: string;
    following: Array<string>;
    followers: Array<string>;
    profilePicture: string;
    messenger: Messenger;
    feedHandler: FeedHandler;
    profileManager: ProfileManager;
    jobInteractor: JobInteractor;

    objectToEmployer(employer) {
        const employerModel = new Employer();
        employerModel.uid = employer.uid;
        employerModel.accountType = employer.accountType;
        employerModel.email = employer.email;
        employerModel.companyName = employer.companyName;
        employerModel.companyWebsite = employer.companyWebsite;
        employerModel.companyValues = employer.companyValues;
        employerModel.missionStatement = employer.missionStatement;
        employerModel.industry = employer.industry;
        employerModel.city = employer.city;
        employerModel.state = employer.state;
        employerModel.following = employer.following;
        employerModel.followers = employer.followers;
        employerModel.profilePicture = employer.profilePicture;
        return employerModel;
    }

    employerToObject(employer: Employer) {
        const employerObject = {
            uid: employer.uid,
            accountType: employer.accountType,
            email: employer.email,
            companyName: employer.companyName,
            companyWebsite: employer.companyWebsite,
            companyValues: employer.companyValues,
            missionStatement: employer.missionStatement,
            industry: employer.industry,
            city: employer.city,
            state: employer.state,
            following: employer.following,
            followers: employer.followers,
            profilePicture: employer.profilePicture
        };
        return employerObject;
    }

    // Initializes needed modules

    initializeModules(afs, afa, afstore) {
        this.messenger = new Messenger(this.uid);
        this.messenger.initialize(afs);
        this.feedHandler = new FeedHandler(this.uid);
        this.feedHandler.initialize(afs);
        this.jobInteractor = new JobInteractor(this.uid);
        this.jobInteractor.initialize(afs);
        this.profileManager = new ProfileManager(this.uid);
        this.profileManager.initialize(afs);

        // Secure Functions w/ Testing
    }

    // Setter Functions

    setUid(field) { this.uid = field; }
    setAccountType(field) { this.accountType = field; }
    setEmail(field) { this.email = field; }
    setCompanyName(field) { this.companyName = field; }
    setCompanyWebsite(field) { this.companyWebsite = field; }
    setCompanyValues(field) { this.companyValues = field; }
    setMissionStatement(field) { this.missionStatement = field; }
    setIndustry(field) { this.industry = field; }
    setCity(field) { this.city = field; }
    setState(field) { this.state = field; }
    setFollowing(field) { this.following = field; }
    setFollowers(field) { this.followers = field; }

    // Getter Functions

    getUid() { return this.uid; }
    getAccountType() { return this.accountType; }
    getEmail() { return this.email; }
    getCompanyName() { return this.companyName; }
    getCompanyWebsite() { return this.companyWebsite; }
    getCompanyValues() { return this.companyValues; }
    getMissionStatement() { return this.missionStatement; }
    getIndustry() { return this.industry; }
    getCity() { return this.city; }
    getState() { return this.state; }
    getFollowing() { return this.following; }
    getFollowers() { return this.followers; }

    constructor() {

    }
}
