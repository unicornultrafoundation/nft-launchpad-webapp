'use client'

import brandingSvg from '@/assets/branding.svg'
import Link from 'next/link'
import Image from 'next/image'
import ConnectWalletButton from '@/components/ConnectWalletButton'
import avatar from '@/assets/default-avatar.png'
import { shortenAddress } from '@/utils'
import { useAccount } from 'wagmi'
import { MARKETPLACE_URL } from '@/config/constants'

export default function MainHeader() {
  const { address } = useAccount()

  return (
    <>
      <nav className={`h-[88px] bg-white border-gray-200 px-4 tablet:px-7 desktop:px-20`}>
        <div className="flex flex-wrap items-center justify-between mx-auto py-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="w-fit">
              <Image
                className="h-10 object-contain"
                height={40}
                src={brandingSvg}
                alt="u2u-brand" />
            </Link>
            <Link
              className="font-medium text-secondary hover:text-primary transition-colors text-body-16"
              href={MARKETPLACE_URL as string}
              target="_blank">
              Marketplace
            </Link>
            <Link
              className="font-medium text-secondary hover:text-primary transition-colors text-body-16"
              href="https://forms.gle/9MaNk6gQbKccqqAeA"
              target="_blank">
              Apply
            </Link>
          </div>

          <ConnectWalletButton>
            {!!address && (
              <div className="flex items-center gap-2">
                <Image src={avatar} width={40} height={40} alt="user" />
                <p className="text-secondary font-semibold">
                  {shortenAddress(address)}
                </p>
              </div>
            )}
          </ConnectWalletButton>
        </div>
      </nav>
    </>
  )
}