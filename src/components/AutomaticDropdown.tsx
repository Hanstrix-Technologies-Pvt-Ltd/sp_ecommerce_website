"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingBar from "./LoadingBar";

interface AutomaticItem {
  name: string;
  slug: string;
  description: string;
  specifications: string[];
}

interface AutomaticDropdownProps {
  isExpanded: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function AutomaticDropdown({
  isExpanded,
  onToggle,
  onClose,
}: AutomaticDropdownProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const automaticItems: AutomaticItem[] = [
    {
      name: "CAR HOIST",
      slug: "car-hoist",
      description: "Automated car hoisting system for vertical movement",
      specifications: [
        "Capacity: 1 car",
        "Movement: Vertical",
        "Control: Automated",
        "Installation: Above ground",
      ],
    },
    {
      name: "ROTARY",
      slug: "rotary",
      description: "Rotary parking system for space optimization",
      specifications: [
        "Capacity: 1 car",
        "Movement: Rotational",
        "Control: Automated",
        "Space Efficiency: 98%",
      ],
    },
    {
      name: "TURN TABLE",
      slug: "turn-table",
      description: "Turn table system for easy vehicle maneuvering",
      specifications: [
        "Capacity: 1 car",
        "Movement: Rotational",
        "Control: Manual/Automated",
        "Installation: Surface level",
      ],
    },
  ];

  const handleItemClick = (slug: string) => {
    setIsLoading(true);
    onClose();
    setTimeout(() => {
      router.push(`/products/automatic/${slug}`);
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
          AUTOMATIC
          <span className="text-gray-500 text-sm">+</span>
        </button>

        {/* Automatic Items Dropdown */}
        {isExpanded && (
          <div className="ml-4 mt-2 space-y-1">
            {automaticItems.map((item, index) => (
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
