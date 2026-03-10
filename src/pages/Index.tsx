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
import { ChevronRight, ChevronLeft, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

const initialData: FormData = {
  profession: '',
  useCases: [],
  additionalData: {
    name: '',
    email: '',
    vslWatched: false,
    portfolio: '',
    risk: '',
  },
}

export default function Index() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>(initialData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const saved = localStorage.getItem('adapta_onboarding_data')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Ensure nested structure is maintained
        setData({
          ...initialData,
          ...parsed,
          additionalData: {
            ...initialData.additionalData,
            ...(parsed.additionalData || {}),
          },
        })
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

  const updateAdditionalData = (newAdditional: Partial<FormData['additionalData']>) => {
    setData((prev) => ({
      ...prev,
      additionalData: { ...prev.additionalData, ...newAdditional },
    }))
  }

  const validateStep = () => {
    const { name, email, vslWatched, portfolio, risk } = data.additionalData

    if (step === 1) {
      if (!name.trim()) {
        toast({
          title: 'Campo obrigatório',
          description: 'O nome é obrigatório.',
          variant: 'destructive',
        })
        return false
      }
      if (name.trim().length < 3) {
        toast({
          title: 'Nome inválido',
          description: 'O nome deve ter pelo menos 3 caracteres.',
          variant: 'destructive',
        })
        return false
      }
      if (!email.trim()) {
        toast({
          title: 'Campo obrigatório',
          description: 'O e-mail é obrigatório.',
          variant: 'destructive',
        })
        return false
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        toast({
          title: 'E-mail inválido',
          description: 'Insira um e-mail válido.',
          variant: 'destructive',
        })
        return false
      }
    }
    if (step === 2 && !vslWatched) {
      toast({
        title: 'Atenção',
        description: 'Assista o vídeo completo para continuar',
        variant: 'destructive',
      })
      return false
    }
    if (step === 3 && !data.profession) {
      toast({
        title: 'Campo obrigatório',
        description: 'Selecione sua profissão para continuar',
        variant: 'destructive',
      })
      return false
    }
    if (step === 4 && (!data.useCases || data.useCases.length === 0)) {
      toast({
        title: 'Campo obrigatório',
        description: 'Selecione pelo menos um caso de uso',
        variant: 'destructive',
      })
      return false
    }
    if (step === 5) {
      if (!portfolio) {
        toast({
          title: 'Campo obrigatório',
          description: 'Selecione o volume do portfólio',
          variant: 'destructive',
        })
        return false
      }
      if (!risk) {
        toast({
          title: 'Campo obrigatório',
          description: 'Selecione seu perfil de risco',
          variant: 'destructive',
        })
        return false
      }
    }
    return true
  }

  const handleNext = async () => {
    if (!validateStep()) return

    if (step < 6) {
      setStep((s) => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setIsSubmitting(true)
      try {
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            // Simulated 10% chance of failure for realistic error handling
            if (Math.random() > 0.9) {
              reject(new Error('Network error'))
            } else {
              resolve(true)
            }
          }, 1500)
        })

        toast({
          title: 'Solicitação enviada com sucesso!',
          description: 'Nossa equipe entrará em contato em breve.',
          className: 'bg-green-50 border-green-200 text-green-800',
        })
        localStorage.removeItem('adapta_onboarding_data')
        localStorage.removeItem('adapta_vsl_progress')
        setData(initialData)
        setStep(1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } catch (e) {
        toast({
          title: 'Erro de conexão',
          description: 'Não foi possível salvar. Tente novamente.',
          variant: 'destructive',
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handlePrev = () => {
    if (step > 1) {
      setStep((s) => s - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const renderStep = () => {
    const props = { data, updateData, updateAdditionalData }
    switch (step) {
      case 1:
        return <Step1 {...props} />
      case 2:
        return <Step2 {...props} />
      case 3:
        return <Step3 {...props} />
      case 4:
        return <Step4 {...props} />
      case 5:
        return <Step5 {...props} />
      case 6:
        return <Step6 {...props} />
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
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 flex-1 min-h-[400px]">
          {renderStep()}
        </div>

        <div className="flex items-center justify-between mt-8 pb-10">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrev}
            disabled={isSubmitting}
            className={cn('h-14 px-6 text-base shadow-sm', step === 1 && 'invisible')}
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Voltar
          </Button>

          <Button
            size="lg"
            onClick={handleNext}
            disabled={isSubmitting}
            className={cn(
              'h-14 px-8 text-base transition-all duration-500',
              step === 2 && !data.additionalData.vslWatched
                ? 'bg-slate-200 text-slate-500 hover:bg-slate-300 shadow-none border border-slate-300'
                : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg hover:-translate-y-0.5',
            )}
          >
            {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {!isSubmitting && step === 6
              ? 'Finalizar'
              : !isSubmitting
                ? 'Continuar'
                : 'Enviando...'}
            {!isSubmitting && step !== 6 && <ChevronRight className="ml-2 h-5 w-5" />}
          </Button>
        </div>
      </main>
    </div>
  )
}
