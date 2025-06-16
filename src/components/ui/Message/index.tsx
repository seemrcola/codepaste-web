import { createRoot, type Root } from 'react-dom/client'
import Message, { type MessageType } from './Message'

let currentMessageContainer: HTMLDivElement | null = null
let currentRoot: Root | null = null

// 清除当前消息
const clearCurrentMessage = () => {
  if (currentRoot && currentMessageContainer) {
    currentRoot.unmount()
    document.body.removeChild(currentMessageContainer)
    currentMessageContainer = null
    currentRoot = null
  }
}

// 显示消息
const showMessage = (type: MessageType, content: string, duration: number = 3000) => {
  // 清除之前的消息
  clearCurrentMessage()

  // 创建容器
  currentMessageContainer = document.createElement('div')
  document.body.appendChild(currentMessageContainer)

  // 创建 React root
  currentRoot = createRoot(currentMessageContainer)

  // 渲染消息
  currentRoot.render(
    <Message
      id="current-message"
      type={type}
      content={content}
      duration={duration}
      onClose={clearCurrentMessage}
    />
  )

  // 自动清除
  setTimeout(() => {
    clearCurrentMessage()
  }, duration)
}

// 便捷的全局调用函数
export const message = {
  success: (content: string, duration?: number) => {
    showMessage('success', content, duration)
  },
  error: (content: string, duration?: number) => {
    showMessage('error', content, duration)
  },
  warning: (content: string, duration?: number) => {
    showMessage('warning', content, duration)
  },
  info: (content: string, duration?: number) => {
    showMessage('info', content, duration)
  }
}
