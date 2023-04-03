import {
  Button,
  FormControl,
  FormErrorMessage,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { StyledInput } from '../form/styles'
import { Controller, useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'
import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaContactUs } from './schema'
import { ContactUsFormInput } from './types'
import { InfoIcon } from '@chakra-ui/icons'
import { useSendMessageMutation } from '../../redux/api/api'

export const Contact = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const [sendMessage, { isLoading }] = useSendMessageMutation()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactUsFormInput>({
    mode: 'onBlur',
    resolver: yupResolver(schemaContactUs),
  })
  const handleOpenModal = () => {
    onOpen()
    reset()
    const userStorage = localStorage.getItem('user')
    if (userStorage) {
      const user = JSON.parse(userStorage)
      setValue('name', user?.name)
      setValue('email', user?.email)
      setValue('cellphone', user?.cellphone)
    }
  }

  const onSubmit = async (values: ContactUsFormInput) => {
    try {
      await sendMessage(values).unwrap()
      toast({
        title: 'Mensagem enviada com sucesso.',
        status: 'success',
        duration: 9000,
        position: 'top',
        isClosable: true,
      })
      onClose()
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
    <>
      <IconButton
        aria-label={'Entrar em contato'}
        onClick={handleOpenModal}
        icon={<InfoIcon />}
        pos="absolute"
        top="1rem"
        left="1rem"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Entre em contato</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl isInvalid={!!errors?.name?.message} isRequired>
                <StyledInput
                  type="text"
                  placeholder="Nome Completo"
                  {...register('name')}
                />
                <FormErrorMessage ml={1}>
                  {errors?.name?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors?.cellphone?.message} isRequired>
                <Controller
                  name="cellphone"
                  control={control}
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
                <FormErrorMessage ml={1}>
                  {errors?.cellphone?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors?.email?.message} isRequired>
                <StyledInput
                  type="email"
                  placeholder="Email"
                  {...register('email')}
                />
                <FormErrorMessage ml={1}>
                  {errors?.email?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors?.text?.message} isRequired>
                <Textarea
                  mt={5}
                  placeholder="Digite a sua mensagem aqui..."
                  {...register('text')}
                />
                <FormErrorMessage ml={1}>
                  {errors?.text?.message}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit(onSubmit)}
              isLoading={isLoading}
            >
              Enviar mensagem
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
