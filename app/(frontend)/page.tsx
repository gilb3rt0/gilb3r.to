// @ts-nocheck
'use client'
import { getProjects } from '@/sanity/utils'
import { Environment, Html, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import dynamic from 'next/dynamic'
import { View } from '@/components/canvas/View'
import styles from './Home.module.scss'
import Expose from '@/components/canvas/Expose/Expose'
import { Suspense } from 'react'
import Loading3D from '@/components/canvas/Loading/Loading3D'

const Background = dynamic(() => import('@/components/canvas/Background'), { ssr: false })
export default async function Page() {
  const projects = await getProjects()

  return (
    <View className={styles.View}>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
      <Background colorA='#6446DB' colorB='#B0A6DA' />
      <Environment preset='warehouse' />
      <Suspense fallback={<Loading3D />}>
        <Expose projects={projects} />
      </Suspense>
    </View>
  )
}
