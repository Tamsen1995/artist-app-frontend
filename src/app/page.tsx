import Link from "next/link";
import Navbar from "./components/NavBar";
import React from "react";

export default function Home() {
  return (
    <main className="">
      <Navbar />

      <div className="flex flex-col">
        <Link className="pb-4" href="/create-artist">
          Welcome to artist app. To create an artist please click here!
        </Link>
        <Link className="pb-4" href="/create-album">
          To add an album to existing artists please click here!
        </Link>
        <Link className="pb-4" href="/artists">
          To show all artists currently registered please click here !
        </Link>
      </div>
    </main>
  );
}
