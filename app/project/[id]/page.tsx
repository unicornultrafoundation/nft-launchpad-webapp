import ProjectPageBanner from '@/components/ProjectPage/ProjectBanner'
import ProjectPageDescriptions from '@/components/ProjectPage/ProjectDescriptions'
import ProjectMintSchedule from '@/components/ProjectPage/MintSchedule'

export default function ProjectPage() {
  return (
    <div className="px-4 tablet:px-7 desktop:px-20">
      <div className="mb-20">
        <ProjectPageBanner />
      </div>

      <div className="flex items-start gap-6">
        <div className="flex-1">
          <ProjectPageDescriptions />
        </div>
        <div className="flex-1">
          <ProjectMintSchedule />
        </div>
      </div>
    </div>
  )
}