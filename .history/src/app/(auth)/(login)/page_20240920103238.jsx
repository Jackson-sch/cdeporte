'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { FaGoogle, FaFacebook } from 'react-icons/fa'

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Inicio de sesión:', credentials)
    // Aquí iría la lógica para autenticar al usuario
  }

  return (
    <>>
  )
}