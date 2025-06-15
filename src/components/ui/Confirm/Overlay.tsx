import { useEffect } from 'react'

interface OverlayProps {
  children: React.ReactNode
  onClickOutside?: () => void
  show: boolean
}

export function Overlay({ children, onClickOutside, show }: OverlayProps) {
  // 阻止背景滚动
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [show])

  // ESC键关闭
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClickOutside) {
        onClickOutside()
      }
    }
    
    if (show) {
      document.addEventListener('keydown', handleEsc)
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [show, onClickOutside])

  if (!show) return null

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClickOutside) {
          onClickOutside()
        }
      }}
    >
      <div className="animate-scaleIn">
      {children}
      </div>
    </div>
  )
}
