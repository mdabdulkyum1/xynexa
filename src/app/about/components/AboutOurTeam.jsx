"use client"; // Next.js এর client-side animation এর জন্য দরকার

import { motion } from "framer-motion";
import Image from "next/image";

const teamMembers = [
    { name: "Kim Yun Son", role: "Engineering Manager", img: "https://i.ibb.co/qLrQrj0t/team-06.webp" },
    { name: "André Garcia", role: "Product Manager", img: "https://i.ibb.co/CsbCy3Hk/team-03.webp" },
    { name: "Peter Lary", role: "UX Researcher", img: "https://i.ibb.co/LzkrgMPF/team-02.webp" },
    { name: "Henry Matt", role: "Customer Success", img: "https://i.ibb.co/cSS6VYFV/team-04.webp" },
    { name: "John Zellers", role: "Lead of Fun", img: "https://i.ibb.co/rfkdKCKg/team-05.webp" },
    { name: "Mark Zellers", role: "Director of Joy", img: "https://i.ibb.co/qMmksH0v/team-01.webp" },
    { name: "Natalia", role: "Founder & CEO", img: "https://i.ibb.co.com/k2kbjWxF/young-beautiful-girl-posing-black-leather-jacket-park-1153-8104.jpg" },
    { name: "Larry", role: "Co-Founder", img: "https://i.ibb.co.com/7d6VDp63/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair-285396-896.jpg" },
];

export default function AboutOurTeam() {
    return (
        <div className="max-w-5xl mx-auto px-2 md:px-6 py-8 md:8 lg:py-20">
            <h2 className="font-bold text-2xl lg:text-5xl mb-4 lg:mb-12 text-center">Our Executive Team</h2>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-4"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {teamMembers.map((member, index) => (
                    <motion.div
                        key={index}
                        className="relative mx-auto text-center"
                        initial={{ opacity: 0, y: 200, rotate: -20 }}
                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1, type: "spring", stiffness: 80 }}
                    >
                        <motion.img
                            src={member.img}
                            alt={member.name}
                            className="rounded-lg w-[212px] h-[212px] object-cover"
                            whileHover={{ scale: 1.05, rotate: 3 }}
                            transition={{ type: "spring", stiffness: 150 }}
                        />
                        <div className="absolute bottom-0  w-full text-right  glass-team ">
                            <p
                                style={{ 
                                    textShadow: "0px 5px 10px rgba(0, 0, 0, 1)" 
                                }}
                                className={`text-lg font-semibold  leading-none text-white`}
                            >
                                {member.name}
                            </p>
                            <p
                                style={{
                                    textShadow: "0px 5px 10px rgba(0, 0, 0, 1)"
                                }}
                                className="text-sm text-slate-300 leading-none"
                            >
                                {member.role}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
