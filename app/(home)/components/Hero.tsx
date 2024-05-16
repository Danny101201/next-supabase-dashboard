"use client";

import React from "react";

const Hero = () => {
  return (
    <section
      id="home"
      className="w-full h-[500px] bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1489257712451-3a66755ca19c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="container mx-auto h-full flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Funpodium</h1>
        <p className="text-2xl mb-8">We deliver cloud SaaS to the masses.</p>
        <a
          href="#features"
          className="bg-black text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Learn More
        </a>
      </div>
    </section>
  );
};

export default Hero;
