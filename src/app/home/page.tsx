export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-6">
      <div className="mx-auto max-w-md space-y-6">
        <header className="rounded-[2rem] bg-gradient-to-br from-emerald-500 to-teal-500 p-6 text-white shadow-lg shadow-emerald-100">
          <p className="text-sm opacity-90">Welcome back</p>
          <h1 className="mt-2 text-3xl font-bold">CareMate</h1>
          <p className="mt-2 text-sm leading-6 opacity-90">
            Your personal healthcare assistant for booking, care tracking, and
            support.
          </p>
        </header>

        <section className="grid grid-cols-2 gap-4">
          {[
            { icon: "👩‍⚕️", title: "Find Caregiver", desc: "Match care" },
            { icon: "📅", title: "Book Service", desc: "Schedule visit" },
            { icon: "💬", title: "Chat Support", desc: "Ask for help" },
            { icon: "📝", title: "Care Plan", desc: "View details" },
          ].map((item) => (
            <button
              key={item.title}
              className="rounded-3xl bg-white p-5 text-left shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="text-3xl">{item.icon}</div>
              <h2 className="mt-4 text-sm font-bold text-slate-900">
                {item.title}
              </h2>
              <p className="mt-1 text-xs text-slate-500">{item.desc}</p>
            </button>
          ))}
        </section>

        <section className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900">Upcoming Booking</h2>
              <p className="mt-1 text-xs text-slate-500">
                Today, 14:00 - 16:00
              </p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Confirmed
            </span>
          </div>

          <div className="mt-5 flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-2xl">
              👩‍⚕️
            </div>
            <div>
              <p className="font-semibold text-slate-900">Nurse Assistant</p>
              <p className="text-xs text-slate-500">
                Home care service · Bangkok
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] bg-slate-900 p-5 text-white shadow-lg shadow-slate-200">
          <p className="text-sm text-slate-300">Care status</p>
          <h2 className="mt-2 text-2xl font-bold">Everything looks good</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            You have no urgent tasks right now. We’ll notify you when there is a
            new update.
          </p>
        </section>
      </div>
    </main>
  );
}
