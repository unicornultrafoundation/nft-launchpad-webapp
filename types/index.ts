import { Address } from 'wagmi'
import { BigNumberish } from 'ethers'

export type RoundType =
  'U2UMintRoundFCFS'
  | 'U2UMintRoundWhitelist'
  | 'U2UMintRoundZero'
  | 'U2UPremintRoundFCFS'
  | 'U2UPremintRoundWhitelist'
  | 'U2UPremintRoundZero'

export type RoundStatus = 'MINTING' | 'ENDED' | 'UPCOMING' | 'CLAIM'

export type AssetType = 'ERC721' | 'ERC1155'

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
  claimableIds: any[],
  requiredStaking: BigNumberish,
  instruction: string,
  stakeBefore: string,
}

export interface User {
  id: string
  email: string
  avatar?: string | null
  username: string | null
  signature: Address
  signedMessage: string
  signer: Address
  publicKey: string
  signDate: string
  acceptedTerms: boolean
  createdAt: string
  updatedAt?: string | null
  bio?: string | null
  coverImage?: string | null
}

export interface Collection {
  id: string
  txCreationHash: string
  name: string | null
  symbol: string
  address: Address
  isU2U: boolean
  description?: string | null
  categoryId: number | null
  createdAt: string
  updatedAt: string
  metadata: Record<string, any> | string
  shortUrl: string | null
  type: AssetType
  creators: { userId: string, user: User }[]
  coverImage: string | null
  avatar: string | null
  volumn: string
  totalOwner: number
  totalNft: number
  floorPrice: string
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
  collection: Collection,
  rounds: Round[]
  details: { key: string, content: string }[]
}
