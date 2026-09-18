import { useState } from "react";

const emptyForm = { customer_name: "", customer_phone: "", service: "", appointment_date: "", appointment_time: "", notes: "" };
const statuses = ["Pending", "Confirmed", "Completed", "Cancelled"];

function AppointmentPanel({ services, appointments, onCreate, onStatusChange, onDelete, onSearch, onClose }) {
  const [form, setForm] = useState(emptyForm);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState("");

  function updateForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submitForm(event) {
    event.preventDefault();
    const result = await onCreate({ ...form, service: Number(form.service) });

    if (result?.success) {
      setForm(emptyForm);
      showAlert("Appointment booked successfully.", "success");
    } else if (result?.error) {
      showAlert(result.error, "error");
    }
  }

  function showAlert(message, type) {
    setAlert({ message, type });
    window.setTimeout(() => setAlert(""), 3500);
  }
  function submitSearch(event) {
  event.preventDefault();
  onSearch(search);
}

  const visibleAppointments = appointments.filter((appointment) => filter === "All" || appointment.status === filter);

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col justify-between gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
        <div><p className="text-xs font-bold uppercase tracking-widest text-red-600">Schedule</p><h2 className="mt-2 text-2xl font-bold text-black">Book an appointment</h2><p className="mt-2 text-sm text-slate-500">Add customer details and choose an available service.</p></div>
        <button type="button" onClick={onClose} className="text-left text-sm font-semibold text-red-600 hover:text-red-700 hover:underline sm:text-right">Close appointments</button>
      </div>

      <form onSubmit={submitForm} className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-semibold text-slate-700">Customer name<input className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" name="customer_name" value={form.customer_name} onChange={updateForm} required /></label>
        <label className="text-sm font-semibold text-slate-700">Customer phone<input className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" name="customer_phone" value={form.customer_phone} onChange={updateForm} required /></label>
        <label className="text-sm font-semibold text-slate-700">Service<select className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" name="service" value={form.service} onChange={updateForm} required><option value="">Select a service</option>{services.map((service) => <option key={service.id} value={service.id}>{service.name}</option>)}</select></label>
        <label className="text-sm font-semibold text-slate-700">Date<input className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" name="appointment_date" type="date" value={form.appointment_date} onChange={updateForm} required /></label>
        <label className="text-sm font-semibold text-slate-700">Time<input className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" name="appointment_time" type="time" value={form.appointment_time} onChange={updateForm} required /></label>
        <label className="text-sm font-semibold text-slate-700">Notes <span className="font-normal text-slate-400">(optional)</span><textarea className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" name="notes" rows="1" value={form.notes} onChange={updateForm} /></label>
        <button type="submit" className="w-fit rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">Book appointment</button>
      </form>

      {alert && (
        <div className={`mt-4 rounded-lg border px-4 py-3 text-sm font-semibold ${alert.type === "error" ? "border-red-200 bg-red-50 text-red-700" : "border-blue-200 bg-blue-50 text-blue-700"}`} role="alert">
          {alert.message}
        </div>
      )}

     {/* 
     < div className="mt-8 flex items-center justify-between gap-4"><h3 className="font-bold text-black">All appointments</h3><select className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600" value={filter} onChange={(event) => setFilter(event.target.value)}><option value="All">All statuses</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select></div> */}
      <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h3 className="font-bold text-black">All appointments</h3>

        <div className="flex flex-col gap-2 sm:flex-row">
            <form onSubmit={submitSearch} className="flex gap-2">
            <input
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                type="search"
                placeholder="Search name or phone"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            <button type="submit" className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                Search
            </button>
            </form>

            <button
            type="button"
            onClick={() => {
                setSearch("");
                onSearch("");
            }}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
            Clear
            </button>

            <select
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            >
            <option value="All">All statuses</option>
            {statuses.map((status) => (
                <option key={status}>{status}</option>
            ))}
            </select>
        </div>
        </div>
      
      
      <div className="mt-3 max-h-96 overflow-auto rounded-xl border border-slate-200">
        {visibleAppointments.length === 0 ? <p className="px-5 py-10 text-center text-sm text-slate-500">No appointments found.</p> : visibleAppointments.map((appointment) => (
          <div key={appointment.id} className="flex min-w-[680px] items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 last:border-0 hover:bg-slate-50">
            <div><p className="font-semibold text-black">{appointment.customer_name}</p><p className="mt-1 text-xs text-slate-500">{appointment.customer_phone} · {appointment.service_name}</p></div>
            <div className="text-sm text-slate-600">{appointment.appointment_date} · {appointment.appointment_time.slice(0, 5)}</div>
            <select className="rounded-full border-0 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 outline-none" value={appointment.status} onChange={(event) => onStatusChange(appointment.id, event.target.value)}>{statuses.map((status) => <option key={status}>{status}</option>)}</select>
            <button type="button" onClick={() => onDelete(appointment.id)} className="text-sm font-semibold text-red-600 hover:underline">Delete</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AppointmentPanel;
