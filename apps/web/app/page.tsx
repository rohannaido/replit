import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">ReplIt</h1>
      <p className="text-lg text-gray-500">
        A simple way to share your code with the world.
      </p>
      <Button className="mt-4 bg-blue-500 text-white">Create Repl</Button>
    </div>
  );
}
