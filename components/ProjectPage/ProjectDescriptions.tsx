import { Project } from '@/types'
import Image from 'next/image'

export default function ProjectPageDescriptions({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-heading-sm mb-6">About</h1>
        <p className="text-body-16 text-secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </div>

      <div>
        <h1 className="text-heading-sm mb-6">Roadmap</h1>
        <p className="text-body-16 text-secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </div>

      <div>
        <h1 className="text-heading-sm mb-6">Team</h1>
        <div className="flex items-center gap-2 bg-surface-soft rounded-lg px-4 py-3">
          <Image src={project.logo} alt="Logo" width={40} height={40} />
          <p className="text-body-16 text-secondary">
            {project.organization}
          </p>
        </div>
      </div>
    </div>
  )
}