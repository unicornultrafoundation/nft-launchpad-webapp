import ProjectCard from '@/components/HomePage/ProjectCard'
import { Project } from '@/types'

interface Props {
  projects: Project[]
}

export default function HomePageProjectList({ projects }: Props) {

  return (
    <div className="grid tablet:grid-cols-2 grid-cols-1 tablet:gap-8 gap-6 py-6">
      {projects.map(project => <ProjectCard key={project.id} project={project} />)}
    </div>
  )
}