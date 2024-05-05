import { IProject } from '../../interfaces/IProject';
import ProjectStripe from '../../components/ProjectStripe/ProjectStripe';

const ListView = ({ projects } : {projects: IProject[]}) => {  

  return <div>
  {projects.map((project: IProject) => <ProjectStripe key={project.id} project={project} />)}
</div>
};

export default ListView;
