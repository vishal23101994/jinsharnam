'use client';

export default function JinsharnamTirthPage() {
  const imageWidth = '100%';
  const imageHeight = 'auto';

  return (
    <section className="text-gray-800 bg-gradient-to-b from-amber-50 to-white">
      {/* 🌅 Hero Banner */}
      <div className="relative w-full h-[420px] md:h-[500px] mb-20">
        {/* Background Image */}
        <img
          src="/images/img13.jpg"
          alt="Jinsharnam Tirth"
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-amber-100 px-4">
          <h1 className="text-4xl md:text-6xl font-serif font-semibold drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] mb-3">
            Jinsharnam Tirth
          </h1>
          <p className="max-w-2xl text-lg md:text-xl font-light drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] leading-relaxed">
            A serene sanctuary of peace and devotion guided by
            <br className="hidden md:block" />
            Acharya Shri Pulak Sagar Ji Maharaj
          </p>
        </div>
      </div>

      {/* 📖 Continuous Image Layout */}
      <div className="max-w-7xl mx-auto px-6 space-y-16 pb-20">
        {[
          '/images/tirth/part-1.2.jpg',
          '/images/tirth/part-2.1.jpg',
          '/images/tirth/part-2.2.jpg',
          '/images/tirth/part-3.1.jpg',
          '/images/tirth/part-3.2.jpg',
          '/images/tirth/part-4.1.jpg',
          '/images/tirth/part-4.2.jpg',
          '/images/tirth/part-5.1.jpg',
          '/images/tirth/part-5.2.jpg',
          '/images/tirth/part-6.1.jpg',
          '/images/tirth/part-6.2.jpg',
          '/images/tirth/part-7.1.jpg',
          '/images/tirth/part-7.2.jpg',
          '/images/tirth/part-8.1.jpg',
          '/images/tirth/part-8.2.jpg',
          '/images/tirth/part-9.1.jpg',
          '/images/tirth/part-9.2.jpg',
          '/images/tirth/part-10.1.jpg',
          '/images/tirth/part-10.2.jpg',
          '/images/tirth/part-11.1.jpg',
          '/images/tirth/part-11.2.jpg',
          '/images/tirth/part-12.1.jpg',
          '/images/tirth/part-12.2.jpg',
        ].map((src, i) => (
          <div
            key={i}
            className={`${
              i % 2 === 0 ? 'bg-white' : 'bg-amber-50'
            } rounded-3xl shadow-lg overflow-hidden border border-amber-100 p-6`}
          >
            <img
              src={src}
              alt={`Jinsharnam Tirth View ${i + 1}`}
              style={{ width: imageWidth, height: imageHeight }}
              className="object-contain rounded-xl mx-auto"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
