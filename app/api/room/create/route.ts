import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { nanoid } from 'nanoid'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 })
    }
    const userId = session?.user?.id
    const isPremium = session?.user?.isPremium
    const roomId = nanoid(12)

    const obj = {
      creator: userId,
      joinable: true,
      limit: isPremium ? 16 : 6
    }
    const str = JSON.stringify(obj)

    // Parallelize KV set and KV get operations
    const setPromise = kv.set(roomId, str)
    const getPromise = kv.get(roomId)

    await Promise.all([setPromise, getPromise])

    const room = await getPromise

    console.log(room)
    return NextResponse.json({ message: "Created Successfully", roomId })
  } catch (e) {
    console.log(e, "Error in room creation")
    return NextResponse.json({ message: "Could Not Create Room" }, { status: 500 })
  }
}
