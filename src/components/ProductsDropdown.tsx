"use client";
import React, { useState } from "react";
import StackParkingDropdown from "./StackParkingDropdown";
import PuzzleParkingDropdown from "./PuzzleParkingDropdown";
import AutomaticDropdown from "./AutomaticDropdown";

interface ProductsDropdownProps {
  isExpanded: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function ProductsDropdown({ isExpanded, onToggle, onClose }: ProductsDropdownProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleCategoryToggle = (categoryName: string) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryName);
    }
  };

  return (
    <div>
      <button
        onClick={onToggle}
        className="block text-black text-lg font-medium hover:text-blue-600 py-2 border-b border-gray-200 w-full text-left flex items-center justify-between"
      >
        Products
        <span className="text-gray-500 text-sm">+</span>
      </button>
      
      {/* Products Dropdown */}
      {isExpanded && (
        <div className="ml-4 mt-2 space-y-2">
          <StackParkingDropdown
            isExpanded={expandedCategory === "STACK PARKING"}
            onToggle={() => handleCategoryToggle("STACK PARKING")}
            onClose={onClose}
          />
          
          <PuzzleParkingDropdown
            isExpanded={expandedCategory === "PUZZLE PARKING"}
            onToggle={() => handleCategoryToggle("PUZZLE PARKING")}
            onClose={onClose}
          />
          
          <AutomaticDropdown
            isExpanded={expandedCategory === "AUTOMATIC"}
            onToggle={() => handleCategoryToggle("AUTOMATIC")}
            onClose={onClose}
          />
        </div>
      )}
    </div>
  );
}
