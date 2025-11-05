import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="bg-white shadow rounded p-6">
      <header className="mb-4">
        <h1 className="text-3xl font-bold text-[#7c2d12]">বিবেকানন্দ বয়েজ ক্লাব</h1>
        <p className="text-sm text-gray-600">
          Welcome to the official BBC page — history, pujas, and ways to support our events.
        </p>
      </header>

      <article className="space-y-4 text-gray-700">
        {/* Intro Section */}
        <section className="text-lg leading-relaxed p-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            🎉 Welcome to the BBC Club Saraswati Puja Portal 🎉
          </h2>

          <p className="mb-4">
            Every year, <strong>BBC Club</strong> comes alive with devotion, joy, and unity as we organize our
            <strong> grand Saraswati Puja celebrations</strong>. With hearts full of faith and hands joined in prayer,
            our community gathers to seek the <strong>divine blessings of Maa Saraswati</strong> – the Goddess of Wisdom,
            Learning, and Arts.
          </p>

          <h4 className="text-2xl font-semibold mt-6 mb-2">🌸 What You’ll Find Here:</h4>
          <ul className="list-disc list-inside space-y-2">
            <li>
              ✨ <strong>Sacred Memories</strong> – Relive the magic of our past pujas with detailed records, beautiful
              moments, and stories from previous years.
            </li>
            <li>
              ✨ <strong>Supporters & Contributors</strong> – Celebrate the generosity of our <em>chanda</em>{" "}
              contributors, whose support makes every celebration possible.
            </li>
            <li>
              ✨ <strong>Stay Connected</strong> – Get contact details, share your ideas, and join hands with us to keep
              the tradition alive for generations to come.
            </li>
          </ul>

          <p className="mt-6">
            This isn’t just a website – it’s a <strong>digital home for devotion</strong>, a place where tradition meets
            technology, and where every member of our community can feel connected to the celebration, no matter where
            they are.
          </p>

          <p className="mt-4 text-xl font-medium text-center">
            📢 <strong>Join us this year!</strong> Be part of the rituals, cultural programs, and festive togetherness.
            Together, we keep our culture thriving and our devotion shining.
          </p>

          <p className="mt-4 text-center text-2xl font-bold text-yellow-600">
            🌼 BBC Club Saraswati Puja – Where Knowledge Blossoms and Community Grows 🌼
          </p>
        </section>

        {/* Grid Section */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* About the Pandal Section */}
          <div className="p-4 border rounded bg-yellow-50">
            <h3 className="font-semibold text-xl mb-2">📜 About the Pandal</h3>
            <p className="mb-4">
              The <strong>BBC Club Saraswati Puja</strong> has been a beloved tradition for decades, bringing our
              community together in faith, culture, and celebration. Over the years, our pandal has become a symbol of
              creativity and devotion, designed beautifully each year to welcome Maa Saraswati.
            </p>

            <h4 className="text-lg font-semibold mt-4 mb-2">🙏 Main Priests</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Head Priest:</strong> Shri Subhasis Bhattacharya
              </li>
              <li>
                <strong>Assistant Priest:</strong> Shri Arindam Mukherjee
              </li>
            </ul>

            <h4 className="text-lg font-semibold mt-4 mb-2">📅 Key Dates – Saraswati Puja 2025</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Puja Preparation:</strong> 31st January 2025
              </li>
              <li>
                <strong>Main Saraswati Puja:</strong> 2nd February 2025
              </li>
              <li>
                <strong>Pushpanjali & Prasad:</strong> 2nd February (Morning)
              </li>
              <li>
                <strong>Cultural Evening:</strong> 2nd February (Evening)
              </li>
              <li>
                <strong>Visarjan:</strong> To be announced soon
              </li>
            </ul>

            <h4 className="text-lg font-semibold mt-4 mb-2">🪔 Rituals & Celebrations</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>🌅 <strong>Morning Puja:</strong> Invocation of Maa Saraswati.</li>
              <li>🪔 <strong>Pushpanjali:</strong> Flower offering with collective prayers.</li>
              <li>🍽️ <strong>Bhog & Prasad:</strong> Distribution of delicious prasad to all attendees.</li>
              <li>🎭 <strong>Cultural Program:</strong> Music, dance, and performances by local talents.</li>
              <li>🌊 <strong>Visarjan:</strong> Farewell procession and immersion of the idol.</li>
            </ul>
          </div>

          {/* Upcoming Events Section */}
          <div className="p-4 border rounded bg-gray-50">
            <h3 className="font-semibold text-xl mb-2">📢 Upcoming Events</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>🖌️ Children’s Drawing & Handwriting Competition - To be announced</li>
              <li>🎶 Cultural Evening with Dance & Song Performances - To be announced</li>
              <li>🙏 Pushpanjali & Prasad Distribution - To be announced</li>
              <li>🏆 Prize Distribution Ceremony - To be announced</li>
              <li>🌊 Idol Visarjan Procession - To be announced</li>
            </ul>
            <p className="mt-2 text-xs text-gray-600">
              *Follow our WhatsApp group & notice board for final timings and new announcements!
            </p>
          </div>
        </div>

        {/* Donate Section */}
        <div className="mt-4 p-4 bg-yellow-50 rounded">
          <strong>Donate / Chanda</strong> — Visit the{" "}
          <Link
            to="/support"
            className="font-semibold text-blue-600 hover:underline"
          >
          Support
          </Link>{" "}
           page to contribute online. Admins can add cash donations manually from their panel.
          </div>


      </article>
    </section>
  );
}
