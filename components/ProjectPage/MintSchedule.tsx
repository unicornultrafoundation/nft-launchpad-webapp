import Collapsible from '@/components/Collapsible'
import { classNames } from '@/utils'
import Icon from '@/components/Icon'

export default function ProjectMintSchedule() {
  const rounds = [
    {
      name: 'Round zero',
      status: 'ended',
      start: '27/08/2023, 09:01 PM',
      end: '18/08/2024, 09:00 PM',
      price: 300,
      total: 100,
      maxMint: 1
    },
    {
      name: 'Whitelist round',
      status: 'live',
      start: '27/08/2023, 09:01 PM',
      end: '18/08/2024, 09:00 PM',
      price: 300,
      total: 100,
      maxMint: 1
    },
    {
      name: 'Whitelist round',
      status: '',
      start: '27/08/2023, 09:01 PM',
      end: '18/08/2024, 09:00 PM',
      price: 300,
      total: 100,
      maxMint: 1
    }
  ]

  const activeRoundIndex = rounds.findIndex(round => round.status === 'live')

  return (
    <div className="w-full">
      <h1 className="text-heading-sm font-medium mb-6">
        Mint schedule
      </h1>

      <div className="flex flex-col">
        {
          rounds.map((round, index) => {
            const isCompleted = index < activeRoundIndex
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
                      isCompleted ? 'bg-success' :  isActive ? 'bg-white' : 'bg-surface-medium'
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
                  defaultOpen={round.status === 'live'}
                  className="flex-1 !px-0 !py-1"
                  header={<p className="text-body-16 font-medium">{round.name}</p>}>
                  <div className="rounded-2xl bg-surface-soft p-4 my-4 flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      <p className="text-body-16 font-medium">Minting</p>
                      {!!round.status &&
                        <p className={classNames(
                          'text-body-16',
                          round.status === 'live' && 'text-success',
                          round.status === 'ended' && 'text-error'
                        )}>
                          {round.status}
                        </p>
                      }
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
                        {round.price} U2U
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <p className="text-body-12 text-secondary">
                        Total mintable:
                      </p>
                      <p className="text-body-12 font-medium">
                        {round.total}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <p className="text-body-12 text-secondary">
                        Max mint:
                      </p>
                      <p className="text-body-12 font-medium">
                        {round.maxMint}
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