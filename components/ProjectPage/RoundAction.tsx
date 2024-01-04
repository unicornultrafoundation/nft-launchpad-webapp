import ConnectWalletButton from '@/components/ConnectWalletButton'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import { useAccount, useBalance, useContractRead } from 'wagmi'
import { useMemo, useState } from 'react'
import { formatEther, formatUnits } from 'ethers'
import { formatDisplayedBalance, getRoundAbi } from '@/utils'
import { toast } from 'react-toastify'
import { useWriteRoundContract } from '@/hooks/useRoundContract'
import { Collection, Round } from '@/types'
import { useRoundStatus } from '@/hooks/useRoundStatus'
import { format } from 'date-fns'
import { useRoundZero } from '@/hooks/useRoundZero'

interface Props {
  collection: Collection
  round: Round,
  isWhitelisted: boolean
}

export default function RoundAction({ round, collection, isWhitelisted }: Props) {
  const status = useRoundStatus(round)
  const { isSubscribed, onSubscribe } = useRoundZero(round)
  const { address } = useAccount()
  const { data: amountBought } = useContractRead({
    address: round.address,
    abi: getRoundAbi(round),
    functionName: 'getAmountBought',
    args: [address],
    watch: true,
    enabled: !!address,
    select: data => formatUnits(String(data), 0)
  })
  const { data } = useBalance({ address, watch: true, enabled: !!address })
  const [amount, setAmount] = useState(1)

  const estimatedCost = useMemo(() => {
    const totalCostBN = BigInt(round.price || 0) * BigInt(amount || 0)
    const totalCost = formatEther(totalCostBN)
    return formatDisplayedBalance(totalCost)
  }, [round, amount])

  const handleAddAmount = (num: number) => {
    handleInputAmount(amount + num)
  }

  const handleInputAmount = (value: number) => {
    if (!address) {
      toast.warning('Please connect your wallet first')
      return
    }

    if (value < 0) return

    if (value > amount) {
      if (!data || !data?.value || (data.value < BigInt(round.price) * BigInt(value))) {
        toast.error('Not enough U2U balance')
        return
      }
    }
    setAmount(value)
  }

  const { onBuyNFT } = useWriteRoundContract(round, collection)
  const [loading, setLoading] = useState(false)
  const handleBuyNFT = async () => {
    if (!data || !data?.value || (data.value < BigInt(round.price))) {
      toast.error('Not enough U2U balance')
      return
    }

    try {
      setLoading(true)
      const { waitForTransaction } = await onBuyNFT()
      await waitForTransaction()
      toast.success('Your item has been successfully purchased!')
    } catch (e: any) {
      toast.error(`Error report: ${e?.message || e}`)
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribe = async () => {
    try {
      setLoading(true)
      await onSubscribe()
      toast.success('Your item has been successfully purchased!')
    } catch (e: any) {
      toast.error(`Error report: ${e?.message || e}`)
    } finally {
      setLoading(false)
    }
  }

  const renderRoundAction = () => {
    switch (status) {
      case "MINTING":
        return (!isWhitelisted && round.type !== 'U2UPremintRoundFCFS' && round.type !== 'U2UMintRoundFCFS') ? (
          <p className="font-semibold text-error italic text-body-12">
            You are not eligible to join this round
          </p>
        ) : (
          <div className="flex justify-between items-start">
            {collection.type === 'ERC1155' ? (
              <div className="flex-1">
                <div className="flex max-w-fit items-center px-4 py-3 gap-4 bg-surface-medium rounded-lg mb-3">
                  <div onClick={() => handleAddAmount(-1)}>
                    <Icon
                      className="cursor-pointer text-secondary"
                      name="minus" width={24} height={24} />
                  </div>

                  <input
                    value={amount}
                    onChange={(e) => handleInputAmount(Number(e.target.value))}
                    className="border-none overflow-visible bg-transparent w-10 text-center p-0 outline-none text-body-18 font-medium" />
                  <div onClick={() => handleAddAmount(1)}>
                    <Icon
                      className="cursor-pointer text-secondary"
                      name="plus" width={24} height={24} />
                  </div>

                </div>

                <p className="text-body-14 text-secondary">
                  Total: <span className="text-primary font-semibold">{estimatedCost} U2U</span>
                </p>
              </div>
            ) : (
              <div className="flex-1">
                <p className="text-body-14 text-secondary">
                  Minted: {amountBought}
                  <span className="text-primary font-semibold">/{round.maxPerWallet}</span>
                </p>
              </div>
            )}

            <div className="flex-1">
              <ConnectWalletButton scale="lg" className="w-full">
                <Button
                  disabled={Number(amountBought) === round.maxPerWallet}
                  scale="lg"
                  className="w-full"
                  onClick={handleBuyNFT}
                  loading={loading}>
                  {Number(amountBought) > 0 && Number(amountBought) < round.maxPerWallet ? 'Mint another' : 'Mint Now'}
                </Button>
              </ConnectWalletButton>
            </div>
          </div>
        )
      case 'UPCOMING':
        return (
          <div className="flex flex-col gap-4">
            <p className="text-body-14 text-secondary">
              Minting
              starts: <span className="text-primary font-semibold">{format(round.start, 'yyyy/M/dd - hh:mm a')}</span>
            </p>
            {(round.type === 'U2UMintRoundZero' || round.type === 'U2UPremintRoundZero') ? (
              <ConnectWalletButton scale="lg" className="w-full">
                {!isSubscribed ? (
                  <Button scale="lg" className="w-full" onClick={handleSubscribe} loading={loading}>
                    Subscribe now
                  </Button>
                ) : (
                  <Button scale="lg" className="w-full" variant="text">
                    You have already subscribed!
                  </Button>
                )}
              </ConnectWalletButton>
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