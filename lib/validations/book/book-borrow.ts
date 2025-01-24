import { z } from 'zod'

export enum BORROW_OPTIONS {
  LIBRARY = 'library',
  REQUEST = 'request',
}

export const bookLibraryBorrowSchema = z.object({
  borrowOption: z.enum([BORROW_OPTIONS.LIBRARY, BORROW_OPTIONS.REQUEST]),
  returnDate: z.string().trim().min(1, 'required'),
  bookSerialNo: z.string().trim().min(6, 'min6'),
  description: z.string().trim().min(6, 'min6'),
})

export const bookRequestBorrowSchema = z.object({
  borrowOption: z.enum([BORROW_OPTIONS.LIBRARY, BORROW_OPTIONS.REQUEST]),
  borrowDateRange: z.array(z.string().trim().min(1, 'required')),
  borrowPickupDate: z.string().trim().min(1, 'required'),
  borrowReturnDate: z.string().trim().min(1, 'required'),
  searchBook: z.string().trim().min(1, 'required'),
  description: z.string().trim().min(6, 'min6'),
})

export type TBookLibraryBorrowSchema = z.infer<typeof bookLibraryBorrowSchema>

export type TBookRequestBorrowSchema = z.infer<typeof bookRequestBorrowSchema>
