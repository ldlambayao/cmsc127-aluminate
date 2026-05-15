"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AlumniTracerResults() {
  const [activeTab, setActiveTab] = useState<"summary" | "edit">("summary");

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className=" p-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Alumni Tracer Form</h1>
          <p className="text-gray-500 text-xs mt-1">
            Illuminating Alumni Paths through Data, One at a Time
          </p>
        </div>

        {/* Tabs and Filters Section */}
        {/* Tabs */}
        <div className="flex gap-12 justify-center border-b border-gray-200">
          <button
            onClick={() => setActiveTab("summary")}
            className={`pb-3 px-2 font-medium text-md transition-colors ${activeTab === "summary"
              ? "border-b-3"
              : "text-gray-700 hover:text-gray-900"
              }`}
            style={activeTab === "summary" ? { color: "#8E3737", borderColor: "#8E3737" } : {}}
          >
            Summary Statistics
          </button>
          <button
            onClick={() => setActiveTab("edit")}
            className={`pb-3 px-2 font-medium text-md transition-colors ${activeTab === "edit"
              ? "border-b-2"
              : "text-gray-700 hover:text-gray-900"
              }`}
            style={activeTab === "edit" ? { color: "#8E3737", borderColor: "#8E3737" } : {}}
          >
            Edit Questions
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mt-6 justify-end">
          <div className="relative">
            <select className="appearance-none w-56 px-4 py-3 border border-gray-200 rounded-2xl text-gray-400 bg-white text-xs">
              <option>Filter by Program</option>
            </select>
            <ChevronDown
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black"
              size={14}
              strokeWidth={2.5}
            />
          </div>
          <div className="relative">
            <select className="appearance-none w-56 px-4 py-3 border border-gray-200 rounded-2xl text-gray-400 bg-white text-xs">
              <option>Filter by section</option>
            </select>
            <ChevronDown
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black"
              size={14}
              strokeWidth={2.5}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-8">
          {activeTab === "summary" && (
            <div>
              {/* Summary Statistics content will go here */}
              <p className="text-gray-600">Summary Statistics content</p>
            </div>
          )}
          {activeTab === "edit" && (
            <div>
              {/* Edit Questions content will go here */}
              <p className="text-gray-600">Edit Questions content</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
