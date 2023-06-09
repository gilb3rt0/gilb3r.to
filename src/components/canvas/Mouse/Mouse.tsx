import { Html, useScroll } from '@react-three/drei'
import styles from './Mouse.module.scss'
import { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const SvgMouse = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    data-name='Ebene 1'
    viewBox='0 0 250 250'
    width='true'
    height='true'
    {...props}
  >
    <path d='M193.15 124c-.18 36.76-12.38 82.68-46.94 102a48.9 48.9 0 0 1-43.95 2.26C86.6 221.25 75 207.45 67 192.64 46.89 155.4 45.69 107.13 61.07 68c11.64-29.57 39.55-61 74.69-50.49 18.12 5.43 31.67 20.56 40.6 36.63C188.15 75.39 193 99.9 193.15 124c0 6.43 10 6.45 10 0-.2-40.63-14.57-91.11-53.37-111.42a58.91 58.91 0 0 0-50.37-2.42C81.71 17.6 68.2 32.6 59 49.13c-22.45 40.41-24.1 93.65-6.5 136.12 13.94 33.66 46.27 66.72 85.91 54.84 20.18-6 35.71-22.17 45.92-40.05 13.13-23 18.69-49.76 18.82-76 .03-6.48-9.97-6.48-10-.04Z' />
    <path d='M114.5 53v58c0 7.72 12 7.73 12 0V53c0-7.72-12-7.73-12 0Z' className={styles.ScrollWheel} />
  </svg>
)

const Mouse = () => {
  const { size, viewport } = useThree()
  const isMobile = size.width < 768
  const scroll = useScroll()
  const indicator = useRef<THREE.Group>()

  const [scrollIndicator, setScrollIndicator] = useState<boolean>(null)
  useEffect(() => {
    setTimeout(() => {
      setScrollIndicator(true)
    }, 4000)
  }, [])
  const x = isMobile ? 3.5 : 11
  const y = isMobile ? 6 : -6
  const yTop = isMobile ? 6 : 6

  const hidePosition = new THREE.Vector3(100, 100, 100)
  const infoPosition = new THREE.Vector3(x, y, 0)
  const stackPosition = new THREE.Vector3(-100 + x, 0 + yTop, 0)
  const exposePosition = new THREE.Vector3(-50 + x, 75 + y, -100)
  const [nextSection, setNextSection] = useState<string>('')
  const [currentSection, setCurrentSection] = useState<number>(1)

  useFrame(() => {
    const { offset } = scroll
    if (indicator.current) {
      if (scrollIndicator) {
        if (offset < 1 / 4) {
          setNextSection('learn more')
          setCurrentSection(1)
          indicator.current.position.lerp(infoPosition, 0.05)
        }
        if (offset > 1 / 4 && offset < 1 / 2) {
          setNextSection('see my work')
          setCurrentSection(2)
          indicator.current.position.lerp(stackPosition, 0.05)
        }
        if (offset > 1 / 2 && offset < 3 / 4) {
          setCurrentSection(3)
          setNextSection('interested? drop me a line')
          indicator.current.position.lerp(exposePosition, 0.05)
        }
        if (offset > 3 / 4) {
          setCurrentSection(4)
          setNextSection('back to top')
          indicator.current.position.lerp(hidePosition, 0.05)
        }
      }
    } else {
      indicator.current.position.lerp(hidePosition, 0.05)
    }
  })
  return (
    <group ref={indicator} scale={1.5} position={hidePosition}>
      <Html transform occlude portal={{ current: scroll.fixed }}>
        <div className={styles.Container}>
          <div className={styles.CurrentSection}>{currentSection + ' / 4'}</div>
          <div>
            <div className={styles.Message}>{nextSection}</div>
            <SvgMouse />
          </div>
        </div>
      </Html>
    </group>
  )
}
export default Mouse
