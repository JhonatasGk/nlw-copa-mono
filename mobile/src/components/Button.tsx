import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base'

interface Props extends IButtonProps {
  label: string
  type?: 'PRIMARY' | 'SECONDARY'
}

export function Button({ label, type = 'PRIMARY', ...rest }: Props) {
  return (
    <ButtonNativeBase
      w='full'
      h={14}
      rounded='sm'
      fontSize='md'
      textTransform='uppercase'
      bg={type === 'SECONDARY' ? 'red.500' : 'yellow.500'}
      _pressed={{
        bg: type === 'SECONDARY' ? 'red.400' : 'yellow.600'
      }}
      _loading={{
        _spinner: { color: 'black' }
      }}
      {...rest}
    >
      <Text
        fontSize='sm'
        fontFamily='heading'
        color={type === 'SECONDARY' ? 'white' : 'black'}
      >
        {label}
      </Text>
    </ButtonNativeBase>
  )
}
