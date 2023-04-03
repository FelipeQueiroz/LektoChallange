/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  FormControl,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { StyledInput } from './styles'
import { LoginFormInputs } from './types'
import { schemaLogin } from './schemas'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useLoginMutation } from '../../redux/api/api'

export default function LoginForm() {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const [login] = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    mode: 'onSubmit',
    resolver: yupResolver(schemaLogin),
  })

  const onSubmit = async (values: LoginFormInputs) => {
    try {
      setIsLoading(true)
      const { password, email } = values
      const response = await login({ password, email }).unwrap()
      toast({
        title: 'Login feito com sucesso :)',
        status: 'success',
        duration: 9000,
        position: 'bottom',
        isClosable: true,
      })

      setIsLoading(false)

      window.localStorage.setItem('user', JSON.stringify(response))
      navigate('/home')
    } catch (e) {
      toast({
        title: 'Credenciais inválidas.',
        status: 'error',
        duration: 9000,
        position: 'bottom',
        isClosable: true,
      })

      setIsLoading(false)
    }
  }

  return (
    <form>
      <FormControl isInvalid={!!errors?.email?.message} isRequired>
        <StyledInput
          type="email"
          placeholder="Insira seu email..."
          {...register('email')}
        />
        <FormErrorMessage ml={1}>{errors?.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl
        {...register('password')}
        isInvalid={!!errors?.password?.message}
        isRequired
      >
        <StyledInput
          type="password"
          placeholder="Insira sua senha..."
          name="password"
        />
        <FormErrorMessage ml={1}>{errors?.password?.message}</FormErrorMessage>
      </FormControl>
      <Button
        onClick={handleSubmit(onSubmit)}
        mt="6"
        w="100%"
        variant="solid"
        colorScheme="blue"
        isLoading={isLoading}
        disabled={!!errors.email || !!errors.password}
      >
        Login
      </Button>
    </form>
  )
}
