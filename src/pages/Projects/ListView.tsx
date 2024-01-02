import { IProject } from '../../interfaces/IProject';
import { useTranslation } from 'react-i18next';

import ProjectStripe from '../../components/ProjectStripe/ProjectStripe';

const ListView = () => {

  const {t} = useTranslation()
  const projects = t("projects", {returnObjects: true}) as IProject[];
  

  return <div>
  {projects.map((project: IProject) => <ProjectStripe key={project.id} project={project} />)}
</div>
};

export default ListView;
