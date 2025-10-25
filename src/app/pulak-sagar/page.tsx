'use client';

import { motion } from 'framer-motion';

export default function PulakSagarPage() {
  const SectionTitle = ({ title }: { title: string }) => (
    <motion.h2
      className="text-4xl font-bold text-amber-800 mb-10 text-center tracking-wide"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {title}
    </motion.h2>
  );

  const Separator = () => <hr className="my-16 border-t border-amber-300/40 w-3/4 mx-auto" />;

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 font-sans bg-gradient-to-b from-white via-amber-50 to-amber-100">
      
      {/* -------------------------------- Hero Section -------------------------------- */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Title and Subtitle ABOVE image */}
        <h1 className="font-serif text-5xl md:text-6xl text-amber-900 mb-4">
          Bharat Gaurav Acharyashri 108 Pulak Sagar Ji Gurudev
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
          “A beacon of spiritual awakening, embodying compassion, truth, and the timeless wisdom of Jain Dharma.”
        </p>

        {/* Hero image – you can adjust size below */}
        <img
          src="/images/b7.jpg"
          alt="Acharya Pulak Sagar Ji Gurudev"
          className="hero-image rounded-3xl shadow-2xl object-cover h-[400px] w-full max-w-[1500px] md:h-[550px]"
        />
      </motion.div>

      <Separator />

      {/* -------------------------------- Biography Section -------------------------------- */}
      <div className="grid md:grid-cols-2 gap-14 items-center">
        <motion.img
          src="/images/b4.jpg"
          alt="Acharya Ji Childhood"
          className="rounded-2xl shadow-xl border border-amber-100 object-cover bio-image"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        <div className="text-gray-700 leading-relaxed space-y-4 text-lg">
          <p>
            A divine soul was born on <strong>11 May 1970</strong> in Dhamtari, Chhattisgarh.
            His childhood name was <strong>Singhai Paras Jain (Guddu)</strong>.
          </p>
          <p>
            The son of <strong>Bhikamchand Jain</strong> and <strong>Gopi Devi “Kusum” Jain</strong>,
            he showed deep devotion and spiritual curiosity from a young age.
          </p>
          <p>
            After completing his B.A., he turned toward renunciation, dedicating his life to
            spiritual upliftment through meditation, compassion, and Jain values.
          </p>
        </div>
      </div>

      <Separator />

      {/* -------------------------------- Life & Diksha Journey -------------------------------- */}
      <div className="space-y-14">
        <SectionTitle title="Life & Diksha Journey" />

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative border-l-4 border-amber-400 pl-10 md:pl-16">
            {[
              {year:'1970',title:'Birth & Childhood',text:'Born on 11 May 1970 in Dhamtari, Chhattisgarh.'},
              {year:'1993',title:'Brahmacharya Vow',text:'On 27 January 1993, took vows under Acharya Vidyasagar Ji at Madhiya Ji Tirth, Jabalpur.'},
              {year:'1994',title:'Ailak Diksha',text:'Received Ailak Diksha on 27 January 1994 at Gopachal Parvat, Gwalior under Acharya Pushpadant Sagar Ji.'},
              {year:'1995',title:'Muni Diksha',text:'On 11 December 1995, he took Muni Diksha at Anandpuri, Kanpur.'},
              {year:'2019',title:'Acharya Post',text:'Initiated into Acharya position on 29 November 2019 at Pushpagiri Teerth by Acharya Pushpadant Sagar Ji.'}
            ].map((event, idx) => (
              <motion.div
                key={idx}
                className="mb-8 relative"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute -left-14 top-0 w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  {event.year}
                </div>
                <h3 className="text-xl font-semibold text-amber-800">{event.title}</h3>
                <p className="text-gray-700">{event.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.img
            src="/images/b3.jpg"
            alt="Acharya Ji Diksha"
            className="rounded-2xl shadow-xl border border-amber-100 object-cover diksha-image"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      <Separator />

      {/* -------------------------------- Publications -------------------------------- */}
      <div>
        <SectionTitle title="Publications & Books" />
        <div className="grid md:grid-cols-2 gap-10 items-center mb-10 italic">
          <motion.img
            src="/images/8.jpg"
            alt="Books by Acharya Ji"
            className="rounded-2xl shadow-xl border border-amber-100 object-cover pub-image h-[300px] w-[600px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <p className="text-gray-700 text-lg leading-relaxed">
            Acharya Ji has authored numerous spiritual works guiding seekers on the Jain path.
            His writings, including <em>“Pulaksagaram”</em>, offer timeless wisdom on non-violence,
            simplicity, and inner purity — available through Jinsharnam Media.
          </p>
        </div>

        {/* Book Placeholders */}
        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {[
            '/images/Books/01-Bottle-ka-tufan.jpg',
            '/images/Books/03-gar-bhai-na-hota.jpg',
            '/images/Books/05-Prem-Jivan-ka-mhamantra.jpg'
          ].map((src, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer border border-amber-100 flex flex-col items-center book-card"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={src}
                alt={`Book ${idx + 1}`}
                className="rounded-lg w-full max-w-[220px] h-[300px] object-cover mb-4 book-image"
              />
              <a
                href="/store"
                className="text-amber-700 font-semibold hover:text-amber-900 transition text-sm"
              >
                View in Store →
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      <Separator />
    </section>
  );
}
