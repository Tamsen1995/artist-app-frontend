"use client";
import React, { useState } from "react";
import Navbar from "../components/NavBar";

const CreateArtist: React.FC = () => {
  const [artistName, setArtistName] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!artistName) {
      alert("Please enter an artist name");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/artists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: artistName }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      alert(`Artist created with ID: ${result.id}`);
      setArtistName(""); // Reset input after successful creation
    } catch (error) {
      console.error("Failed to create artist:", error);
      alert("Failed to create artist");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Navbar />
      <label>
        Artist Name:
        <input
          type="text"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
        />
      </label>
      <button type="submit">Create Artist</button>
    </form>
  );
};

export default CreateArtist;
