import {
  Button,
  Card,
  FormControl,
  FormErrorMessage,
  IconButton,
  useToast,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { StyledInput } from './styles'
import { SignUpFormInputs } from './types'
import InputMask from 'react-input-mask'
import React, { useState } from 'react'
import { schemaSignup } from './schemas'
import { DeleteIcon } from '@chakra-ui/icons'
import { useCreateUserMutation } from '../../redux/api/api'

export default function SignupForm() {
  const navigate = useNavigate()
  const toast = useToast()

  const [createUser] = useCreateUserMutation()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    mode: 'onBlur',
    resolver: yupResolver(schemaSignup),
  })
  const { fields, append, remove } = useFieldArray({
    name: 'address',
    control,
    rules: { required: true },
  })

  const onSubmit = async (values: SignUpFormInputs) => {
    setIsLoading(true)
    try {
      await createUser(values).unwrap()
      toast({
        title: 'Conta criada com sucesso! :)',
        status: 'success',
        duration: 9000,
        position: 'bottom',
        isClosable: true,
      })
      navigate('/')
    } catch (e) {
      toast({
        title: 'Aconteceu algum erro, tente novamente!',
        status: 'error',
        duration: 9000,
        position: 'bottom',
        isClosable: true,
      })
    }
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors?.name?.message} isRequired>
        <StyledInput
          type="text"
          placeholder="Nome Completo"
          {...register('name')}
        />
        <FormErrorMessage ml={1}>{errors?.name?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors?.cpf?.message} isRequired>
        <Controller
          name="cpf"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <InputMask
              mask="999.999.999-99"
              value={value}
              name={'cpf'}
              onChange={onChange}
              disabled={false}
            >
              <StyledInput type="text" name={'cpf'} placeholder="CPF" />
            </InputMask>
          )}
        />
        <FormErrorMessage ml={1}>{errors?.cpf?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors?.cellphone?.message} isRequired>
        <Controller
          name="cellphone"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <InputMask
              mask="(99) 99999-9999"
              name="cellphone"
              value={value}
              onChange={onChange}
            >
              <StyledInput
                type="text"
                name={'cellphone'}
                placeholder={'Telefone'}
              />
            </InputMask>
          )}
        />

        <FormErrorMessage ml={1}>{errors?.cellphone?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors?.email?.message} isRequired>
        <StyledInput type="email" placeholder="Email" {...register('email')} />
        <FormErrorMessage ml={1}>{errors?.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl
        {...register('password')}
        isInvalid={!!errors?.password?.message}
        isRequired
      >
        <StyledInput type="password" placeholder="Senha" name="password" />
        <FormErrorMessage ml={1}>{errors?.password?.message}</FormErrorMessage>
      </FormControl>
      <FormControl
        {...register('confirmPassword')}
        isInvalid={!!errors?.confirmPassword?.message}
        isRequired
      >
        <StyledInput
          type="password"
          placeholder="Confirmar senha"
          name="confirmPassword"
        />
        <FormErrorMessage ml={1}>
          {errors?.confirmPassword?.message}
        </FormErrorMessage>
      </FormControl>
      {fields.map((address, index) => (
        <Card
          key={index}
          backgroundColor={'gray.700'}
          p={5}
          my={5}
          borderRadius={10}
        >
          <StyledInput
            type="text"
            placeholder="Cidade"
            {...register(`address.${index}.city`)}
          />
          <FormErrorMessage ml={1}>
            {errors.address && errors.address[index]?.city?.message}
          </FormErrorMessage>
          <StyledInput
            type="text"
            placeholder="Estado"
            {...register(`address.${index}.state`)}
          />
          <FormErrorMessage ml={1}>
            {errors.address && errors.address[index]?.state?.message}
          </FormErrorMessage>
          <StyledInput
            type="text"
            placeholder="Rua"
            {...register(`address.${index}.street`)}
          />
          <FormErrorMessage ml={1}>
            {errors.address && errors.address[index]?.street?.message}
          </FormErrorMessage>
          <IconButton
            mt={4}
            onClick={() => remove(index)}
            colorScheme="red"
            aria-label={'Exclude address'}
            icon={<DeleteIcon />}
          />
        </Card>
      ))}

      <Button
        onClick={() => append({ street: '', city: '', state: '' })}
        colorScheme="green"
        aria-label="Add new address"
        my={4}
      >
        Adicionar Endereço
      </Button>
      <Button
        type={'submit'}
        mt="6"
        w="100%"
        colorScheme="blue"
        variant="solid"
        isLoading={isLoading}
      >
        Criar uma conta
      </Button>
    </form>
  )
}
