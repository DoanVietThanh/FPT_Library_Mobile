export enum LocalStorageKeys {
  FAVORITE = 'favorite',
  OPENING_RECENT = 'opening-recent',
  BORROW_LIBRARY_ITEM_IDS = 'borrow-library-item-Ids',
  BORROW_RESOURCE_IDS = 'borrow-resource-Ids',
}

export enum ResourceType {
  PROFILE = 'Profile',
  BOOK_IMAGE = 'BookImage',
  BOOK_AUDIO = 'BookAudio',
}

export enum ETransactionStatus {
  PENDING,
  EXPIRED,
  PAID,
  CANCELLED,
}

export enum EIssuanceMethod {
  IN_LIBRARY,
  ONLINE,
}

export enum ECardStatus {
  UNPAID,
  PENDING,
  ACTIVE,
  REJECTED,
  EXPIRED,
  SUSPENDED,
}

export enum EBorrowRequestStatus {
  CREATED, // The request is created and waiting for the user to pick up the item
  EXPIRED, // The user didn't pick up the item before ExpirationDate
  BORROWED, // The user picked up the item, and a BorrowRecord has been created
  CANCELLED, // The user cancels the request
}

export enum ERoleType {
  USER = 'User',
  EMPLOYEE = 'Employee',
}

export const ERoleTypeToIndex: Map<ERoleType, number> = new Map([
  [ERoleType.USER, 0],
  [ERoleType.EMPLOYEE, 1],
])

export const IndexToERoleType: Map<number, ERoleType> = new Map([
  [0, ERoleType.USER],
  [1, ERoleType.EMPLOYEE],
])
export enum ERole {
  STUDENT = 'Student',
  STAFF = 'Staff',
  ADMIN = 'Admin',
  TEACHER = 'Teacher',
}

export enum EFeature {
  DASHBOARD_MANAGEMENT = 0,
  USER_MANAGEMENT = 1,
  EMPLOYEE_MANAGEMENT = 2,
  ROLE_MANAGEMENT = 3,
  FINE_MANAGEMENT = 4,
  BOOK_MANAGEMENT = 5,
  BORROW_MANAGEMENT = 6,
  TRANSACTION_MANAGEMENT = 7,
  SYSTEM_CONFIGURATION_MANAGEMENT = 8,
  SYSTEM_HEALTH_MANAGEMENT = 9,
}

export enum EAccessLevel {
  ACCESS_DENIED = 0,
  VIEW = 1,
  MODIFY = 2,
  CREATE = 3,
  FULL_ACCESS = 4,
}

export enum ENotificationType {
  EVENT = 'Event',
  REMINDER = 'Reminder',
  NOTICE = 'Notice',
}

export enum EResourceBookType {
  AUDIO_BOOK = 'AudioBook',
  EBOOK = 'Ebook',
}

export enum EBookFormat {
  PAPERBACK = 'Paperback',
  HARD_COVER = 'HardCover',
}

export enum EBookCopyConditionStatus {
  GOOD = 'Good',
  WORN = 'Worn',
  DAMAGED = 'Damaged',
  // LOST = "Lost",
}

export enum ELibraryItemStatus {
  Draft = 'Draft',
  Published = 'Published',
}

export enum EVisibility {
  PUBLIC = 'Public',
  PRIVATE = 'Private',
}

export enum EBookEditionStatus {
  DRAFT = 0,
  PUBLISHED = 1,
  DELETED = 2,
}

export enum EBookCopyStatus {
  IN_SHELF = 'InShelf',
  OUT_OF_SHELF = 'OutOfShelf',
  BORROWED = 'Borrowed',
  RESERVED = 'Reserved',
  LOST = 'Lost',
  DELETED = 'Deleted',
}

export enum ESearchType {
  QUICK_SEARCH,
  BASIC_SEARCH,
  ADVANCED_SEARCH,
}

export enum EAdvancedFilterType {
  TEXT,
  DATE,
  ENUM,
  NUMBER,
}

export enum EFilterOperator {
  INCLUDES,
  EQUALS,
  NOT_EQUALS_TO,
  LESS_THAN,
  LESS_THAN_OR_EQUALS_TO,
  GREATER_THAN,
  GREATER_THAN_OR_EQUALS_TO,
}

export const filterOperatorToLabel = new Map([
  ['0', 'Includes'],
  ['1', 'Equals'],
  ['2', 'Not equals'],
  ['3', 'Less than'],
  ['4', 'Less then or equals'],
  ['5', 'Includes'],
  ['6', 'Includes'],
])

