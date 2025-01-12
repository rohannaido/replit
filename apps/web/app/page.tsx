"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  async function createRepl() {
    try {
      const response = await fetch("/api/repl/start", {
        method: "POST",
        body: JSON.stringify({ replId: "a-124" }),
      });

      const data = await response.json();
      console.log(data);

      router.push(`/code/${data.replId}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">ReplIt</h1>
      <p className="text-lg text-gray-500">
        A simple way to share your code with the world.
      </p>
      <Button className="mt-4 bg-blue-500 text-white" onClick={createRepl}>Create Repl</Button>
    </div>
  );
}
