"use client";
import { useRouter } from "next/navigation"

const BackButton = () => {
  const router = useRouter()
  return (
    <button className="text-center py-2 rounded-md font-bold bg-richblack-900  text-white hover:bg-richblack-700 transition-all custom-outline w-full max-w-sm" onClick={()=>router.back()}>
      Back
    </button>
  )
}

export default BackButton