// app/(site)/page.tsx
import Hero from "./components/Hero";
import FootprintCarousel from "./components/FootprintCarousel";
import ParkingModelsCarousel from "./components/ParkingModelsCarousel";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <FootprintCarousel />
      <ParkingModelsCarousel />
    </main>
  );
}
