"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingBar from "./LoadingBar";

interface StackParkingItem {
  name: string;
  slug: string;
  description: string;
  specifications: string[];
}

interface StackParkingDropdownProps {
  isExpanded: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function StackParkingDropdown({
  isExpanded,
  onToggle,
  onClose,
}: StackParkingDropdownProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const stackParkingItems: StackParkingItem[] = [
    {
      name: "S – 01 TWO LEVEL STACK",
      slug: "s-01-two-level-stack",
      description: "Two-level stacking system for efficient space utilization",
      specifications: [
        "Capacity: 2 cars",
        "Lift Type: Hydraulic",
        "Installation: Above ground",
        "Space Efficiency: 85%",
      ],
    },
    {
      name: "S – 011 THREE LEVEL",
      slug: "s-011-three-level",
      description: "Three-level stacking system for maximum capacity",
      specifications: [
        "Capacity: 3 cars",
        "Lift Type: Hydraulic",
        "Installation: Above ground",
        "Space Efficiency: 90%",
      ],
    },
    {
      name: "PS – 1 TWO LEVEL PIT",
      slug: "ps-1-two-level-pit",
      description: "Two-level pit system for underground parking",
      specifications: [
        "Capacity: 2 cars",
        "Lift Type: Hydraulic",
        "Installation: Underground pit",
        "Space Efficiency: 80%",
      ],
    },
    {
      name: "PS – 02 THREE LEVEL",
      slug: "ps-02-three-level",
      description: "Three-level pit system for maximum underground capacity",
      specifications: [
        "Capacity: 3 cars",
        "Lift Type: Hydraulic",
        "Installation: Underground pit",
        "Space Efficiency: 85%",
      ],
    },
    {
      name: "S-CL-01 CANTILEVER",
      slug: "s-cl-01-cantilever",
      description: "Cantilever stacking system for flexible parking",
      specifications: [
        "Capacity: 2 cars",
        "Lift Type: Cantilever mechanism",
        "Installation: Above ground",
        "Space Efficiency: 80%",
      ],
    },
  ];

  const handleItemClick = (slug: string) => {
    setIsLoading(true);
    onClose();
    setTimeout(() => {
      router.push(`/products/stack-parking/${slug}`);
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
          STACK PARKING
          <span className="text-gray-500 text-sm">+</span>
        </button>

        {/* Stack Parking Items Dropdown */}
        {isExpanded && (
          <div className="ml-4 mt-2 space-y-1">
            {stackParkingItems.map((item, index) => (
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
