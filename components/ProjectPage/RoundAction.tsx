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
import useSWR from 'swr';
import { useParams } from 'next/navigation';
import { useLaunchpadApi } from '@/hooks/useLaunchpadApi'
import Icon from '../Icon'
import Link from 'next/link'

interface Props {
  collection: Collection
  round: Round,
  isWhitelisted: boolean
}

export default function RoundAction({ round, collection, isWhitelisted }: Props) {
  const api = useLaunchpadApi();
  const { id } = useParams();
  const status = useRoundStatus(round)
  const { isSubscribed, onSubscribe } = useRoundZero(round);
  const { address } = useAccount()
  const { data: balanceNFT } = useContractRead({
    address: ZERO_COLLECTION as Address,
    abi: erc721ABI,
    functionName: 'balanceOf',
    args: [address as Address],
    watch: true,
    enabled: !!address,
    select: data => formatUnits(String(data), 0)
  });
  const isHolder = Number(balanceNFT) > 0;
  const { data: snapshot } = useSWR(
    ( address && id ? { userId: address, projectId: id } : null ),
    (params) => api.fetchSnapshot(params)
  );
  
  const midnightTime = `${round.start.split("T")[0]}T00:00:00.000Z`;
  const now = new Date();
  now.setUTCDate(now.getUTCDate() + 1);
  now.setUTCHours(0, 0, 0, 0);
  const nextSnapshot = now.toISOString();
  
  const eligibleStatus = Number(snapshot?.stakingTotal) >= Number(round.requiredStaking) || isHolder;
  
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
            <div>You ARE {!eligibleStatus ? `NOT` : ''} eligible to join this round</div>
            {/* {!isWhitelisted && isHolder == false ?
              <MessageOwnNFT link='https://linktonft.com' nftSymbol={nftSymbol} amountNFT={Number(balanceNFT)} /> : 
            } */}
            <WhitelistChecker round={round} collection={collection} isWhitelisted={isWhitelisted} eligibleStatus/>
          </div>
        ) : (
          (round.type === 'U2UPremintRoundWhitelist' || round.type === 'U2UMintRoundWhitelist') ? (
            <div>
              {!isWhitelisted ? <MessageRoundNotEligible /> : <WhitelistChecker round={round} collection={collection} isWhitelisted={isWhitelisted} eligibleStatus/>}
            </div>
          ) : (
            <WhitelistChecker round={round} collection={collection} isWhitelisted={isWhitelisted} eligibleStatus/>
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
                    <div>You ARE {!eligibleStatus ? 'NOT' : ''} eligible to join this round</div>
                    <div>How to appply</div>
                    <div>Stake U2U to join:</div>
                    <div>Current staked amount: {snapshot?.stakingTotal} U2U</div>
                    <div>
                      Required Amount: {round.requiredStaking} U2U | Stake before: {format(midnightTime, 'yyyy/M/dd - hh:mm a')}
                      { eligibleStatus ? (
                        <span>
                          <Icon name='verified' />
                          <span className='text-green-500'>Qualified</span>
                        </span>
                        ) : ''
                      } | {' '}
                      <Link href="https://staking.uniultra.xyz/" className='hover: underline'>Stake more</Link>
                      {
                        new Date(nextSnapshot) < new Date(round.start) ?
                        (<p className='text-sm italic'>Next snapshot: {format(nextSnapshot, 'yyyy/M/dd - hh:mm a')}</p>) :
                        ''
                      }
                    </div>
                    <MessageOwnNFT link='https://linktonft.com' nftSymbol={nftSymbol} amountNFT={Number(balanceNFT)}/>
                    <Button scale="lg" className="w-full" variant="text">
                      You have already subscribed!
                    </Button>
                  </>
                )}
              </ConnectWalletButton>
            ) : (round.type === 'U2UPremintRoundWhitelist' || round.type === 'U2UMintRoundWhitelist') ? (
              <div>
                <div>You ARE {!isWhitelisted ? 'NOT' : ''} eligible to join this round</div>
                {!isWhitelisted ? <div>How to appply</div> : ''}
                {!isWhitelisted ? <MessageFollowInstructions or={false} link={round.instruction}/> : ''}
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