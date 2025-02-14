import { EBookEditionStatus } from '~/types/enum'
import { z } from 'zod'

export enum EKeyword {
  TITLE,
  AUTHOR,
  ISBN,
  CLASSIFICATION_NUMBER,
  GENRES,
  PUBLISHER,
  TOPICAL_TERMS,
}

export const searchBooksAdvanceSchema = z
  .object({
    isMatchExact: z
      .enum(['true', 'false'])
      .transform((data) => data === 'true')
      .catch(true),
    searchWithSpecial: z
      .enum(['true', 'false'])
      .transform((data) => data === 'true')
      .catch(false),
    search: z.string().catch(''),
    pageIndex: z.coerce.number().min(1).catch(1),
    searchWithKeyword: z.nativeEnum(EKeyword).optional(),
    pageSize: z.enum(['5', '10', '30', '50', '100']).catch('5'),
    f: z
      .array(z.string())
      .or(z.string())
      .transform((data) => (Array.isArray(data) ? data : [data]))
      .catch([]),
    o: z
      .array(z.string())
      .or(z.string())
      .transform((data) => (Array.isArray(data) ? data : [data]))
      .catch([]),
    v: z
      .array(z.string())
      .or(z.string())
      .transform((data) => (Array.isArray(data) ? data : [data]))
      .catch([]),
    searchType: z.enum(['0', '1', '2']).catch('0'),
    sort: z
      .enum([
        'Title',
        '-Title',
        'SubTitle',
        '-SubTitle',
        'PublicationYear',
        '-PublicationYear',
        'CutterNumber',
        '-CutterNumber',
        'ClassificationNumber',
        '-ClassificationNumber',
        'PageCount',
        '-PageCount',
        'EstimatedPrice',
        '-EstimatedPrice',
        'TrainedAt',
        '-TrainedAt',
        'AvgReviewedRate',
        '-AvgReviewedRate',
        'CreatedAt',
        '-CreatedAt',
        'UpdatedAt',
        '-UpdatedAt',
      ])
      .optional()
      .catch(undefined),
    status: z.nativeEnum(EBookEditionStatus).optional(),
    isDeleted: z.boolean().optional(),
    title: z.string().optional(),
    author: z.string().optional(),
    isbn: z.string().optional(),
    classificationNumber: z.string().optional(),
    genres: z.string().optional(),
    publisher: z.string().optional(),
    topicalTerms: z.string().optional(),
  })
  .transform((data) => {
    data.isDeleted = false
    return data
  })

export type TSearchBooksAdvanceSchema = z.infer<typeof searchBooksAdvanceSchema>
