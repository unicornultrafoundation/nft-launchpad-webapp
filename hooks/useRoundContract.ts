import { AssetType, Collection, Round, RoundType } from '@/types'
import { abis } from '@/abi'
import { waitForTransaction, writeContract } from '@wagmi/core'
import { Address, useAccount } from 'wagmi'
import { useLaunchpadApi } from '@/hooks/useLaunchpadApi'

type FunctionName = `buy${AssetType}`

interface BuyParams {
  functionName: FunctionName,
  roundType: RoundType,
  collection: Collection
  amount?: number
  wallet?: Address
}

const getBuyFunctionName = (assetType: AssetType): FunctionName => {
  return `buy${assetType}`
}

export const useWriteRoundContract = (round: Round, collection: Collection) => {
  const { address } = useAccount()
  const { type: roundType } = round
  const roundAbi = abis[roundType]
  const api = useLaunchpadApi()

  const prepareBuyArgs = ({ wallet, functionName, collection, roundType, amount }: BuyParams) => {
    switch (functionName) {
      case 'buyERC721':
        return []
      case 'buyERC1155':
        return [amount]
      default:
        return []
    }
  }

  const onBuyNFT = async (amount?: number) => {
    const functionName = getBuyFunctionName(collection.type)
    const args = functionName === 'buyERC1155' ? [amount] : []

    const tx = await writeContract({
      address: round.address,
      abi: roundAbi,
      functionName,
      args
    })

    return { hash: tx.hash, waitForTransaction: () => waitForTransaction({ hash: tx.hash }) }
  }

  return {
    onBuyNFT
  }
}