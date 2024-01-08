'use client'
import brandingSvg from '@/assets/branding.svg'
import Link from 'next/link'
import Image from 'next/image'
import ConnectWalletButton from '@/components/ConnectWalletButton'
import avatar from '@/assets/default-avatar.png'
import {useAccount} from 'wagmi'
import {MARKETPLACE_URL} from '@/config/constants'
import {useState} from "react";
import MenuModal from "@/components/MenuModal";
import Icon from "@/components/Icon";
export const HEADER_HEIGHT = 88


export default function MainHeader() {
  const {address} = useAccount();
  const [showMenu, setShowMenu] = useState(false)


  return (
     <>
       <nav className={`h-[${HEADER_HEIGHT}px] bg-white border-gray-200 dark:bg-gray-900 px-4 tablet:px-7`}>
         <div className="flex flex-wrap items-center justify-between mx-auto py-4">
           <div className="flex items-center ">
             <div className="hidden desktop:block tablet:block">
               <Link href="/" className="w-fit">
                 <Image className="h-10 object-contain desktop:w-[148px] tablet:w-fit" height={100} src={brandingSvg} alt="u2u-brand" />
               </Link>
             </div>
             <div className="block tablet:hidden">
               <Link href="/">
                 <Icon name="u2u-logo-mobile" width={28} height={28} />
               </Link>
             </div>
             <div className="flex gap-4">
               <div className="hidden desktop:block w-full">
                 <Link
                    className="font-medium text-secondary hover:text-primary transition-colors text-body-16"
                    href={MARKETPLACE_URL as string}
                    target="_blank">
                   Marketplace
                 </Link>
               </div>
               <div className="hidden desktop:block w-full">
                 <Link
                    className="font-medium text-secondary hover:text-primary transition-colors text-body-16"
                    href="https://forms.gle/9MaNk6gQbKccqqAeA"
                    target="_blank">
                   Apply
                 </Link>
               </div>
             </div>


           </div>

           <div className='flex flex-col items-end'>
             <div className="hidden tablet:block">
               <ConnectWalletButton>
                 {!!address && (
                    <Image
                       onClick={() => setShowMenu(true)}
                       className="cursor-pointer select-none opacity-80 hover:opacity-100 transition-opacity rounded-full"
                       src={avatar}
                       alt="Avatar"
                       width={35}
                       height={35}
                    />
                 )}
               </ConnectWalletButton>
             </div>

             <button className="block tablet:hidden !p-0" onClick={() => setShowMenu(true)}>
               <Icon color="secondary" name="burger" width={20} height={20}/>
             </button>
             {/*<div>{address ? `${shortenBalance(data?.formatted as string)} ${data?.symbol}` : ''} </div>*/}
           </div>
         </div>
         <MenuModal
            show={showMenu}
            onClose={() => setShowMenu(false)}
         />
       </nav>
     </>
  )
}