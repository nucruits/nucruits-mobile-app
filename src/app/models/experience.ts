export class Experience {
    title: string;
    startDate: string;
    endDate: string;
    institution: string;
    description: string;

    // Converts Experiences

    static experienceToObject(experience: Experience) {
        const experienceObject = {
            title: experience.title,
            startDate: experience.startDate,
            endDate: experience.endDate,
            institution: experience.institution,
            description: experience.description,
        };

        return experienceObject;
    }

    static objectToExperience(experience) {
        const exp = new Experience();
        exp.title = experience.title;
        exp.startDate = experience.startDate;
        exp.endDate = experience.endDate;
        exp.institution = experience.institution;
        exp.description = experience.description;

        return exp;
    }

    // Setter Functions

    setTitle(setTitle: string) { this.title = setTitle; }
    setStartDate(startDate: string) { this.startDate = startDate; }
    setEndDate(endDate: string) { this.endDate = endDate; }
    setInstitution(institution: string) { this.institution = institution; }
    setDescription(description: string) { this.description = description; }

    // Getter Functions

    getTitle() { return this.title; }
    getStartDate() { return this.startDate; }
    getEndDate() { return this.endDate; }
    getInstitution() { return this.institution; }
    getDescription() { return this.description; }

}
