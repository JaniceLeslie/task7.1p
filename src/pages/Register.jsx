import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUpEmail, signInGoogle } from "../lib/auth";
import { auth } from "../lib/firebase";
import { updateProfile } from "firebase/auth";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
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
      const { email, password, firstName, lastName } = form;
      if (!firstName || !lastName) throw new Error("Please fill in your name.");

      const cred = await signUpEmail(email.trim().toLowerCase(), password);

      // Update Firebase user profile with displayName
      await updateProfile(cred.user, {
        displayName: `${firstName} ${lastName}`,
      });

      navigate("/", { replace: true });
    } catch (e2) {
      setErr(readableAuthError(e2));
      console.error("[REGISTER ERROR]", e2);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrap">
      <div className="form-card">
        <Link to="/login" className="form-toplink">Log in</Link>

        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="firstName">First name</label>
          <input
            id="firstName"
            name="firstName"
            className="form-input"
            value={form.firstName}
            onChange={onChange}
            required
          />

          <label className="form-label" htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            name="lastName"
            className="form-input"
            value={form.lastName}
            onChange={onChange}
            required
          />

          <label className="form-label" htmlFor="email">Your email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input"
            value={form.email}
            onChange={onChange}
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
            required
            minLength={6}
          />

          {err && <div className="form-error">{err}</div>}

          <button className="form-button" disabled={loading}>
            {loading ? "Creating..." : "Sign up"}
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
  if (c.includes("email-already-in-use")) return "Email already registered.";
  if (c.includes("invalid-email")) return "Please enter a valid email.";
  if (c.includes("weak-password")) return "Password should be at least 6 characters.";
  if (c.includes("popup-closed-by-user")) return "Google popup was closed.";
  return e?.message || "Something went wrong.";
}