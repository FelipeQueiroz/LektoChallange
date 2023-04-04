import { Avatar, Box, Button, Center, Flex, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { StyledLink, Wrapper } from './styles'
import { useEffect, useState } from 'react'
import { User } from '../../redux/api/types'
import HomeBg from '../../assets/home-bg.jpg'

export const Home = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState<User | null>()

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
    <Flex width={'100%'} maxHeight={'100vh'} overflow={'hidden'}>
      <Center
        display={['none', 'none', 'initial']}
        backgroundImage={`url("${HomeBg}")`}
        style={{ backgroundPositionY: 'bottom' }}
        backgroundSize={'cover'}
        width={'48%'}
        height={'100vh'}
        backgroundColor={'#FFF'}
      />
      <Center p={20} overflowY={'scroll'} className={'disableScroll'}>
        <Wrapper>
          {user && (
            <>
              <Avatar name={user.name} mb={5} size={'lg'} />
              <h1>Bem vindo {user.name}, o que deseja fazer hoje?</h1>
              <Text my="2.188rem">Veja seu perfil:</Text>
              <Text>ID: {user.id}</Text>
              <Text>Name: {user.name}</Text>
              <Text>CPF: {user.cpf}</Text>
              <Text>Email: {user.email}</Text>
              <br />
              <Text>Celular: {user.cellphone}</Text>
              {user?.address.map(({ city, state, street }, index) => (
                <Box mt={4} key={`box-${index}`}>
                  <Text fontWeight={700}>Endereço {index + 1}</Text>
                  <Text>Cidade: {city}</Text>
                  <Text>Estado: {state}</Text>
                  <Text>Rua: {street}</Text>
                </Box>
              ))}
            </>
          )}
          <br />
          <StyledLink to="/home/edit-profile">Editar perfil</StyledLink>
          <Button colorScheme="red" onClick={logout} w="100%" mt="2.1rem">
            Logout
          </Button>
        </Wrapper>
      </Center>
    </Flex>
  )
}
