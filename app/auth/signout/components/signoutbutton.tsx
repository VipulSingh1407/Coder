"use client";
import { signOut } from "next-auth/react"

const SignOutButton = () => {
  return (
    <button className="text-center font-bold py-3 rounded-md bg-caribbeangreen-200 text-black hover:bg-caribbeangreen-50 transition-colors custom-outline w-full max-w-sm" onClick={() => signOut( { callbackUrl: '/' } )}>
      Sign Out
    </button>
  )
}

export default SignOutButton