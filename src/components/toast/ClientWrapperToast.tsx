"use client"
import React from 'react'
import ClientSuccessToast from './ClientSuccessToast'
import { ToastContainer } from 'react-toastify'

export default function ClientWrapperToast() {
  return (

        <>
          <ToastContainer />
          <ClientSuccessToast />
        </>
  )
}
