import { useTranslation } from "react-i18next";
import { ProjectsCatsIds } from "../interfaces/IProject";

export function getProjectCats(values: ProjectsCatsIds[]) {
    const { t } = useTranslation()
    const projectsCats = t("projectsCats", { returnObjects: true }) as any[];
    const labels: any[] = [];
    values.forEach(value => {
        const project = projectsCats.find(project => project.value === value);
        if (project) {
            labels.push(project.label);
        }
    });
    return labels;
}
