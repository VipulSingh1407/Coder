import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "./spinner";

interface Props {
  authenticated: boolean;
}

const CreateRoom = ({ authenticated }: Props) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const createRoom = async () => {
    if (!authenticated) {
      router.push("/auth/signin");
      toast.error("You need to be signed in first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/room/create");
      if (!res.ok) throw new Error("Failed to create room");
      const data = await res.json();
      if (!data.roomId) throw new Error("Room ID not received");
      router.push(`/room/join?roomID=${data.roomId}`);
      toast.success("Room created successfully");
    } catch (error) {
      console.error("Error creating room:", error);
      toast.error("Error in creating room");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const err = new URLSearchParams(window.location.search).get("err");
    if (err) toast.error(err, { duration: 4000 });
  }, []);

  return (
    <button
      onClick={createRoom}
      className={`text-center font-bold py-3 rounded-md bg-caribbeangreen-200 text-black hover:bg-caribbeangreen-50 transition-colors custom-outline w-full max-w-sm ${
        isLoading ? "cursor-progress" : ""
      } flex items-center justify-center`}
      disabled={isLoading}
    >
      {isLoading ? <Spinner sizeclass="h-6 w-6" /> : "Create Room"}
    </button>
  );
};

export default CreateRoom;
