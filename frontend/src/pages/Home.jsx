import { Link } from "react-router-dom";
import { Database, ShieldCheck, Server, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            <Database size={16} /> Project For Practice
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">Registration & Login System</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            A full-stack React, Node.js, Express and MySQL application demonstrating registration,
            secure authentication and real database query results.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/register" className="flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 font-semibold hover:bg-indigo-400">Create Account <ArrowRight size={18} /></Link>
            <Link to="/login" className="rounded-xl border border-white/15 px-5 py-3 font-semibold hover:bg-white/5">Login</Link>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          <Feature icon={<Database />} title="MySQL Database" text="Relational database with primary key, unique email constraint and proper data types." />
          <Feature icon={<ShieldCheck />} title="Secure Passwords" text="Passwords are hashed with bcrypt and login access uses JWT authentication." />
          <Feature icon={<Server />} title="REST API" text="React communicates with an Express backend through clean REST endpoints." />
        </div>
      </section>
    </main>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="mb-4 inline-flex rounded-xl bg-indigo-500/20 p-3 text-indigo-300">{icon}</div>
      <h3 className="font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}
