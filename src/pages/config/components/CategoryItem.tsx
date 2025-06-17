import { useGradientColor } from "@/hooks/useGradientColor.ts";
import DeleteIcon from "@/pages/config/components/svg/DeleteIcon.tsx";
import type { Category } from "@/db";

interface CategoryItemProps {
  category: Category;
  onSelectCategory: (category: Category) => void;
  currentCategory: Category | null;
  editingCategoryId: number | null;
  editingCategoryName: string;
  setEditingCategoryName: (name: string) => void;
  handleStartEdit: (category: Category) => void;
  handleSaveEdit: () => void;
  handleCancelEdit: () => void;
  handleDeleteCategory: (category: Category) => Promise<void>;
}

export default function CategoryItem({ category,
   onSelectCategory,
   currentCategory,
   editingCategoryId,
   editingCategoryName,
   setEditingCategoryName,
   handleSaveEdit,
   handleCancelEdit,
   handleStartEdit,
   handleDeleteCategory
}: CategoryItemProps) {
  const gradientColor = useGradientColor(category.name)
  const isCurrentCategory = currentCategory?.id === category.id
  return (
    <div
      key={category.id}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-r bg-white border cursor-pointer group transition-all duration-300 ${
        isCurrentCategory
          ? 'border-gray-200 shadow-lg shadow-gray-200/50 -translate-y-0.5'
          : 'border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-0.5'
      }`}
      onClick={() => onSelectCategory(category)}
    >
      {/* 背景渐变层 */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradientColor} transition-opacity duration-300 ${
        isCurrentCategory ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`}></div>

      {/* 内容层 */}
      <div className="relative flex items-center gap-3 p-4">
        <div className={`min-w-10 min-h-10 rounded-xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-gray-700 font-semibold text-sm shadow-sm transition-all duration-300 ${
          isCurrentCategory ? 'shadow-md scale-110' : 'group-hover:shadow-md group-hover:scale-110'
        }`}>
          {category.name.slice(0, 1).toUpperCase()}
        </div>

        <div className="flex-1">
          {editingCategoryId === category.id ? (
            <input
              type="text"
              value={editingCategoryName}
              onChange={(e) => setEditingCategoryName(e.target.value)}
              onBlur={handleSaveEdit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSaveEdit()
                }
                if (e.key === 'Escape') {
                  handleCancelEdit()
                }
              }}
              className="w-full px-2 py-1 text-gray-800 bg-white border border-blue-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
              autoFocus
            />
          ) : (
            <div
              className={`font-medium transition-colors duration-300 cursor-pointer max-w-24 truncate ${
                isCurrentCategory ? 'text-gray-800' : 'text-gray-700 group-hover:text-gray-800'
              }`}
              onDoubleClick={() => handleStartEdit(category)}
            >
              {category.name}
            </div>
          )}
        </div>

        {/* 删除按钮 - 只在hover时显示 */}
        <button
          className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-100 rounded-lg transition-all duration-200 transform hover:scale-110 hover:rotate-12"
          onClick={(e) => {
            e.stopPropagation()
            handleDeleteCategory(category)
          }}
        >
          <DeleteIcon className="w-5 h-5 text-red-500" />
        </button>
      </div>

      {/* 底部装饰线 */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${gradientColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
    </div>
  )
}