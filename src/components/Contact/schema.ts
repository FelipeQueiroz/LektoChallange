import * as yup from 'yup'

export const schemaContactUs = yup.object().shape({
  name: yup
    .string()
    .min(4, 'O nome deve possuir 4 caracteres')
    .matches(/^[a-zA-Z]+ [a-zA-Z]+$/, 'Insira seu nome completo')
    .required('O nome é obrigatório'),
  cellphone: yup.string().required('O Telefone é obrigatório'),
  email: yup
    .string()
    .email('Insira um email válido')
    .required('O email é obrigatório'),
  text: yup.string().required('A mensagem é obrigatória'),
})
