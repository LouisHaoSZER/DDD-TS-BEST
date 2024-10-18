interface InternalLoginRO {
  name: string
  password: string
}

export type LoginRO = Readonly<InternalLoginRO>
