'use client';
import Image from 'next/image';
import React from 'react';

const AboutPage = () => {
  return (
    <div id="about"  className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 px-6 md:px-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Empowering learners and educators with a modern, intuitive, and scalable learning management platform.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2">
          <Image
            src="/belowHero.png" // Replace with your image path
            alt="Our Mission"
            width={600}
            height={400}
            className="rounded-xl"
          />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-blue-700">Our Mission</h2>
          <p className="text-gray-700 text-lg">
            We aim to make education accessible to everyone, everywhere. Our platform helps educators build engaging courses while giving learners tools to thrive.
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Interactive, user-friendly platform</li>
            <li>Customizable course management</li>
            <li>Real-time progress tracking</li>
          </ul>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Scalable Architecture', icon: '⚙️' },
            { title: 'Mobile Friendly', icon: '📱' },
            { title: 'Gamified Learning', icon: '🏆' },
            { title: 'Analytics & Reports', icon: '📊' },
            { title: 'Easy Integration', icon: '🔌' },
            { title: '24/7 Support', icon: '💬' },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

     
    </div>
  );
};

export default AboutPage;
