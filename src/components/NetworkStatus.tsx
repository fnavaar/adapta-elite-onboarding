import { useState, useEffect } from 'react'
import { WifiOff, RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function NetworkStatus({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!isOnline) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0C0C0D] to-[#191919] flex items-center justify-center p-4 font-sans text-foreground">
        <div className="bg-[#111111] p-8 rounded-2xl shadow-elevation border border-[#333333] max-w-md w-full text-center space-y-4 animate-fade-in-up">
          <div className="mx-auto w-12 h-12 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full flex items-center justify-center mb-4">
            <WifiOff className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-foreground font-display">Sem conexão</h1>
          <p className="text-muted-foreground">
            Você parece estar offline. Verifique sua conexão com a internet e tente novamente.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="w-full h-12 text-lg mt-6 font-display"
          >
            <RefreshCcw className="mr-2 h-5 w-5" />
            Tentar Novamente
          </Button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
