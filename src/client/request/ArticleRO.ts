interface InternalArticleRO {
  id: number
  title: string
  content: string
  authorId: number
  createdAt: Date
  updatedAt: Date
}

export type CreateArticleRO = Readonly<Omit<InternalArticleRO, 'createdAt' | 'updatedAt' | 'id'>>
export type UpdateArticleRO = Readonly<Omit<InternalArticleRO, 'createdAt' | 'updatedAt'>>
