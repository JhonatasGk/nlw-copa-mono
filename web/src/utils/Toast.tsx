import * as ToastPrimitive from '@radix-ui/react-toast'
import { AnimatePresence, motion } from 'framer-motion'
import Img from 'next/image'
import icon from '../assets/icon.png'

export function Toast({ isOpen, onOpenChange }: any) {
  return (
    <>
      <AnimatePresence>
        <ToastPrimitive.Root
          key={'index'}
          open={isOpen}
          onOpenChange={onOpenChange}
          className='bg-brand-yellow-500 py-1 px-6  flex  items-center gap-4 justify-start rounded shadow-md'
          asChild
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            transition={{ ease: 'easeOut', duration: 0.7 }}
            exit={{ x: '100%' }}
          >
            <Img src={icon} alt='check icon' quality={100} />
            <motion.div>
              <ToastPrimitive.Title className='uppercase font-bold text-sm'>
                Bolão criado com sucesso!
              </ToastPrimitive.Title>
              <ToastPrimitive.Description className='text-gray-600'>
                O codigo do bolão foi copiado para area sua de transferência{' '}
              </ToastPrimitive.Description>
            </motion.div>
            <ToastPrimitive.Action altText='ewew' />
            <ToastPrimitive.Close className=' px-3 py-1 font-bold rounded bg-brand-yellow-200 hover:bg-brand-yellow-700 transitions-all'>
              X
            </ToastPrimitive.Close>
          </motion.div>
        </ToastPrimitive.Root>
        <ToastPrimitive.Viewport className='fixed top-6 right-2 w-[620px] ' />
      </AnimatePresence>
    </>
  )
}
