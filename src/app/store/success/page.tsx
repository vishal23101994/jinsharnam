export default function PaymentSuccess() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-amber-50 to-white text-center px-6">
      <h1 className="text-4xl font-serif text-amber-700 font-semibold mb-4">
        Payment Successful 🙏
      </h1>
      <p className="text-gray-700 mb-6">
        Thank you for your purchase from Jinsharnam Media.
        <br />
        Your order is being processed and will be delivered soon.
      </p>
      <a
        href="/store"
        className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-all"
      >
        Continue Shopping
      </a>
    </section>
  );
}
