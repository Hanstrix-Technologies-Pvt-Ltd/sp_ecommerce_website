"use client";

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Kuntesh Chheda",
      company: "Saeguru Buildspaces Pvt Ltd",
      text: "We required Tower Parking for one of our ongoing projects and since we had never used any kind of automated parking system earlier, I was unsure on how to go about it. After getting connected to Stelz, they explained all prerequisities to install to ensure smooth working of operational stron's Installation team worked efficiently, overcaming space constraints, to ensure timely completion of project.",
    },
    {
      name: "Vishal Gupta",
      company: "P.M Enterprises",
      text: "My project had very limited space and no room for ramp/stair. the space allocated for parking system was quite compact and I wasn't sure whether the cars could actually be parked there. Stelz's team promptly visited us on-site and assessed all our concerns. The product they advised for us: Pit Park 2DP worked perfectly and our customers are satisfied with the smooth working of the product.",
    },
  ];

  const nextTestimonial = () => {
    // Navigation logic can be implemented if needed
  };

  const prevTestimonial = () => {
    // Navigation logic can be implemented if needed
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">
          <span className="border-l-4 border-blue-600 pl-4 text-black">
            Testimonial
          </span>
        </h2>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-lg shadow-lg relative hover-lift"
              >
                <div className="text-6xl text-blue-500 absolute top-4 left-4 opacity-20">
                  "
                </div>

                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-blue rounded-full flex items-center justify-center shadow-blue">
                    <span className="text-2xl text-white">👤</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-600">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed relative z-10">
                  {testimonial.text}
                </p>

                <div className="text-6xl text-blue-500 absolute bottom-4 right-4 opacity-20">
                  "
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-xl">❮</span>
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-xl">❯</span>
          </button>
        </div>
      </div>
    </section>
  );
}
