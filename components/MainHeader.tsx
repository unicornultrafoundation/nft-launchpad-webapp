import brandingSvg from '@/assets/branding.svg'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/Button'

export default function MainHeader() {
  return (
    <nav className={`h-[88px] bg-white border-gray-200 dark:bg-gray-900 px-4 tablet:px-7`}>
      <div className="flex flex-wrap items-center justify-between mx-auto py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="w-fit">
            <Image
              className="h-10 object-contain desktop:w-[248px] tablet:w-fit"
              height={100}
              src={brandingSvg}
              alt="u2u-brand" />
          </Link>
        </div>

        <Button>
          Connect wallet
        </Button>
      </div>
    </nav>
  )
}