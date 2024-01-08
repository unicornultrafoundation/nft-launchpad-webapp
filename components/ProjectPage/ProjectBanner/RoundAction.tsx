import ConnectWalletButton from '@/components/ConnectWalletButton';
import Button from '@/components/Button';
import {
  erc721ABI,
  useAccount,
  useBalance,
  useContractRead,
  useContractReads
} from 'wagmi';
import { useMemo, useState } from 'react';
import { formatEther, formatUnits } from 'ethers';
import { toast } from 'react-toastify';
import { useWriteRoundContract } from '@/hooks/useRoundContract';
import { Collection, Round } from '@/types';
import { useRoundStatus } from '@/hooks/useRoundStatus';
import { format } from 'date-fns';
import { useRoundZero } from '@/hooks/useRoundZero';
import { MARKETPLACE_URL, ZERO_COLLECTION } from '@/config/constants';
import { Address } from 'wagmi';
import { MessageRoundNotEligible } from './EligibleMessage';
import useSWR from 'swr';
import { useParams } from 'next/navigation';
import { useLaunchpadApi } from '@/hooks/useLaunchpadApi';
import Icon from '../../Icon';
import Link from 'next/link';
import { classNames, formatDisplayedBalance, getRoundAbi } from '@/utils';

interface Props {
  collection: Collection;
  round: Round;
  isWhitelisted: boolean;
}

