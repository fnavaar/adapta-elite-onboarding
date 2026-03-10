import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertCircle, RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-[#0C0C0D] to-[#191919] flex items-center justify-center p-4 font-sans text-foreground">
          <div className="bg-[#111111] p-8 rounded-2xl shadow-elevation border border-[#333333] max-w-md w-full text-center space-y-4 animate-fade-in-up">
            <div className="mx-auto w-12 h-12 bg-destructive/10 text-destructive border border-destructive/20 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-foreground font-display">Algo deu errado</h1>
            <p className="text-muted-foreground">
              Ocorreu um erro inesperado na aplicação. Nossa equipe já foi notificada.
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

    return this.props.children
  }
}
