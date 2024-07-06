import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import CreatePost from "@/components/create-post.tsx";
import {useCreatePost} from "@/hooks/use-create-post.tsx";

const Navbar = () => {
  const { onOpen } = useCreatePost()

 return (
    <>
     <div className={"w-full h-24 bg-gray-900 fixed inset-0"}>
       <div className={"w-full h-full flex justify-between items-center"}>
         <Link to={'/'} className={"flex items-center justify-center gap-2 ml-2"}>
           <h1 className={"font-bold text-4xl"}>@</h1>
           <p className={"font-bold text-4xl"}>Solijoniy</p>
         </Link>
         <div className={"flex gap-2"}>
           <Button className={"rounded-full font-bold"} size={"lg"} variant={"outline"} onClick={onOpen} >
             Create Post
           </Button>
           <Link to={'/auth'}>
              <Button className={"rounded-full font-bold"} size={"lg"} >
                Login
              </Button>
           </Link>
         </div>
       </div>
     </div>

      <CreatePost />
    </>
 )
}

export default Navbar;