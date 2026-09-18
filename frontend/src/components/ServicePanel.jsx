import { useState } from "react";

const emptyForm = { name: "", price: "", duration: "" };

function ServicePanel({ services, onSave, onDelete, onClose }) {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  function updateForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function editService(service) {
    setEditingId(service.id);
    setForm({ name: service.name, price: service.price, duration: service.duration });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function submitForm(event) {
    event.preventDefault();
    await onSave({ ...form, price: Number(form.price), duration: Number(form.duration) }, editingId);
    cancelEdit();
  }

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col justify-between gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600">Salon</p>
          <h2 className="mt-2 text-2xl font-bold text-black">{editingId ? "Edit service" : "Add a service"}</h2>
          <p className="mt-2 text-sm text-slate-500">Enter the service name, price, and duration.</p>
        </div>
        <button type="button" onClick={onClose} className="text-left text-sm font-semibold text-red-600 hover:text-red-700 hover:underline sm:text-right">Close salon</button>
      </div>

      <form onSubmit={submitForm} className="mt-6 grid gap-4 md:grid-cols-4">
        <label className="text-sm font-semibold text-slate-700">Service name<input className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" name="name" value={form.name} onChange={updateForm} required /></label>
        <label className="text-sm font-semibold text-slate-700">Price (NPR)<input className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" name="price" type="number" min="1" value={form.price} onChange={updateForm} required /></label>
        <label className="text-sm font-semibold text-slate-700">Duration (minutes)<input className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" name="duration" type="number" min="1" value={form.duration} onChange={updateForm} required /></label>
        <div className="flex items-end gap-2">
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">{editingId ? "Save changes" : "Add service"}</button>
          {editingId && <button type="button" onClick={cancelEdit} className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>}
        </div>
      </form>

      <div className="mt-8 max-h-80 overflow-y-auto rounded-xl border border-slate-200">
        {services.length === 0 ? <p className="px-5 py-10 text-center text-sm text-slate-500">No services added yet.</p> : services.map((service) => (
          <div key={service.id} className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 last:border-0 hover:bg-slate-50">
            <div><p className="font-semibold text-black">{service.name}</p><p className="mt-1 text-xs text-slate-500">{service.duration} minutes</p></div>
            <div className="flex items-center gap-3"><strong className="text-sm text-blue-700">NPR {service.price}</strong><button type="button" onClick={() => editService(service)} className="text-sm font-semibold text-blue-600 hover:underline">Edit</button><button type="button" onClick={() => onDelete(service.id)} className="text-sm font-semibold text-red-600 hover:underline">Delete</button></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServicePanel;
