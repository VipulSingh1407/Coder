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

    const userId = session.user.id
    const isPremium = session.user.isPremium
    const roomId = nanoid(12)

    const roomObj = {
      creator: userId,
      joinable: true,
      limit: isPremium ? 16 : 6
    }

    const roomStr = JSON.stringify(roomObj)

    // Use kv.put instead of kv.set for faster writes
    await kv.put(roomId, roomStr)

    // Get the room from KV after writing
    const room = JSON.parse(await kv.get(roomId))

    return NextResponse.json({ message: "Created Successfully", roomId, room })
  } catch (e) {
    console.error("Error in room creation:", e)
    return NextResponse.json({ message: "Could Not Create Room" }, { status: 500 })
  }
}
