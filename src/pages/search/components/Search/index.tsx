import { useState } from 'react'
import { type CodeType } from './type'
import SearchInput from './Search'
import Result from './Result'

const testData = [
  {
    id: 1,
    name: 'test',
    content: 'test'
  },
  {
    id: 2,
    name: 'test2',
    content: 'test2'
  },
  {
    id: 3,
    name: 'test3',
    content: 'test3'
  }
]

function Search() {
  const [searchQuery, setSearchQuery] = useState('')
  const code = testData // 暂时直接赋值

  // 筛选逻辑
  const filteredData =
    searchQuery
      ? code.filter((item: CodeType) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
      : []

    console.log('xxx===')

  return (
    <>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Result data={filteredData} searchQuery={searchQuery} />
    </>
  )
}

export default Search
