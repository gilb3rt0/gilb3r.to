import { Html } from '@react-three/drei'
import styles from './PageControls.module.scss'
import { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PageControls = ({ currentPage, setCurrentPage }) => {
  const { size, viewport } = useThree()
  const isMobile = size.width < 768
  console.log(currentPage)

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
  const x = isMobile ? 3.5 : 9
  const y = isMobile ? 6 : -7
  const yTop = isMobile ? 6 : 6

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
      <Html transform occlude>
        <div className={styles.Container}>
          <div className={styles.Message}>
            <div className={styles.CurrentSection}>{currentSection + ' / 4'}</div>
            <button
              onClick={() => {
                currentPage < 4 ? nextPage() : startPage()
              }}
            >
              {nextSection}
            </button>
          </div>
        </div>
      </Html>
    </group>
  )
}

export default PageControls
