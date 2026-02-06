import { Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: 24 }}>
      <h1>GLOBALISSUES</h1>
      <p>This is the homepage.</p>
      <Link to="/instructions">Go to instructions</Link>
    </div>
  );
}

function Instructions() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Here are your Instructions</h2>
      <Link to="/">Back home</Link>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/instructions" element={<Instructions />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

