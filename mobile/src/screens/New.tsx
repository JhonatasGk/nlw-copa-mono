import { Heading, Text, useToast, VStack } from 'native-base'
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useState } from 'react'
import Logo from '../assets/logo.svg'
import { api } from '../lib/api'

export function New() {
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  async function handlePollCreate() {
    if (!title.trim()) {
      return toast.show({
        title: 'Informe um nome para seu bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
    try {
      setIsLoading(true)

      await api.post('/polls', { title: title.toUpperCase() })

      toast.show({
        title: 'Bolão criado com sucesso',
        placement: 'top',
        bgColor: 'green.500'
      })

      setTitle('')
    } catch (err) {
      console.log(err)

      toast.show({
        title: 'Não foi possível cria o bolão, tente novamente',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <VStack flex={1} bg='gray.900'>
      <Header title='Novo bolão' />
      <VStack mt={8} mx={5} alignItems='center'>
        <Logo />
        <Heading
          fontFamily='heading'
          color='white'
          fontSize='sm'
          my={8}
          textAlign='center'
        >
          Crie seu próprio bolão {'\n'}e compartilhe com seus amigos!
        </Heading>
        <Input
          mb={2}
          placeholder='Qual é o nome do bolão ?'
          onChangeText={setTitle}
          value={title}
        />
        <Button
          label='CRIAR MEU BOLÃO'
          onPress={handlePollCreate}
          isLoading={isLoading}
        />
        <Text color='gray.200' fontSize='sm' textAlign='center' px={10} mt={4}>
          Após criar o bolão você recebera um código único, que poderá usar para
          convidar outras pessoas.{' '}
        </Text>
      </VStack>
    </VStack>
  )
}
