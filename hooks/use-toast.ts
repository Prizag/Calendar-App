'use client'

import { toast as sonnerToast } from "sonner"

type ToastProps = {
  title?: string
  description?: string
}

function toast({ title, description }: ToastProps) {
  return sonnerToast(title || "", {
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