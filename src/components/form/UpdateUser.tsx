/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  Card,
  FormControl,
  FormErrorMessage,
  IconButton,
  useToast,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useMemo, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { StyledInput } from './styles'
import { UpdateFormInputs } from './types'
import InputMask from 'react-input-mask'
import { DeleteIcon } from '@chakra-ui/icons'
import { useUpdateUserMutation } from '../../redux/api/api'
import { User } from '../../redux/api/types'
import { schemaUpdateUser } from './schemas'

export default function UpdateUserForm() {
  const navigate = useNavigate()
  const toast = useToast()
  const [user, setUser] = useState<User>()

  const [updateUser, { isLoading }] = useUpdateUserMutation()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UpdateFormInputs>({
    mode: 'onBlur',
    resolver: yupResolver(schemaUpdateUser),
    defaultValues: useMemo(() => {
      return {
        name: user?.name,
      }
    }, [user]),
  })

  useEffect(() => {
    reset(user)
  }, [reset, user])

  useEffect(() => {
    const userStorage = localStorage.getItem('user')
    if (userStorage) {
      setUser(JSON.parse(userStorage))
    }
  }, [])

  const { fields, append, remove } = useFieldArray({
    name: 'address',
    control,
    rules: { required: true },
  })

  const onSubmit = async (values: UpdateFormInputs) => {
    try {
      if (user) {
        const userToUpdate = {
          id: user.id,
          ...values,
        }
        await updateUser(userToUpdate).unwrap()
        window.localStorage.setItem('user', JSON.stringify(userToUpdate))
        navigate('/home')
      }
      toast({
        title: 'Perfil editado com sucesso.',
        status: 'success',
        duration: 9000,
        position: 'top',
        isClosable: true,
      })
    } catch (e) {
      toast({
        title: 'Aconteceu algum proiblema, tente novamente mais tarde.',
        status: 'error',
        duration: 9000,
        position: 'bottom',
        isClosable: true,
      })
    }
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
      {fields.map((address, index) => (
        <Card key={index} p={5} my={5} borderRadius={10}>
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
        type="submit"
        mt="6"
        w="100%"
        colorScheme="blue"
        variant="solid"
        isLoading={isLoading}
      >
        Editar perfil
      </Button>
      <Button
        onClick={() => navigate('/home')}
        mt="6"
        w="100%"
        colorScheme="red"
        variant="solid"
        disabled={!!errors.email}
      >
        Cancelar
      </Button>
    </form>
  )
}
