import { useQuery } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth-provider'
import { http } from '~/lib/http'
import { TSearchBooksAdvanceSchema } from '~/lib/validations/book/search-books-advance'
import { Author, BookEdition, Category, LibraryItemAuthor, Shelf } from '~/types/models'

export type BookEditions = (BookEdition & {
  category: Category
  libraryItemAuthors: (LibraryItemAuthor & { author: Author })[]
  shelf: Shelf | null
})[]

export type TResponse = {
  libraryItems: BookEditions
  pageIndex: number
  pageSize: number
  totalPage: number
  totalActualResponse: number
}

function useSearchBooksAdvance(searchParams: TSearchBooksAdvanceSchema) {
  const { accessToken } = useAuth()
  return useQuery({
    queryKey: [`search-books-advance`, searchParams, accessToken],
    queryFn: async (): Promise<TResponse> => {
      try {
        if (!accessToken) throw Error('')

        const { data } = await http.get<TResponse>(`/api/library-items/q`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          searchParams,
        })

        return data
      } catch {
        return {
          libraryItems: [],
          pageIndex: searchParams.pageIndex,
          pageSize: +searchParams.pageSize,
          totalActualResponse: 0,
          totalPage: 0,
        }
      }
    },
  })
}

export default useSearchBooksAdvance
