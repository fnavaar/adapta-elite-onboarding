import { useState, useEffect } from 'react'
import {
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  Step6,
  type FormData,
} from '@/components/onboarding/Steps'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

const initialData: FormData = {
  name: '',
  email: '',
  vslWatched: false,
  objective: '',
  portfolio: '',
  risk: '',
}

export default function Index() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>(initialData)
  const { toast } = useToast()

  useEffect(() => {
    const saved = localStorage.getItem('adapta_onboarding_data')
    if (saved) {
      try {
        setData(JSON.parse(saved))
      } catch (e) {
        // Handle invalid JSON silently
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('adapta_onboarding_data', JSON.stringify(data))
  }, [data])

  const updateData = (newData: Partial<FormData>) => {
    setData((prev) => ({ ...prev, ...newData }))
  }

  const validateStep = () => {
    if (step === 1 && (!data.name.trim() || !data.email.trim())) {
      toast({ title: 'Preencha todos os campos', variant: 'destructive' })
      return false
    }
    if (step === 2 && !data.vslWatched) {
      toast({ title: 'Assista o vídeo completo para continuar', variant: 'destructive' })
      return false
    }
    if (step === 3 && !data.objective) {
      toast({ title: 'Selecione um objetivo', variant: 'destructive' })
      return false
    }
    if (step === 4 && !data.portfolio) {
      toast({ title: 'Selecione o volume do portfólio', variant: 'destructive' })
      return false
    }
    if (step === 5 && !data.risk) {
      toast({ title: 'Selecione seu perfil de risco', variant: 'destructive' })
      return false
    }
    return true
  }

  const handleNext = () => {
    if (!validateStep()) return
    if (step < 6) {
      setStep((s) => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      toast({
        title: 'Solicitação enviada com sucesso!',
        description: 'Nossa equipe entrará em contato em breve.',
      })
      localStorage.removeItem('adapta_onboarding_data')
      localStorage.removeItem('adapta_vsl_progress')
    }
  }

  const handlePrev = () => {
    if (step > 1) {
      setStep((s) => s - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 data={data} updateData={updateData} />
      case 2:
        return <Step2 data={data} updateData={updateData} />
      case 3:
        return <Step3 data={data} updateData={updateData} />
      case 4:
        return <Step4 data={data} updateData={updateData} />
      case 5:
        return <Step5 data={data} updateData={updateData} />
      case 6:
        return <Step6 data={data} updateData={updateData} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="w-full bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="font-bold text-xl text-primary tracking-tight">Adapta Elite</div>
          <div className="text-sm font-medium text-slate-500">Etapa {step} de 6</div>
        </div>
        <div className="max-w-3xl mx-auto mt-4">
          <Progress value={(step / 6) * 100} className="h-2" />
        </div>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-8 flex flex-col justify-center py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 flex-1 min-h-[400px] animate-in fade-in slide-in-from-bottom-4 duration-500">
          {renderStep()}
        </div>

        <div className="flex items-center justify-between mt-8 pb-10">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrev}
            className={cn('h-14 px-6 text-base shadow-sm', step === 1 && 'invisible')}
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Voltar
          </Button>

          <div className="relative">
            <Button
              size="lg"
              onClick={handleNext}
              className={cn(
                'h-14 px-8 text-base transition-all duration-500',
                step === 2 && !data.vslWatched
                  ? 'bg-slate-200 text-slate-500 hover:bg-slate-300 shadow-none border border-slate-300'
                  : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg hover:-translate-y-0.5',
              )}
            >
              {step === 6 ? 'Finalizar' : 'Continuar'}
              {step !== 6 && <ChevronRight className="ml-2 h-5 w-5" />}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
