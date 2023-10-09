import { Html } from '@react-three/drei'

import { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PageControls = ({ currentPage, setCurrentPage }) => {
  const { size } = useThree()
  const isMobile = size.width < 768

  const indicator = useRef<THREE.Group>()
  const nextPage = () => {
    if (currentPage < 4) {
      setCurrentPage(currentPage + 1)
    }
  }
  const startPage = () => {
    if (currentPage > 1) {
      setCurrentPage(1)
    }
  }

  const [scrollIndicator, setScrollIndicator] = useState<boolean>(null)
  useEffect(() => {
    setTimeout(() => {
      setScrollIndicator(true)
    }, 4000)
  }, [])
  const x = isMobile ? -2 : 7
  const y = isMobile ? 7.5 : -7
  const yTop = isMobile ? 7.5 : 6

  const hidePosition = new THREE.Vector3(100, 100, 100)
  const infoPosition = new THREE.Vector3(x, y, 0)
  const stackPosition = new THREE.Vector3(-100 + x, 0 + yTop, 0)
  const exposePosition = new THREE.Vector3(-50 + x, 75 + y, -100)
  const contactPosition = new THREE.Vector3(100 + x, -50 + y, -200)
  const [nextSection, setNextSection] = useState<string>('')
  const [currentSection, setCurrentSection] = useState<number>(1)

  useFrame(() => {
    if (indicator.current) {
      if (scrollIndicator) {
        if (currentPage === 1) {
          setNextSection('learn more')
          setCurrentSection(1)
          indicator.current.position.lerp(infoPosition, 0.05)
        }
        if (currentPage === 2) {
          setNextSection('see my work')
          setCurrentSection(2)
          indicator.current.position.lerp(stackPosition, 0.05)
        }
        if (currentPage === 3) {
          setCurrentSection(3)
          setNextSection('interested? drop me a line')
          indicator.current.position.lerp(exposePosition, 0.05)
        }
        if (currentPage === 4) {
          setCurrentSection(4)
          setNextSection('back to top')
          indicator.current.position.lerp(contactPosition, 0.05)
        }
      }
    } else {
      indicator.current.position.lerp(hidePosition, 0.05)
    }
  })
  return (
    <group ref={indicator} scale={1.5} position={hidePosition}>
      <Html center>
        <button
          className='text-purple-100 opacity-70 flex gap-4 items-center p-2 rounded-full border-2 border-purple-100 hover:scale-110 transition-all duration-250 ease-in-out'
          onClick={() => {
            currentPage < 4 ? nextPage() : startPage()
          }}
        >
          <span className='font-primary text-2xl w-28'>{currentSection + ' / 4'}</span>
          <span className='font-display'>{nextSection}</span>
        </button>
      </Html>
    </group>
  )
}

export default PageControls
