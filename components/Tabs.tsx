import Text from '@/components/Text'
import { classNames } from '@/utils'

interface Props {
  current: number
  tabs: {
    label: string
    value: any
    quantity?: number
  }[]
  onChangeTab: (tab: any) => void
}

export default function Tabs({ current, tabs, onChangeTab }: Props) {
  return (
    <div className="flex items-center rounded">
      {tabs.map(tab => (
        <div
          className={classNames(
            "px-4 py-3 rounded-lg flex items-center gap-[6px] cursor-pointer select-none",
            current === tab.value && 'bg-surface-soft'
          )}
          onClick={() => onChangeTab(tab.value)}
          key={tab.value}>
          <Text>{tab.label}</Text>
          {!!tab.quantity && (
            <div
              className="rounded-full bg-surface-soft w-[27px] h-[20px] flex justify-center items-center"
              style={{ mixBlendMode: 'multiply' }}>
              {tab.quantity}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}