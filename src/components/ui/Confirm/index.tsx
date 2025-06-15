import { useState, useCallback } from 'react'
import { createRoot } from 'react-dom/client'
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

// 函数式调用方式
export function confirm(options: ConfirmOptions): Promise<ConfirmResult> {
  return new Promise((resolve) => {
    // 创建容器
    const container = document.createElement('div')
    document.body.appendChild(container)
    
    const root = createRoot(container)

    const cleanup = () => {
      root.unmount()
      document.body.removeChild(container)
    }

    const handleConfirm = () => {
      cleanup()
      resolve({ confirmed: true })
    }

    const handleCancel = () => {
      cleanup()
      resolve({ confirmed: false })
    }

    const props: ConfirmProps = {
      ...options,
      onConfirm: handleConfirm,
      onCancel: handleCancel
    }

    root.render(<Confirm {...props} />)
  })
  }

// 便捷方法
export const confirmDelete = (message: string = '确定要删除吗？此操作不可撤销。') => {
  return confirm({
    title: '确认删除',
    message,
    confirmText: '删除',
    cancelText: '取消',
    confirmButtonType: 'danger'
  })
}

export const confirmSave = (message: string = '确定要保存更改吗？') => {
  return confirm({
    title: '确认保存',
    message,
    confirmText: '保存',
    cancelText: '取消',
    confirmButtonType: 'primary'
  })
  }

export const confirmAction = (title: string, message: string) => {
  return confirm({
    title,
    message,
    confirmText: '确定',
    cancelText: '取消',
    confirmButtonType: 'primary'
  })
}

// 导出组件和类型
export { default as Confirm } from './Confirm'
export type { ConfirmProps, ConfirmOptions, ConfirmResult } from './type'
