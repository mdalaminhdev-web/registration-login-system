import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import axios from "axios";
import AuthLayout from "../layouts/AuthLayout";
import InputField from "../components/InputField";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../hooks/useAuth";

export default  function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) return setError("Email and password are required.");

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/auth/login`,
        form
      );
      login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <section className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="mb-6">
          <div className="mb-4 inline-flex rounded-2xl bg-indigo-50 p-3 text-indigo-600"><LogIn /></div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
          <p className="mt-1 text-sm text-slate-500">Login with your registered credentials.</p>
        </div>

        {error && <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}

        <form onSubmit={submit} className="space-y-4">
          <InputField label="Email Address" type="email" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
          <InputField label="Password" type="password" name="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Your password" />
          <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">
            {loading ? <LoadingSpinner /> : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account? <Link className="font-semibold text-indigo-600 hover:underline" to="/register">Register</Link>
        </p>
      </section>
    </AuthLayout>
  );
}
