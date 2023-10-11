'use client'
import { useEffect, useRef, useState } from 'react'

import { useFrame, useThree } from '@react-three/fiber'
import { Float, Html, Text3D, MeshReflectorMaterial, Center } from '@react-three/drei'
import { Group, Vector3 } from 'three'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const contactSchema = z.object({
  name: z.string().min(2, { message: 'Too short' }).max(50, { message: 'Too long' }),
  subject: z.string().min(2, { message: 'Too short' }).max(50, { message: 'Too long' }),
  email: z.string().email({ message: 'Invalid email' }),
  message: z.string().min(2, { message: 'Too short' }).max(500, { message: 'Too long' }),
})

export type ContactProps = z.infer<typeof contactSchema>

const Contact = ({ currentPage }) => {
  const contact = useRef<Group>()
  const [sent, setSent] = useState<boolean>(false)
  const [sending, setSending] = useState<boolean>(false)
  const form = useRef<Group>()
  const successMsg = useRef<Group>()
  const { size, camera } = useThree()
  const { width } = size
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  })

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
      const camerapos = new Vector3(
        contact.current.position.x,
        contact.current.position.y,
        contact.current.position.z + 20,
      )
      const offViewportPos = new Vector3(100, 0, 0)
      const inViewportPos = new Vector3(0, 0, 0)
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
          <Html transform center position-z={0.1} occlude className='' position-y={-1}>
            <form
              onSubmit={handleSubmit(async (data) => {
                if (!contactSchema.safeParse(data).success) return
                setSending(true)
                const res = await fetch('/api/contact', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
                })
                setSending(false)

                if (res.status !== 200) {
                  setSent(true)
                  reset()
                }
              })}
              className='flex flex-col justify-center items-start gap-2'
            >
              <div className='flex flex-row gap-3'>
                <div className='flex sm:flex-col justify-between'>
                  <label htmlFor='name' className='flex flex-col w-full font-primary tet-sm text-purple-50'>
                    name
                    <input
                      type='text'
                      {...register('name', { required: true })}
                      className='rounded-md outline-none focus:ring-2 focus:ring-pruple-900 focus:ring-opacity-50 px-2 py-1 bg-purple-50 text-purple-950'
                    />
                    {errors.name ? (
                      <span className='text-red-400 transition-all ease-in duration-100'>
                        {errors?.name?.message as string}
                      </span>
                    ) : null}
                  </label>
                  <label htmlFor='subject' className='flex flex-col w-full font-primary tet-sm text-purple-50'>
                    subject
                    <input
                      type='text'
                      {...register('subject', { required: true })}
                      className='rounded-md outline-none focus:ring-2 focus:ring-pruple-900 focus:ring-opacity-50 px-2 py-1 bg-purple-50 text-purple-950'
                    />
                    {errors.subject ? (
                      <span className='text-red-400 transition-all ease-in duration-100'>
                        {errors?.subject?.message as string}
                      </span>
                    ) : null}
                  </label>
                  <label htmlFor='email' className='flex flex-col w-full font-primary tet-sm text-purple-50'>
                    email
                    <input
                      type='email'
                      {...register('email', { required: true })}
                      className='rounded-md outline-none focus:ring-2 focus:ring-pruple-900 focus:ring-opacity-50 px-2 py-1 bg-purple-50 text-purple-950'
                    />
                    {errors.email ? (
                      <span className='text-red-400 transition-all ease-in duration-100'>
                        {errors?.email?.message as string}
                      </span>
                    ) : null}
                  </label>
                </div>
                <label htmlFor='message' className='flex flex-col w-full font-primary tet-sm text-purple-50'>
                  message
                  <textarea
                    {...register('message', { required: true })}
                    className='rounded-md outline-none focus:ring-2 focus:ring-pruple-900 resize-none focus:ring-opacity-50 px-2 py-1 h-56 bg-purple-50 text-purple-950'
                  />
                  {errors.message ? (
                    <span className='text-red-400 transition-all ease-in duration-100'>
                      {errors?.message?.message as string}
                    </span>
                  ) : null}
                </label>
              </div>
              <button type='submit' className='rounded-md bg-purple-900 text-white p-2 w-full' disabled={sending}>
                send
              </button>
            </form>
          </Html>
        </Float>
      </group>
    </group>
  )
}

export default Contact
