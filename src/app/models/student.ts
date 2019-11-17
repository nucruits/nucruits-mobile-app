import { Experience } from './experience';
import { Messenger } from '../modules/messager';
import { FeedHandler } from '../modules/feed-handler';
import { ProfileManager } from '../modules/profile-manager';
import { JobSeeker } from '../modules/job-seeker';

export class Student {
    uid: string;
    email: string;
    accountType = 'student';
    tagline: string;
    firstName: string;
    lastName: string;
    gradYear: number;
    major: string;
    school: string;
    gpa: number;
    city: string;
    state: string;
    experiences: Array<Experience>;
    bio: string;
    skills: Array<string>;
    following: Array<string>;
    followers: Array<string>;
    profilePicture;
    resume;
    transcript;
    messenger: Messenger;
    feedHandler: FeedHandler;
    profileManager;
    jobSeeker;

    // Converts Students

    studentToObject(student: Student) {
        console.log(student)
        const studentObj = {
            firstName: student.firstName,
            lastName: student.lastName,
            tagline: student.tagline,
            accountType: 'student',
            gradYear: student.gradYear,
            major: student.major,
            school: student.school,
            gpa: student.gpa,
            bio: student.bio,
            city: student.city,
            state: student.state,
            experiences: student.experiencesToArray(),
            skills: student.skills,
            email: student.email,
            uid: student.uid,
            profilePicture: student.profilePicture,
            resume: student.resume,
            transcript: student.transcript,
            // following: student.getFollowing(),
            // followers: student.getFollowers(),
        };

        return studentObj;
    }

    objectToStudent(student) {
        const studentObj = new Student();
        studentObj.tagline = student.tagline;
        studentObj.firstName = student.firstName;
        studentObj.lastName = student.lastName;
        studentObj.gradYear = student.gradYear;
        studentObj.major = student.major;
        studentObj.school = student.school;
        studentObj.gpa = student.gpa;
        studentObj.bio = student.bio;
        studentObj.city = student.city;
        studentObj.state = student.state;
        studentObj.experiences = student.experiences;
        studentObj.skills = student.skills;
        studentObj.email = student.email;
        studentObj.following = student.following;
        studentObj.followers = student.followers;
        studentObj.profilePicture = student.profilePicture;
        studentObj.resume = student.resume;
        studentObj.transcript = student.transcript;
        studentObj.uid = student.uid;

        return studentObj;
    }

    experiencesToArray() {
        const experienceArray = [];
        console.log(this.experiences);
        this.experiences.forEach((exp: Experience) => {
            // experienceArray.push(Experience.experienceToObject(exp));
            console.log(exp);
        });
        return experienceArray;
    }

    // Initializes needed modules

    initializeModules(afs, afa, afstore) {
        this.messenger = new Messenger(this.uid);
        this.messenger.initialize(afs);
        this.feedHandler = new FeedHandler(this.uid);
        this.feedHandler.initialize(afs);
        this.profileManager = new ProfileManager(this.uid);
        this.profileManager.initialize(afs);
        this.jobSeeker = new JobSeeker(this.uid);
        this.jobSeeker.initialize(afs);
    }

    // Setter Functions

    setUid(field: string) { this.uid = field; }
    setEmail(field: string) { this.email = field; }
    setTagline(field: string) { this.tagline = field; }
    setFirstName(field: string) { this.firstName = field; }
    setLastName(field: string) { this.lastName = field; }
    setGradYear(field: number) { this.gradYear = field; }
    setMajor(field: string) { this.major = field; }
    setSchool(field: string) { this.school = field; }
    setGpa(field: number) { this.gpa = field; }
    setCity(field: string) { this.city = field; }
    setState(field: string) { this.state = field; }
    setExperiences(field) { this.experiences = field; }
    setSkills(field) { this.skills = field; }
    setBio(field: string) { this.bio = field; }
    setFollowing(field) { this.following = field; }
    setFollowers(field) { this.followers = field; }

    // Getter Functions

    getUid() { return this.uid; }
    getEmail() { return this.email; }
    getTagline() { return this.tagline; }
    getFirstName() { return this.firstName; }
    getLastName() { return this.lastName; }
    getGradYear() { return this.gradYear; }
    getMajor() { return this.major; }
    getSchool() { return this.school; }
    getGpa() { return this.gpa; }
    getCity() { return this.city; }
    getState() { return this.state; }
    getExperiences() { return this.experiences; }
    getSkills() { return this.skills; }
    getBio() { return this.bio; }
    getFollowing() { return this.following; }
    getFollowers() { return this.followers; }
    getProfilePicture() { return this.profilePicture; }
    getResume() { return this.resume; }
    getTranscript() { return this.transcript; }

    constructor() {

    }
}
