function StatCard({ label, value, description, color }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{value}</p>
          <p className="mt-1 text-xs text-slate-400">{description}</p>
        </div>

        <div className={`h-3 w-3 rounded-full ${color}`} />
      </div>
    </div>
  );
}

export default StatCard;