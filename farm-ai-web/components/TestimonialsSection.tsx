'use client'

interface Testimonial {
  name: string
  role: string
  image: string
  quote: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    name: 'Rajesh Kumar',
    role: 'Wheat & Rice Farmer, Punjab',
    image: '👨‍🌾',
    quote:
      'FarmAI helped me identify early blight on my wheat crop before it spread. Saved me thousands of rupees in losses!',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Vegetable Farmer, Karnataka',
    image: '👩‍🌾',
    quote:
      'The weather alerts and AI advice have changed how I plan my season. My yields are up 30% this year!',
    rating: 5,
  },
  {
    name: 'Gurinder Singh',
    role: 'Dairy & Crop Farmer, Haryana',
    image: '👨‍💼',
    quote:
      'Being able to chat with multiple AI assistants means I get the best advice for every situation. Highly recommend!',
    rating: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Loved by Farmers Everywhere
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of farmers who are already growing smarter with FarmAI
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array(testimonial.rating)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">
                      ⭐
                    </span>
                  ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 text-lg mb-6 italic">"{testimonial.quote}"</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="text-4xl">{testimonial.image}</div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid md:grid-cols-4 gap-8 border-t border-gray-200 pt-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600">10K+</div>
            <div className="text-gray-600 mt-2">Active Farmers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600">50K+</div>
            <div className="text-gray-600 mt-2">Crops Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600">4.9★</div>
            <div className="text-gray-600 mt-2">App Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600">150+</div>
            <div className="text-gray-600 mt-2">Countries</div>
          </div>
        </div>
      </div>
    </section>
  )
}
