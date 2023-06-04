'use client'
import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, Html, useScroll } from '@react-three/drei'
import styles from './Contact.module.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik'
const Contact = () => {
  const contact = useRef<THREE.Group>()
  const [sent, setSent] = useState<boolean>(false)
  const { camera } = useThree()

  const scroll = useScroll()

  useFrame(() => {
    const { offset } = scroll
    if (contact.current) {
      const camerapos = new THREE.Vector3(
        contact.current.position.x,
        contact.current.position.y,
        contact.current.position.z + 10,
      )
      if (offset > (1 / 3) * 2) {
        camera.position.lerp(camerapos, 0.05)
        camera.lookAt(contact.current.position)
      }
    }
  })
  return (
    <group position={[50, -50, -200]} ref={contact}>
      <Float>
        <Html
          rotation={[0, 0, 0]}
          transform
          center
          occlude
          className={styles.Container}
          portal={{ current: scroll.fixed }}
        >
          <h1>GET IN TOUCH</h1>
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
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
              })
              if (!res.ok) {
                setSubmitting(false)
                setErrors({ message: 'Something went wrong' })
              }

              setSubmitting(false)
              setErrors({ message: 'Message sent' })
            }}
          >
            {({ isSubmitting, errors }) => (
              <Form>
                <div>
                  <ErrorMessage name='name' component='div' className={styles.Err} />
                  <Field type='name' name='name' placeholder='Name' />
                  <ErrorMessage name='subject' component='div' className={styles.Err} />
                  <Field type='subject' name='subject' placeholder='Subject' />
                  <ErrorMessage name='email' component='div' className={styles.Err} />
                  <Field type='email' name='email' placeholder='Email' />
                </div>
                <div>
                  <ErrorMessage name='message' component='div' className={styles.Err} />
                  <Field as='textarea' name='message' placeholder='Message' />
                </div>
                <Field type='submit' value='Submit' disabled={isSubmitting} />
              </Form>
            )}
          </Formik>
        </Html>
      </Float>
    </group>
  )
}

export default Contact
