'use client'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, Html, useScroll, Text3D, MeshReflectorMaterial, Center } from '@react-three/drei'
import styles from './Contact.module.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import LoadingDom from '@/components/dom/Loading/LoadingDom'
const Contact = ({ currentPage }) => {
  const contact = useRef<THREE.Group>()
  const [sent, setSent] = useState<boolean>(false)
  const form = useRef<THREE.Group>()
  const successMsg = useRef<THREE.Group>()
  const { size, camera } = useThree()
  const { width } = size

  const isMobile = width < 768

  useEffect(() => {
    if (sent) {
      setTimeout(() => {
        setSent(false)
      }, 5000)
    }
  }, [sent])

  useFrame(() => {
    if (contact.current) {
      const camerapos = new THREE.Vector3(
        contact.current.position.x,
        contact.current.position.y,
        contact.current.position.z + 20,
      )
      const offViewportPos = new THREE.Vector3(100, 0, 0)
      const inViewportPos = new THREE.Vector3(0, 0, 0)
      if (currentPage === 4) {
        camera.position.lerp(camerapos, 0.05)
        camera.lookAt(contact.current.position)
      }
      if (sent) {
        form.current.position.lerp(offViewportPos, 0.05)
        successMsg.current.position.lerp(inViewportPos, 0.05)
      } else {
        successMsg.current.position.lerp(offViewportPos, 0.05)
        form.current.position.lerp(inViewportPos, 0.05)
      }
    }
  })
  return (
    <group position={[100, -50, -200]} ref={contact}>
      <group ref={successMsg} visible={sent}>
        <Center>
          <Text3D
            font='/fonts/Pilowlava_Regular.json'
            curveSegments={12}
            bevelEnabled
            height={0.1}
            size={2}
            letterSpacing={0.02}
            scale={isMobile ? 0.3 : 1}
          >
            <MeshReflectorMaterial
              mirror={0.5}
              metalness={0.9}
              roughness={0.01}
              blur={[0, 0]}
              distortion={0.1}
              resolution={1024}
              args={[{ color: '#fff' }]}
            />
            THANK YOU!
          </Text3D>
        </Center>
      </group>
      <group ref={form} visible={!sent}>
        <Float>
          <group position={[0, 5, 0]}>
            <Center>
              <Text3D
                font='/fonts/Pilowlava_Regular.json'
                curveSegments={12}
                bevelEnabled
                height={0.1}
                size={2}
                letterSpacing={0.02}
                visible={sent}
                scale={isMobile ? 0.3 : 1}
              >
                <MeshReflectorMaterial
                  mirror={0.5}
                  metalness={0.9}
                  roughness={0.01}
                  blur={[0, 0]}
                  distortion={0.1}
                  resolution={1024}
                  args={[{ color: '#fff' }]}
                />
                GET IN TOUCH!
              </Text3D>
            </Center>
          </group>
          <Html transform center position-z={0.1} occlude className={styles.Container} position-y={-1}>
            <Formik
              initialValues={{ name: '', subject: '', email: '', message: '' }}
              validate={(values) => {
                const errors: any = {}
                if (!values.name) {
                  errors.name = 'Required'
                }
                if (!values.email) {
                  errors.email = 'Required'
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                  errors.email = 'Invalid email address'
                }
                return errors
              }}
              onSubmit={async (values, { setSubmitting, setErrors, setValues }) => {
                const res = await fetch('/api/contact', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(values),
                })

                setSubmitting(false)
                setSent(true)
                setValues({ name: '', subject: '', email: '', message: '' })
              }}
            >
              {({ isSubmitting }) => {
                return isSubmitting ? (
                  <LoadingDom />
                ) : (
                  <Form>
                    <div>
                      <ErrorMessage name='name' component='div' className={styles.Err} />
                      <Field type='name' name='name' placeholder='Name' disabled={isSubmitting} />
                    </div>

                    <div>
                      <ErrorMessage name='subject' component='div' className={styles.Err} />
                      <Field type='subject' name='subject' placeholder='Subject' disabled={isSubmitting} />
                    </div>
                    <div>
                      <ErrorMessage name='email' component='div' className={styles.Err} />
                      <Field type='email' name='email' placeholder='Email' disabled={isSubmitting} />
                    </div>

                    <div>
                      <ErrorMessage name='message' component='div' className={styles.Err} />
                      <Field as='textarea' name='message' placeholder='Message' disabled={isSubmitting} />
                    </div>
                    <Field type='submit' value='Submit' disabled={isSubmitting} />
                  </Form>
                )
              }}
            </Formik>
          </Html>
        </Float>
      </group>
    </group>
  )
}

export default Contact
