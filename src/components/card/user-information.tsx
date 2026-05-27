import { UserInformation } from "@/dto/user";

export function TopUserInformation({ user }: { user: UserInformation }) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 p-4 shadow-xl shadow-emerald-100/50 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className="relative">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.displayName}
              className="h-16 w-16 rounded-3xl object-cover shadow-lg shadow-emerald-100"
            />
          ) : (
            <div className="grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-emerald-400 to-cyan-400 text-2xl font-black text-white shadow-lg shadow-emerald-100">
              {user.displayName.charAt(0).toUpperCase()}
            </div>
          )}

          <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-4 border-white bg-emerald-400" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-lg font-black text-slate-950">
              {user.displayName}
            </h2>

            {/* <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">
              {user.memberStatus}
            </span> */}
          </div>

          <p className="mt-1 truncate text-sm font-medium text-slate-600">
            {user.fullName}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">
              {user.role}
            </span>
            <span className="rounded-full bg-sky-50 px-3 py-1 text-[11px] font-semibold text-sky-700">
              {user.phone}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
