import Icon from '@/components/Icon'
import { Collection, Round } from '@/types'
import { formatEther } from 'ethers'
import { formatDisplayedBalance, getRoundAbi } from '@/utils'
import RoundAction from '@/components/ProjectPage/RoundAction'
import { useRoundStatus } from '@/hooks/useRoundStatus'
import { format } from 'date-fns'
import Button from '@/components/Button'
import { useAccount, useContractRead } from 'wagmi'

interface Props {
  collection: Collection
  round: Round,
}

export default function RoundContractInteractions({ round, collection }: Props) {
  const status = useRoundStatus(round)
  const { address } = useAccount()
  const { data: isWhitelisted } = useContractRead({
    address: round.address,
    abi: getRoundAbi(round),
    functionName: 'checkIsUserWhitelisted',
    args: [address],
    enabled: !!address && round.type !== 'U2UPremintRoundFCFS' && round.type !== 'U2UMintRoundFCFS',
    watch: true
  })

  if (status === 'ENDED') {
    return (
      <div className="w-full">
        <div className="text-error font-bold text-center text-body-18 p-7">
          Ended
        </div>
        <Button className="w-full">
          Explore collection
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full rounded-lg bg-surface-soft flex flex-col gap-4 p-4">
      <div className="flex items-start justify-between">
        <p className="text-heading-sm font-semibold">{round?.name}</p>

        {(() => {
          switch (status) {
            case 'MINTING':
              return (
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 mt-1 rounded-full bg-success" />
                  {
                    (!isWhitelisted && round.type !== 'U2UPremintRoundFCFS' && round.type !== 'U2UMintRoundFCFS') && (
                      <div className="w-full flex gap-4 my-4 px-6 py-4 rounded-2xl bg-surface-soft/50 border border-error">
                        <svg
                          viewBox="0 0 24 24"
                          className="text-error"
                          fill="none"
                          width="24"
                          height="24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M13.2597 5.26315C13.2597 4.56553 12.6942 4 11.9966 4C11.2989 4 10.7334 4.56553 10.7334 5.26315V12C10.7334 12.6976 11.2989 13.2631 11.9966 13.2631C12.6942 13.2631 13.2597 12.6976 13.2597 12V5.26315ZM11.9966 17.4736C11.2989 17.4736 10.7334 18.0391 10.7334 18.7368C10.7334 19.4344 11.2989 19.9999 11.9966 19.9999H12.012C12.7096 19.9999 13.2751 19.4344 13.2751 18.7368C13.2751 18.0391 12.7096 17.4736 12.012 17.4736H11.9966Z"
                            fill="currentColor" />
                        </svg>

                        <div className="flex flex-col gap-1">
                          <p className="font-semibold text-error italic text-body-12">
                            You are not eligible to join this project.
                          </p>
                        </div>
                      </div>
                    )
                  }

                  <div>
                    <p className="text-body-16 font-medium leading-none">
                      Minting: <span className="text-success">Live</span>
                    </p>
                    <p className="text-body-14 text-secondary">
                      End: <span className="text-secondary">{format(round?.end || 0, 'yyyy/M/dd hh:mm a')}</span>
                    </p>
                  </div>
                </div>
              )

            case 'UPCOMING':
              return (
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 mt-1 rounded-full bg-warning" />
                  <div>
                    <p className="text-body-16 font-medium leading-none">
                      Minting: <span className="text-warning">Upcoming</span>
                    </p>
                    <p className="text-body-14 text-secondary">
                      Start: <span className="text-secondary">{format(round?.start || 0, 'yyyy/M/dd hh:mm a')}</span>
                    </p>
                  </div>
                </div>
              )
          }
        })()}
      </div>

      <div className="w-full h-[1px] bg-gray-200" />

      <div className="flex items-start gap-10">
        <div>
          <p className="text-body-16 text-secondary font-medium mb-2">
            Items
          </p>
          <p className="text-primary text-heading-sm font-semibold">
            {round?.totalNftt === 0 ? 'Open edition' : round?.totalNftt}
          </p>
        </div>

        <div>
          <p className="text-body-16 text-secondary font-medium mb-2">
            Price
          </p>
          <div className="flex items-center gap-2">
            <Icon name="u2u-logo" width={24} height={24} />
            <p className="font-semibold text-body-16">
              {formatDisplayedBalance(formatEther(round?.price))}
            </p>
            <p className="text-tertiary text-body-16">U2U</p>
          </div>
        </div>

        <div>
          <p className="text-body-16 text-secondary font-medium mb-2">
            Max
          </p>
          <p className="text-primary text-body-16 font-semibold">
            {round?.maxPerWallet === 0 ?
              'Unlimited' :
              <>{round?.maxPerWallet} items <span className="text-secondary">per wallet</span></>
            }
          </p>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-200" />

      <RoundAction collection={collection} round={round} isWhitelisted={!!isWhitelisted} />
    </div>
  )
}