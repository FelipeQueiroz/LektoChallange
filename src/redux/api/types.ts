export interface Address {
  street: string
  city: string
  state: string
}

export type User = {
  id: string
  cpf: string
  name: string
  cellphone: string
  email: string
  password: string

  address: Address[]
}

export type IResponseLogin = User

export type ICreateUser = {
  cpf: string
  name: string
  cellphone: string
  email: string
  password: string

  address: Address[]
}

export interface ISendMessage {
  name: string
  cellphone: string
  email: string
  text: string
}

export type IUpdateUser = {
  id: string
  cpf: string
  name: string
  cellphone: string
  email: string

  address: Address[]
}

export type IRequestLogin = {
  email: string
  password: string
}
