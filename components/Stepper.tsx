import { classNames } from '@/utils'
import Icon from '@/components/Icon'
import Text from '@/components/Text'

interface Step {
  value: number
  label?: string
  icon?: string
}

interface StepsProps {
  current?: number
  steps: Step[]
  onNext?: () => void
}

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  step: Step
  active?: boolean
}

export const Step = ({ step: { label, icon, value }, active, ...rest }: StepProps) => {
  return (
    <div
      className={classNames(
        "w-8 h-8 rounded-full flex justify-center items-center relative",
        active ? 'bg-success' : 'bg-blue-300'
      )}
      {...rest}>

      {!!icon ?
        <Icon name={icon} width={19} height={19} /> :
        <Text className="text-white" variant="body-12">{value}</Text>}

      {!!label && (
        <Text className="absolute max-w-fit whitespace-nowrap left-0 top-[32px]">
          {label}
        </Text>
      )}
    </div>
  )
}

export default function Stepper({ current = 0, steps }: StepsProps) {
  return (
    <div className="flex items-center">
      {steps.map((item, index) => {
          const isActive = current === item.value
          return (
            <>
              <Step active={isActive} step={item} key={item.value} />
              {index < steps.length - 1 && (
                <div className={classNames("w-[137px] h-[2px]", isActive ? 'bg-success' : 'bg-blue-300')} />
              )}
            </>
          )
        }
      )}
    </div>
  )
}