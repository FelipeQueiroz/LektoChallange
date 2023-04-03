import * as yup from 'yup'
import YupPassword from 'yup-password'

YupPassword(yup)

const brazilianCellphoneRegex = /\(\d{2}\)\s*(9\s*)?[6-9]\d{3}-\d{4}/

export const schemaSignup = yup.object().shape({
  name: yup
    .string()
    .min(4, 'O nome deve possuir 4 caracteres')
    .required('O nome completo é obrigatório')
    .matches(/^[a-zA-Z]+ [a-zA-Z]+$/, 'Insira seu nome completo'),
  cpf: yup.string().required('O CPF é obrigatório'),
  cellphone: yup
    .string()
    .matches(brazilianCellphoneRegex, 'Número de telefone inválido')
    .required('Numero de telefone é obrigatório'),
  email: yup
    .string()
    .email('Insira um email válido')
    .required('O email é obrigatório'),
  password: yup
    .string()
    .required('Criar uma senha é obrigatório')
    .min(8, `Sua senha deve conter no mínimo 8 caracteres`)
    .minUppercase(1, `Sua senha deve conter no mínimo uma letra maiúscula`)
    .minNumbers(1, `Sua senha deve conter no mínimo um número`)
    .minSymbols(1, `Sua senha deve conter no mínimo um caractere especial`),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas devem corresponder')
    .required('Confirmar a senha é obrigatório'),
  address: yup.array().of(
    yup.object().shape({
      city: yup.string().required('A cidade é obrigatória'),
      street: yup.string().required('A Rua é obrigatório'),
      state: yup.string().required('O estado é obrigatório'),
    }),
  ),
})

export const schemaUpdateUser = yup.object().shape({
  name: yup
    .string()
    .min(4, 'O nome deve possuir 4 caracteres')
    .matches(/^[a-zA-Z]+ [a-zA-Z]+$/, 'Insira seu nome completo'),
  cpf: yup.string().required('O CPF é obrigatório'),
  cellphone: yup
    .string()
    .matches(brazilianCellphoneRegex, 'Número de telefone inválido'),
  email: yup.string().email('Insira um email válido'),
  address: yup.array().of(
    yup.object().shape({
      city: yup.string(),
      street: yup.string(),
      state: yup.string(),
    }),
  ),
})

export const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .email('Insira um email válido')
    .required('O email é necessário para o login'),
  password: yup.string().required('A senha é necessária para o login'),
})
