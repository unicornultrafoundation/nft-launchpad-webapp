import { launchpadAPi } from '@/services/api'
import { API_ENDPOINTS } from '@/config/api'
import { APIParams, APIResponse } from '@/services/api/types'
import { parseQueries } from '@/utils'
import { Project } from '@/types'

export const useLaunchpadApi = () => {
  return {
    fetchProjects: (params: APIParams.FetchProjects): Promise<APIResponse.FetchProjects> => launchpadAPi.get(API_ENDPOINTS.LAUNCHPAD + parseQueries(params)),
    fetchProjectById: (id: string): Promise<Project> => launchpadAPi.get(API_ENDPOINTS.LAUNCHPAD + `/${id}`)
  }
}