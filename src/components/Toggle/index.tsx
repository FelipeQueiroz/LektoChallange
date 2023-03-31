import { Button, useColorMode } from '@chakra-ui/react'

export const Toggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Button
      size="md"
      onClick={() => toggleColorMode()}
      pos="absolute"
      top="1rem"
      right="1rem"
      bgColor="transparent"
    >
      Modo: {colorMode === 'dark' ? 'Escuro' : 'Claro'}
    </Button>
  )
}
