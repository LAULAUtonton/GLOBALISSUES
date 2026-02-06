import { Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: 24 }}>
      <h1>GLOBALISSUES</h1>
      <p>Choose a section:</p>
      <ul>
        <li><Link to="/instructions">Instructions</Link></li>
      </ul>
    </div>
  );
}

function Instructions() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Here are your Instructions</h2>
      <p>Add your real instructions here.</p>
      <p><Link to="/">Back</Link></p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/instructions" element={<Instructions />} />

      {/* IMPORTANT: fallback so it never goes blank */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
