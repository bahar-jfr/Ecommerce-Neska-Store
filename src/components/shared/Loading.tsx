import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex justify-center items-center px-24 h-screen">
      <Loader2 className=" h-36 w-36 animate-spin text-quaternary" />
    </div>
  )
}
