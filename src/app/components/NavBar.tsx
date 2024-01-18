import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <div className="pb-10">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/artists">Artists</Link>
        </li>
        <li>
          <Link href="/create-artist">Create Artist</Link>
        </li>
        <li>
          <Link href="/create-album">Create Album</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
