import * as React from 'react';

import { itProjects } from 'data/projects/projects_it';
import ProjectPage from './client/ProjectPage';

export async function generateStaticParams() {
  return itProjects.map((project) => ({
    projectId: project.id,
  }));
}

const Project = ({ params }: { params: { projectId: string } }) => {

  const id = params.projectId;

  if (!id) return null;

  return <ProjectPage projectId={id} />
};

export default Project;
