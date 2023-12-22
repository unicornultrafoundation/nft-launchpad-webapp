import { Address } from 'wagmi'
import { BigNumberish } from 'ethers'

export enum RoundType {
  U2UMintRoundFCFS = 'U2UMintRoundFCFS',
  U2UMintRoundWhitelist = 'U2UMintRoundWhitelist',
  U2UMintRoundZero = 'U2UMintRoundZero',
  U2UPremintRoundFCFS = 'U2UPremintRoundFCFS',
  U2UPremintRoundWhitelist = 'U2UPremintRoundWhitelist',
  U2UPremintRoundZero = 'U2UPremintRoundZero'
}

export interface Round {
  id: number,
  name: string,
  description: string
  projectId: string,
  roundId: number,
  address: Address,
  start: string,
  end: string,
  type: RoundType
  price: BigNumberish
  maxPerWallet: number
  totalNftt: number
  claimableStart: string
}

export interface Project {
  id: string,
  idOnchain: number,
  name: string,
  banner: string,
  logo: string
  description: string,
  organization: string,
  website: string,
  telegram: string,
  twitter: string,
  facebook: string,
  instagram: string,
  discord: string,
  shortLink: string,
  isActivated: boolean,
  collection: Address,
  rounds: Round[]
  details: { key: string, content: string }[]
}

export type RoundStatus = 'MINTING' | 'ENDED' | 'UPCOMING'