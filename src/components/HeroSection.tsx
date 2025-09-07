"use client";

import { useState, useEffect } from "react";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      title: "CAR PARKING",
      subtitle: "SIMPLIFIED",
      image: "/assets/hero/home-heroSliderblack1.jpg",
      description:
        "India's leading manufacturer of innovative car parking solutions",
    },
    {
      title: "SMART",
      subtitle: "SOLUTIONS",
      image: "/assets/hero/home-heroSliderblack2.jpg",
      description: "Advanced technology for modern parking challenges",
    },
    {
      title: "QUALITY",
      subtitle: "ASSURED",
      image: "/assets/hero/home-heroSliderblack3.jpg",
      description: "Premium parking systems built to last",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isTransitioning, slides.length]);

  const goToSlide = (index: number) => {
    if (index === currentSlide || isTransitioning) return;

    setIsTransitioning(true);
    setCurrentSlide(index);

    // Reset transition state after animation
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        backgroundColor: "#111827",
        overflow: "hidden",
        marginTop: "0",
        zIndex: 10,
      }}
      id="home"
    >
      {/* Background Images with Slide Animation */}
      <div
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: index === currentSlide ? 1 : 0,
              transition: "opacity 1s ease-in-out",
              zIndex: 1,
            }}
          >
            {/* Overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 2,
              }}
            ></div>
            {/* Pattern overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.2,
                zIndex: 3,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundRepeat: "repeat",
                  backgroundPosition: "center",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Content with Slide Animation */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "64rem",
            margin: "0 auto",
            padding: "0 1rem",
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              style={{
                opacity: index === currentSlide ? 1 : 0,
                transform:
                  index === currentSlide ? "translateY(0)" : "translateY(2rem)",
                transition: "all 1s ease-in-out",
                position: index === currentSlide ? "relative" : "absolute",
                top: index === currentSlide ? "auto" : 0,
                left: index === currentSlide ? "auto" : 0,
                right: index === currentSlide ? "auto" : 0,
                bottom: index === currentSlide ? "auto" : 0,
              }}
            >
              <h1
                style={{
                  fontSize: "3rem",
                  fontWeight: "bold",
                  color: "white",
                  marginBottom: "2rem",
                  lineHeight: "1.2",
                }}
              >
                {slide.title}{" "}
                <span style={{ color: "#60A5FA" }}>{slide.subtitle}</span>
              </h1>
              <p
                style={{
                  fontSize: "1.25rem",
                  color: "#E5E7EB",
                  marginBottom: "2rem",
                  maxWidth: "42rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {slide.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "0.75rem",
          zIndex: 20,
        }}
        role="tablist"
        aria-label="Slide navigation"
      >
        {slides.map((_, index) => (
          <button
            key={index}
            style={{
              width: "0.75rem",
              height: "0.75rem",
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              backgroundColor:
                index === currentSlide ? "#3B82F6" : "rgba(255, 255, 255, 0.5)",
              transform: index === currentSlide ? "scale(1.25)" : "scale(1)",
            }}
            onMouseEnter={(e) => {
              if (index !== currentSlide) {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.75)";
                e.currentTarget.style.transform = "scale(1.1)";
              }
            }}
            onMouseLeave={(e) => {
              if (index !== currentSlide) {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.5)";
                e.currentTarget.style.transform = "scale(1)";
              }
            }}
            onClick={() => goToSlide(index)}
            role="tab"
            aria-selected={index === currentSlide}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Logo on the side */}
      <div
        style={{
          position: "absolute",
          left: "2rem",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 20,
        }}
      >
        <div
          style={{
            background: "linear-gradient(to right, #2563EB, #1D4ED8)",
            padding: "2.5rem",
            borderRadius: "0.5rem",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "1.5rem",
              transform: "rotate(-90deg)",
              whiteSpace: "nowrap",
            }}
          >
            STELZ
          </div>
        </div>
      </div>
    </section>
  );
}
