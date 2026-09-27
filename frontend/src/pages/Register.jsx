import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import axios from "axios";
import AuthLayout from "../layouts/AuthLayout";
import InputField from "../components/InputField";
import LoadingSpinner from "../components/LoadingSpinner";

const initial = { name: "", email: "", password: "", phone: "", gender: "" };

export default function Register() {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.name.trim().length < 2) return setError("Full name must contain at least 2 characters.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError("Please enter a valid email address.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    if (!/^[0-9+\-\s()]{7,20}$/.test(form.phone)) return setError("Please enter a valid phone number.");
    if (!form.gender) return setError("Please select your gender.");

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/auth/register`,
        form
      );
      setSuccess("Registration successful. Redirecting to login...");
      setForm(initial);
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <section className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="mb-6">
          <div className="mb-4 inline-flex rounded-2xl bg-indigo-50 p-3 text-indigo-600"><UserPlus /></div>
          <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
          <p className="mt-1 text-sm text-slate-500">Register to access the dashboard.</p>
        </div>

        {error && <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        {success && <div className="mb-4 rounded-xl bg-green-50 p-3 text-sm text-green-700">{success}</div>}

        <form onSubmit={submit} className="space-y-4">
          <InputField label="Full Name" name="name" value={form.name} onChange={update} placeholder="Enter your full name" />
          <InputField label="Email Address" type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" />
          <InputField label="Password" type="password" name="password" value={form.password} onChange={update} placeholder="Minimum 6 characters" />
          <InputField label="Phone Number" name="phone" value={form.phone} onChange={update} placeholder="01XXXXXXXXX" />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Gender</label>
            <select name="gender" value={form.gender} onChange={update} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100">
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">
            {loading ? <LoadingSpinner /> : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account? <Link className="font-semibold text-indigo-600 hover:underline" to="/login">Login</Link>
        </p>
      </section>
    </AuthLayout>
  );
}
