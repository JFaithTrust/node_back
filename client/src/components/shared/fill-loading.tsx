import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Loader2} from "lucide-react";

const FillLoading = () => {
  return (
   <Skeleton className={"absolute inset-0 flex w-full h-full justify-center items-center opacity-70 z-50"}>
     <Loader2 className={"animate-spin"}/>
   </Skeleton>
  );
}

export default FillLoading;