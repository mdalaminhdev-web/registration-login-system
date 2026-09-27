import { Link } from "react-router-dom";
import { Database } from "lucide-react";

export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-10">
      <div className="mx-auto max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2 text-xl font-bold text-white">
          <Database size={24} /> DBMS Portal
        </Link>
        {children}
      </div>
    </main>
  );
}
