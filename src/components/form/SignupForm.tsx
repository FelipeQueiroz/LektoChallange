import {
  Box,
  Button,
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
import React from 'react'
import { AddIcon } from '@chakra-ui/icons'
import { schemaSignup } from './schemas'

export default function SignupForm() {
  const navigate = useNavigate()
  const toast = useToast()

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
    const { address, cpf, cellphone, password, email, name } = values

    fetch('https://localhost:7202/api/User', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        address,
        cpf,
        cellphone,
        password,
      }),
    }).catch(() => {
      navigate('/')
      toast({
        title: 'Aconteceu algum erro, tente novamente!',
        status: 'error',
        duration: 9000,
        position: 'bottom',
        isClosable: true,
      })
    })
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
            <InputMask mask="999.999.999-99" value={value} onChange={onChange}>
              {(inputProps) => (
                <StyledInput type="text" placeHolder={'CPF'} {...inputProps} />
              )}
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
            <InputMask mask="(99) 99999-9999" value={value} onChange={onChange}>
              {(inputProps) => (
                <StyledInput
                  type="text"
                  placeHolder={'Celular'}
                  {...inputProps}
                />
              )}
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
        <StyledInput type="password" placeholder="Password" name="password" />
        <FormErrorMessage ml={1}>{errors?.password?.message}</FormErrorMessage>
      </FormControl>
      <FormControl
        {...register('confirmPassword')}
        isInvalid={!!errors?.confirmPassword?.message}
        isRequired
      >
        <StyledInput
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
        />
        <FormErrorMessage ml={1}>
          {errors?.confirmPassword?.message}
        </FormErrorMessage>
      </FormControl>
      {fields.map((address, index) => (
        <Box key={index}>
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
          <Button
            mt={4}
            type="button"
            onClick={() => remove(index)}
            colorScheme="red"
          >
            Remover endereço
          </Button>
        </Box>
      ))}

      <IconButton
        onClick={() => append({ street: '', city: '', state: '' })}
        colorScheme="green"
        aria-label="Add new address"
        icon={<AddIcon />}
        my={4}
      />
      <Button
        type={'submit'}
        mt="6"
        w="100%"
        colorScheme="blue"
        variant="solid"
      >
        Criar uma conta
      </Button>
    </form>
  )
}
