import { useState, useCallback } from 'react'
import Confirm from './Confirm'
import type { ConfirmProps, ConfirmOptions, ConfirmResult } from './type'

// Hook方式使用
export function useConfirm() {
  const [confirmProps, setConfirmProps] = useState<ConfirmProps | null>(null)

  const showConfirm = useCallback((options: ConfirmOptions): Promise<ConfirmResult> => {
    return new Promise((resolve) => {
      const props: ConfirmProps = {
        ...options,
        onConfirm: () => {
          setConfirmProps(null)
          resolve({ confirmed: true })
        },
        onCancel: () => {
          setConfirmProps(null)
          resolve({ confirmed: false })
        }
      }
      setConfirmProps(props)
    })
  }, [])

  const hideConfirm = useCallback(() => {
    setConfirmProps(null)
  }, [])

  const ConfirmComponent = confirmProps ? (
    <Confirm {...confirmProps} />
  ) : null

  return {
    showConfirm,
    hideConfirm,
    ConfirmComponent
  }
}
