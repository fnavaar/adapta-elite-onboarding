import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Calendar, CalendarDays, Loader2, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { StepProps } from './Steps'

export const Step7 = ({ data }: StepProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [meetingId, setMeetingId] = useState<string | null>(
    localStorage.getItem('adapta_meeting_id'),
  )
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [isLoadingCalendar, setIsLoadingCalendar] = useState(false)
  const [isScheduling, setIsScheduling] = useState(false)
  const { toast } = useToast()

  const handleOpenCalendar = async () => {
    setIsLoadingCalendar(true)
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.8) reject(new Error('Calendar load error'))
          resolve(true)
        }, 800)
      })
      setIsModalOpen(true)
    } catch (e) {
      toast({
        title: 'Erro',
        description: 'Não foi possível abrir o calendário. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setIsLoadingCalendar(false)
    }
  }

  const handleSchedule = async () => {
    if (!selectedDate || !selectedTime) return
    setIsScheduling(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const newMeetingId = 'MTG-' + Math.random().toString(36).substring(2, 9).toUpperCase()
      localStorage.setItem('adapta_meeting_id', newMeetingId)
      setMeetingId(newMeetingId)
      setIsModalOpen(false)
      toast({
        title: 'Consulta agendada com sucesso!',
        className: 'bg-primary/10 border-primary/20 text-primary',
      })
    } catch (e) {
      toast({
        title: 'Erro no agendamento',
        description: 'Não foi possível concluir o agendamento. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setIsScheduling(false)
    }
  }

  if (meetingId) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 text-center py-8">
        <div className="mx-auto w-16 h-16 bg-primary/10 text-primary border border-primary/20 rounded-full flex items-center justify-center mb-6 shadow-glow">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display">Consulta Confirmada!</h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Sua consultoria foi agendada com sucesso. Nossa equipe entrará em contato em breve.
        </p>
        <div className="mt-8 p-6 bg-[#111111]/80 rounded-[8px] border border-[#333333] max-w-sm mx-auto shadow-elevation hover:-translate-y-1 transition-all duration-300 ease-in-out">
          <div className="text-sm text-muted-foreground mb-1 font-medium">ID da Reunião</div>
          <div className="text-2xl font-mono font-bold text-primary tracking-wider">
            {meetingId}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 text-center py-8">
      <div className="mx-auto w-16 h-16 bg-[#111111] text-primary border border-[#333333] rounded-full flex items-center justify-center mb-6 shadow-elevation">
        <Calendar className="w-8 h-8" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold font-display">Tudo certo com seus dados!</h2>
      <p className="text-muted-foreground text-lg max-w-md mx-auto">
        Agora, escolha o melhor horário para conversarmos sobre suas necessidades e objetivos.
      </p>

      <div className="pt-8 flex justify-center">
        <Button
          size="lg"
          className="h-14 px-8 text-lg w-full max-w-sm"
          onClick={handleOpenCalendar}
          disabled={isLoadingCalendar}
        >
          {isLoadingCalendar ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <CalendarDays className="mr-2 h-5 w-5" />
          )}
          Agendar Consultoria
        </Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] p-6 bg-[#0C0C0D] border-[#333333] rounded-[8px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-display text-primary">
              Escolha um horário
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground">
              Selecione a data e horário de sua preferência para a consultoria.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-medium text-foreground">Data</Label>
              <div className="grid grid-cols-3 gap-2">
                {['Hoje', 'Amanhã', 'Depois'].map((d) => (
                  <Button
                    key={d}
                    variant={selectedDate === d ? 'default' : 'outline'}
                    className={cn('h-12 text-sm sm:text-base transition-all duration-300')}
                    onClick={() => setSelectedDate(d)}
                  >
                    {d}
                  </Button>
                ))}
              </div>
            </div>
            {selectedDate && (
              <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label className="text-base font-medium text-foreground">Horário</Label>
                <div className="grid grid-cols-3 gap-2">
                  {['09:00', '10:30', '14:00', '15:30', '17:00'].map((t) => (
                    <Button
                      key={t}
                      variant={selectedTime === t ? 'default' : 'outline'}
                      className={cn(
                        'h-12 text-sm sm:text-base font-display tracking-wide transition-all duration-300',
                      )}
                      onClick={() => setSelectedTime(t)}
                    >
                      {t}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="sm:justify-between gap-3">
            <Button variant="outline" className="h-11 flex-1" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              className="h-11 flex-1 transition-all duration-300"
              disabled={!selectedDate || !selectedTime || isScheduling}
              onClick={handleSchedule}
            >
              {isScheduling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isScheduling ? 'Confirmando...' : 'Confirmar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
