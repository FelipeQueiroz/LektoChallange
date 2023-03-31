export interface Address {
  street: string
  city: string
  state: string
}

export type SignUpFormInputs = {
  cpf: string
  name: string
  cellphone: string
  email: string
  password: string
  confirmPassword: string

  address: Address[]
}

export type LoginFormInputs = {
  email: string
  password: string
}
