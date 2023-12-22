import Image from 'next/image'
import Icon from '@/components/Icon'
import RoundContractInteractions from '@/components/ProjectPage/RoundContractInteractions'
import Link from 'next/link'
import { Project } from '@/types'
import { useMemo } from 'react'

export default function ProjectPageBanner({ project }: { project: Project }) {
  const activeRound = useMemo(() => {
    return project.rounds.find(round => {
      return Date.now() >= new Date(round.start).getTime() && Date.now() <= new Date(round.end).getTime()
    }) || project.rounds[0]
  }, [project])

  return (
    <div className="flex items-stretch gap-10 justify-between">
      <div className="flex-1">
        <Image
          className="w-full max-w-[600px] h-auto rounded-2xl"
          width={512}
          height={512}
          src={project.banner}
          alt="" />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex flex-col gap-4 mb-8">
          <p className="font-semibold text-heading-lg leading-none">
            Projects: Name Projects
          </p>

          <p className="text-secondary text-body-16">
            By <span className="text-primary font-medium">{project.organization}</span>
          </p>

          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="u2u-logo" width={24} height={24} />
              <div className="h-full w-1px bg-gray-500" />
              <p className="text-secondary text-body-16">
                Items: <span className="text-primary font-medium">Open Edition</span>
              </p>
              <p className="text-secondary text-body-16">
                Minted: <span className="text-primary font-medium">1234</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              {!!project.twitter && (
                <Link href={project.twitter}>
                  <Icon name="twitter" width={24} height={24} />
                </Link>
              )}
              {!!project.discord && (
                <Link href={project.discord}>
                  <Icon name="discord" width={24} height={24} />
                </Link>
              )}
              {!!project.telegram && (
                <Link href={project.telegram}>
                  <Icon name="telegram" width={24} height={24} />
                </Link>
              )}
              {!!project.website && (
                <Link href={project.website}>
                  <Icon name="website" width={24} height={24} />
                </Link>
              )}
            </div>
          </div>


          <p className="text-secondary text-body-14">
            {project.description}
          </p>
        </div>

        <RoundContractInteractions round={activeRound} />
      </div>
    </div>
  )
}