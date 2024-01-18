"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";

interface Artist {
  artist_id: number;
  name: string;
}

interface Album {
  id: number;
  artist_id: number;
  name: string;
  release_date: string;
  price: number;
}

const ArtistsPage = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArtistAlbums, setSelectedArtistAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/artists");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Artist[] = await response.json();
        setArtists(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchAlbums = async (artistId: number) => {
    try {
      console.log("fetch?");
      const response = await fetch(
        `http://localhost:3001/artists/${artistId}/albums`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const albums: Album[] = await response.json();
      setSelectedArtistAlbums(albums);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <h1>Artists</h1>
      <ul>
        {artists.map((artist) => (
          <li
            key={artist.artist_id}
            onClick={() => {
              console.log("clicked!", artist);
              fetchAlbums(artist.artist_id);
            }}
          >
            {artist.name}
          </li>
        ))}
      </ul>
      {selectedArtistAlbums.length > 0 && (
        <div>
          <h2>Albums</h2>
          <ul>
            {selectedArtistAlbums.map((album) => (
              <li key={album.id}>
                {album.name} - Released: {album.release_date} - Price:{" "}
                {album.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ArtistsPage;
