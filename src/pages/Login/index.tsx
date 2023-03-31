/* eslint-disable react/no-unescaped-entities */
import { Center, Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { StyledButton, Title } from './styles'
import LoginForm from '../../components/form/LoginForm'

export const Login = () => {
  return (
    <Flex
      align={'center'}
      w="100%"
      height={'80vh'}
      gap={20}
      display={{ md: 'flex', base: 'block' }}
    >
      <Center
        display="block"
        width={{ base: '100%' }}
        maxW={'28.125rem'}
        ml="auto"
        mr="auto"
      >
        <Title>Login</Title>
        <LoginForm />
        <Text textAlign={'center'} colorScheme="cyan" mt="0.9rem">
          Ainda não tem conta?
        </Text>
        <Link to="/signup">
          <StyledButton w="100%">Criar uma conta</StyledButton>
        </Link>
      </Center>
    </Flex>
  )
}
