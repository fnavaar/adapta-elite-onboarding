import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { CheckCircle2, Circle } from 'lucide-react'

export function RadioCards({
  value,
  onChange,
  options,
  columns = 1,
}: {
  value: string
  onChange: (v: string) => void
  options: string[]
  columns?: number
}) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className={cn('grid gap-3 pt-2', columns === 2 && 'sm:grid-cols-2')}
    >
      {options.map((opt) => {
        const isSelected = value === opt
        return (
          <Label
            key={opt}
            className={cn(
              'flex items-center justify-between p-4 sm:p-5 rounded-xl border cursor-pointer transition-all duration-300 min-h-[56px] shadow-sm',
              isSelected
                ? 'border-green-500 bg-green-50 ring-1 ring-green-500 text-green-700 scale-[1.02]'
                : 'border-slate-200 text-slate-700 bg-white hover:border-slate-300 hover:bg-slate-50',
            )}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value={opt} id={opt} className="sr-only" />
              <span className="text-base sm:text-lg font-medium">{opt}</span>
            </div>
            {isSelected ? (
              <CheckCircle2 className="h-5 w-5 text-green-500 animate-in zoom-in duration-300 shrink-0" />
            ) : (
              <Circle className="h-5 w-5 text-slate-300 shrink-0" />
            )}
          </Label>
        )
      })}
    </RadioGroup>
  )
}

export function CheckboxCards({
  values,
  onChange,
  options,
}: {
  values: string[]
  onChange: (v: string[]) => void
  options: string[]
}) {
  const toggle = (opt: string) => {
    onChange(values.includes(opt) ? values.filter((v) => v !== opt) : [...values, opt])
  }

  return (
    <div className="grid sm:grid-cols-2 gap-3 pt-2">
      {options.map((opt) => {
        const isSelected = values.includes(opt)
        return (
          <div
            key={opt}
            role="checkbox"
            aria-checked={isSelected}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                toggle(opt)
              }
            }}
            onClick={() => toggle(opt)}
            className={cn(
              'flex items-center justify-between p-4 sm:p-5 rounded-xl border cursor-pointer transition-all duration-300 min-h-[56px] shadow-sm outline-none',
              isSelected
                ? 'border-green-500 bg-green-50 ring-1 ring-green-500 text-green-700 scale-[1.02]'
                : 'border-slate-200 text-slate-700 bg-white hover:border-slate-300 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-primary',
            )}
          >
            <span className="text-base sm:text-lg font-medium">{opt}</span>
            {isSelected ? (
              <CheckCircle2 className="h-5 w-5 text-green-500 animate-in zoom-in duration-300 shrink-0 ml-3" />
            ) : (
              <Circle className="h-5 w-5 text-slate-300 shrink-0 ml-3" />
            )}
          </div>
        )
      })}
    </div>
  )
}
