import Collapsible from '@/components/Collapsible'
import { classNames, formatDisplayedBalance } from '@/utils'
import Icon from '@/components/Icon'
import { Round } from '@/types'
import { formatEther } from 'ethers'
import { useRoundsWithStatus } from '@/hooks/useRoundStatus'

export default function ProjectMintSchedule({ rounds }: { rounds: Round[] }) {
  const { roundsWithStatus: schedule, activeRoundIndex } = useRoundsWithStatus(rounds)

  return (
    <div className="w-full">
      <h1 className="text-heading-sm font-medium mb-6">
        Mint schedule
      </h1>

      <div className="flex flex-col">
        {
          schedule.map((round, index) => {
            const isCompleted = index < activeRoundIndex
            const isActive = index === activeRoundIndex

            return (
              <div className="flex items-stretch gap-2 w-full" key={round.name}>
                <div className="flex flex-col items-center">
                  <div className={classNames(
                    'w-8 h-8 rounded-full flex items-center justify-center',
                    round.status === 'ENDED' && 'bg-success/50',
                    round.status === 'MINTING' && 'bg-success/50',
                    round.status === 'UPCOMING' && (isActive ? 'bg-warning/50' : 'bg-surface-medium')
                  )}>
                    <div className={classNames(
                      'w-6 h-6 rounded-full flex items-center justify-center',
                      round.status === 'ENDED' && 'bg-success',
                      round.status === 'MINTING' && 'bg-white',
                      round.status === 'UPCOMING' && (isActive ? 'bg-white' : 'bg-surface-soft')
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
                      {round.status === 'UPCOMING' && <p className="text-body-16 text-warning">Upcoming</p>}
                      {round.status === 'MINTING' && <p className="text-body-16 text-success">Live</p>}
                      {round.status === 'ENDED' && <p className="text-body-16 text-error">Ended</p>}
                    </div>

                    <p className="text-body-12 text-secondary">Start: {round.start}</p>
                    <p className="text-body-12 text-secondary">Start: {round.end}</p>

                    <div className="w-full h-[1px] bg-gray-200" />

                    <div className="flex items-center gap-1">
                      <p className="text-body-12 text-secondary">
                        Price:
                      </p>
                      <Icon name="u2u-logo" width={16} height={16} />
                      <p className="text-body-12 font-medium">
                        {formatDisplayedBalance(formatEther(round.price))} U2U
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <p className="text-body-12 text-secondary">
                        Total mintable:
                      </p>
                      <p className="text-body-12 font-medium">
                        {round.totalNftt === 0 ? 'Open edition' : round.totalNftt}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <p className="text-body-12 text-secondary">
                        Max mint:
                      </p>
                      <p className="text-body-12 font-medium">
                        {round.maxPerWallet === 0 ? 'Open edition' : round.maxPerWallet}
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