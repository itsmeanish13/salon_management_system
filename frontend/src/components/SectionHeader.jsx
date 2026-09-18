function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
          {eyebrow}
        </p>

        <h2 className="mt-2 text-xl font-bold text-slate-900">{title}</h2>

        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      {action}
    </div>
  );
}

export default SectionHeader;