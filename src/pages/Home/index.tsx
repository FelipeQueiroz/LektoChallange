import { Box, Button, Center, Flex, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { StyledLink, Wrapper } from './styles'
import { useEffect, useState } from 'react'
import { Address } from '../../components/form/types'

interface IUser {
  id: string
  name: string
  email: string
  address: Address[]
  cellphone: string
  cpf: string
}

export const Home = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState<IUser | null>()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])
  const logout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  if (!user) {
    navigate('/')
  }

  return (
    <Flex
      width={'100%'}
      height={'80vh'}
      alignContent={'center'}
      justifyContent={'center'}
    >
      <Center>
        <Wrapper>
          <h1>Bem vindo {user?.name}, o que deseja fazer hoje?</h1>
          <Text mt="2.188rem" mb="2.188rem">
            Checkout your profile
          </Text>
          <Text>User ID: {user?.id}</Text>
          <Text>Name: {user?.name}</Text>
          <Text>CPF: {user?.cpf}</Text>
          <Text>Email: {user?.email}</Text>
          <br />
          <Text>Cellphone: {user?.cellphone}</Text>
          {user?.address.map(({ city, state, street }, index) => (
            <Box mt={4} key={`box-${index}`}>
              <Text fontWeight={700}>Endereço {index + 1}</Text>
              <Text>Cidade: {city}</Text>
              <Text>Estado: {state}</Text>
              <Text>Rua: {street}</Text>
            </Box>
          ))}
          <br />
          <StyledLink to="/home/update">Editar perfil</StyledLink>
          <Button colorScheme="red" onClick={logout} w="100%" mt="2.1rem">
            Logout
          </Button>
        </Wrapper>
      </Center>
    </Flex>
  )
}
