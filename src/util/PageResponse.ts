export class PageResponse {
  page: number
  size: number
  total: number
  data: unknown[]

  constructor(page: number, size: number, total: number, data: unknown[]) {
    this.page = page
    this.size = size
    this.total = total
    this.data = data
  }

  static from(page: number, size: number, total: number, data: unknown[]) {
    return new PageResponse(page, size, total, data)
  }

  static of(page: number, size: number, total: number, alldata: unknown[]) {
    const slice = alldata.slice((page - 1) * size, page * size)
    return new PageResponse(page, size, total, slice)
  }
}
