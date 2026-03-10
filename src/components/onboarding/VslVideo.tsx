import { useState, useRef, useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AspectRatio } from '@/components/ui/aspect-ratio'

interface VslVideoProps {
  isCompleted: boolean
  onComplete: () => void
}

export function VslVideo({ isCompleted, onComplete }: VslVideoProps) {
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget
    localStorage.setItem('adapta_vsl_progress', video.currentTime.toString())

    if (video.duration) {
      const progress = video.currentTime / video.duration
      if (progress >= 0.98 && !isCompleted) {
        onComplete()
      }
    }
  }

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget
    const savedProgress = localStorage.getItem('adapta_vsl_progress')
    if (savedProgress) {
      const time = parseFloat(savedProgress)
      if (time > 0 && time < video.duration) {
        video.currentTime = time
      }
    }
  }

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const target = e.currentTarget
    if (!target.error) return

    switch (target.error.code) {
      case target.error.MEDIA_ERR_NETWORK:
        setError('Verifique sua conexão de internet.')
        break
      case target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
        setError('Você não tem permissão para acessar este vídeo.')
        break
      default:
        setError('Não foi possível carregar o vídeo. Tente novamente.')
    }
  }

  useEffect(() => {
    const progress = localStorage.getItem('adapta_vsl_progress')
    if (progress && videoRef.current && isCompleted) {
      // Small visual assurance on load if already completed
      videoRef.current.currentTime = parseFloat(progress)
    }
  }, [isCompleted])

  if (error) {
    return (
      <Alert
        variant="destructive"
        className="mb-4 bg-destructive/10 border-destructive/20 text-destructive"
      >
        <AlertCircle className="h-4 w-4" color="currentColor" />
        <AlertTitle>Erro na reprodução</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="w-full max-w-[600px] mx-auto rounded-2xl overflow-hidden shadow-elevation border border-[#333333] bg-[#0C0C0D] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
      <AspectRatio ratio={16 / 9}>
        <video
          ref={videoRef}
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
          controls
          className="w-full h-full object-cover bg-black"
          controlsList="nodownload"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleError}
        />
      </AspectRatio>
    </div>
  )
}
