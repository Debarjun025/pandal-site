import React from "react";
import debarjun from "../components/assets/debarjun.png";
import tubai from "../components/assets/tubai.jpg";
import raja from "../components/assets/raja.jpg";
import gole from "../components/assets/gole.jpg"
import aritra from "../components/assets/aritra.jpg"
import puskar from "../components/assets/pushkar.jpg"
import subham from "../components/assets/subham.jpg"
import tubon from "../components/assets/Tubon.jpg"
import roni from "../components/assets/roni.jpg"
import sandip from "../components/assets/sandip.jpg"
import riju from "../components/assets/riju.jpg"
import bittu from "../components/assets/bittu.jpg"

// Placeholder image for members without photos
const placeholder = "https://via.placeholder.com/100";

export default function SocialMedia() {
  const members = [
    {
      id: 1,
      name: "Subhojit Pandey",
      role: "Admin",
      email: "",
      photo: riju, // placeholder until real image is available
      socials: {
        facebook: "https://www.facebook.com/friends/suggestions/?profile_id=100011417301593",
        instagram: "https://www.instagram.com/riju5018?igsh=MXVtaHprMjFoYTB5bw==",
      },
    },
    {
      id: 2,
      name: "Tarunjit Chakraborty",
      role: "Admin",
      email: "",
      photo: bittu, // placeholder until real image is available
      socials: {
        facebook: "https://www.facebook.com/tarunjit.chakraborty.3",
        instagram: "https://www.instagram.com/chakrabortytarunjit/",
      },
    },
    {
      id: 3,
      name: "Prolay Dutta",
      role: "Casier + Admin",
      email: "bogidutta@gmail.com",
      photo: tubai, // placeholder until real image is available
      socials: {
        facebook: "https://www.facebook.com/share/19nTHnRxVd/",
        // instagram: "https://instagram.com/rohit",
      },
    },
    {
      id: 4,
      name: "Debarjun Paul",
      role: "Website Developer + Admin",
      email: "debarjunpaul9@gmail.com",
      photo: debarjun,
      socials: {
        facebook: "https://www.facebook.com/debarjun.paul.2025",
        instagram: "https://www.instagram.com/de_ba_rj_un?utm_source=ig_web_button_share_sheet&igsh=ejJhdXViYnhpeDdp",
      },
    },
    {
      id: 5,
      name: "Subham Biswas",
      role: "Admin",
      email: "biswassubham350@gmail.com",
      photo: subham, // placeholder until real image is available
      socials: {
        facebook: "https://www.facebook.com/profile.php?id=61552064888566",
        instagram: "https://www.instagram.com/biswassubham350?igsh=YzljYTk1ODg3Zg==",
      },
    },
    {
      id: 6,
      name: "Aritra Pal",
      role: "Admin",
      email: "sayan@example.com",
      photo: aritra, // placeholder until real image is available
      socials: {
        facebook: "https://www.facebook.com/aritra.pal.226582",
        instagram: "https://www.instagram.com/palaritra843/",
      },
    },
    {
      id: 7,
      name: "Subhajit Chakraborty",
      role: "Member",
      email: "chkrbrtsubhajit@gmail.com",
      photo: raja,
      socials: {
        facebook: "https://www.facebook.com/share/1BKaD9Z9xu/",
        instagram: "https://www.instagram.com/mr__subha_jit_?igsh=MWZieGkzcTI0b3FvaQ==",
      },
    },
    {
      id: 8,
      name: "Debjit Chakraborty",
      role: "Member",
      email: "chakrabortydebjit950@gmail.com",
      photo: gole,
      socials: {
        // facebook: "https://www.facebook.com/share/1BKaD9Z9xu/",
        instagram: "https://www.instagram.com/i_am_deb_jit12?utm_source=qr&igsh=MWpua2sxeTRhaTIyeQ==",
      },
    },
    {
      id: 9,
      name: "Sandip Biswas",
      role: "Member",
      email: "sandipbiswas20244@gmail.com",
      photo: sandip,
      socials: {
        // facebook: "https://www.facebook.com/share/1BKaD9Z9xu/",
        instagram: "https://www.instagram.com/itz_sandipbiswas/",
      },
    },
    {
      id: 10,
      name: "Sibadityo Paul",
      role: "Logo Designer + member",
      email: "sibadityo@gmail.com",
      photo: tubon, // placeholder until real image is available
      socials: {
        facebook: "https://www.instagram.com/sibadityo?igsh=NWl4bjczcGZwdDg3",
        // instagram: "https://instagram.com/rohit",
      },
    },
    {
      id: 11,
      name: "Puskar Saha",
      role: "Member",
      email: "",
      photo: puskar,
      socials: {
        // facebook: "https://www.facebook.com/share/1BKaD9Z9xu/",
        instagram: "https://www.instagram.com/puskar.saha.900?igsh=Z2U3eWxmY2dhZXN3",
      },
    },
    {
      id: 12,
      name: "Roni Dutta",
      role: "Member",
      email: "ronidutta021@gmail.com",
      photo: roni,
      socials: {
        facebook: "https://www.facebook.com/share/1ZM7byoVi5/",
        // instagram: "https://www.instagram.com/puskar.saha.900?igsh=Z2U3eWxmY2dhZXN3",
      },
    },
  ];

  return (
    <section className="bg-white shadow rounded p-6 space-y-8">
      {/* Social Media Links */}
      <div>
        <h2 className="text-2xl font-bold text-[#7c2d12]">Social Media</h2>
        <p className="mt-2 text-sm text-gray-600">
          Follow our pages and groups for updates:
        </p>
        <ul className="mt-4 space-y-2">
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              className="underline"
              href="https://www.facebook.com/profile.php?id=61581511642582"
            >
              Facebook Page
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              className="underline"
              href="https://www.instagram.com/vivekanandaboysclub/"
            >
              Instagram
            </a>
          </li>
        </ul>
      </div>

      {/* Members Profiles */}
      <div>
        <h2 className="text-2xl font-bold text-[#7c2d12]">Our Members</h2>
        <p className="mt-2 text-sm text-gray-600">
          Meet the dedicated members of Vivekananda Boys Club:
        </p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="p-4 border rounded shadow-sm hover:shadow-md transition flex items-center gap-4"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="h-20 w-20 rounded-full object-cover border"
              />

              <div>
                <h3 className="text-lg font-semibold text-[#7c2d12]">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-700">Role: {member.role}</p>
                <p className="text-sm text-gray-500">{member.email}</p>

                <div className="mt-2 flex gap-3 text-sm">
                  {member.socials.facebook && (
                    <a
                      href={member.socials.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      Facebook
                    </a>
                  )}
                  {member.socials.instagram && (
                    <a
                      href={member.socials.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="text-pink-600 underline"
                    >
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
