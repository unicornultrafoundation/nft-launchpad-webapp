import Image from 'next/image'
import Text from '@/components/Text'
import Icon from '@/components/Icon'
import Stepper from '@/components/Stepper'
import Button from '@/components/Button'

export default function ProjectSlide() {
  const activeStep = 1

  const steps = [
    { label: 'Round Zero', value: 1 },
    { label: 'Whitelist', icon: "check", value: 2 },
    { label: 'Public', icon: "auction", value: 3 },
  ]

  return (
    <div>
      <div className="flex justify-center desktop:gap-8 mb-10">
        {/** Project Image **/}
        <Image
          width={384}
          height={384}
          src="https://fakeimg.pl/600/?text=Project"
          className="w-96 h-96 rounded-2xl"
          alt="" />

        <div className="flex flex-col justify-between">
          {/** Project descriptions **/}
          <div className="flex flex-col gap-4">
            <Text className="font-semibold" variant="heading-lg">
              Projects: Name Projects
            </Text>
            <div className="flex gap-3 items-center">
              <Icon name="u2u-logo" width={24} height={24} />
              <div className="h-full bg-gray-500 w-[1px]" />
              <Text variant="body-16">
                <span className="text-secondary">Items:</span>
                {" "}Open Edition
              </Text>
            </div>

            {/** Sale data **/}
            <div className="flex items-start gap-6">
              <div>
                <Text className="text-secondary" variant="body-16">
                  Public Round Price
                </Text>
                <div className="flex items-center gap-2">
                  <Icon name="u2u-logo" width={24} height={24} />
                  <Text className="font-semibold" variant="heading-md">300</Text>
                  <Text className="font-semibold text-tertiary" variant="body-16">U2U</Text>
                </div>
              </div>

              <div>
                <Text className="text-secondary" variant="body-16">
                  Items
                </Text>
                <Text className="font-semibold" variant="heading-md">Open Edition</Text>
              </div>
            </div>
          </div>

          {/** Project Rounds **/}
          <Stepper current={activeStep} steps={steps} />

          <Button className="w-[300px]">
            Details
          </Button>
        </div>

      </div>
    </div>
  )
}