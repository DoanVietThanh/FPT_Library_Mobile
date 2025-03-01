import {
  EBookCopyStatus,
  EBookEditionStatus,
  EBookFormat,
  ENotificationType,
  EResourceBookType,
} from './enum'

export type User = {
  userId: string
  email: string
  firstName: string
  lastName: string
  dob: string
  phone: string
  avatar: string
  isActive: boolean
}

export type Notification = {
  notificationId: number
  title: string
  message: string
  isPublic: boolean
  createDate: Date
  createdBy: string
  notificationType: ENotificationType
  notificationRecipients: []
}

export type Category = {
  categoryId: number
  prefix: string
  englishName: string
  vietnameseName: string
  description: string | null
  isAllowAITraining: boolean
}

export type BookEdition = {
  libraryItemId: number
  title: string
  subTitle: string | null
  responsibility: string | null
  edition: string | null
  editionNumber: number | null
  language: string | null
  originLanguage: string | null
  summary: string | null
  coverImage: string | null
  publicationYear: number | null
  publisher: string | null
  publicationPlace: string | null
  classificationNumber: string | null
  cutterNumber: string | null
  isbn: string | null
  ean: string | null
  estimatedPrice: number | null
  pageCount: number | null
  physicalDetails: string | null
  dimensions: string | null
  accompanyingMaterial: string | null
  genres: string | null
  generalNote: string | null
  bibliographicalNote: string | null
  topicalTerms: string | null
  additionalAuthors: string | null
  avgReviewedRate: number | null
  categoryId: number
  shelfId: number | null
  groupId: number | null
  status: EBookEditionStatus
  isDeleted: boolean
  canBorrow: boolean
  isTrained: boolean
  trainedAt: Date | null
  createdAt: Date
  updatedAt: Date | null
  createdBy: string
  updatedBy: string | null
}

export type LibraryItem = {
  libraryItemId: number
  title: string
  subTitle: string | null
  responsibility: string | null
  edition: string | null
  editionNumber: number | null
  language: string
  originLanguage: string | null
  summary: string | null
  coverImage: string | null
  publicationYear: number
  publisher: string | null
  publicationPlace: string | null
  classificationNumber: string
  cutterNumber: string
  isbn: string | null
  ean: string | null
  estimatedPrice: number | null
  pageCount: number | null
  physicalDetails: string | null
  dimensions: string | null
  accompanyingMaterial: string | null
  genres: string | null
  generalNote: string | null
  bibliographicalNote: string | null
  topicalTerms: string | null
  additionalAuthors: string | null
  categoryId: number
  shelfId: number | null
  status: number | null
  avgReviewedRate: number | null
  category: {
    categoryId: number
    prefix: string | null
    englishName: string | null
    vietnameseName: string | null
    description: string | null
    isAllowAITraining: boolean
  }
  shelf: {
    shelfId: number | null
    sectionId: number | null
    shelfNumber: string | null
    createDate: string | null
    updateDate: string | null
    isDeleted: boolean
    section: unknown
  } | null
  libraryItemInventory: {
    libraryItemId: number
    totalUnits: number
    availableUnits: number
    requestUnits: number
    borrowedUnits: number
    reservedUnits: number
  }
  authors: {
    authorId: number
    authorCode: string | null
    authorImage: string | null
    fullName: string | null
    biography: string | null
    dob: string | null
    dateOfDeath: string | null
    nationality: string | null
    createDate: string | null
    updateDate: string | null
    isDeleted: boolean
  }[]
  libraryItemInstances: {
    libraryItemInstanceId: number
    libraryItemId: number | null
    barcode: string | null
    status: EBookCopyStatus
    createdAt: string | null
    updatedAt: string | null
    createdBy: string | null
    updatedBy: string | null
    isDeleted: boolean
    libraryItemConditionHistories: unknown[]
  }[]
}

export type ReviewsLibraryItem = {
  reviewId: number
  libraryItemId: number
  userId: string
  ratingValue: number | null
  reviewText: string | null
  createDate: string | null
  updatedDate: string | null
  user: User
}

export type Book = {
  bookId: number
  title: string
  subTitle: string | null
  summary: string
  isDeleted: boolean
  isDraft: boolean
  bookCodeForAITraining: string | null
  isTrained: boolean
}

export type BookResource = {
  resourceId: number
  bookId: number
  resourceType: EResourceBookType
  resourceUrl: string
  resourceSize: number
  fileFormat: EBookFormat
  provider: 'Cloudinary'
  providerPublicId: string
  providerMetadata: string | null
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date | null
  createdBy: string
  updatedBy: string | null
}

export type BookEditionInventory = {
  bookEditionId: number
  totalCopies: number
  availableCopies: number
  requestCopies: number
  reservedCopies: number
  borrowedCopies: number
}

export type BookEditionCopy = {
  bookEditionCopyId: number
  bookEditionId: number
  barcode: string
  status: EBookCopyStatus
  createdAt: Date
  updatedAt: Date | null
  createdBy: string
  updatedBy: string | null
  isDeleted: boolean
}

export type Floor = {
  floorId: number
  floorNumber: string
  createDate: Date
  updateDate: Date | null
  isDeleted: boolean
}

export type Zone = {
  zoneId: number
  floorId: number
  zoneName: string
  xCoordinate: number
  yCoordinate: number
  createDate: Date
  updateDate: Date | null
  isDeleted: boolean
}

export type Section = {
  sectionId: number
  zoneId: number
  sectionName: string
  createDate: Date
  updateDate: Date | null
  isDeleted: boolean
}

export type Shelf = {
  shelfId: number
  sectionId: number
  shelfNumber: string
  createDate: Date
  updateDate: Date | null
  isDeleted: boolean
  section: Section | null
}

export type Author = {
  authorId: number
  fullName: string
  authorCode: string
  authorImage: string
  biography: string
  dob: string
  dateOfDeath: string
  nationality: string
  createDate: string
  updateDate: string
  isDeleted: false
  bookEditionAuthors: unknown[]
}

export type LibraryItemAuthor = {
  libraryItemAuthorId: number
  libraryItemId: number
  authorId: number
  createdAt: Date
  updatedAt: Date | null
  createdBy: string | null
  updatedBy: string | null
}

// Ocr Result
export type OcrResult = {
  fieldPointsWithThreshole: {
    name: string
    matchedPoint: number
    threshold: number
    isPassed: boolean
  }[]
  totalPoint: number
  confidenceThreshold: number
  imageName: string
}

export type PredictResult = {
  bestItem: {
    ocrResult: OcrResult
    libraryItemId: number
  }
  otherItems: {
    ocrResult: OcrResult
    libraryItemId: number
  }[]
}

// Ocr Detail
type LineStatisticDto = {
  lineValue: string
  matchedTitlePercentage: number
  matchedAuthorPercentage: number
  matchedPublisherPercentage: number
}

type StringComparison = {
  matchLine: string
  matchPhrasePoint: number
  fuzzinessPoint: number
  fieldThreshold: number
  propertyName: string
  matchPercentage: number
}

export type OcrDetail = {
  lineStatisticDtos: LineStatisticDto[]
  stringComparisions: StringComparison[]
  matchPercentage: number
  overallPercentage: number
}

// Ocr detect
export type DetectedValue = {
  name: string
  percentage: number
}

export type OcrDetect = {
  importImageDetected: DetectedValue[]
  currentItemDetected: DetectedValue[]
}

// Recommendation
export type LibraryItemsRecommendation = {
  itemDetailDto: LibraryItem
  matchedProperties: {
    name: string
    isMatched: boolean
  }[]
}
