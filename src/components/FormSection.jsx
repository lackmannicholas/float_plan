export default function FormSection({ title, icon, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
      <div className="flex items-center gap-3 px-6 py-4 bg-blue-700 text-white">
        {icon && <span className="text-xl">{icon}</span>}
        <h2 className="text-lg font-semibold tracking-wide">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
