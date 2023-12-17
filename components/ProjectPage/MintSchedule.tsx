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
  return (
    <div className="w-full">
      <h1 className="text-heading-sm font-medium mb-6">
        Mint schedule
      </h1>

      <div className="flex flex-col">
        {
          rounds.map((round, index) => (
            <div className="flex items-stretch gap-2 w-full" key={round.name}>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-surface-soft flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-surface-medium" />
                </div>
                {index < rounds.length - 1 && <div className="flex-1 min-h-[20px] w-[2px] bg-surface-soft" />}
              </div>


              <Collapsible
                className="flex-1 !px-0 !py-1"
                header={<p className="text-body-16 font-medium">{round.name}</p>}>
                <div className="rounded-2xl bg-surface-soft p-4 my-4 flex flex-col gap-2">
                  <div className="flex items-center">
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
                    <p className="text-body-12 text-success">
                      Price:
                    </p>
                    <Icon name="u2u-logo" width={16} height={16} />
                    <p className="text-body-12 font-medium">
                      {round.price} U2U
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <p className="text-body-12 text-success">
                      Total mintable:
                    </p>
                    <p className="text-body-12 font-medium">
                      {round.total}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <p className="text-body-12 text-success">
                      Max mint:
                    </p>
                    <p className="text-body-12 font-medium">
                      {round.maxMint}
                    </p>
                  </div>

                </div>
              </Collapsible>
            </div>
          ))
        }

      </div>
    </div>
  )
}