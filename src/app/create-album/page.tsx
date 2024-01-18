"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";

interface Artist {
  artist_id: number;
  name: string;
}

interface AlbumFormData {
  name: string;
  releaseDate: string;
  price: string;
}

const CreateAlbum: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);
  const [albumData, setAlbumData] = useState<AlbumFormData>({
    name: "",
    releaseDate: "",
    price: "",
  });

  useEffect(() => {
    const fetchArtists = async () => {
      const response = await fetch("http://localhost:3001/artists");
      const data = await response.json();
      setArtists(data);
    };

    fetchArtists();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !selectedArtistId ||
      !albumData.name ||
      !albumData.releaseDate ||
      !albumData.price
    ) {
      alert("Please fill in all album details");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/albums", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artistId: selectedArtistId,
          ...albumData,
          price: parseFloat(albumData.price),
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      alert("Album created successfully");
      setAlbumData({ name: "", releaseDate: "", price: "" });
    } catch (error) {
      console.error("Failed to create album:", error);
      alert("Failed to create album");
    }
  };

  return (
    <div>
      <Navbar />

      <h1>Create New Album</h1>
      <div>
        <h2>Select an Artist</h2>
        <ul>
          {artists.map((artist) => (
            <li
              key={artist.artist_id}
              onClick={() => {
                setSelectedArtistId(artist.artist_id);
              }}
            >
              {artist.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedArtistId && (
        <form onSubmit={handleSubmit}>
          <label>
            Album Name:
            <input
              type="text"
              value={albumData.name}
              onChange={(e) =>
                setAlbumData({ ...albumData, name: e.target.value })
              }
            />
          </label>
          <label>
            Release Date:
            <input
              type="date"
              value={albumData.releaseDate}
              onChange={(e) =>
                setAlbumData({ ...albumData, releaseDate: e.target.value })
              }
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              step="0.01"
              value={albumData.price}
              onChange={(e) =>
                setAlbumData({ ...albumData, price: e.target.value })
              }
            />
          </label>
          <button type="submit">Create Album</button>
        </form>
      )}
    </div>
  );
};

export default CreateAlbum;
