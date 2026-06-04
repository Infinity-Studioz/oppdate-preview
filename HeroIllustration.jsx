'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import HeroSVG from '@/assets/oppdate-hero-illustration.svg'

export default function HeroIllustration() {
  const svgRef = useRef(null)

  useEffect(() => {
    const root = svgRef.current
    if (!root) return

    const q = (id) => root.querySelector(id)

    const bg           = q('#bg')
    const ambientGlow  = q('#ambient-glow')
    const keyCore      = q('#key-core')
    const keySparkle   = q('#key-sparkle')
    const supporters   = q('#supporters')
    const girlBody     = q('#girl-body')
    const girlArm      = q('#girl-arm')
    const contactBurst = q('#contact-burst')

    // initial states
    gsap.set(keyCore,      { opacity: 0, scale: 0.85, transformOrigin: '50% 50%' })
    gsap.set(ambientGlow,  { opacity: 0 })
    gsap.set(keySparkle,   { opacity: 0 })
    gsap.set(supporters,   { opacity: 0, y: 30 })
    gsap.set(girlBody,     { opacity: 0, y: 20 })
    gsap.set(girlArm,      { opacity: 0, y: 20 })
    gsap.set(contactBurst, { opacity: 0 })

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    // entry sequence
    tl
      .to(keyCore,     { opacity: 1, scale: 1, duration: 0.7 })
      .to(ambientGlow, { opacity: 0.7, duration: 0.6 },       '-=0.4')
      .to(keySparkle,  { opacity: 0.8, duration: 0.5 },       '-=0.3')
      .to(supporters,  { opacity: 1, y: 0, duration: 0.75 },  '-=0.1')
      .to(girlBody,    { opacity: 1, y: 0, duration: 0.7 },   '-=0.4')
      .to(girlArm,     { opacity: 1, y: 0, duration: 0.55 },  '-=0.35')

    // contact moment
    tl
      .to(contactBurst, { opacity: 0.9, duration: 0.15, ease: 'power3.in' })
      .to(contactBurst, { opacity: 0,   duration: 0.35, ease: 'power2.out' })

    // idle loops
    tl.add(() => {
      gsap.to(keyCore, {
        y: -7,
        duration: 2.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      gsap.to(ambientGlow, {
        opacity: 1,
        duration: 2.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      gsap.to(keySparkle, {
        opacity: 0.4,
        duration: 1.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.4,
      })

      gsap.to(girlArm, {
        y: -4,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.3,
      })
    })

    return () => {
      tl.kill()
      gsap.killTweensOf([
        keyCore, ambientGlow, keySparkle,
        supporters, girlBody, girlArm, contactBurst,
      ])
    }
  }, [])

  return <HeroSVG ref={svgRef} aria-label="OppDate hero illustration" />
}
