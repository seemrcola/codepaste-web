export interface ConfirmProps {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  confirmButtonType?: 'danger' | 'primary' | 'success'
  onConfirm: () => void | Promise<void>
  onCancel: () => void
  loading?: boolean
}

export interface ConfirmOptions {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  confirmButtonType?: 'danger' | 'primary' | 'success'
}

export interface ConfirmResult {
  confirmed: boolean
}
