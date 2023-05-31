//@ts-nocheck
'use client'
import { getProjects } from '@/sanity/utils'
import { Environment, OrbitControls } from '@react-three/drei'
import dynamic from 'next/dynamic'
import { View } from '@/components/canvas/View'
import Laptop from '@/components/canvas/Laptop/Laptop'
import styles from './Home.module.scss'

const Loading = () => {
  return (
    <div className={styles.Loading}>
      <svg className={styles.Spinner} fill='none' viewBox='0 0 24 24'>
        <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  )
}

const Background = dynamic(() => import('@/components/canvas/Background'), { ssr: false })
export default async function Page() {
  const projects = await getProjects()

  return (
    <View className={styles.View}>
      <Background colorA='#6446DB' colorB='#B0A6DA' />
      <Environment preset='warehouse' />
      <Laptop projects={projects} />
    </View>
  )
}
