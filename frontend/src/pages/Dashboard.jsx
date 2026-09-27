import { useEffect, useState } from "react";
import { Database, Users, UserRound, CalendarDays } from "lucide-react";
import api from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState({ totalUsers: 0, users: [] });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/dashboard/stats")
      .then((res) => setData(res.data))
      .catch((err) => setError(err.response?.data?.message || "Could not load dashboard data."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <p className="text-sm font-medium text-indigo-600">Dashboard</p>
          <h2 className="mt-1 text-3xl font-bold text-slate-900">Hello, {user?.name} 👋</h2>
          <p className="mt-2 text-slate-500">Live data retrieved from the MySQL database.</p>
        </div>

        {error && <div className="mb-6 rounded-xl bg-red-50 p-4 text-red-700">{error}</div>}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Stat icon={<Users />} label="Total Registered Users" value={data.totalUsers} />
          <Stat icon={<UserRound />} label="Logged-in User" value={user?.name || "—"} />
          <Stat icon={<CalendarDays />} label="Registration Date" value={user?.created_at ? new Date(user.created_at).toLocaleDateString() : "—"} />
        </div>

        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b p-5">
            <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600"><Database size={20} /></div>
            <div>
              <h3 className="font-bold text-slate-900">Registered Users</h3>
              <p className="text-sm text-slate-500">Result of a database SELECT query.</p>
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading database records...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-5 py-3">ID</th>
                    <th className="px-5 py-3">Name</th>
                    <th className="px-5 py-3">Email</th>
                    <th className="px-5 py-3">Phone</th>
                    <th className="px-5 py-3">Gender</th>
                    <th className="px-5 py-3">Registered</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {data.users.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="px-5 py-4 font-medium">{item.id}</td>
                      <td className="px-5 py-4">{item.name}</td>
                      <td className="px-5 py-4">{item.email}</td>
                      <td className="px-5 py-4">{item.phone}</td>
                      <td className="px-5 py-4">{item.gender}</td>
                      <td className="px-5 py-4">{new Date(item.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!data.users.length && <div className="p-8 text-center text-slate-500">No users found.</div>}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 inline-flex rounded-xl bg-indigo-50 p-3 text-indigo-600">{icon}</div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
