import ConnectWalletButton from '@/components/ConnectWalletButton'
import Button from '@/components/Button'
import { erc721ABI, useAccount, useBalance, useContractRead, useContractReads } from 'wagmi'
import { useMemo, useState } from 'react'
import { formatEther, formatUnits } from 'ethers'
import { toast } from 'react-toastify'
import { useWriteRoundContract } from '@/hooks/useRoundContract'
import { Collection, Round } from '@/types'
import { useRoundStatus } from '@/hooks/useRoundStatus'
import { format } from 'date-fns'
import { useRoundZero } from '@/hooks/useRoundZero'
import WhitelistChecker from './WhitelistChecker'
import { ZERO_COLLECTION } from '@/config/constants'
import { Address } from "wagmi";
import { MessageFollowInstructions, MessageOwnNFT, MessageRoundNotEligible } from './EligibleMessage'

interface Props {
  collection: Collection
  round: Round,
  isWhitelisted: boolean
}

export default function RoundAction({ round, collection, isWhitelisted }: Props) {
  const status = useRoundStatus(round)
  const { isSubscribed, onSubscribe } = useRoundZero(round);
  const { address } = useAccount()
  const { data: isHolder } = useContractRead({
    address: ZERO_COLLECTION as Address,
    abi: erc721ABI,
    functionName: 'balanceOf',
    args: [address as Address],
    watch: true,
    enabled: !!address,
    select: data => formatUnits(String(data), 0)
  });
  const { data: nftSymbol } = useContractRead({
    address: ZERO_COLLECTION as Address,
    abi: erc721ABI,
    functionName: 'symbol',
    watch: true,
    enabled: !!address,
  });
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    try {
      setLoading(true)
      await onSubscribe()
      toast.success('Subscribed to this project')
    } catch (e: any) {
      toast.error(`Error report: ${e?.message || e}`)
    } finally {
      setLoading(false)
    }
  }

  const renderRoundAction = () => {
    switch (status) {
      case "MINTING":
        return (round.type === 'U2UPremintRoundZero' || round.type === 'U2UMintRoundZero') ? (
          <div>
            {!isWhitelisted && Number(isHolder) == 0 ?
              <MessageOwnNFT link='https://linktonft.com' nftSymbol={nftSymbol} /> : 
              <WhitelistChecker round={round} collection={collection} isWhitelisted={isWhitelisted} />
            }
          </div>
        ) : (
          (round.type === 'U2UPremintRoundWhitelist' || round.type === 'U2UMintRoundWhitelist') ? (
            <div>
              {!isWhitelisted ? <MessageRoundNotEligible /> : <WhitelistChecker round={round} collection={collection} isWhitelisted={isWhitelisted} />}
            </div>
          ) : (
            <WhitelistChecker round={round} collection={collection} isWhitelisted={isWhitelisted} />
          )
        )
      case 'UPCOMING':
        return (
          <div className="flex flex-col gap-4">
            <p className="text-body-14 text-secondary">
              Minting
              starts: <span className="text-primary font-semibold">{format(round.start, 'yyyy/M/dd - hh:mm a')}</span>
            </p>

            {(round.type === 'U2UPremintRoundZero' || round.type === 'U2UMintRoundZero') ? (
              <ConnectWalletButton scale="lg" className="w-full">
                {!isSubscribed ? (
                  <Button scale="lg" className="w-full" onClick={handleSubscribe} loading={loading}>
                    Subscribe now
                  </Button>
                ) : (
                  <>
                    {!isWhitelisted && Number(isHolder) == 0 ? (
                      <>
                        <MessageOwnNFT link='https://linktonft.com' nftSymbol={nftSymbol} />
                        <MessageFollowInstructions or={true} link='https://linktoinstructions.com' />
                      </>
                    ) : ''}
                    <Button scale="lg" className="w-full" variant="text">
                      You have already subscribed!
                    </Button>
                  </>
                )}
              </ConnectWalletButton>
            ) : (round.type === 'U2UPremintRoundWhitelist' || round.type === 'U2UMintRoundWhitelist') ? (
              <div>
                {!isWhitelisted ? <MessageFollowInstructions or={false} link='https://linktoinstructions.com'/> : ''}
              </div>
            ) : (
              <ConnectWalletButton scale="lg" className="w-full">
                <Button disabled scale="lg" className="w-full">
                  Mint now
                </Button>
              </ConnectWalletButton>
            )}
          </div>
        )
      case 'ENDED':
      default:
        return null

    }
  }

  return renderRoundAction()
}