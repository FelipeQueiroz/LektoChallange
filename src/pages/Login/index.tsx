/* eslint-disable react/no-unescaped-entities */
import { Center, Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { StyledButton, Title } from './styles'

import HomeBg from '../../assets/login-bg.jpg'
import LoginForm from '../../components/form/LoginForm'

export const Login = () => {
  return (
    <Flex align={'center'} w="100%">
      <Center
        backgroundImage={`url("${HomeBg}")`}
        backgroundSize={'cover'}
        display={['none', 'none', 'initial']}
        width={'48%'}
        height={'100vh'}
        backgroundColor={'#FFF'}
      />
      <Center
        display="block"
        width={{ base: '100%' }}
        maxW={'28.125rem'}
        ml="auto"
        mr="auto"
      >
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="5xl"
          textAlign={'left'}
          fontWeight="extrabold"
        >
          Cad+ ERP
        </Text>
        <Title>Entre na sua conta</Title>
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
