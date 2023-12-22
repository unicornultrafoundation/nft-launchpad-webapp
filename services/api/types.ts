import { Address } from 'wagmi'
import { BigNumberish } from 'ethers'
import { Project, RoundStatus } from '@/types'

export namespace APIParams {
  export interface FetchProjects {
    mode: RoundStatus
  }
}

/** API Response types **/
export namespace APIResponse {
  export type FetchProjects = Project[]
}