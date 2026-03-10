import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { VslVideo } from './VslVideo'
import { CheckCircle2 } from 'lucide-react'

export type FormData = {
  name: string
  email: string
  vslWatched: boolean
  objective: string
  portfolio: string
  risk: string
}

export type StepProps = {
  data: FormData
  updateData: (d: Partial<FormData>) => void
}

function RadioCards({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (v: string) => void
  options: string[]
}) {
  return (
    <RadioGroup value={value} onValueChange={onChange} className="grid gap-3 pt-2">
      {options.map((opt) => (
        <Label
          key={opt}
          className={cn(
            'flex items-center p-4 sm:p-5 rounded-xl border cursor-pointer transition-all duration-200 hover:border-primary/50 hover:bg-slate-50 min-h-[56px] shadow-sm',
            value === opt
              ? 'border-primary bg-primary/5 ring-1 ring-primary text-primary'
              : 'border-slate-200 text-slate-700 bg-white',
          )}
        >
          <RadioGroupItem value={opt} id={opt} className="sr-only" />
          <span className="text-base sm:text-lg font-medium">{opt}</span>
        </Label>
      ))}
    </RadioGroup>
  )
}

export const Step1 = ({ data, updateData }: StepProps) => (
  <div className="space-y-6">
    <div className="space-y-2">
      <h2 className="text-2xl sm:text-3xl font-semibold text-primary">Seus Dados</h2>
      <p className="text-slate-500 text-lg">Para um atendimento exclusivo e personalizado.</p>
    </div>
    <div className="space-y-4 pt-2">
      <div className="space-y-2">
        <Label className="text-slate-700 font-medium">Nome Completo</Label>
        <Input
          autoFocus
          className="h-14 text-lg bg-white rounded-xl"
          placeholder="Ex: João Silva"
          value={data.name}
          onChange={(e) => updateData({ name: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label className="text-slate-700 font-medium">Melhor E-mail</Label>
        <Input
          type="email"
          className="h-14 text-lg bg-white rounded-xl"
          placeholder="nome@exemplo.com"
          value={data.email}
          onChange={(e) => updateData({ email: e.target.value })}
        />
      </div>
    </div>
  </div>
)

export const Step2 = ({ data, updateData }: StepProps) => (
  <div className="space-y-6">
    <div className="space-y-2 text-center">
      <h2 className="text-2xl sm:text-3xl font-semibold text-primary">Mensagem Importante</h2>
      <p className="text-slate-500 text-lg">
        Assista ao vídeo abaixo para entender nossa metodologia exclusiva.
      </p>
    </div>
    <div className="pt-4">
      <VslVideo isCompleted={data.vslWatched} onComplete={() => updateData({ vslWatched: true })} />
    </div>
    {data.vslWatched && (
      <div className="max-w-[600px] mx-auto mt-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-center gap-2 text-green-700 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <CheckCircle2 className="h-5 w-5" />
        <span className="font-medium">Vídeo concluído! Você já pode continuar.</span>
      </div>
    )}
  </div>
)

export const Step3 = ({ data, updateData }: StepProps) => (
  <div className="space-y-4">
    <h2 className="text-2xl sm:text-3xl font-semibold text-primary">Objetivo Principal</h2>
    <p className="text-slate-500 text-lg">O que você busca com a Adapta Elite?</p>
    <RadioCards
      value={data.objective}
      onChange={(v) => updateData({ objective: v })}
      options={[
        'Preservação de Patrimônio',
        'Crescimento Acelerado',
        'Sucessão Familiar',
        'Diversificação Internacional',
      ]}
    />
  </div>
)

export const Step4 = ({ data, updateData }: StepProps) => (
  <div className="space-y-4">
    <h2 className="text-2xl sm:text-3xl font-semibold text-primary">Volume de Portfólio</h2>
    <p className="text-slate-500 text-lg">Selecione a faixa atual dos seus investimentos.</p>
    <RadioCards
      value={data.portfolio}
      onChange={(v) => updateData({ portfolio: v })}
      options={['R$ 1M - R$ 5M', 'R$ 5M - R$ 15M', 'R$ 15M - R$ 50M', 'Acima de R$ 50M']}
    />
  </div>
)

export const Step5 = ({ data, updateData }: StepProps) => (
  <div className="space-y-4">
    <h2 className="text-2xl sm:text-3xl font-semibold text-primary">Perfil de Risco</h2>
    <p className="text-slate-500 text-lg">Como você lida com oscilações de mercado?</p>
    <RadioCards
      value={data.risk}
      onChange={(v) => updateData({ risk: v })}
      options={['Conservador', 'Moderado', 'Arrojado', 'Agressivo']}
    />
  </div>
)

export const Step6 = ({ data }: StepProps) => (
  <div className="space-y-6">
    <h2 className="text-2xl sm:text-3xl font-semibold text-primary">Revisão Final</h2>
    <p className="text-slate-500 text-lg">Confirme seus dados antes de enviar sua solicitação.</p>
    <div className="space-y-3 bg-slate-50 p-6 rounded-xl border border-slate-100 text-sm sm:text-base shadow-inner">
      {Object.entries({
        Nome: data.name,
        'E-mail': data.email,
        Objetivo: data.objective,
        Portfólio: data.portfolio,
        Risco: data.risk,
      }).map(([k, v]) => (
        <div
          key={k}
          className="flex justify-between border-b border-slate-200 last:border-0 pb-3 pt-1 last:pb-0"
        >
          <span className="text-slate-500">{k}</span>
          <span className="font-medium text-slate-900 text-right w-1/2">{v || '-'}</span>
        </div>
      ))}
    </div>
  </div>
)
