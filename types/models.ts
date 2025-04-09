import {
  EBookCopyStatus,
  EBookEditionStatus,
  EBookFormat,
  EBorrowRequestStatus,
  ECardStatus,
  EIssuanceMethod,
  ENotificationType,
  EResourceBookType,
  ERoleType,
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

export type Role = {
  roleId: number
  englishName: string
  vietnameseName: string
  roleType: ERoleType
}

export type CurrentUser = {
  userId: string
  roleId: number
  libraryCardId: string
  email: string
  firstName: string | null
  lastName: string | null
  passwordHash: null
  phone: string | null
  avatar: string | null
  address: string | null
  gender: 'Male' | 'Female' | 'Other' | null
  dob: string | null
  isActive: boolean | null
  isDeleted: boolean | null
  isEmployeeCreated: boolean | null
  createDate: string | null
  modifiedDate: string | null
  modifiedBy: string | null
  twoFactorEnabled: boolean | null
  phoneNumberConfirmed: boolean | null
  emailConfirmed: boolean | null
  twoFactorSecretKey: boolean | null
  twoFactorBackupCodes: boolean | null
  phoneVerificationCode: boolean | null
  emailVerificationCode: boolean | null
  phoneVerificationExpiry: boolean | null
  role: Role
  libraryCard: {
    libraryCardId: string
    fullName: string | null
    avatar: string | null
    barcode: string | null
    issuanceMethod: number | null
    status: number | null
    isAllowBorrowMore: boolean | null
    maxItemOnceTime: number | null
    allowBorrowMoreReason: boolean | null
    totalMissedPickUp: number | null
    isReminderSent: boolean | null
    isExtended: boolean | null
    extensionCount: number | null
    issueDate: string | null
    expiryDate: string | null
    suspensionEndDate: string | null
    suspensionReason: string | null
    rejectReason: string | null
    isArchived: boolean | null
    archiveReason: string | null
    previousUserId: string | null
    transactionCode: string | null
    previousUser: null
  }
  notificationRecipients: []
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

export type PaymentMethod = { paymentMethodId: number; methodName: string }

export type PaymentData = {
  description: string
  orderCode: string
  qrCode: string
  expiredAt: Date | null
  paymentLinkId: string
}

export type Category = {
  categoryId: number
  prefix: string
  englishName: string
  vietnameseName: string
  description: string | null
  isAllowAITraining: boolean
  totalBorrowDays: number | null
}

export type Package = {
  libraryCardPackageId: number
  packageName: string
  price: number
  durationInMonths: number
  isActive: boolean
  createdAt: Date
  description: string | null
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
  category: Category
  shelf: {
    shelfId: number
    sectionId: number
    shelfNumber: string
    createDate: string
    updateDate: string | null
    isDeleted: boolean
    section: unknown
  } | null
  libraryItemInventory: LibraryItemInventory
  resources: BookResource[]
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
  libraryItemInstances: LibraryItemInstance[]
  digitalBorrows: DigitalBorrow[]
}

export type LibraryItemInventory = {
  libraryItemId: number
  totalUnits: number
  availableUnits: number
  requestUnits: number
  borrowedUnits: number
  reservedUnits: number
}

export type DigitalBorrow = {
  digitalBorrowId: number
  resourceId: number
  userId: string
  registerDate: string
  expiryDate: string
  isExtended: boolean
  extensionCount: number
  status: number
  user: null
  digitalBorrowExtensionHistories: unknown[]
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
  resourceTitle: string
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
  defaultBorrowDurationDays: number | null
  borrowPrice: number | null
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
  engZoneName: string
  vieZoneName: string
  engDescription: string
  vieDescription: string
  totalCount: number
  createDate: Date
  updateDate: Date | null
  isDeleted: boolean
}

export type Section = {
  sectionId: number
  zoneId: number
  engSectionName: string
  vieSectionName: string
  shelfPrefix: string
  classificationNumberRangeFrom: number
  classificationNumberRangeTo: number
  createDate: Date
  updateDate: Date | null
  isDeleted: boolean
  isChildrenSection: boolean
  isReferenceSection: boolean
  isJournalSection: boolean
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

export type LibraryItemInstance = {
  libraryItemInstanceId: number
  libraryItemId: number
  barcode: string
  status: EBookCopyStatus
  createdAt: Date
  updatedAt: Date | null
  createdBy: string
  updatedBy: string | null
  isDeleted: boolean
}

export type LibraryCard = {
  libraryCardId: string
  fullName: string
  avatar: string
  barcode: string
  issuanceMethod: EIssuanceMethod
  status: ECardStatus
  isAllowBorrowMore: boolean
  maxItemOnceTime: number
  allowBorrowMoreReason: string | null
  totalMissedPickUp: number
  isReminderSent: boolean
  isExtended: boolean
  extensionCount: number
  issueDate: Date
  expiryDate: Date
  suspensionEndDate: Date | null
  suspensionReason: string | null
  rejectReason: string | null
  isArchived: boolean
  archiveReason: string | null
  previousUserId: string | null
  transactionCode: string
}

export type BorrowRequest = {
  borrowRequestId: number
  libraryCardId: string
  requestDate: Date
  expirationDate: Date
  status: EBorrowRequestStatus
  description: string | null
  cancelledAt: string | null
  cancellationReason: string | null
  isReminderSent: boolean
  totalRequestItem: number
  libraryItems: LibraryItem[]
  reservationQueues: ReservationQueue[]
}

export type BorrowRequestResource = {
  borrowRequestResourceId: number
  borrowRequestId: number
  resourceId: number
  resourceTitle: string
  borrowPrice: number
  defaultBorrowDurationDays: number
  transactionId: number | null
  libraryResource: BookResource
  transaction: null
}

export type ReservationQueue = {
  queueId: number
  libraryItemId: number
  libraryItemInstanceId: null | number
  libraryCardId: string
  queueStatus: number
  borrowRequestId: number
  isReservedAfterRequestFailed: boolean
  expectedAvailableDateMin: null | string
  expectedAvailableDateMax: null | string
  reservationDate: string
  expiryDate: null | string
  reservationCode: null | string
  isAppliedLabel: false
  collectedDate: null | string
  isNotified: false
  cancelledBy: null | string
  cancellationReason: null | string
  libraryItem: LibraryItem
  libraryItemInstance: null | LibraryItemInstance
}
