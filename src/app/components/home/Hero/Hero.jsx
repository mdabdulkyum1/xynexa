'use client';

import { Button } from "@/components/ui/button";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="relative z-0 min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-white dark:bg-background transition-colors overflow-hidden">
  {/* Animated Grid Background */}
  <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />

  {/* Badge */}
  <div className="z-10 mb-6 inline-flex items-center bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium dark:bg-green-900 dark:text-green-300">
    Introducing Xynexa
  </div>

  {/* Heading */}
  <h1 className="z-10 text-4xl md:text-6xl font-bold max-w-4xl text-gray-900 dark:text-white">
    Collaborate smarter with your team.
  </h1>

  {/* Subheading */}
  <p className="z-10 mt-6 max-w-2xl text-lg md:text-xl text-gray-600 dark:text-muted-foreground">
    Xynexa is your all-in-one collaboration tool — chat, plan, and manage projects with unmatched clarity and speed.
  </p>

  {/* CTA Buttons */}
  <div className="z-10 mt-8 flex gap-4 flex-wrap justify-center">
    <Button size="lg" className="text-base">
      Try Xynexa Free →
    </Button>
    <Button variant="outline" size="lg" className="text-base">
      See Features →
    </Button>
  </div>

  {/* Reviews */}
  <div className="z-10 mt-10 text-sm text-muted-foreground">
    Trusted by 1,200+ teams • Rated 4.9/5
  </div>
</section>

  );
};

export default Hero;
