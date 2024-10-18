interface InternalArticleCO {
  id: number
  title: string
  content: string
  authorId: number
  createdAt: Date
  updatedAt: Date
}

export type ArticleCO = Readonly<InternalArticleCO>
