'use client'

import * as React from 'react'
import { toast as sonnerToast } from "sonner"

type ToastProps = {
  title?: React.ReactNode
  description?: React.ReactNode
}

function toast({ title, description }: ToastProps) {
  return sonnerToast(title as string, {
    description,
  })
}

function useToast() {
  return {
    toast,
    dismiss: sonnerToast.dismiss,
  }
}

export { useToast, toast }