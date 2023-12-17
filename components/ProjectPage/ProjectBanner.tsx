import Image from 'next/image'
import Icon from '@/components/Icon'
import RoundContractInteractions from '@/components/ProjectPage/RoundContractInteractions'
import Link from 'next/link'

export default function ProjectPageBanner() {
  return (
    <div className="flex items-stretch gap-10 justify-between">
      <div className="flex-1">
        <Image
          className="w-full max-w-[600px] h-auto rounded-2xl"
          width={512}
          height={512}
          src="https://fakeimg.pl/600/?text=Project"
          alt="" />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex flex-col gap-4 mb-8">
          <p className="font-semibold text-heading-lg leading-none">
            Projects: Name Projects
          </p>

          <p className="text-secondary text-body-16">
            By <span className="text-primary font-medium">U2U</span>
          </p>

          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="u2u-logo" width={24} height={24} />
              <div className="h-full w-1px bg-gray-500" />
              <p className="text-secondary text-body-16">
                Items: <span className="text-primary font-medium">Open Edition</span>
              </p>
              <p className="text-secondary text-body-16">
                Minted: <span className="text-primary font-medium">1234</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link href="#">
                <Icon name="twitter" width={24} height={24} />
              </Link>
              <Link href="#">
                <Icon name="discord" width={24} height={24} />
              </Link>
              <Link href="#">
                <Icon name="website" width={24} height={24} />
              </Link>
            </div>
          </div>


          <p className="text-secondary text-body-14">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </div>

        <RoundContractInteractions />
      </div>
    </div>
  )
}