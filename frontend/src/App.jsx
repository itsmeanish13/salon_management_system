import { useEffect, useState } from "react";
import axios from "axios";
import AppointmentPanel from "./components/AppointmentPanel";
import ServicePanel from "./components/ServicePanel";

const API_URL = "http://127.0.0.1:8000/api";

function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadServices();
    loadAppointments();
  }, []);

  async function loadServices() {
    try {
      setServices((await axios.get(`${API_URL}/services`)).data);
    } catch {
      setMessage("Could not load services.");
    }
  }

  async function loadAppointments(search = "") {
    try {
        const response = await axios.get(`${API_URL}/appointments`, {
        params: {
            search,
        },
        });
        
        setAppointments(response.data);
    } catch {
      setMessage("Could not load appointments.");
    }
  }

  async function saveService(data, id) {
    try {
      if (id) {
        await axios.put(`${API_URL}/services/${id}`, data);
        setMessage("Service updated successfully.");
      } else {
        await axios.post(`${API_URL}/services`, data);
        setMessage("Service added successfully.");
      }
      await loadServices();
    } catch (error) {
      setMessage(error.response?.data?.name?.[0] || "Could not save service.");
    }
  }

  async function deleteService(id) {
    if (!window.confirm("Delete this service?")) return;
    try {
      await axios.delete(`${API_URL}/services/${id}`);
      setMessage("Service deleted successfully.");
      await Promise.all([loadServices(), loadAppointments()]);
    } catch {
      setMessage("Could not delete service.");
    }
  }

  async function createAppointment(data) {
    try {
      await axios.post(`${API_URL}/appointments`, data);
      setMessage("Appointment booked successfully.");
      await loadAppointments();
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.non_field_errors?.[0] || "Could not book appointment.";
      setMessage(errorMessage);
      return { success: false, error: errorMessage };
    }
  }

  async function updateStatus(id, status) {
    try {
      await axios.patch(`${API_URL}/appointments/${id}/status`, { status });
      setMessage("Appointment status updated.");
      await loadAppointments();
    } catch {
      setMessage("Could not update appointment status.");
    }
  }

  async function deleteAppointment(id) {
    if (!window.confirm("Delete this appointment?")) return;
    try {
      await axios.delete(`${API_URL}/appointments/${id}`);
      setMessage("Appointment deleted successfully.");
      await loadAppointments();
    } catch {
      setMessage("Could not delete appointment.");
    }
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-lg font-bold text-white">S</div><div><h1 className="text-base font-bold">Vrit Tech</h1><p className="text-xs text-slate-500">Salon management</p></div></div>
          <span className="hidden rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 sm:block">Staff dashboard</span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <section className="mb-10 max-w-2xl"><p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Workspace</p><h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Book the Appointment Now</h2><p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">A complete salon management system </p></section>
        {message && <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">{message}</div>}

        <section className="grid gap-5 md:grid-cols-2">
          <button type="button" onClick={() => setActiveSection("services")} className={`group rounded-2xl border bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeSection === "services" ? "border-blue-600 ring-2 ring-blue-100" : "border-slate-200"}`}><div className="mb-8 flex items-start justify-between"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl font-bold text-blue-600">✦</div><span className="text-2xl text-slate-300 group-hover:text-blue-600">→</span></div><p className="text-xs font-bold uppercase tracking-widest text-blue-600">Salon</p><h3 className="mt-2 text-2xl font-bold">Services</h3><p className="mt-2 text-sm leading-6 text-slate-500">Add, edit, view, and remove services available for booking.</p></button>
          <button type="button" onClick={() => setActiveSection("appointments")} className={`group rounded-2xl border bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeSection === "appointments" ? "border-blue-600 ring-2 ring-blue-100" : "border-slate-200"}`}><div className="mb-8 flex items-start justify-between"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-xl font-bold text-red-600">▣</div><span className="text-2xl text-slate-300 group-hover:text-blue-600">→</span></div><p className="text-xs font-bold uppercase tracking-widest text-red-600">Schedule</p><h3 className="mt-2 text-2xl font-bold">Appointments</h3><p className="mt-2 text-sm leading-6 text-slate-500">Create bookings, update status, and view the appointment schedule.</p></button>
        </section>

        {activeSection === "services" && <ServicePanel services={services} onSave={saveService} onDelete={deleteService} onClose={() => setActiveSection(null)} />}
        {activeSection === "appointments" && 
        <AppointmentPanel
            services={services}
            appointments={appointments}
            onCreate={createAppointment}
            onStatusChange={updateStatus}
            onDelete={deleteAppointment}
            onSearch={loadAppointments}
            onClose={() => setActiveSection(null)}
        />}
      </main>
    </div>
  );
}

export default App;
