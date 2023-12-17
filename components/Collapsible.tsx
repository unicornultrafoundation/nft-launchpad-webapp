'use client'

import { useEffect, useMemo, useState } from 'react'
import { classNames } from '@/utils'
import Icon from '@/components/Icon'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  header: React.ReactNode
  isOpen?: boolean
  onToggle?: () => void
  defaultOpen?: boolean
}

export default function Collapsible({ header, children, isOpen, onToggle, className, defaultOpen, ...rest }: Props) {
  const [open, setOpen] = useState(false)
  const expanded = useMemo(() => isOpen ?? open, [isOpen, open])

  const handleToggle = () => {
    if (onToggle) onToggle()
    else setOpen(!open)
  }

  useEffect(() => {
    if (defaultOpen) setOpen(true)
  }, []);

  return (
    <div className={classNames(`w-full p-4`, className)} {...rest}>
      <div
        className={classNames(
          'w-full rounded-2xl flex justify-between items-center hover:opacity-100 cursor-pointer select-none',
          expanded ? 'opacity-100' : 'opacity-60'
        )}
        onClick={handleToggle}>
        {header}
        <div className={classNames(
          'rounded-lg p-1 bg-surface-medium transition-transform',
          expanded && 'rotate-180'
        )}>
          <Icon name="chevronDown" width={14} height={14} />
        </div>
      </div>
      
      <div
        className={classNames(
          'w-full pt-4 transition-all',
          expanded ? 'block' : 'hidden'
        )}>
        {children}
      </div>
    </div>
  )
}
