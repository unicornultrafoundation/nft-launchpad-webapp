import Icon from '@/components/Icon'
import Button from '@/components/Button'

export default function RoundContractInteractions() {
  return (
    <div className="w-full rounded-lg bg-surface-soft flex flex-col gap-4 p-4">
      <div className="flex items-start justify-between">
        <p className="text-heading-sm font-semibold">Public Round</p>

        <div className="flex items-start gap-2">
          <div className="w-2 h-2 mt-1 rounded-full bg-success" />
          <div>
            <p className="text-body-16 font-medium leading-none">
              Minting
            </p>
            <p className="text-body-14 text-secondary">
              End: <span className="text-secondary">249d 4h 14m 20s</span>
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-200" />

      <div className="flex items-start gap-10">
        <div>
          <p className="text-body-16 text-secondary font-medium mb-2">
            Items
          </p>
          <p className="text-primary text-heading-sm font-semibold">
            Open Edition
          </p>
        </div>

        <div>
          <p className="text-body-16 text-secondary font-medium mb-2">
            Price
          </p>
          <div className="flex items-center gap-2">
            <Icon name="u2u-logo" width={24} height={24} />
            <p className="font-semibold text-heading-md">300</p>
            <p className="text-tertiary text-body-16">U2U</p>
          </div>
        </div>

        <div>
          <p className="text-body-16 text-secondary font-medium mb-2">
            Max
          </p>
          <p className="text-primary text-heading-sm font-semibold">
            Open Edition
          </p>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-200" />

      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center p-4 gap-4 bg-surface-medium rounded-lg w-fit mb-3">
            <Icon className="cursor-pointer text-secondary" name="minus" width={24} height={24} />
            <p className="text-body-18 font-medium">01</p>
            <Icon className="cursor-pointer text-secondary" name="plus" width={24} height={24} />
          </div>

          <p className="text-body-14 text-secondary">
            Total: <span className="text-primary font-semibold">300 U2U</span>
          </p>
        </div>

        <div className="flex-1">
          <Button scale="lg" className="w-full">
            Connect Wallet
          </Button>
        </div>

      </div>
    </div>
  )
}