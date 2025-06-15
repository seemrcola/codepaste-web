// 数据库初始化
export { initDB, getDB, closeDB, deleteDB } from './init'

// 数据库表结构和类型
export { createTables, initDefaultData } from './schema'
export type { Category, Snippet } from './schema'

// 数据库操作
export {
  // 分类操作
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
  
  // 代码片段操作
  getAllSnippets,
  getSnippetsByCategory,
  getSnippetById,
  searchSnippets,
  getSnippetsByLanguage,
  addSnippet,
  updateSnippet,
  deleteSnippet,
  deleteSnippetsByCategory,
  
  // 统计操作
  getCategoryStats,
  getLanguageStats
} from './operations'

// 配置
export { DB_NAME, DB_VERSION, STORES } from './config'

// 默认导出（包含所有功能的对象）
import initModule from './init'
import schemaModule from './schema'
import operationsModule from './operations'

export default {
  ...initModule,
  ...schemaModule,
  ...operationsModule
}
