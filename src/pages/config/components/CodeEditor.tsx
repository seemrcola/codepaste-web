import type { Snippet } from "@/db"
import { useState, useEffect } from "react"

interface CodeEditorProps {
  currentSnippet: Snippet | null
  isFullscreen?: boolean
  onUpdateSnippet?: (snippet: Snippet) => void
  onToggleFullscreen?: () => void
}

const themes = {
  light: {
    name: '浅色',
    bg: 'bg-white',
    textColor: 'text-gray-800',
    borderColor: 'border-gray-200'
  },
  dark: {
    name: '深色',
    bg: 'bg-gray-900',
    textColor: 'text-gray-100',
    borderColor: 'border-gray-700'
  },
  blue: {
    name: '蓝色',
    bg: 'bg-blue-50',
    textColor: 'text-blue-900',
    borderColor: 'border-blue-200'
  },
  green: {
    name: '绿色',
    bg: 'bg-green-50',
    textColor: 'text-green-900',
    borderColor: 'border-green-200'
  }
}

function CodeEditor(props: CodeEditorProps) {
  console.log('render CodeEditor')
  
  const [showSettings, setShowSettings] = useState(false)
  const [fontSize, setFontSize] = useState(12)
  const [theme, setTheme] = useState('light') // 'light', 'dark', 'blue', 'green'
  const [isEditing, setIsEditing] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [editingCode, setEditingCode] = useState('')
  const [saveSuccess, setSaveSuccess] = useState(false)

  const currentTheme = themes[theme as keyof typeof themes]

  // 当 currentSnippet 变化时，重置编辑状态
  useEffect(() => {
    setIsEditing(false)
    setEditingCode('')
  }, [props.currentSnippet?.id])

  // 复制代码到剪贴板
  const handleCopyCode = async () => {
    if (!props.currentSnippet?.code) return
    
    try {
      await navigator.clipboard.writeText(props.currentSnippet.code)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000) // 2秒后隐藏提示
    } catch (err) {
      console.error('复制失败:', err)
      // 不采取降级方案 使用新版一点的浏览器就完事了
    }
  }

  // 切换编辑状态
  const handleToggleEdit = () => {
    if (!isEditing) {
      // 进入编辑模式，初始化编辑内容
      setEditingCode(props.currentSnippet?.code || '')
    } else {
      // 退出编辑模式，保存内容
      handleSaveCode()
    }
    setIsEditing(!isEditing)
  }

  // 保存代码内容
  const handleSaveCode = async () => {
    if (props.currentSnippet && props.onUpdateSnippet) {
      const updatedSnippet = {
        ...props.currentSnippet,
        code: editingCode,
        updatedAt: new Date()
      }
      await props.onUpdateSnippet(updatedSnippet)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 1500)
    }
  }

  return (
    <div className={`h-full flex flex-col transition-all duration-300 ${props.isFullscreen ? 'shadow-2xl' : ''}`}>
      {/* 头部工具栏 */}
      <div className={`flex items-center justify-between p-4 border-b border-gray-200 bg-white relative transition-all duration-300 ${
        props.isFullscreen ? 'px-6 py-5 shadow-sm' : ''
      }`}>
        <div className="flex items-center gap-3">
          <h2 className={`font-semibold text-gray-800 transition-all duration-300 ${
            props.isFullscreen ? 'text-xl' : 'text-lg'
          }`}>
            代码编辑器
          </h2>
          <span className={`px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-md font-medium transition-all duration-300 ${
            props.isFullscreen ? 'px-3 py-1.5 text-sm' : ''
          }`}>
            {props.currentSnippet?.language || 'txt'}
          </span>
          {props.isFullscreen && props.currentSnippet && (
            <span className="text-sm text-gray-500 ml-2">
              {props.currentSnippet.name}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {/* 设置按钮 */}
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
            onClick={() => setShowSettings(!showSettings)}
          >
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          
          {/* 全屏按钮 */}
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={props.onToggleFullscreen}
            title={props.isFullscreen ? "退出全屏" : "全屏显示"}
          >
            {props.isFullscreen ? (
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5M15 15h4.5M15 15v4.5m0-4.5l5.5 5.5" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            )}
          </button>
          
          {/* 编辑按钮 */}
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={handleToggleEdit}
            title={isEditing ? "退出编辑" : "编辑代码"}
          >
            {isEditing ? (
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            )}
          </button>
        </div>

        {/* 设置面板 */}
        {showSettings && (
          <div className="absolute top-full right-4 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 p-6 z-50 animate-slideDown">
            {/* 字体大小 */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">字体大小</h3>
              <div className="flex items-center justify-between bg-gray-50 rounded-full p-1">
                <button
                  onClick={() => setFontSize(Math.max(8, fontSize - 1))}
                  className="w-8 h-8 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={fontSize <= 8}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-lg font-semibold text-gray-800 min-w-[3rem] text-center">
                  {fontSize}
                </span>
                <button
                  onClick={() => setFontSize(Math.min(24, fontSize + 1))}
                  className="w-8 h-8 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={fontSize >= 24}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 背景主题 */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">背景主题</h3>
              <div className="grid grid-cols-4 gap-3">
                {Object.entries(themes).map(([key, themeConfig]) => (
                  <button
                    key={key}
                    onClick={() => setTheme(key)}
                    className={`relative p-3 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                      theme === key 
                        ? 'border-blue-400 shadow-md scale-105' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                    title={themeConfig.name}
                  >
                    <div className={`w-full h-6 rounded-lg ${themeConfig.bg} border ${themeConfig.borderColor} mb-2 shadow-inner`}></div>
                    <div className={`w-4 h-4 rounded-full mx-auto ${
                      key === 'light' ? 'bg-gray-300' :
                      key === 'dark' ? 'bg-gray-800' :
                      key === 'blue' ? 'bg-blue-400' :
                      'bg-green-400'
                    }`}></div>
                    {theme === key && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 编辑器内容区域 */}
      <div className={`flex-1 flex flex-col ${currentTheme.bg} transition-all duration-300 relative`}>
        {/* 复制成功提示 */}
        {copySuccess && (
          <div className="absolute top-4 right-4 z-10 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-slideDown">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">代码已复制</span>
            </div>
          </div>
        )}

        {/* 保存成功提示 */}
        {saveSuccess && (
          <div className="absolute top-4 right-4 z-10 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-slideDown">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">代码已保存</span>
            </div>
          </div>
        )}

        {/* 内容区域 */}
        <div className="flex-1 flex">
          {/* 内容区域 */}
          <div className="flex-1 overflow-auto better-scrollbar">
            <textarea
              className={`w-full h-full resize-none border-none outline-none font-mono leading-6 ${currentTheme.bg} ${currentTheme.textColor} transition-all duration-300 ${
                props.isFullscreen ? 'p-8' : 'p-4'
              } ${!isEditing ? 'cursor-pointer' : 'cursor-text'}`}
              style={{ 
                fontSize: `${props.isFullscreen ? Math.max(fontSize, 14) : fontSize}px`,
                lineHeight: props.isFullscreen ? '1.8' : '1.6'
              }}
              value={isEditing ? editingCode : (props.currentSnippet?.code || '')}
              onChange={isEditing ? (e) => setEditingCode(e.target.value) : undefined}
              placeholder={props.isFullscreen ? "全屏模式 - 在这里查看代码..." : "在这里输入代码..."}
              readOnly={!isEditing}
              onClick={!isEditing ? handleCopyCode : undefined}
              title={!isEditing ? "点击复制代码" : ""}
            />
          </div>
        </div>
        
        {/* 底部状态栏 */}
        <div className={`flex items-center justify-between px-4 py-2 bg-gray-50 border-t ${currentTheme.borderColor} text-sm text-gray-600 transition-all duration-300 ${
          props.isFullscreen ? 'px-8 py-3' : ''
        }`}>
          <div className="flex items-center gap-4">
            <span>{props.currentSnippet?.code?.split('\n').length || 0} 行</span>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
              {props.currentSnippet?.language || 'txt'}
            </span>
            {props.isFullscreen && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                全屏模式
              </span>
            )}
            {isEditing && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                编辑模式 - 点击✓保存
              </span>
            )}
            {!isEditing && props.currentSnippet?.code && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                点击代码区域复制
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
              字体: {props.isFullscreen ? Math.max(fontSize, 14) : fontSize}px | 主题: {currentTheme.name}
            </span>
          </div>
        </div>
      </div>

      {/* 点击外部关闭设置面板 */}
      {showSettings && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowSettings(false)}
        ></div>
      )}
    </div>
  )
}

export default CodeEditor 
