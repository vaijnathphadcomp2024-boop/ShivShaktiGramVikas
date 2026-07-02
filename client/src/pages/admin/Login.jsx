export default function AdminLogin() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-extrabold text-navy mb-1">Admin Login</h1>
        <p className="text-gray-500 text-sm mb-6">Shivshakti GramVikas Pratishtan</p>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="admin-email">Email</label>
            <input id="admin-email" type="email" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy" placeholder="admin@shivshakti.org" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="admin-password">Password</label>
            <input id="admin-password" type="password" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy" placeholder="••••••••" />
          </div>
          <button id="admin-login-btn" type="submit" className="w-full py-2.5 rounded-lg bg-navy text-white font-bold hover:bg-[#0f2d4a] transition-colors">
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}
