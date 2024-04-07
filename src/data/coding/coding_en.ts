import { ICoding, ICodingProjects } from "../../interfaces/ICoding";
import { itScriptsProjects } from "./coding_it";

export const enScriptsProjects: ICodingProjects[] = itScriptsProjects;

export const enCoding: ICoding = {
    page: {
        title: "WELCOME TO MY PLAYGROUND",
        description: "Here you can find some of my scripts. Most of them is for research purpuses, others intent just to display the outputs of specific projects"
    },
    projects: enScriptsProjects
}