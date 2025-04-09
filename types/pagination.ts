export type Pagination<TSources> = {
  sources: TSources
  pageIndex: number
  pageSize: number
  totalPage: number
  totalActualItem: number
}
