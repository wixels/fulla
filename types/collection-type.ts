export type Collection = {
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: false
  hasNextPage: false
  prevPage: number | null
  nextPage: number | null
}
