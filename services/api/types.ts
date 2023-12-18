import { Address } from 'wagmi'
import { BigNumberish } from 'ethers'
import { Project } from '@/types'

export namespace APIParams {
  export interface FetchProjects {
    mode: 'MINTING' | 'ENDED' | 'COMING'
  }
}

/** API Response types **/
export namespace APIResponse {
  export type FetchProjects = Project[]
}