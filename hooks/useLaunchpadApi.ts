import { launchpadAPi } from '@/services/api'
import { API_ENDPOINTS } from '@/config/api'
import { APIParams, APIResponse } from '@/services/api/types'
import { parseQueries } from '@/utils'
import { Project } from '@/types'
import { Address } from 'wagmi'
import { useMemo } from 'react'
import useAuthStore from '@/store/auth/store'

export const useLaunchpadApi = () => {
  const { credentials } = useAuthStore()
  const bearerToken = credentials?.accessToken
  const authHeader = useMemo(
    () => ({ headers: { 'Authorization': `Bearer ${bearerToken}` } }),
    [bearerToken]
  )

  return {
    generateTokenId: async (collectionAddress: Address): Promise<APIResponse.GenerateTokenId> => {
      return launchpadAPi.get(API_ENDPOINTS.TOKEN_ID + `?collectionAddress=${collectionAddress}`, authHeader)
    },
    fetchProjects: (params?: APIParams.FetchProjects): Promise<APIResponse.FetchProjects> => {
      return launchpadAPi.get(API_ENDPOINTS.LAUNCHPAD + parseQueries(params))
    },
    fetchProjectById: (id: string): Promise<Project> => {
      return launchpadAPi.get(API_ENDPOINTS.LAUNCHPAD + `/${id}`)
    },
    uploadMetadata: (data: Record<string, any>): Promise<APIResponse.UploadMetadata> => {
      const form = new FormData();
      form.append('metadata', JSON.stringify(data))
      return launchpadAPi.post(API_ENDPOINTS.UPLOAD_METADATA, form)
    }
  }
}