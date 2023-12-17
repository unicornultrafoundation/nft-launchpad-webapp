import Image from 'next/image'
import Text from '@/components/Text'
import { Project } from '@/types'
import Icon from '@/components/Icon'
import Stepper from '@/components/Stepper'
import { useRouter } from 'next/navigation'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  project: Project
}

export default function ProjectCard({ project, ...rest }: Props) {
  const router = useRouter()
  const activeStep = 1

  const steps = [
    { label: 'Round Zero', value: 1 },
    { label: 'Whitelist', icon: "check", value: 2 },
    { label: 'Public', icon: "auction", value: 3 }
  ]

  return (
    <div
      className="cursor-pointer rounded-2xl border-[0.7px] border-gray-200"
      onClick={() => router.push(`/project/1`)}
      {...rest}>
      <div className="p-2">
        <Image
          className="rounded-lg w-full h-auto max-h-[308px]"
          src="https://fakeimg.pl/612x308/?text=Project"
          alt=""
          width={612}
          height={308} />
      </div>

      <div className="px-6 py-4">
        <div className="flex items-start justify-between mb-6">
          <Text className="font-semibold" variant="heading-sm">
            {project.name}
          </Text>

          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1">
              <Icon name="u2u-logo" width={16} height={16} />
              <Text className="font-semibold" variant="body-18">300</Text>
              <Text className="text-secondary" variant="body-12">U2U</Text>
            </div>
            <Text className="text-secondary" variant="body-14">
              Public Round
            </Text>
          </div>
        </div>

        <Stepper current={activeStep} steps={steps} />

        <div className="mt-1 flex gap-10 justify-end items-center">
          <Text className="text-secondary" variant="body-12">
            End: <span className="font-medium text-primary">249d 4h 14m 20s</span>
          </Text>

          <div className="flex items-center gap-1">
            <Text className="text-secondary" variant="body-12">
              Items: Open Edition
            </Text>
            <Icon name="u2u-logo" width={12} height={12} />
          </div>
        </div>
      </div>
    </div>
  )
}