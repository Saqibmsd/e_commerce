"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeliveryForm({ total = 0, onClose = () => {} }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          total,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        // show success modal instead of closing
        setShowSuccessModal(true);
      } else {
        setMessage({
          type: "error",
          text: data.message || "Submission failed",
        });
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Submission failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
    onClose();
    router.push("/");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-xl mx-4 bg-white rounded-2xl shadow-xl overflow-auto max-h-[90vh]">
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Delivery Details</h3>
            <button
              onClick={onClose}
              className="text-black/60 hover:text-black"
            >
              Close
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Full name"
                className="w-full px-4 py-3 border border-black/10 rounded-lg"
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="Phone number"
                className="w-full px-4 py-3 border border-black/10 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-3 border border-black/10 rounded-lg"
              />
              <input
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                placeholder="Postal code"
                className="w-full px-4 py-3 border border-black/10 rounded-lg"
              />
            </div>

            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              placeholder="Address (street, house no.)"
              className="w-full px-4 py-3 border border-black/10 rounded-lg"
            />

            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full px-4 py-3 border border-black/10 rounded-lg"
            />

            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Additional notes (optional)"
              className="w-full px-4 py-3 border border-black/10 rounded-lg min-h-[80px]"
            />

            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm text-black/60">Order Total</div>
                <div className="text-xl font-bold">${total}</div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="ml-auto bg-black text-white px-5 py-3 rounded-full font-medium disabled:opacity-60"
              >
                {loading ? "Sending…" : "Submit & Notify"}
              </button>
            </div>

            {message && (
              <div
                className={`py-2 px-3 rounded-md ${
                  message.type === "success"
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                {message.text}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative w-full max-w-sm mx-4 bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-3">
                Order Placed Successfully!
              </h3>
              <p className="text-sm sm:text-base text-black/70 leading-relaxed">
                Thank you for placing your order. <br /> We’ve sent a confirmation to
                your registered email and WhatsApp number.
              </p>
            </div>
            <button
              onClick={handleSuccessConfirm}
              className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-black/80 transition-all"
            >
              Yes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
