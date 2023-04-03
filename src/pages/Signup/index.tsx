/* eslint-disable react/no-unescaped-entities */
import { Center, Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import SignupForm from '../../components/form/SignupForm'
import { StyledButton, Title } from './styles'

export const Signup = () => {
  return (
    <Flex
      align={'center'}
      w="100%"
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
        <Title>Criar conta</Title>
        <SignupForm />
        <Text textAlign={'center'} mt="0.9rem" colorScheme="gray">
          Já tem uma conta?
        </Text>
        <Link to="/">
          <StyledButton w="100%">Entrar</StyledButton>
        </Link>
      </Center>
    </Flex>
  )
}
