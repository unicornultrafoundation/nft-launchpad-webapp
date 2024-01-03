import { AssetType, Collection, Round } from '@/types'
import { abis } from '@/abi'
import { waitForTransaction, writeContract } from '@wagmi/core'
import { useContractRead } from 'wagmi'
import { getRoundAbi } from '@/utils'

type FunctionName = `buy${AssetType}`

const getBuyFunctionName = (assetType: AssetType): FunctionName => {
  return `buy${assetType}`
}

export const useWriteRoundContract = (round: Round, collection: Collection) => {
  const roundAbi = getRoundAbi(round)

  const onBuyNFT = async (amount?: number) => {
    const functionName = getBuyFunctionName(collection.type)
    const args = functionName === 'buyERC1155' ? [amount] : []
    const price = functionName === 'buyERC1155' ? BigInt(round.price) * BigInt(amount || 0) : BigInt(round.price)

    const tx = await writeContract({
      address: round.address,
      abi: roundAbi,
      functionName,
      args,
      value: price
    })

    return { hash: tx.hash, waitForTransaction: () => waitForTransaction({ hash: tx.hash }) }
  }

  const onSubscribeRoundZero = async () => {
    const tx = await writeContract({
      address: round.address,
      abi: roundAbi,
      functionName: '',
      args: []
    })

    return { hash: tx.hash, waitForTransaction: () => waitForTransaction({ hash: tx.hash }) }
  }

  return {
    onSubscribeRoundZero,
    onBuyNFT
  }
}

export const useReadRoundContract = (
  round: Round,
  functionName: 'getRound' | 'getAmountBought' | 'getAmountUser' | 'soldAmountNFT',
  args: any[]
) => {

  const { data } = useContractRead({
    address: round.address,
    abi: getRoundAbi(round),
    functionName,
    args
  })

  return data
}