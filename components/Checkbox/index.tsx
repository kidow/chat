import type { FC, ReactNode } from 'react'
import classnames from 'classnames'

export interface Props {
  checked: boolean
  onChange: (checked: boolean) => void
  label: ReactNode
  className?: string
}

const Checkbox: FC<Props> = ({ checked, onChange, label, className }) => {
  return (
    <label className="mb-0 flex cursor-pointer items-center gap-1.5">
      <input
        onChange={(e) => onChange(e.target.checked)}
        type="checkbox"
        checked={checked}
      />
      <span className={classnames('text-sm text-gray-600', className)}>
        {label}
      </span>
    </label>
  )
}

export default Checkbox
