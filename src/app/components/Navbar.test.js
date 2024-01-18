import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "./Navbar";

describe("Navbar Component", () => {
  // Test for rendering the Navbar component
  test("renders Navbar component", () => {
    render(<Navbar />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Artists")).toBeInTheDocument();
    expect(screen.getByText("Create Artist")).toBeInTheDocument();
    expect(screen.getByText("Create Album")).toBeInTheDocument();
  });

  // Test for correct href values in links
  test("contains correct links", () => {
    render(<Navbar />);
    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("Artists").closest("a")).toHaveAttribute(
      "href",
      "/artists"
    );
    expect(screen.getByText("Create Artist").closest("a")).toHaveAttribute(
      "href",
      "/create-artist"
    );
    expect(screen.getByText("Create Album").closest("a")).toHaveAttribute(
      "href",
      "/create-album"
    );
  });
});
