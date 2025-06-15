# Confirm 确认对话框组件

一个现代化、美观的确认对话框组件，支持多种使用方式和丰富的配置选项。

## 特性

- 🎨 **现代化设计** - 采用渐变色彩和精美动画
- 🔧 **多种使用方式** - 支持Hook和函数式调用
- ⚡ **异步支持** - 完美支持异步操作和loading状态
- 🎯 **类型安全** - 完整的TypeScript类型定义
- 🎭 **丰富动画** - 淡入淡出和缩放动画效果
- ⌨️ **键盘支持** - ESC键关闭，点击外部关闭
- 📱 **响应式设计** - 适配各种屏幕尺寸

## 安装

组件已经包含在项目中，直接导入使用即可：

```tsx
import { useConfirm, confirm, confirmDelete } from '@/components/ui/Confirm'
```

## 使用方式

### 1. Hook方式使用（推荐）

适合在组件内部使用，可以更好地控制状态：

```tsx
import { useConfirm } from '@/components/ui/Confirm'

function MyComponent() {
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
      // 执行删除操作
      console.log('用户确认删除')
    }
  }

  return (
    <div>
      <button onClick={handleDelete}>删除项目</button>
      {/* 必须渲染ConfirmComponent */}
      {ConfirmComponent}
    </div>
  )
}
```

### 2. 函数式调用

适合在事件处理函数或工具函数中使用：

```tsx
import { confirm } from '@/components/ui/Confirm'

const handleSave = async () => {
  const result = await confirm({
    title: '保存更改',
    message: '确定要保存当前的更改吗？',
    confirmText: '保存',
    cancelText: '取消',
    confirmButtonType: 'primary'
  })

  if (result.confirmed) {
    // 执行保存操作
  }
}
```

### 3. 便捷方法

提供了常用场景的便捷方法：

```tsx
import { confirmDelete, confirmSave, confirmAction } from '@/components/ui/Confirm'

// 删除确认
const result1 = await confirmDelete('确定要删除这个文件吗？')

// 保存确认
const result2 = await confirmSave('确定要保存当前的编辑内容吗？')

// 自定义操作确认
const result3 = await confirmAction('发布文章', '确定要发布这篇文章吗？')
```

## API 参考

### ConfirmOptions

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | - | 对话框标题 |
| message | string | - | 对话框内容 |
| confirmText | string | '确定' | 确认按钮文本 |
| cancelText | string | '取消' | 取消按钮文本 |
| confirmButtonType | 'danger' \| 'primary' \| 'success' | 'danger' | 确认按钮类型 |

### ConfirmResult

| 属性 | 类型 | 说明 |
|------|------|------|
| confirmed | boolean | 用户是否确认操作 |

### useConfirm Hook

返回对象：

| 属性 | 类型 | 说明 |
|------|------|------|
| showConfirm | (options: ConfirmOptions) => Promise<ConfirmResult> | 显示确认对话框 |
| hideConfirm | () => void | 隐藏确认对话框 |
| ConfirmComponent | React.ReactNode | 确认对话框组件（必须渲染） |

## 按钮类型样式

### danger（危险操作）
- 红色渐变背景
- 适用于删除、清空等不可逆操作

### primary（主要操作）
- 蓝色渐变背景
- 适用于保存、确认等主要操作

### success（成功操作）
- 绿色渐变背景
- 适用于完成、提交等成功操作

## 动画效果

- **遮罩层**：淡入淡出效果（0.3s）
- **对话框**：缩放进入效果（0.2s）
- **按钮**：悬停时轻微放大效果
- **加载状态**：旋转动画

## 交互特性

- **ESC键关闭**：按ESC键可关闭对话框
- **点击外部关闭**：点击遮罩层可关闭对话框
- **防止背景滚动**：对话框显示时禁止背景滚动
- **异步支持**：支持异步确认操作，自动显示loading状态

## 最佳实践

1. **使用合适的按钮类型**：
   - 删除操作使用 `danger`
   - 保存操作使用 `primary`
   - 完成操作使用 `success`

2. **提供清晰的消息**：
   - 标题简洁明了
   - 消息描述具体操作和后果

3. **异步操作处理**：
   ```tsx
   const handleAsyncOperation = async () => {
     const result = await showConfirm({
       title: '同步数据',
       message: '确定要同步数据到服务器吗？',
       confirmButtonType: 'primary'
     })

     if (result.confirmed) {
       try {
         await syncDataToServer()
         // 成功处理
       } catch (error) {
         // 错误处理
       }
     }
   }
   ```

4. **Hook方式记得渲染组件**：
   ```tsx
   // ✅ 正确
   return (
     <div>
       <button onClick={handleAction}>操作</button>
       {ConfirmComponent}
     </div>
   )

   // ❌ 错误 - 忘记渲染ConfirmComponent
   return (
     <div>
       <button onClick={handleAction}>操作</button>
     </div>
   )
   ```

## 示例

查看 `example.tsx` 文件获取完整的使用示例。 
