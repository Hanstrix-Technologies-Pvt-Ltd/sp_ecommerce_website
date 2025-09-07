export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="mb-4">
            <span className="text-xl font-bold text-blue-400">STELZ</span>
            <div className="text-xs text-gray-400 uppercase tracking-wide">
              CAR PARKING SYSTEMS
            </div>
          </div>

          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <span>Home</span>
            <span>About</span>
            <span>Products</span>
            <span>Gallery</span>
            <span>Contact</span>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            Copyright 2024 STELZ. All rights reserved. Website designed by STELZ
            team.
          </div>
        </div>
      </div>
    </footer>
  );
}
