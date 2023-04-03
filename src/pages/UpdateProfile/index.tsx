import { Center, Flex } from '@chakra-ui/react'
import { Title, Wrapper } from './styles'
import UpdateUserForm from '../../components/form/UpdateUser'

export const UpdateProfile = () => {
  return (
    <Flex width={'100%'} alignContent={'center'} justifyContent={'center'}>
      <Center w="580.132px">
        <Wrapper>
          <Title>Editar perfil</Title>
          <UpdateUserForm />
        </Wrapper>
      </Center>
    </Flex>
  )
}
