'use client'

import ProjectPageBanner from '@/components/ProjectPage/ProjectBanner'
import ProjectPageDescriptions from '@/components/ProjectPage/ProjectDescriptions'
import ProjectMintSchedule from '@/components/ProjectPage/MintSchedule'
import useSWR from 'swr'
import { useParams } from 'next/navigation'
import { useLaunchpadApi } from '@/hooks/useLaunchpadApi'

export default function ProjectPage() {
  const { id } = useParams()
  const api = useLaunchpadApi()
  const { data, isLoading } = useSWR(
    !!id ? id : null,
    (id: string) => api.fetchProjectById(id),
    { revalidateOnFocus: false }
  )

  if (!data) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <p className="text-heading-sm">
          Project not found!
        </p>
      </div>
    )
  }

  return (
    <div className="px-4 tablet:px-7 desktop:px-20">
      <div className="mb-20">
        <ProjectPageBanner project={data} />
      </div>

      <div className="flex items-start gap-6">
        <div className="flex-1">
          <ProjectPageDescriptions project={data} />
        </div>
        <div className="flex-1">
          <ProjectMintSchedule rounds={data.rounds} />
        </div>
      </div>
    </div>
  )
}