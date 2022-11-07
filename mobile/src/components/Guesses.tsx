import { useNavigation } from '@react-navigation/native'
import { Box, useToast } from 'native-base'
import { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { api } from '../lib/api'
import { EmptyMyPollList } from './EmptyMyPollList'
import { Game, GameProps } from './Game'
import { Loading } from './Loading'

interface Props {
  pollId: string
  code: string
}

export function Guesses({ pollId, code }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [firstTeamPoints, setFirstTeamPoints] = useState('')
  const [secondTeamPoints, setSecondTeamPoints] = useState('')
  const [games, setGames] = useState<GameProps[]>([])
  const { navigate } = useNavigation()
  const toast = useToast()

  async function fetchGames() {
    setIsLoading(true)

    const response = await api.get(`/polls/${pollId}/games`)

    setGames(response.data.games)

    try {
    } catch (err) {
      console.log(err)
      toast.show({
        title: 'Não foi carregar os jogos',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: 'Informe o placar para dar palpite ',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      await api.post(`/polls/${pollId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints)
      })
      toast.show({
        title: 'Palpite enviado com sucesso',
        placement: 'top',
        bgColor: 'green.500'
      })
      fetchGames()
    } catch (err) {
      console.log(err)
      return toast.show({
        title: 'Não foi possível enviar  palpite',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGames()
  }, [pollId])

  if (isLoading) {
    return <Loading />
  }

  return (
    <FlatList
      data={games}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
      ListEmptyComponent={() => <EmptyMyPollList code={code} />}
    />
  )
}
