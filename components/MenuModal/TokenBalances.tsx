import {useAccount, useBalance} from "wagmi";
import {formatDisplayedBalance} from '@/utils'
import Icon from "@/components/Icon";

export default function TokenBalances() {
  const { address } = useAccount()

  const { data: u2uBalance } = useBalance({
    address,
    formatUnits: 'ether',
    watch: true
  })

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="border rounded-xl p-2">
        <div className="flex gap-2 items-center p-1">
          <Icon name="u2u-token" width={24} height={24} className="w-6 h-6 rounded-full" />
          {formatDisplayedBalance(u2uBalance?.formatted || '0')}
          <span>U2U</span>
        </div>
      </div>
    </div>
  )
}