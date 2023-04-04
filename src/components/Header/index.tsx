import { Box } from '@chakra-ui/react'
import { Toggle } from '../Toggle'
import { Contact } from '../Contact'

export const Header = () => {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      pos={'absolute'}
      top={'2rem'}
      right={'2rem'}
      gap={5}
    >
      <Toggle />
      <Contact />
    </Box>
  )
}
