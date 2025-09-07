"use client";
import React, { useState } from "react";
import Link from "next/link";
import LoadingBar from "./LoadingBar";

interface BreadcrumbNavProps {
  currentPage: string;
  onHomeClick?: () => void;
  onProductsClick?: () => void;
}

export default function BreadcrumbNav({ currentPage, onHomeClick, onProductsClick }: BreadcrumbNavProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleProductsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onProductsClick) {
      onProductsClick();
    } else {
      setIsLoading(true);
      setTimeout(() => {
        window.location.href = '/#products';
      }, 500);
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onHomeClick) {
      onHomeClick();
    } else {
      setIsLoading(true);
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    }
  };

  return (
    <>
      <LoadingBar isLoading={isLoading} />
      <div className="container mx-auto px-4 py-2 mt-4">
        <nav className="text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600" onClick={handleHomeClick}>Home</Link>
          <span className="mx-2">{'>'}</span>
          <Link 
            href="/#products" 
            className="hover:text-blue-600" 
            onClick={handleProductsClick}
          >
            Products
          </Link>
          <span className="mx-2">{'>'}</span>
          <span className="text-gray-800">{currentPage}</span>
        </nav>
      </div>
    </>
  );
}
