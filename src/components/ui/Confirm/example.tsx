import { useConfirm, confirm, confirmDelete, confirmSave, confirmAction } from './index'

// Hook方式使用示例
function HookExample() {
  const { showConfirm, ConfirmComponent } = useConfirm()

  const handleDelete = async () => {
    const result = await showConfirm({
      title: '确认删除',
      message: '确定要删除这个项目吗？此操作不可撤销。',
      confirmText: '删除',
      cancelText: '取消',
      confirmButtonType: 'danger'
    })

    if (result.confirmed) {
      console.log('用户确认删除')
      // 执行删除操作
    } else {
      console.log('用户取消删除')
    }
  }

  const handleSave = async () => {
    const result = await showConfirm({
      title: '保存更改',
      message: '确定要保存当前的更改吗？',
      confirmText: '保存',
      cancelText: '取消',
      confirmButtonType: 'primary'
    })

    if (result.confirmed) {
      console.log('用户确认保存')
      // 执行保存操作
    }
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Hook方式使用</h2>
      
      <div className="space-x-4">
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          删除项目
        </button>
        
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          保存更改
        </button>
      </div>

      {/* 渲染确认对话框 */}
      {ConfirmComponent}
    </div>
  )
}

// 函数式调用示例
function FunctionExample() {
  const handleDirectCall = async () => {
    const result = await confirm({
      title: '确认操作',
      message: '这是一个直接函数调用的确认对话框。',
      confirmText: '确定',
      cancelText: '取消',
      confirmButtonType: 'primary'
    })

    if (result.confirmed) {
      console.log('用户确认操作')
    }
  }

  const handleDeleteWithHelper = async () => {
    const result = await confirmDelete('确定要删除这个文件吗？删除后无法恢复。')
    
    if (result.confirmed) {
      console.log('执行删除操作')
    }
  }

  const handleSaveWithHelper = async () => {
    const result = await confirmSave('确定要保存当前的编辑内容吗？')
    
    if (result.confirmed) {
      console.log('执行保存操作')
    }
  }

  const handleCustomAction = async () => {
    const result = await confirmAction(
      '发布文章',
      '确定要发布这篇文章吗？发布后所有用户都可以看到。'
    )
    
    if (result.confirmed) {
      console.log('执行发布操作')
    }
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">函数式调用</h2>
      
      <div className="space-x-4 space-y-2">
        <button
          onClick={handleDirectCall}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          直接调用
        </button>
        
        <button
          onClick={handleDeleteWithHelper}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          删除助手
        </button>
        
        <button
          onClick={handleSaveWithHelper}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          保存助手
        </button>
        
        <button
          onClick={handleCustomAction}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          自定义操作
        </button>
      </div>
    </div>
  )
}

// 异步操作示例
function AsyncExample() {
  const { showConfirm, ConfirmComponent } = useConfirm()

  const handleAsyncOperation = async () => {
    const result = await showConfirm({
      title: '同步数据',
      message: '确定要同步数据到服务器吗？这可能需要几分钟时间。',
      confirmText: '开始同步',
      cancelText: '取消',
      confirmButtonType: 'primary'
    })

    if (result.confirmed) {
      // 模拟异步操作
      console.log('开始同步数据...')
      
      // 这里可以显示loading状态的确认框
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('数据同步完成')
    }
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">异步操作示例</h2>
      
      <button
        onClick={handleAsyncOperation}
        className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
      >
        同步数据
      </button>

      {ConfirmComponent}
    </div>
  )
}

// 完整示例页面
export default function ConfirmExample() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Confirm 组件使用示例</h1>
        
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md">
            <HookExample />
          </div>
          
          <div className="bg-white rounded-lg shadow-md">
            <FunctionExample />
          </div>
          
          <div className="bg-white rounded-lg shadow-md">
            <AsyncExample />
          </div>
        </div>
      </div>
    </div>
  )
} 
