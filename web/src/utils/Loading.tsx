import { useLottie } from 'lottie-react'
import animationData from './animationLocationIcon.json'

export function Loading() {
  const options = {
    animationData: animationData,
    loop: true,
    style: {
      width: 150,
      height: 120
    }
  }
  const { View } = useLottie(options)
  return <div className='p-0'>{View}</div>
}
