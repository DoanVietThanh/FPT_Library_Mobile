export enum EAdvancedFilterType {
  TEXT = 'text',
  DATE_TIME = 'date',
  NORMAL_SELECTION = 'normal-selection',
  ENUM_SELECTION = 'enum-selection',
  RANGE_NUMBER = 'range-number',
}

export enum EAdvancedFilterBookFields {
  TITLE = 'Title',
  EDITION = 'Edition',
  AUTHOR = 'Author',
  BOOK_FORMAT = 'Book format',
  CATEGORY = 'Category',
  FLOOR = 'Floor',
  SHELF = 'Shelf',
  AVAILABLE_QUANTITY = 'Available quantity',
  PUBLISHER = 'Publisher',
  PUBLICATION_YEAR = 'Publication year',
  PAGE_COUNT = 'Page count',
  LANGUAGE = 'Language',
  ISBN = 'ISBN',
  COPY_CODE = 'Copy Code',
}

export enum FilterOperator {
  INCLUDES = 'includes',
  EQUAL = 'equal',
  NOT_EQUAL = 'not-equal',
  LESS_THAN = 'less-than',
  LESS_THAN_OR_EQUAL = 'less-than-or-equal',
  GREATER_THAN = 'greater-than',
  GREATER_THAN_OR_EQUAL = 'greater-than-or-equal',
}

export type TAdvancedFilters = {
  field: EAdvancedFilterBookFields
  type: EAdvancedFilterType
  selections?: {
    label: string
    value: string
  }[]
}

export const AdvancedFilters: TAdvancedFilters[] = [
  {
    field: EAdvancedFilterBookFields.TITLE,
    type: EAdvancedFilterType.TEXT,
  },
  {
    field: EAdvancedFilterBookFields.PUBLISHER,
    type: EAdvancedFilterType.TEXT,
  },
  {
    field: EAdvancedFilterBookFields.ISBN,
    type: EAdvancedFilterType.TEXT,
  },
  {
    field: EAdvancedFilterBookFields.COPY_CODE,
    type: EAdvancedFilterType.TEXT,
  },
  {
    field: EAdvancedFilterBookFields.AUTHOR,
    type: EAdvancedFilterType.TEXT,
  },
  {
    field: EAdvancedFilterBookFields.PUBLICATION_YEAR,
    type: EAdvancedFilterType.DATE_TIME,
  },

  /**
   * F: PUBLICATION_YEAR
   * V: "null,2025-01-01"
   * O: 0-5
   */

  {
    field: EAdvancedFilterBookFields.AVAILABLE_QUANTITY,
    type: EAdvancedFilterType.RANGE_NUMBER,
  },
  {
    field: EAdvancedFilterBookFields.EDITION,
    type: EAdvancedFilterType.RANGE_NUMBER,
  },

  {
    field: EAdvancedFilterBookFields.PAGE_COUNT,
    type: EAdvancedFilterType.RANGE_NUMBER,
  },
  {
    field: EAdvancedFilterBookFields.LANGUAGE,
    type: EAdvancedFilterType.NORMAL_SELECTION,
    selections: [
      {
        label: 'English',
        value: 'English',
      },
      {
        label: 'French',
        value: 'French',
      },
      {
        label: 'Spanish',
        value: 'Spanish',
      },
    ],
  },
  {
    field: EAdvancedFilterBookFields.BOOK_FORMAT,
    type: EAdvancedFilterType.NORMAL_SELECTION,
    selections: [
      {
        label: 'Hardcover',
        value: 'Hardcover',
      },
      {
        label: 'Paperback',
        value: 'Paperback',
      },
      {
        label: 'Ebook',
        value: 'Ebook',
      },
    ],
  },
  {
    field: EAdvancedFilterBookFields.CATEGORY,
    type: EAdvancedFilterType.NORMAL_SELECTION,
    selections: [
      {
        label: 'Fiction',
        value: 'Fiction',
      },
      {
        label: 'Non-fiction',
        value: 'Non-fiction',
      },
      {
        label: 'Manga',
        value: 'Manga',
      },
    ],
  },
  {
    field: EAdvancedFilterBookFields.FLOOR,
    type: EAdvancedFilterType.ENUM_SELECTION,
    selections: [
      {
        label: 'Floor 1',
        value: 'Floor 1',
      },
      {
        label: 'Floor 2',
        value: 'Floor 2',
      },
      {
        label: 'Floor 3',
        value: 'Floor 3',
      },
    ],
  },
  {
    field: EAdvancedFilterBookFields.SHELF,
    type: EAdvancedFilterType.ENUM_SELECTION,
    selections: [
      {
        label: 'Shelf 1',
        value: 'Shelf 1',
      },
      {
        label: 'Shelf 2',
        value: 'Shelf 2',
      },
      {
        label: 'Shelf 3',
        value: 'Shelf 3',
      },
    ],
  },
]
