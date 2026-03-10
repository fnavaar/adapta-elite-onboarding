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
      className={cn('grid gap-4 pt-2', columns === 2 && 'sm:grid-cols-2')}
    >
      {options.map((opt) => {
        const isSelected = value === opt
        return (
          <Label
            key={opt}
            className={cn(
              'flex items-center justify-between p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-300 ease-in-out min-h-[64px]',
              isSelected
                ? 'border-primary bg-primary/10 ring-1 ring-primary text-primary shadow-glow scale-[1.02] -translate-y-1'
                : 'border-[#333333] text-foreground bg-[#111111]/80 hover:border-primary/50 hover:bg-[#111111] hover:-translate-y-1 hover:shadow-elevation',
            )}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value={opt} id={opt} className="sr-only" />
              <span className="text-base sm:text-lg font-medium">{opt}</span>
            </div>
            {isSelected ? (
              <CheckCircle2 className="h-5 w-5 text-primary animate-in zoom-in duration-300 shrink-0" />
            ) : (
              <Circle className="h-5 w-5 text-[#333333] shrink-0" />
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
    <div className="grid sm:grid-cols-2 gap-4 pt-2">
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
              'flex items-center justify-between p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-300 ease-in-out min-h-[64px] outline-none',
              isSelected
                ? 'border-primary bg-primary/10 ring-1 ring-primary text-primary shadow-glow scale-[1.02] -translate-y-1'
                : 'border-[#333333] text-foreground bg-[#111111]/80 hover:border-primary/50 hover:bg-[#111111] hover:-translate-y-1 hover:shadow-elevation focus-visible:ring-2 focus-visible:ring-primary',
            )}
          >
            <span className="text-base sm:text-lg font-medium">{opt}</span>
            {isSelected ? (
              <CheckCircle2 className="h-5 w-5 text-primary animate-in zoom-in duration-300 shrink-0 ml-3" />
            ) : (
              <Circle className="h-5 w-5 text-[#333333] shrink-0 ml-3" />
            )}
          </div>
        )
      })}
    </div>
  )
}
