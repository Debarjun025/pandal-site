import React, { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.target;
    const data = new FormData(form);

    const response = await fetch("https://formspree.io/f/xqadvlpd", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  };

  return (
    <section className="bg-white text-black min-h-screen p-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Left Section - Contact Form */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-[#0f172a]">Contact Us</h2>
          <p className="mb-6 text-gray-600">
            Feel free to reach out! We'd love to hear from you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 rounded bg-gray-100 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 rounded bg-gray-100 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Message</label>
              <textarea
                name="message"
                rows="4"
                className="w-full px-4 py-2 rounded bg-gray-100 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your message..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded text-white font-semibold transition disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-green-600 mt-2">✅ Message sent successfully!</p>
            )}
            {status === "error" && (
              <p className="text-red-600 mt-2">❌ Oops! Something went wrong.</p>
            )}
          </form>
        </div>

        {/* Right Section - Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#0f172a]">Get in Touch</h3>
          <p className="mb-2">
            Email:{" "}
            <a
              href="mailto:vivekanandaboysclub48@gmail.com"
              className="text-blue-600 hover:underline"
            >
              vivekanandaboysclub48@gmail.com
            </a>
          </p>
          <p className="mb-2">Secretary: +9189187 45483</p>
          <p className="mb-2">
            Address:{" "}
            <a
              href="https://maps.app.goo.gl/7CectevRiFVK3rKG9"
              className="text-blue-600 hover:underline"
            >
              9GR4+3VW Krishnanagar, West Bengal
            </a>
          </p>

          <h4 className="text-lg font-semibold mb-2 text-[#0f172a]">Socials:</h4>
          <div className="flex gap-4 mb-6">
            <a href="#" className="text-blue-600 hover:underline">Facebook</a>
            <a href="#" className="text-blue-600 hover:underline">Instagram</a>
          </div>

          {/* Google Map */}
          <div className="w-full h-60">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d915.485993477704!2d88.50656426957129!3d23.39024399868239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDIzJzI0LjkiTiA4OMKwMzAnMjYuMCJF!5e0!3m2!1sen!2sin!4v1758086813791!5m2!1sen!2sin"
              className="w-full h-64 rounded-lg border border-gray-300"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
