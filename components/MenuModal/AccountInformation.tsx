import Text from '@/components/Text'
import Icon from '@/components/Icon'
import Link from 'next/link'
import {useAuth} from '@/hooks/useAuth'
import {truncate} from "@/utils/string";
import {useAccount} from "wagmi";
import {toast} from 'react-toastify'
import TokenBalances from "@/components/MenuModal/TokenBalances";
import {APPLY_URL, MARKETPLACE_URL} from "@/config/constants";

interface Props {
  onClose?: () => void
}

export default function MenuAccountInformation({onClose}: Props) {
  const {onLogout} = useAuth()
  const {address, connector} = useAccount()

  const handleCopyClick = () => {
    navigator.clipboard.writeText(address || "")
       .then(() => {
         toast.success('Copied address to clipboard', {autoClose: 1000, closeButton: true})
       })
       .catch((err) => {
         console.error('Unable to copy address to clipboard', err);
         toast.error('Error: Unable to copy', {autoClose: 1000, closeButton: true})
       });
  };

  return (
     <div className=" flex flex-col h-full justify-between">
       <div className="w-full flex flex-col gap-4 ">
         <Link className="text-secondary hover:text-primary" href={MARKETPLACE_URL as string} onClick={onClose}>
           Marketplace
         </Link>
         <Link className="text-secondary hover:text-primary" href={APPLY_URL as string} onClick={onClose}>
           Apply
         </Link>
       </div>
       <div className=" flex flex-col gap-4">
         <div className="flex items-center justify-between px-3">
           <Text className="text-secondary font-semibold" variant="body-18">
             Connected Wallet
           </Text>
           <Text className="text-secondary font-semibold hidden" variant="body-18">
             Manage Wallet
           </Text>
         </div>
         <div className=" flex flex-col gap-3 border rounded-xl p-4">
           <div className="flex justify-between">
             <div className=" flex items-center gap-2">
               <div className="rounded-lg p-1  text-secondary">
                 <Icon name={connector ? connector.name : ''} width={33} height={33}/>
               </div>
               <div className="">
                 <Text>
                   U2U
                 </Text>
                 <Text>
                   {truncate({
                     str: address || ""
                   })}
                 </Text>
               </div>
             </div>
             <div className=" flex items-center gap-3">
               <button className="rounded-xl p-3 hover:bg-surface-medium bg-surface-soft text-secondary"
                       onClick={handleCopyClick}>
                 <Icon name="copy" width={15} height={15}/>
               </button>
               <button className="rounded-xl p-3 bg-surface-soft text-secondary" onClick={() => {
                 onLogout()
                 onClose?.()
               }}>
                 <Icon name="logout" width={15} height={15}/>
               </button>
             </div>
           </div>
           <TokenBalances/>
         </div>
       </div>
     </div>

  )
}