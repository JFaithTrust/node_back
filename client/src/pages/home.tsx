import {useQuery} from "@tanstack/react-query";
import $axios from "@/http";
import PostCard from "@/components/cards/post-card.tsx";
import {IPost} from "@/interfaces";
import PostLoading from "@/components/shared/post-loading.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircle} from "lucide-react";
import {postStore} from "@/store/post.store.ts";
import ConfirmModal from "@/components/modals/confirm.modal.tsx";

const Home = () => {
  const { setPosts } = postStore()

  const {data, isLoading, error} = useQuery({
    queryKey: ['get-posts'],
    queryFn: async () => {
      const {data} = await $axios('/post/get')
      setPosts(data)
      return data
    }
  })

  return (
    <>
      <div className={"container max-w-4xl mx-auto mt-28"}>
        {error && (
          <Alert variant={"destructive"}>
            <AlertCircle className={"w-4 h-4"}/>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
        <div className={"grid grid-cols-3 gap-4"}>
          {isLoading &&
            Array.from({length: 6}).map((_, i) => (
              <PostLoading key={i}/>
            ))
          }
          {
            data?.map((post: IPost) => (
              <PostCard key={post._id} post={post}/>
            ))
          }
        </div>
      </div>

      <ConfirmModal/>
    </>
  )
}

export default Home