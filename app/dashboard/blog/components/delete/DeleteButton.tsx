'use client'
import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import React, { useTransition } from 'react'
import { deleteBlogById } from '../../actions'
import { useToast } from '@/components/ui/use-toast'

type DeleteButtonProps = {
  id: string
}
export const DeleteButton = ({ id }: DeleteButtonProps) => {
  const [isPending, startTransaction] = useTransition()
  const { toast } = useToast()

  const onSubmit = () => {
    startTransaction(async () => {
      try {
        await deleteBlogById(id)
        toast({
          title: 'success deleteBlog'
        })
      } catch (e) {
        if (e instanceof Error) {
          toast({
            title: 'failed deleteBlog',
            description: e.message
          })
        }
      }
    })

  }
  return (
    <form action={onSubmit}>
      <Button variant="outline" type="submit" disabled={isPending}>
        <TrashIcon />
        Delete
      </Button>
    </form>
  )
}
