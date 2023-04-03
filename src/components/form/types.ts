import { Address } from '../../redux/api/types'

export type SignUpFormInputs = {
  cpf: string
  name: string
  cellphone: string
  email: string
  password: string
  confirmPassword: string

  address: Address[]
}

export type UpdateFormInputs = {
  cpf: string
  name: string
  cellphone: string
  email: string
  address: Address[]
}

export type LoginFormInputs = {
  email: string
  password: string
}
