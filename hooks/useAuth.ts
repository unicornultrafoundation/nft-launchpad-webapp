import {disconnect} from '@wagmi/core'
import {clearProfile} from '@/store/auth/store'

export const useAuth = () => {


  const onLogout = async () => {
    await disconnect()
    clearProfile()
  }

  return {
    onLogout
  }
}