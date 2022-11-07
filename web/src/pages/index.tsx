import Img from 'next/image'
import previewApp from '../assets/preview-app.png'
import logoImg from '../assets/logo.svg'
import usersAvatarExemple from '../assets/avatares.png'
import icon from '../assets/icon.png'
import { api } from './../lib/axios'
import { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { Toast } from '../utils/Toast'
import { Loading } from '../utils/Loading'
import { AuthContext } from '../contexts/AuthContext'
import { Icon } from '@iconify/react'

interface HomeProps {
  pollCount: number
  guessCount: number
  userCount: number
}
interface InputProps {
  pollTitle?: string
}

export default function Home(props: HomeProps) {
  const { register, handleSubmit, reset } = useForm()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { userIsAuthenticated, signInWithGoogle } = useContext(AuthContext)

  const createPoll: SubmitHandler<InputProps> = async data => {
    setIsLoading(!isLoading)
    const res = await api.post('/polls', {
      title: data.pollTitle
    })
    const { code } = res.data
    await navigator.clipboard.writeText(code)
    setOpen(true)
    setIsLoading(false)
    reset({ pollTitle: '' })
  }

  return (
    <>
      <ToastPrimitive.Provider swipeDirection='left' duration={5000}>
        <Toast isOpen={open} onOpenChange={setOpen} />
      </ToastPrimitive.Provider>
      <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-x-24 items-center'>
        <main>
          <Img src={logoImg} alt='logo nlw-copa' quality={100} />
          <h1 className='mt-14 text-white text-5xl font-bold leading-tight '>
            Crie seu próprio bolão da copa e compartilhe entre amigos!
          </h1>
          <div className='mt-10 flex items-center gap-2'>
            <Img
              src={usersAvatarExemple}
              alt='users avatar example'
              quality={100}
            />
            <strong className='text-gray-100 text-xl'>
              <span className='text-brand-green-500 mr-2'>
                + {props.userCount}
              </span>
              pessoas que já estão usando
            </strong>
          </div>
          {userIsAuthenticated ? (
            <>
              <form
                action=''
                onSubmit={handleSubmit(createPoll)}
                className='mt-10 flex gap-2'
              >
                <input
                  {...register('pollTitle', { required: true, maxLength: 50 })}
                  maxLength={50}
                  type='text'
                  required
                  placeholder='Qual nome do seu bolão?'
                  className='flex-1 py-4 px-6 rounded bg-gray-800 border border-gray-600 text-sm placeholder:text-gray-200 text-gray-100'
                />
                <button
                  disabled={isLoading ? true : false}
                  type='submit'
                  className='bg-brand-yellow-500 py-4 px-6 min-w-[171px] max-w-[171px] max-h-[54px] rounded uppercase font-bold text-sm hover:bg-brand-yellow-200 transition-all flex items-center justify-center disabled:bg-brand-yellow-700'
                >
                  {isLoading ? <Loading /> : 'Criar meu bolão'}
                </button>
              </form>
              <p className='mt-4 text-sm text-gray-300 leading-relaxed'>
                Após criar seu bolão, você receberá um código único que poderá
                usar para convidar outras pessoas 🚀
              </p>
            </>
          ) : (
            <>
              <button
                onClick={signInWithGoogle}
                className='bg-brand-red-500 uppercase text-white mt-10 gap-2 w-full max-h-[54px] py-4 px-6 rounded font-bold text-sm flex  justify-center items-center '
              >
                <Icon icon='akar-icons:google-fill' width='24' height='24' />
                Entre com o google
              </button>
              <p className='mt-4 text-sm text-gray-300 leading-relaxed'>
                Entre com sua conta google para poder bolões da copa, e
                compartilhar com outras pessoas.
              </p>
            </>
          )}

          <div className='mt-10 pt-10  border-t border-gray-600 grid grid-cols-2 divide-x divide-gray-600 text-gray-100'>
            <div className='flex items-center gap-6'>
              <Img src={icon} alt='check icon' quality={100} />
              <div className='flex flex-col '>
                <span className='text-2xl font-bold'>+ {props.pollCount}</span>
                <span>Bolões criados </span>
              </div>
            </div>
            <div className=' flex items-center gap-6 justify-end'>
              <Img src={icon} alt='check icon' quality={100} />
              <div className='flex flex-col '>
                <span className='text-2xl font-bold'>+ {props.guessCount}</span>
                <span>Palpites enviados </span>
              </div>
            </div>
          </div>
        </main>
        <Img src={previewApp} alt='preview mobile app' quality={100} />
      </div>
    </>
  )
}
export const getStaticProps = async () => {
  const [pollCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get('/polls/count'),
      api.get('/guesses/count'),
      api.get('/users/count')
    ])

  return {
    props: {
      pollCount: pollCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count
    },
    revalidate: 60 * 30 // revalidate data every 30 minutes
  }
}
