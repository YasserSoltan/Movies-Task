import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-700 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold text-white dark:text-zinc-100">
        Welcome to Movies!
      </h1>
      <Link
        href="/movies"
        className="mt-4 rounded-lg bg-green-800 px-6 py-3 text-white transition-colors hover:bg-green-700"
      >
        Go to Movies Page
      </Link>
    </div>
  );
}
