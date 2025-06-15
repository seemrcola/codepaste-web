import { useState, useEffect } from 'react'
import SearchInput from './Search'
import Result from './Result'
import { getAllSnippets, type Snippet } from '@/db'

function Search() {
  const [searchQuery, setSearchQuery] = useState('')
  const [snippets, setSnippets] = useState<Snippet[]>([])

  const fetchSnippets = async () => {
    const snippets = await getAllSnippets()
    setSnippets(snippets)
  }

  useEffect(() => {
    fetchSnippets()
  }, [])

  // 筛选逻辑
  const filteredData =
    searchQuery
      ? snippets.filter((item: Snippet) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase())
      )
      : []

  return (
    <>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Result data={filteredData} searchQuery={searchQuery} />
    </>
  )
}

export default Search
