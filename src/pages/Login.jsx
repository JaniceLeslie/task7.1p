// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInEmail, signInGoogle } from "../lib/auth";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await signInEmail(form.email.trim().toLowerCase(), form.password);
      navigate("/", { replace: true });
    } catch (e2) {
      setErr(readableAuthError(e2));
      console.error("[LOGIN ERROR]", e2);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setErr("");
    setLoading(true);
    try {
      await signInGoogle();
      navigate("/", { replace: true });
    } catch (e2) {
      setErr(readableAuthError(e2));
      console.error("[GOOGLE LOGIN ERROR]", e2);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrap">
      <div className="form-card">
        <Link to="/register" className="form-toplink">Sign up</Link>

        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="email">Your email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input"
            value={form.email}
            onChange={onChange}
            autoComplete="email"
            required
          />

          <label className="form-label" htmlFor="password">Your password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-input"
            value={form.password}
            onChange={onChange}
            autoComplete="current-password"
            required
            minLength={6}
          />

          {err && <div className="form-error">{err}</div>}

          <button className="form-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            className="form-button"
            onClick={handleGoogle}
            disabled={loading}
            style={{ marginTop: 10 }}
          >
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
}

function readableAuthError(e) {
  const c = e?.code || "";
  if (c.includes("user-not-found") || c.includes("wrong-password"))
    return "Invalid email or password.";
  if (c.includes("invalid-email")) return "Please enter a valid email.";
  if (c.includes("too-many-requests"))
    return "Too many attempts. Try again later.";
  if (c.includes("popup-closed-by-user")) return "Google popup was closed.";
  return e?.message || "Something went wrong.";
}
