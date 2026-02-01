// src/pages/Marketplace.js
import React, { useState } from "react";
import CropListing from "../components/CropListing";
import SEO from "../components/SEO";
import { ROUTES_SEO } from "../seo/metaConfig";
import { FunnelIcon, MapPinIcon, BarsArrowDownIcon } from "@heroicons/react/24/outline";
import "./Marketplace.css";

export default function Marketplace({ searchTerm, isPreview = false }) {
  const [filters, setFilters] = useState({
    category: "All Categories",
    sort: "default",
    location: "All India",
  });

  const { title, description } = ROUTES_SEO["/marketplace"];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
      {!isPreview && (
        <SEO title={title} description={description} />
      )}

      {/* HEADER */}
      {!isPreview && (
        <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 py-8 px-6 mb-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-2">
              🌾 Agri Marketplace
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
              Connect directly with farmers. Access fresh produce, transparent pricing, and quality assurance.
            </p>
          </div>
        </header>
      )}

      <div className={`max-w-7xl mx-auto px-6 ${isPreview ? 'mt-0' : 'mt-8'}`}>

        {/* CONTROLS BAR */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row gap-4 justify-between items-center mb-8 sticky top-20 z-10 transition-all">

          {/* LEFT: FILTERS */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 w-full md:w-auto">
              <FunnelIcon className="w-5 h-5 text-teal-600" />
              <select
                className="bg-transparent border-none text-sm font-medium text-slate-700 dark:text-slate-200 focus:ring-0 outline-none w-full"
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              >
                <option>All Categories</option>
                <option>Vegetables</option>
                <option>Fruits</option>
                <option>Cereals</option>
                <option>Pulses</option>
                <option>Oilseeds</option>
              </select>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 w-full md:w-auto">
              <MapPinIcon className="w-5 h-5 text-teal-600" />
              <select
                className="bg-transparent border-none text-sm font-medium text-slate-700 dark:text-slate-200 focus:ring-0 outline-none w-full"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              >
                <option>All India</option>
                <option>Punjab</option>
                <option>Maharashtra</option>
                <option>Karnataka</option>
                <option>Tamil Nadu</option>
              </select>
            </div>
          </div>

          {/* RIGHT: SORT */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-sm text-slate-500 whitespace-nowrap hidden md:block">Sort by:</span>
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 w-full md:w-auto">
              <BarsArrowDownIcon className="w-5 h-5 text-teal-600" />
              <select
                className="bg-transparent border-none text-sm font-medium text-slate-700 dark:text-slate-200 focus:ring-0 outline-none w-full"
                value={filters.sort}
                onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
              >
                <option value="default">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

        </div>

        {/* LISTINGS */}
        <CropListing
          searchTerm={searchTerm}
          category={filters.category}
          sort={filters.sort}
          location={filters.location}
          isPreview={isPreview}
        />

      </div>
    </div>
  );
}
