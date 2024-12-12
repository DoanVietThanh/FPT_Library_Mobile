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
