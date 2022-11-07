import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDMtIp5fF4XWBEtpOKWDGz0w24csB3nNO8',
  authDomain: 'auth-nlw-copa.firebaseapp.com',
  projectId: 'auth-nlw-copa',
  storageBucket: 'auth-nlw-copa.appspot.com',
  messagingSenderId: '511267210684',
  appId: '1:511267210684:web:7a522510948f04d14117b9'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
