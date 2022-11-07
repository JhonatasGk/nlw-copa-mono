import { useNavigation, useRoute } from '@react-navigation/native'
import { HStack, useToast, VStack } from 'native-base'
import { useEffect, useState } from 'react'
import { Share } from 'react-native'
import { EmptyMyPollList } from '../components/EmptyMyPollList'
import { Guesses } from '../components/Guesses'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import { Option } from '../components/Option'
import { PollCardProps } from '../components/PollCard'
import { PollHeader } from '../components/PollHeader'
import { api } from './../lib/api'

interface RouteParams {
  id: string
}

export function Details() {
  const [isLoading, setIsLoading] = useState(true)
  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>(
    'guesses'
  )
  const [pollDetails, setPollDetails] = useState<PollCardProps>(
    {} as PollCardProps
  )
  const { navigate } = useNavigation()
  const toast = useToast()
  const route = useRoute()
  const { id } = route.params as RouteParams

  async function fetchPollsDetails() {
    try {
      setIsLoading(true)

      const response = await api.get(`/polls/${id}`)
      setPollDetails(response.data.polls)
    } catch (err) {
      console.log(err)
      toast.show({
        title: 'Não foi carregar os detalhes do bolão ',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: pollDetails.code
    })
  }

  useEffect(() => {
    fetchPollsDetails()
  }, [id])

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bg='gray.900'>
      <Header
        title={pollDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />
      {pollDetails._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PollHeader data={pollDetails} />
          <HStack bgColor='gray.800' p={1} rounded='sm' mb={5}>
            <Option
              title='Seus palpites'
              isSelected={optionSelected === 'guesses'}
              onPress={() => setOptionSelected('guesses')}
            />
            <Option
              title='Ranking do bolão'
              isSelected={optionSelected === 'ranking'}
              onPress={() => setOptionSelected('ranking')}
            />
          </HStack>
          <Guesses pollId={pollDetails.id} code={pollDetails.code} />
        </VStack>
      ) : (
        <EmptyMyPollList code={pollDetails.code} />
      )}
    </VStack>
  )
}
