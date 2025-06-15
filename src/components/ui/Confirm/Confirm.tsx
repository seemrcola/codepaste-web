import { useState } from 'react'
import { Overlay } from './Overlay'
import type { ConfirmProps } from './type'

function Confirm({ 
  title, 
  message, 
  confirmText = '确定',
  cancelText = '取消',
  confirmButtonType = 'danger',
  onConfirm, 
  onCancel,
  loading = false
}: ConfirmProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [show, setShow] = useState(true)

  const handleConfirm = async () => {
    try {
      setIsLoading(true)
      await onConfirm()
      setShow(false)
    } catch (error) {
      console.error('确认操作失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setShow(false)
    onCancel()
  }

  const getConfirmButtonStyles = () => {
    const baseStyles = "px-6 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    
    switch (confirmButtonType) {
      case 'danger':
        return `${baseStyles} bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl`
      case 'primary':
        return `${baseStyles} bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl`
      case 'success':
        return `${baseStyles} bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl`
      default:
        return `${baseStyles} bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl`
    }
  }

  return (
    <Overlay show={show} onClickOutside={handleCancel}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto overflow-hidden">
        {/* 头部 */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            {/* 图标 */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              confirmButtonType === 'danger' ? 'bg-red-100' :
              confirmButtonType === 'success' ? 'bg-green-100' : 'bg-blue-100'
            }`}>
              {confirmButtonType === 'danger' ? (
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              ) : confirmButtonType === 'success' ? (
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          </div>
        </div>

        {/* 内容 */}
        <div className="px-6 py-5">
          <p className="text-gray-600 leading-relaxed">{message}</p>
        </div>

        {/* 按钮区域 */}
        <div className="px-6 py-4 bg-gray-50 flex gap-3 justify-end">
          <button
            onClick={handleCancel}
            disabled={isLoading || loading}
            className="px-6 py-2.5 rounded-lg font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {cancelText}
          </button>
          
          <button
            onClick={handleConfirm}
            disabled={isLoading || loading}
            className={getConfirmButtonStyles()}
          >
            {(isLoading || loading) ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                处理中...
              </div>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </Overlay>
  )
}

export default Confirm
