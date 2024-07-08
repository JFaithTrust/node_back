import {IPost} from "@/interfaces";
import {Card, CardContent, CardFooter, CardTitle} from "@/components/ui/card.tsx";
import {API_URL} from "@/http";
import {Button} from "@/components/ui/button.tsx";
import {useConfirm} from "@/hooks/use-confirm.ts";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {postSchema} from "@/lib/validation.ts";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Popover, PopoverContent} from "@/components/ui/popover.tsx";

const PostCard = ({post}: { post: IPost }) => {
  const [open, setOpen] = useState(false)
  const {onOpen, setPost} = useConfirm()

  const onDelete = () => {
    onOpen()
    setPost(post)
  }


  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post.title,
      content: post.content,
    }
  })

  function onSubmit(values: z.infer<typeof postSchema>) {}

  return (
    <Card>
      <img src={`${API_URL}/${post.picture}`} alt={post.title} className={"rounded-t-md"}/>
      <CardContent className={"mt-2"}>
        <CardTitle className={"line-clamp-1"}>{post.title}</CardTitle>
        <p className={"line-clamp-2 mt-1 text-muted-foreground"}>{post.content}</p>
      </CardContent>
      <CardFooter className={"gap-2"}>
        <Button className={"w-full"} onClick={onOpen}>Edit</Button>
        <Button className={"w-full"} onClick={onDelete} variant={"destructive"}>Delete</Button>
      </CardFooter>
      <Popover>
        <PopoverContent>
          Please confirm that you want to delete this post.
        </PopoverContent>
      </Popover>
    </Card>
  )
}

export default PostCard;