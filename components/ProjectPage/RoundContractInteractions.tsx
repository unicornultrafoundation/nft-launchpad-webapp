import Icon from '@/components/Icon'
import Button from '@/components/Button'
import ConnectWalletButton from '@/components/ConnectWalletButton'
import { Collection, Round } from '@/types'
import { formatEther } from 'ethers'
import { formatDisplayedBalance } from '@/utils'
import { useRoundStatus } from '@/hooks/useRoundStatus'
import { useMemo, useState } from 'react'
import { useAccount, useBalance } from 'wagmi'
import { toast } from 'react-toastify'
import { useWriteRoundContract } from '@/hooks/useRoundContract'

interface Props {
  collection: Collection
  round: Round,
}

export default function RoundContractInteractions({ round, collection }: Props) {
  const { address } = useAccount()
  const { data } = useBalance({ address, watch: true, enabled: !!address })
  const [amount, setAmount] = useState(1)
  const status = useRoundStatus(round)

  const estimatedCost = useMemo(() => {
    const totalCostBN = BigInt(round.price) * BigInt(amount)
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
    try {
      setLoading(true)
      const { waitForTransaction } = await onBuyNFT()
      await waitForTransaction()
      toast.success('Your item has been successfully purchased!')
    } catch (e: any) {
      toast.error(`Error report: ${e?.message || e}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full rounded-lg bg-surface-soft flex flex-col gap-4 p-4">
      <div className="flex items-start justify-between">
        <p className="text-heading-sm font-semibold">{round.name}</p>

        {(() => {
          switch (status) {
            case 'MINTING':
              return (
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 mt-1 rounded-full bg-success" />
                  <div>
                    <p className="text-body-16 font-medium leading-none">
                      Minting: <span className="text-success">Live</span>
                    </p>
                    <p className="text-body-14 text-secondary">
                      End: <span className="text-secondary">{round.end}</span>
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
                      Start: <span className="text-secondary">{round.start}</span>
                    </p>
                  </div>
                </div>
              )

            case 'ENDED':
              return (
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 mt-1 rounded-full bg-error" />
                  <div>
                    <p className="text-body-16 font-medium leading-none">
                      Minting:
                    </p>
                    <p className="text-body-14 text-secondary">
                      <span className="text-error">Ended</span>: <span className="text-secondary">{round.end}</span>
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
            {round.totalNftt === 0 ? 'Open edition' : round.totalNftt}
          </p>
        </div>

        <div>
          <p className="text-body-16 text-secondary font-medium mb-2">
            Price
          </p>
          <div className="flex items-center gap-2">
            <Icon name="u2u-logo" width={24} height={24} />
            <p className="font-semibold text-body-16">
              {formatDisplayedBalance(formatEther(round.price))}
            </p>
            <p className="text-tertiary text-body-16">U2U</p>
          </div>
        </div>

        <div>
          <p className="text-body-16 text-secondary font-medium mb-2">
            Max
          </p>
          <p className="text-primary text-body-16 font-semibold">
            {round.maxPerWallet === 0 ? 'Open edition' :
              <>{round.maxPerWallet} items <span className="text-secondary">per wallet</span></>
            }
          </p>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-200" />

      <div className="flex justify-between items-start">
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

        <div className="flex-1">
          <ConnectWalletButton scale="lg" className="w-full">
            <Button scale="lg" className="w-full" onClick={handleBuyNFT} loading={loading}>
              Mint now
            </Button>
          </ConnectWalletButton>
        </div>
      </div>
    </div>
  )
}