"use client";

export default function TestImagesPage() {
  const images = [
    "/assets/products/pitpack.jpg",
    "/assets/products/puzzle-park.jpg",
    "/assets/products/stackpark.jpg",
    "/assets/products/vertipack-new.jpg",
    "/assets/products/hidepark.jpg",
    "/assets/products/assistpark.jpg",
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Image Test Page</h1>
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div key={index} className="border border-gray-300 p-4">
            <h3 className="text-lg font-semibold mb-2">Image {index + 1}</h3>
            <p className="text-sm text-gray-600 mb-2">Path: {image}</p>
            <div className="w-full h-64 bg-gray-100 relative">
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover"
                onLoad={() =>
                  console.log(`✅ Image ${index + 1} loaded successfully`)
                }
                onError={() =>
                  console.log(`❌ Image ${index + 1} failed to load`)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
