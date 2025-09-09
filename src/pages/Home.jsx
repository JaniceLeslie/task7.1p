import Navbar from "../components/Navbar.jsx";

export default function Home() {
  const name = localStorage.getItem("name") || "friend";
  const logout = () => { localStorage.clear(); location.href = "/login"; };

  return (
    <>
      <Navbar />
      <div style={{ padding: 40, textAlign: "center" }}>
        <h1>Welcome,</h1>
        <p>You are now at DEV@DEAKIN</p>
      </div>
    </>
  );
}
