import { Address } from 'wagmi'
import { BigNumberish } from 'ethers'
import { Project, RoundStatus } from '@/types'

export namespace APIParams {
  export interface FetchProjects {
    mode?: RoundStatus
  }
  export interface SubscribeRoundZero {
    projectId: string
    walletAddress: Address
  }
}

/** API Response types **/
export namespace APIResponse {
  export interface Connect {
    accessToken: string
    accessTokenExpire: number // 1700117015092
    refreshToken: string
    refreshTokenExpire: number // 1700721515092
    userId: string
  }

  export type FetchProjects = Project[]
}