"use client";
import { toast } from "react-hot-toast";
const EmailButton = () => {
  return (
    <button className="text-center font-bold py-3 rounded-md bg-caribbeangreen-200 text-black hover:bg-caribbeangreen-50 transition-colors custom-outline w-full max-w-sm cursor-pointer"  onClick={()=>toast.error("This feature has not been added yet.")}>
      Submit
    </button>
  )
}

export default EmailButton