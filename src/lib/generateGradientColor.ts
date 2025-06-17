const colors: string[] = [
  // 原始列表 (100-200)
  'from-blue-100 to-blue-200',
  'from-purple-100 to-purple-200',
  'from-green-100 to-green-200',
  'from-yellow-100 to-yellow-200',
  'from-pink-100 to-pink-200',
  'from-indigo-100 to-indigo-200',
  'from-red-100 to-red-200',
  'from-teal-100 to-teal-200',
  'from-orange-100 to-orange-200',
  'from-cyan-100 to-cyan-200',

  // 新增颜色，使用 100-200 渐变
  'from-gray-100 to-gray-200',
  'from-slate-100 to-slate-200',
  'from-zinc-100 to-zinc-200',
  'from-neutral-100 to-neutral-200',
  'from-stone-100 to-stone-200',
  'from-lime-100 to-lime-200',
  'from-emerald-100 to-emerald-200',
  'from-sky-100 to-sky-200',
  'from-violet-100 to-violet-200',
  'from-fuchsia-100 to-fuchsia-200',
  'from-rose-100 to-rose-200',
  'from-amber-100 to-amber-200',

  // 现有颜色，使用 50-100 渐变 (更浅)
  'from-blue-50 to-blue-100',
  'from-purple-50 to-purple-100',
  'from-green-50 to-green-100',
  'from-yellow-50 to-yellow-100',
  'from-pink-50 to-pink-100',
  'from-red-50 to-red-100',
  'from-teal-50 to-teal-100',
  'from-orange-50 to-orange-100',
  'from-cyan-50 to-cyan-100',
  'from-indigo-50 to-indigo-100',

  // 新增颜色，使用 50-100 渐变 (更浅)
  'from-gray-50 to-gray-100',
  'from-slate-50 to-slate-100',
  'from-zinc-50 to-zinc-100',
  'from-neutral-50 to-neutral-100',
  'from-stone-50 to-stone-100',
  'from-lime-50 to-lime-100',
  'from-emerald-50 to-emerald-100',
  'from-sky-50 to-sky-100',
  'from-violet-50 to-violet-100',
  'from-fuchsia-50 to-fuchsia-100',
  'from-rose-50 to-rose-100',
  'from-amber-50 to-amber-100',

  // 现有颜色，使用 100-300 渐变 (略微更明显，但仍保持明亮)
  'from-blue-100 to-blue-300',
  'from-purple-100 to-purple-300',
  'from-green-100 to-green-300',
  'from-yellow-100 to-yellow-300',
  'from-pink-100 to-pink-300',
  'from-indigo-100 to-indigo-300',
  'from-red-100 to-red-300',
  'from-teal-100 to-teal-300',
  'from-orange-100 to-orange-300',
  'from-cyan-100 to-cyan-300',

  // 新增颜色，使用 100-300 渐变 (略微更明显，但仍保持明亮)
  'from-gray-100 to-gray-300',
  'from-slate-100 to-slate-300',
  'from-zinc-100 to-zinc-300',
  'from-neutral-100 to-neutral-300',
  'from-stone-100 to-stone-300',
  'from-lime-100 to-lime-300',
  'from-emerald-100 to-emerald-300',
  'from-sky-100 to-sky-300',
  'from-violet-100 to-violet-300',
  'from-fuchsia-100 to-fuchsia-300',
  'from-rose-100 to-rose-300',
  'from-amber-100 to-amber-300',

  // 混合色阶，例如 50-200 (更宽的浅色渐变范围)
  'from-blue-50 to-blue-200',
  'from-purple-50 to-purple-200',
  'from-green-50 to-green-200',
  'from-yellow-50 to-yellow-200',
  'from-pink-50 to-pink-200',
  'from-indigo-50 to-indigo-200',
  'from-red-50 to-red-200',
  'from-teal-50 to-teal-200',
  'from-orange-50 to-orange-200',
  'from-cyan-50 to-cyan-200',
  'from-gray-50 to-gray-200',
  'from-slate-50 to-slate-200',
  'from-zinc-50 to-zinc-200',
  'from-neutral-50 to-neutral-200',
  'from-stone-50 to-stone-200',
  'from-lime-50 to-lime-200',
  'from-emerald-50 to-emerald-200',
  'from-sky-50 to-sky-200',
  'from-violet-50 to-violet-200',
  'from-fuchsia-50 to-fuchsia-200',
  'from-rose-50 to-rose-200',
  'from-amber-50 to-amber-200',
];


/**
 * 根据字符串生成一个哈希值，并映射到颜色数组的索引
 * 这个函数是核心的散列逻辑，确保了确定性。
 * @param {string} str - 用于生成哈希值的字符串（例如目录名）
 * @param {number} colorsLength - 颜色数组的长度
 * @returns {number} 颜色数组的索引
 */
function getHashColorIndex(str: string, colorsLength: number) {
  let hash = 0;
  // 如果字符串为空，返回0，或者你可以选择一个特定的默认索引
  if (str.length === 0) {
    return 0;
  }

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i); // 获取字符的Unicode值
    // 经典的哈希算法：hash = hash * 31 + char
    // ((hash << 5) - hash) 等同于 hash * 31，是位运算优化
    hash = ((hash << 5) - hash) + char;
    // 确保哈希值在JavaScript的32位整数范围内，并转换为有符号整数
    hash |= 0;
  }

  // 取绝对值，确保结果是非负数，然后对颜色数组长度取模
  return Math.abs(hash) % colorsLength;
}

/**
 * 根据目录名返回一个固定的渐变颜色类名。
 * 相同的目录名将始终返回相同的颜色。
 * @param {string} categoryName - 目录名字符串
 * @returns {string} 对应的 Tailwind CSS 渐变颜色类名
 */
export function generateGradientColor(categoryName: string) {
  // 使用哈希函数获取对应的颜色索引
  const index = getHashColorIndex(categoryName, colors.length);
  // 返回颜色数组中对应索引的颜色类名
  return colors[index];
}
