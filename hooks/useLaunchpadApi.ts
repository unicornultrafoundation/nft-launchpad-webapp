import { launchpadAPi } from '@/services/api'
import { API_ENDPOINTS } from '@/config/api'
import { APIParams, APIResponse } from '@/services/api/types'
import { parseQueryString } from '@/utils'
import { Project } from '@/types'

export const useLaunchpadApi = () => {
  return {
    fetchProjects: (params: APIParams.FetchProjects): Promise<APIResponse.FetchProjects> => launchpadAPi.get(API_ENDPOINTS.LAUNCHPAD + parseQueryString(params)),
    fetchProjectById: (id: string): Promise<Project> => launchpadAPi.get(API_ENDPOINTS.LAUNCHPAD + `/${id}`)
  }
}