export enum EAdvancedFilterBookField {
  TITLE = 'title',
  SUBTITLE = 'subTitle',
  ADDITIONAL_AUTHORS = 'additionalAuthors',
  RESPONSIBILITY = 'responsibility',
  EDITION = 'edition',
  EDITION_NUMBER = 'editionNumber',
  LANGUAGE = 'language',
  ORIGIN_LANGUAGE = 'originLanguage',
  PUBLICATION_YEAR = 'publicationYear',
  PUBLISHER = 'publisher',
  PUBLICATION_PLACE = 'publicationPlace',
  CLASSIFICATION_NUMBER = 'classificationNumber',
  CUTTER_NUMBER = 'cutterNumber',
  ISBN = 'isbn',
  EAN = 'ean',
  PAGE_COUNT = 'pageCount',
  PHYSICAL_DETAILS = 'physicalDetails',
  DIMENSIONS = 'dimensions',
  ACCOMPANYING_MATERIAL = 'accompanyingMaterial',
  ESTIMATED_PRICE = 'estimatedPrice',
  SUMMARY = 'summary',
  GENRES = 'genres',
  TOPICAL_TERMS = 'topicalTerms',
  GENERAL_NOTE = 'generalNote',
  BIBLIOGRAPHICAL_NOTE = 'bibliographicalNote',
  STATUS = 'status',
  CAN_BORROW = 'canBorrow',
  IS_TRAINED = 'isTrained',
  TRAINED_AT = 'trainedAt',
  AVG_REVIEWED_RATE = 'avgReviewedRate',
  CREATED_AT = 'createdAt',
  CREATED_BY = 'createdBy',
  UPDATED_AT = 'updatedAt',
  UPDATED_BY = 'updatedBy',
  AUTHOR = 'author',
  CATEGORY = 'category',
  BARCODE = 'barcode',
  SHELF_NUMBER = 'shelfNumber',
}

export type TAdvancedFilters = {
  field: EAdvancedFilterBookField
  type: EAdvancedFilterType
  selections?: {
    label: string
    value: string | number
  }[]
}

export const advancedFilters: TAdvancedFilters[] = [
  { field: EAdvancedFilterBookField.TITLE, type: EAdvancedFilterType.TEXT },
  { field: EAdvancedFilterBookField.SUBTITLE, type: EAdvancedFilterType.TEXT },
  {
    field: EAdvancedFilterBookField.ADDITIONAL_AUTHORS,
    type: EAdvancedFilterType.TEXT,
  },
  {
    field: EAdvancedFilterBookField.RESPONSIBILITY,
    type: EAdvancedFilterType.TEXT,
  },
  { field: EAdvancedFilterBookField.EDITION, type: EAdvancedFilterType.TEXT },
  {
    field: EAdvancedFilterBookField.EDITION_NUMBER,
    type: EAdvancedFilterType.NUMBER,
  },
  //TODO:LANGUAGE
  { field: EAdvancedFilterBookField.LANGUAGE, type: EAdvancedFilterType.TEXT },
  //TODO:ORIGIN_LANGUAGE
  {
    field: EAdvancedFilterBookField.ORIGIN_LANGUAGE,
    type: EAdvancedFilterType.TEXT,
  },
  {
    field: EAdvancedFilterBookField.PUBLICATION_YEAR,
    type: EAdvancedFilterType.NUMBER,
  },
  {
    field: EAdvancedFilterBookField.PUBLISHER,
    type: EAdvancedFilterType.TEXT,
  },
  {
    field: EAdvancedFilterBookField.PUBLICATION_PLACE,
    type: EAdvancedFilterType.TEXT,
  },
  {
    field: EAdvancedFilterBookField.CLASSIFICATION_NUMBER,
    type: EAdvancedFilterType.TEXT,
  },
  {
    field: EAdvancedFilterBookField.CUTTER_NUMBER,
    type: EAdvancedFilterType.TEXT,
  },
  { field: EAdvancedFilterBookField.ISBN, type: EAdvancedFilterType.TEXT },
  { field: EAdvancedFilterBookField.EAN, type: EAdvancedFilterType.TEXT },
  {
    field: EAdvancedFilterBookField.PAGE_COUNT,
    type: EAdvancedFilterType.NUMBER,
  },
  {
    field: EAdvancedFilterBookField.PHYSICAL_DETAILS,
    type: EAdvancedFilterType.TEXT,
  },
  {
    field: EAdvancedFilterBookField.DIMENSIONS,
    type: EAdvancedFilterType.TEXT,
  },
  {
    field: EAdvancedFilterBookField.ACCOMPANYING_MATERIAL,
    type: EAdvancedFilterType.TEXT,
  },
  {
    field: EAdvancedFilterBookField.ESTIMATED_PRICE,
    type: EAdvancedFilterType.NUMBER,
  },
  { field: EAdvancedFilterBookField.SUMMARY, type: EAdvancedFilterType.TEXT },
  { field: EAdvancedFilterBookField.GENRES, type: EAdvancedFilterType.TEXT },
  {
    field: EAdvancedFilterBookField.TOPICAL_TERMS,
    type: EAdvancedFilterType.TEXT,
  },
  {
    field: EAdvancedFilterBookField.GENERAL_NOTE,
    type: EAdvancedFilterType.TEXT,
  },
  {
    field: EAdvancedFilterBookField.BIBLIOGRAPHICAL_NOTE,
    type: EAdvancedFilterType.TEXT,
  },
  {
    field: EAdvancedFilterBookField.AVG_REVIEWED_RATE,
    type: EAdvancedFilterType.NUMBER,
  },
  { field: EAdvancedFilterBookField.AUTHOR, type: EAdvancedFilterType.TEXT },
  //category
  { field: EAdvancedFilterBookField.CATEGORY, type: EAdvancedFilterType.TEXT },
  { field: EAdvancedFilterBookField.BARCODE, type: EAdvancedFilterType.TEXT },
  {
    field: EAdvancedFilterBookField.SHELF_NUMBER,
    type: EAdvancedFilterType.TEXT,
  },
]