export default function RoundAction({
  round,
  collection,
  isWhitelisted
}: Props) {
  const api = useLaunchpadApi();
  const { address } = useAccount();
  const { data: balanceInfo } = useBalance({
    address,
    watch: true,
    enabled: !!address
  });
  const { id } = useParams();
  const status = useRoundStatus(round);
  const { isSubscribed, onSubscribe } = useRoundZero(round);

  const { data: balanceNFT } = useContractRead({
    address: ZERO_COLLECTION as Address,
    abi: erc721ABI,
    functionName: 'balanceOf',
    args: [address as Address],
    watch: true,
    enabled: !!address,
    select: (data) => formatUnits(String(data), 0)
  });
  const isHolder = useMemo(() => {
    return Number(balanceNFT) > 0;
  }, [balanceNFT]);

  const { data: snapshot } = useSWR(
    address && id ? { userId: address, projectId: id } : null,
    (params) => api.fetchSnapshot(params)
  );
  const hasStaked = useMemo(() => {
    return BigInt(snapshot?.stakingTotal || 0) >= BigInt(round.requiredStaking);
  }, [snapshot, round]);

  const { data: amountBought } = useContractRead({
    address: round.address,
    abi: getRoundAbi(round),
    functionName: 'getAmountBought',
    args: [address],
    watch: true,
    enabled: !!address,
    select: (data) => formatUnits(String(data), 0)
  });
  const { data: roundInfo } = useContractRead({
    address: round.address,
    abi: getRoundAbi(round),
    functionName: 'getRound',
    watch: true
  });

  const maxAmountNFT = (roundInfo as any)?.maxAmountNFT;
  const soldAmountNFT = (roundInfo as any)?.soldAmountNFT;
  const roundType = (roundInfo as any)?.roundType;
  const maxAmountNFTPerWallet = (roundInfo as any)?.maxAmountNFTPerWallet;
  const startClaim = (roundInfo as any)?.startClaim;
  const price = (roundInfo as any)?.price;

  const midnightTime = `${round.start.split('T')[0]}T00:00:00.000Z`;
  const now = new Date();
  now.setUTCDate(now.getUTCDate() + 1);
  now.setUTCHours(0, 0, 0, 0);
  const nextSnapshot = now.toISOString();

  const eligibleStatus = useMemo(() => {
    if (
      round.type === 'U2UPremintRoundZero' ||
      round.type === 'U2UMintRoundZero'
    ) {
      return hasStaked || isHolder;
    }

    if (
      round.type === 'U2UMintRoundFCFS' ||
      round.type === 'U2UPremintRoundFCFS'
    ) {
      return true;
    }

    return isWhitelisted;
  }, [hasStaked, round, isHolder, isWhitelisted]);

  const { data: nftSymbol } = useContractRead({
    address: ZERO_COLLECTION as Address,
    abi: erc721ABI,
    functionName: 'symbol',
    watch: true,
    enabled: !!address
  });
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      await onSubscribe();
      toast.success('Subscribed to this project');
    } catch (e: any) {
      toast.error(`Error report: ${e?.message || e}`);
    } finally {
      setLoading(false);
    }
  };

  const { onBuyNFT } = useWriteRoundContract(round, collection);
  const handleBuyNFT = async () => {
    if (
      !balanceInfo ||
      !balanceInfo?.value ||
      balanceInfo.value < BigInt(round.price)
    ) {
      toast.error('Not enough U2U balance');
      return;
    }

    try {
      setLoading(true);
      const { waitForTransaction } = await onBuyNFT();
      await waitForTransaction();
      toast.success('Your item has been successfully purchased!');
    } catch (e: any) {
      toast.error(`Error report: ${e?.message || e}`);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const { data } = useBalance({ address, watch: true, enabled: !!address });
  const [amount, setAmount] = useState(1);

  const estimatedCost = useMemo(() => {
    const totalCostBN = BigInt(round.price || 0) * BigInt(amount || 0);
    const totalCost = formatEther(totalCostBN);
    return formatDisplayedBalance(totalCost);
  }, [round, amount]);

  const handleAddAmount = (num: number) => {
    handleInputAmount(amount + num);
  };

  const handleInputAmount = (value: number) => {
    if (!address) {
      toast.warning('Please connect your wallet first');
      return;
    }

    if (value < 0) return;

    if (value > amount) {
      if (
        !data ||
        !data?.value ||
        data.value < BigInt(round.price) * BigInt(value)
      ) {
        toast.error('Not enough U2U balance');
        return;
      }
    }
    setAmount(value);
  };

  const renderRoundAction = () => {
    switch (status) {
      case 'MINTING':
        return (
          <>
            {round.type === 'U2UPremintRoundZero' ||
            round.type === 'U2UMintRoundZero' ? (
              <MessageRoundNotEligible eligibleStatus={eligibleStatus} />
            ) : (
              (round.type === 'U2UPremintRoundWhitelist' ||
                round.type === 'U2UMintRoundWhitelist') && (
                <div>
                  <MessageRoundNotEligible eligibleStatus={eligibleStatus} />
                  <div className="flex justify-between items-start">
                    {collection.type === 'ERC1155' ? (
                      <div className="flex-1">
                        <div className="flex max-w-fit items-center px-4 py-3 gap-4 bg-surface-medium rounded-lg mb-3">
                          <div onClick={() => handleAddAmount(-1)}>
                            <Icon
                              className="cursor-pointer text-secondary"
                              name="minus"
                              width={24}
                              height={24}
                            />
                          </div>

                          <input
                            value={amount}
                            onChange={(e) =>
                              handleInputAmount(Number(e.target.value))
                            }
                            className="border-none overflow-visible bg-transparent w-10 text-center p-0 outline-none text-body-18 font-medium"
                          />
                          <div onClick={() => handleAddAmount(1)}>
                            <Icon
                              className="cursor-pointer text-secondary"
                              name="plus"
                              width={24}
                              height={24}
                            />
                          </div>
                        </div>

                        <p className="text-body-14 text-secondary">
                          Total:{' '}
                          <span className="text-primary font-semibold">
                            {estimatedCost} U2U
                          </span>
                        </p>
                      </div>
                    ) : (
                      <div className="flex-1">
                        <p className="text-body-14 text-secondary">
                          Minted: {amountBought}
                          <span className="text-primary font-semibold">
                            /{round.maxPerWallet}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
            <div className="flex-1">
              <ConnectWalletButton scale="lg" className="w-full">
                <Button
                  disabled={
                    roundType == '2' &&
                    Number(maxAmountNFT) == 0 &&
                    Number(maxAmountNFTPerWallet) == 0 &&
                    Number(startClaim) == 0 &&
                    Number(price) == 0
                      ? false
                      : Number(amountBought) === round.maxPerWallet ||
                      maxAmountNFT == soldAmountNFT ||
                      !eligibleStatus
                  }
                  scale="lg"
                  className="w-full"
                  onClick={handleBuyNFT}
                  loading={loading}
                >
                  {Number(amountBought) > 0 &&
                  Number(amountBought) < round.maxPerWallet
                    ? 'Mint another'
                    : 'Mint Now'}
                </Button>
              </ConnectWalletButton>
            </div>
          </>
        );
      case 'UPCOMING':
        return (
          <div className="flex flex-col gap-4">
            <p className="text-body-14 text-secondary">
              Minting starts:{' '}
              <span className="text-primary font-semibold">
                {format(round.start, 'yyyy/M/dd - hh:mm a')}
              </span>
            </p>

            {round.type === 'U2UPremintRoundZero' ||
            round.type === 'U2UMintRoundZero' ? (
              <ConnectWalletButton scale="lg" className="w-full">
                {!isSubscribed ? (
                  <Button
                    scale="lg"
                    className="w-full"
                    onClick={handleSubscribe}
                    loading={loading}
                  >
                    Subscribe now
                  </Button>
                ) : (
                  <div className="flex flex-col gap-3">
                    <MessageRoundNotEligible eligibleStatus={eligibleStatus} />

                    <div className="flex gap-2 items-stretch">
                      <div className={classNames(
                        'w-1/2 border-2 rounded-2xl transition-all p-4 flex flex-col gap-1',
                        hasStaked ? ' border-success' : 'border-dashed border-gray-500/70 hover:border-gray-500 hover:border-solid'
                      )}>
                        <p className="font-semibold text-center text-body-18">
                          Stake U2U to join
                        </p>

                        <div className="flex items-center justify-between text-body-14">
                          <p className="text-secondary font-medium">
                            Current staked:
                          </p>
                          <p className="text-primary font-semibold">
                            {snapshot?.stakingTotal} U2U
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-body-14">
                          <p className="text-secondary font-medium">
                            Required:
                          </p>
                          <p className="text-primary font-semibold">
                            {formatDisplayedBalance(formatEther(round.requiredStaking))} U2U
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-body-14">
                          <p className="text-secondary font-medium">
                            Stake before:
                          </p>
                          <p className="text-primary font-semibold">
                            {format(midnightTime, 'yyyy/M/dd - hh:mm a')}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-body-14">
                          <p className="text-secondary font-medium">
                            Status:
                          </p>
                          <div className="text-primary font-semibold">
                            {hasStaked ? (
                              <div className="flex items-center gap-1">
                                <Icon name="verified" />
                                <span className="text-success">Qualified</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1">
                                <Icon name="verified" />
                                <span className="text-error">Not Qualified</span>
                                {' '}|{' '}
                                <Link
                                  href="https://staking.uniultra.xyz/"
                                  className="hover: underline"
                                  target="_blank"
                                >
                                  Stake more
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>

                        {new Date(nextSnapshot) < new Date(round.start) && (
                          <p className="text-body-12 text-secondary italic">
                            Update 12:00 AM everyday
                          </p>
                        )}
                      </div>

                      <div className={classNames(
                        'w-1/2 border-2 rounded-2xl transition-all p-4',
                        isHolder ? ' border-success' : 'border-dashed border-gray-500/70 hover:border-gray-500 hover:border-solid'
                      )}>
                        <p className="font-semibold text-center text-body-18">
                          Zero Collection
                        </p>

                        <div className="flex items-center justify-between text-body-14">
                          <p className="text-secondary font-medium">
                            Condition:
                          </p>
                          <p className="text-primary font-semibold">
                            Own Zero Collection
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-body-14">
                          <p className="text-secondary font-medium">
                            Currently own:
                          </p>
                          <p className="text-primary font-semibold">
                            {balanceNFT} items
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-body-14">
                          <p className="text-secondary font-medium">
                            Status:
                          </p>
                          <div className="text-primary font-semibold">
                            {isHolder ? (
                              <div className="flex items-center gap-1">
                                <Icon name="verified" />
                                <span className="text-success">Qualified</span>
                                {' '}|{' '}
                                <Link
                                  href={MARKETPLACE_URL + `/collection/${ZERO_COLLECTION}`}
                                  className="hover: underline"
                                  target="_blank"
                                >
                                  Get more
                                </Link>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1">
                                <span className="text-error">Not Qualified</span>
                                {' '}|{' '}
                                <Link
                                  href={MARKETPLACE_URL + `/collection/${ZERO_COLLECTION}`}
                                  className="hover: underline"
                                  target="_blank"
                                >
                                  Get now
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button scale="lg" disabled className="w-full">
                      You have already subscribed!
                    </Button>
                  </div>
                )}
              </ConnectWalletButton>
            ) : round.type === 'U2UPremintRoundWhitelist' ||
            round.type === 'U2UMintRoundWhitelist' ? (
              <div>
                <MessageRoundNotEligible eligibleStatus={eligibleStatus} />
                {!eligibleStatus && (
                  <p className="font-semibold text-secondary italic text-body-12">
                    Follow these {' '}
                    <Link className="text-primary hover:underline" href={round.instruction} target="_blank">
                      instructions
                    </Link>
                    {' '} to get whitelisted.
                  </p>
                )}
              </div>
            ) : (
              <ConnectWalletButton scale="lg" className="w-full">
                <Button disabled scale="lg" className="w-full">
                  Mint now
                </Button>
              </ConnectWalletButton>
            )}
          </div>
        );
      case 'ENDED':
        return (
          <div className="w-full">
            <div className="text-error font-semidbold text-center text-body-18 p-4">
              Round has Ended
            </div>
            <Button className="w-full">Explore collection</Button>
          </div>
        );
      default:
        return null;
    }
  };

  return renderRoundAction();
}