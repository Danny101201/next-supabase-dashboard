"use client";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import { updateBlogById } from "../../actions";

const categories = ["css", "js"]
const editBlogFormSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  category: z.enum(["css", "js"]),
  context: z.string()
});
export type EditBlogFormSchema = z.infer<typeof editBlogFormSchema>

type EditFormProps = {
  id: string,
  defaultValues: Partial<EditBlogFormSchema>
}
export const EditForm = ({ id, defaultValues }: EditFormProps) => {
  const [isPending, startTransaction] = useTransition()
  const { toast } = useToast()
  const form = useForm<EditBlogFormSchema>({
    resolver: zodResolver(editBlogFormSchema),
    defaultValues
  });


  const onSubmit = (data: EditBlogFormSchema) => {
    startTransaction(async () => {
      try {
        const result = await updateBlogById(id, data);
        toast({
          title: 'success editBlog'
        })
      } catch (e) {
        if (e instanceof Error) {
          toast({
            title: 'failed editBlog',
            description: e.message
          })
        }
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Blog title"
                  type="text"
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="context"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Context</FormLabel>
              <FormControl>
                <Input
                  placeholder="Blog Context"
                  type="text"
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category, index) => {
                    return (
                      <SelectItem
                        value={category}
                        key={index}
                      >
                        {category}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" variant="outline" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
