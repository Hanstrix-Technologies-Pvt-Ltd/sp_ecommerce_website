"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingBar from "./LoadingBar";

interface PuzzleParkingItem {
  name: string;
  slug: string;
  description: string;
  specifications: string[];
}

interface PuzzleParkingDropdownProps {
  isExpanded: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function PuzzleParkingDropdown({
  isExpanded,
  onToggle,
  onClose,
}: PuzzleParkingDropdownProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const puzzleParkingItems: PuzzleParkingItem[] = [
    {
      name: "P – 01 TWO LEVEL",
      slug: "p-01-two-level",
      description: "Two-level puzzle parking system with automated movement",
      specifications: [
        "Capacity: 2 cars",
        "Movement: Vertical & Horizontal",
        "Control: Automated",
        "Space Efficiency: 95%",
      ],
    },
    {
      name: "PP – 01 TWO LEVEL PIT",
      slug: "pp-01-two-level-pit",
      description: "Two-level pit puzzle system for underground parking",
      specifications: [
        "Capacity: 2 cars",
        "Movement: Vertical & Horizontal",
        "Installation: Underground",
        "Space Efficiency: 92%",
      ],
    },
    {
      name: "PP – 02 THREE LEVEL",
      slug: "pp-02-three-level",
      description:
        "Three-level pit puzzle system for maximum underground capacity",
      specifications: [
        "Capacity: 3 cars",
        "Movement: Vertical & Horizontal",
        "Installation: Underground",
        "Space Efficiency: 96%",
      ],
    },
    {
      name: "OP – 01 OVER GROUND PUZZLE",
      slug: "op-01-over-ground-puzzle",
      description: "Over ground puzzle system for surface parking optimization",
      specifications: [
        "Capacity: 2 cars",
        "Movement: Vertical & Horizontal",
        "Installation: Above ground",
        "Space Efficiency: 94%",
      ],
    },
  ];

  const handleItemClick = (slug: string) => {
    setIsLoading(true);
    onClose();
    setTimeout(() => {
      router.push(`/products/puzzle-parking/${slug}`);
    }, 500);
  };

  return (
    <>
      <LoadingBar isLoading={isLoading} />
      <div>
        <button
          onClick={onToggle}
          className="flex text-black text-base font-medium hover:text-blue-600 py-2 w-full text-left items-center justify-between"
        >
          PUZZLE PARKING
          <span className="text-gray-500 text-sm">+</span>
        </button>

        {/* Puzzle Parking Items Dropdown */}
        {isExpanded && (
          <div className="ml-4 mt-2 space-y-1">
            {puzzleParkingItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(item.slug)}
                className="block text-black text-sm font-medium hover:text-blue-600 py-1 w-full text-left"
                title={item.description}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
