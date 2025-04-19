import React, { useState } from "react";
import Home from "./pages/Home";
import "./index.css";
import Header from "./components/Header";

function App() {
  const [query, setQuery] = useState("");

  return (
    <>
      <Header query={query} onSearchChange={setQuery} />
      <Home searchQuery={query} />
    </>
  );
}

export default App;
