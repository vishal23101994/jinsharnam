const videos = [
  { id: "1", title: "Pravachan 1", youtubeId: "dQw4w9WgXcQ" },
  { id: "2", title: "Pravachan 2", youtubeId: "kXYiU_JCYtU" },
];

export default function VideosPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="font-serif text-4xl text-center text-spiritual-brown mb-10">
        Pravachans & Spiritual Videos
      </h1>
      <div className="grid md:grid-cols-2 gap-10">
        {videos.map((v) => (
          <div key={v.id} className="rounded-2xl overflow-hidden shadow-md">
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${v.youtubeId}`}
              title={v.title}
              allowFullScreen
            ></iframe>
            <p className="p-4 text-center text-spiritual-brown font-medium">
              {v.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
