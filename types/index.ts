import { Address } from 'wagmi'

export interface Round {
  id: number,
  name: string,
  description: string
  projectId: string,
  roundId: number,
  address: Address,
  start: string,
  end: string,
}

export interface Project {
  id: string,
  onChainId: number,
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
}