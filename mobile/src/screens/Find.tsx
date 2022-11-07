import { Heading, Text, useToast, VStack } from 'native-base'
import { Header } from '../components/Header'

import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useState } from 'react'
import { api } from '../lib/api'
import { useNavigation } from '@react-navigation/native'

export function Find() {
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState('')
  const toast = useToast()
  const { navigate } = useNavigation()
  async function handleJoinPoll() {
    try {
      setIsLoading(true)

      if (!code.trim()) {
        return toast.show({
          title: 'Informe o código do bolão',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      await api.post('polls/join', { code })
      toast.show({
        title: 'Você entrou no bolão com sucesso@',
        placement: 'top',
        bgColor: 'green.500'
      })
      navigate('polls')
    } catch (err) {
      console.log(err)
      setIsLoading(false)

      if (err.response?.data?.message === 'Poll not found') {
        return toast.show({
          title: 'Não foi possível encontrar esse bolão ',
          placement: 'top',
          bgColor: 'red.500'
        })
      }
      if (err.response?.data?.message === 'You already joined this poll') {
        return toast.show({
          title: 'Você já esta participando desse bolão ',
          placement: 'top',
          bgColor: 'red.500'
        })
      }
    }
  }

  return (
    <VStack flex={1} bg='gray.900'>
      <Header title='Buscar por código' showBackButton onShare={() => {}} />
      <VStack mt={8} mx={5} alignItems='center'>
        <Heading
          fontFamily='heading'
          color='white'
          fontSize='xs'
          my={8}
          mb={8}
          textAlign='center'
        >
          Encontre um bolão através do seu código único!
        </Heading>
        <Input
          mb={2}
          placeholder='Qual é o código do bolão ?'
          autoCapitalize='characters'
          onChangeText={setCode}
        />
        <Button
          label='BUSCAR BOLÃO'
          isLoading={isLoading}
          onPress={handleJoinPoll}
        />
        <Text
          color='gray.200'
          fontSize='sm'
          textAlign='center'
          px={10}
          mt={4}
        ></Text>
      </VStack>
    </VStack>
  )
}
