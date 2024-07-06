import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle} from "@/components/ui/sheet.tsx";
import {useCreatePost} from "@/hooks/use-create-post.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {postSchema} from "@/lib/validation.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ChangeEvent, useState} from "react";
import {Label} from "@/components/ui/label.tsx";
import $axios from "@/http";
import {toast} from "sonner";

const CreatePost = () => {
  const [loading, setLoading] = useState(false)
  const [picture, setPicture] = useState<File | null>(null)
  const {isOpen, onClose} = useCreatePost()

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {title: '', content: ''},
  })

  function onSubmit(values: z.infer<typeof postSchema>) {
    if (!picture) return null
    setLoading(true)
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('content', values.content)
    formData.append('picture', picture)

    const promise = $axios
      .post('/post/create', formData)
      .then(res => console.log(res))
      .finally(() => setLoading(false))


    toast.promise(promise, {
      loading: 'Loading...',
      success: 'Successfully created!!!',
      error: 'Something went wrong!',
    })
    console.log(values)
  }

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    setPicture(file as File)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Post</SheetTitle>
          <SheetDescription>Write what is in your mind</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2 mt-6'>
            <FormField
              control={form.control}
              name='title'
              render={({field}) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Create a blog post'
                           disabled={loading}
                           className='bg-secondary' {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='content'
              render={({field}) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='In this article you can improve...'
                      className='bg-secondary'
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <div>
              <Label htmlFor='picture'>Picture</Label>
              <Input id='picture' type='file' disabled={loading} className='bg-secondary' onChange={onFileChange}/>
            </div>
            <Button type='submit'
                    disabled={loading}
            >
              Submit
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

export default CreatePost