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
    { name: "Natalia", role: "Founder & CEO", img: "https://i.ibb.co/FGHM5V0/team-07.webp" },
    { name: "Larry", role: "Co-Founder", img: "https://i.ibb.co/jvjypsGg/team-08.webp" },
];

export default function AboutOurTeam() {
    return (
        <div className="max-w-5xl mx-auto px-2 md:px-6 py-4 md:8 lg:py-12">
            <h2 className="text-center text-3xl font-bold mb-8">Our Executive Team</h2>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
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
                            className="rounded-lg w-full h-full object-cover"
                            whileHover={{ scale: 1.05, rotate: 3 }}
                            transition={{ type: "spring", stiffness: 150 }}
                        />
                        <div className="absolute bottom-0 right-1 w-full text-right py-2 rounded-b-lg glass-team p-2">
                            <p
                                style={{ 
                                    textShadow: "0px 5px 10px rgba(0, 0, 0, 1)" 
                                }}
                                className="text-lg font-semibold text-white leading-none"
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
