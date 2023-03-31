import * as yup from 'yup'

const brazilianCellphoneRegex = /\(\d{2}\)\s*(9\s*)?[6-9]\d{3}-\d{4}/

export const schemaSignup = yup.object().shape({
  name: yup
    .string()
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
  password: yup.string().required('Criar uma senha é obrigatório'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas devem corresponder')
    .required('Confimar a senha é obrigatório'),
  address: yup.array().of(
    yup.object().shape({
      city: yup.string().required('A cidade é obrigatória'),
      street: yup.string().required('A Rua é obrigatório'),
      state: yup.string().required('O estado é obrigatório'),
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
