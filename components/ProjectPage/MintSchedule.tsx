import Collapsible from '@/components/Collapsible'
import { classNames } from '@/utils'
import Icon from '@/components/Icon'
import { Round } from '@/types'
import { useMemo } from 'react'

export default function ProjectMintSchedule({ rounds }: { rounds: Round[] }) {
  const isProjectEnded = useMemo(() => {
    if (rounds.length === 0) return true
    const lastRound = rounds[rounds.length - 1]
    const endTime = new Date(lastRound.end).getTime()
    return Date.now() > endTime
  }, [rounds])

  const schedule = useMemo(() => {
    return rounds.map(round => {
      const isMinting = new Date(round.start).getTime() < Date.now() && new Date(round.end).getTime() > Date.now()
      const isEnded = new Date(round.end).getTime() < Date.now()
      return { ...round, isMinting, isEnded }
    })
  }, [rounds])

  const activeRoundIndex = useMemo(() => {
    return schedule.findIndex(round => round.isMinting)
  }, [schedule])

  return (
    <div className="w-full">
      <h1 className="text-heading-sm font-medium mb-6">
        Mint schedule
      </h1>

      <div className="flex flex-col">
        {
          schedule.map((round, index) => {
            const isCompleted = isProjectEnded || index < activeRoundIndex
            const isActive = index === activeRoundIndex

            return (
              <div className="flex items-stretch gap-2 w-full" key={round.name}>
                <div className="flex flex-col items-center">
                  <div className={classNames(
                    'w-8 h-8 rounded-full flex items-center justify-center',
                    isCompleted ? 'bg-success/50' : isActive ? 'bg-success/30' : 'bg-surface-soft'
                  )}>
                    <div className={classNames(
                      'w-6 h-6 rounded-full flex items-center justify-center',
                      isCompleted ? 'bg-success' : isActive ? 'bg-white' : 'bg-surface-medium'
                    )}>
                      {isCompleted && (
                        <Icon color="white" name="check" width={16} height={16} />
                      )}
                    </div>
                  </div>
                  {index < rounds.length - 1 &&
                    <div className={classNames(
                      'flex-1 min-h-[20px] w-[2px]',
                      isCompleted ? 'bg-success' : 'bg-surface-soft'
                    )} />
                  }
                </div>

                <Collapsible
                  defaultOpen={isActive}
                  className="flex-1 !px-0 !py-1"
                  header={<p className="text-body-16 font-medium">{round.name}</p>}>
                  <div className="rounded-2xl bg-surface-soft p-4 my-4 flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      <p className="text-body-16 font-medium">Minting</p>
                      {round.isMinting && <p className="text-body-16 text-success">Live</p>}
                      {round.isEnded && <p className="text-body-16 text-error">Ended</p>}
                    </div>

                    <p className="text-body-12 text-secondary">Start {round.start}</p>
                    <p className="text-body-12 text-secondary">Start {round.end}</p>

                    <div className="w-full h-[1px] bg-gray-200" />

                    <div className="flex items-center gap-1">
                      <p className="text-body-12 text-secondary">
                        Price:
                      </p>
                      <Icon name="u2u-logo" width={16} height={16} />
                      <p className="text-body-12 font-medium">
                        {300} U2U
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <p className="text-body-12 text-secondary">
                        Total mintable:
                      </p>
                      <p className="text-body-12 font-medium">
                        {300}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <p className="text-body-12 text-secondary">
                        Max mint:
                      </p>
                      <p className="text-body-12 font-medium">
                        {3}
                      </p>
                    </div>

                  </div>
                </Collapsible>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}