import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useConfirm} from "@/hooks/use-confirm.ts";
import {postStore} from "@/store/post.store.ts";
import {useMutation} from "@tanstack/react-query";
import $axios from "@/http";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircle} from "lucide-react";
import FillLoading from "@/components/shared/fill-loading.tsx";

const ConfirmModal = () => {
  const { isOpen, onClose, post} = useConfirm()
  const {setPosts, posts} = postStore()

  const { mutate, error, isPending } = useMutation({
    mutationKey: ['delete-post'],
    mutationFn: async () => {
      const {data} = await $axios.delete(`/post/delete/${post._id}`)
      return data
    },
    onSuccess: () => {
      setPosts(posts.filter(p => p._id !== post._id))
      onClose()
    }
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {error && (
          <Alert variant={"destructive"}>
            <AlertCircle className={"w-4 h-4"}/>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
        {isPending && <FillLoading />}
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this post?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"destructive"} onClick={onClose} >
            Cancel
          </Button>
          <Button onClick={() => mutate()}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmModal;