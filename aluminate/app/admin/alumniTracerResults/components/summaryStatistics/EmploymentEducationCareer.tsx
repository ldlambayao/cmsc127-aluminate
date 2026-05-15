"use client";

import { useState } from "react";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import CurrentWorkModal from "./modals/currentWork";
import CurrentPositionModal from "./modals/currentPosition";

export default function EmploymentEducationCareer() {
    const [showCurrentWorkModal, setShowCurrentWorkModal] = useState(false);
    const [showCurrentPositionModal, setShowCurrentPositionModal] = useState(false);

    // Sample data - replace with actual data from backend CC REX
    const timeToFindJobData = [
        { category: "Less than 1 month", label: "Less than 1 month", count: 3 },
        { category: "1-3 months", label: "1-3 months", count: 5 },
        { category: "4-6 months", label: "4-6 months", count: 7 },
        { category: "7-12 months", label: "7-12 months", count: 4 },
        { category: "More than 1 year", label: "More than 1 year", count: 2 },
        { category: "Not applicable", label: "Not applicable", count: 1 },
    ];

    const currentStatusofEmploymentData = [
        { category: "Employed (Full-time)", label: "Employed (Full-time)", count: 10 },
        { category: "Employed (Part-time)", label: "Employed (Part-time)", count: 2 },
        { category: "Self-employed / Business Owner", label: "Self-employed / Business Owner", count: 3 },
        { category: "Unemployed (Looking for work)", label: "Unemployed (Looking for work)", count: 5 },
        { category: "Unemployed (Not looking for work)", label: "Unemployed (Not looking for work)", count: 5 },
        { category: "Further Studies / Not yet employed", label: "Further Studies / Not yet employed", count: 4 },
    ];

    const dateHired = [
        { category: "June 1, 2021", label: "2021", count: 2 },
        { category: "June 1, 2022", label: "2022", count: 4 },
        { category: "June 1, 2021", label: "2021", count: 7 },
        { category: "June 1, 2021", label: "2021", count: 20 },
        { category: "June 1, 2021", label: "2021", count: 11 },
        { category: "June 1, 2021", label: "2021", count: 7 },
        { category: "June 1, 2021", label: "2021", count: 9 },
        { category: "June 1, 2021", label: "2021", count: 7 },
        { category: "June 1, 2021", label: "2021", count: 26 },
        { category: "June 1, 2021", label: "2021", count: 2 },
    ]

    const currentWork = [
        { category: "Company A, Manila", label: "Company A, Manila", count: 5 },
        { category: "Company B, Cebu", label: "Company B, Cebu", count: 3 },
        { category: "Company C, Davao", label: "Company C, Davao", count: 2 },
        { category: "Company D, Manila", label: "Company D, Manila", count: 4 },
        { category: "Company E, Cebu", label: "Company E, Cebu", count: 1 },
        { category: "Company F, Quezon City", label: "Company F, Quezon City", count: 6 },
        { category: "Company G, Makati", label: "Company G, Makati", count: 3 },
        { category: "Company G, Makati", label: "Company G, Makati", count: 3 },
        { category: "Company G, Makati", label: "Company G, Makati", count: 3 },
        { category: "Company G, Makati", label: "Company G, Makati", count: 3 },
        { category: "Company G, Makati", label: "Company G, Makati", count: 3 },
        { category: "Company G, Makati", label: "Company G, Makati", count: 3 },
        { category: "Company G, Makati", label: "Company G, Makati", count: 3 },
        { category: "Company G, Makati", label: "Company G, Makati", count: 3 },
        { category: "Company G, Makati", label: "Company G, Makati", count: 3 },
        { category: "Company G, Makati", label: "Company G, Makati", count: 3 },
        { category: "Company G, Makati", label: "Company G, Makati", count: 3 },
    ]

    const currentPosition = [
        { category: "Software Engineer", label: "Software Engineer", count: 10 },
        { category: "Data Analyst", label: "Data Analyst", count: 5 },
        { category: "Project Manager", label: "Project Manager", count: 3 },
        { category: "Project Manager", label: "Project Manager", count: 3 },
        { category: "Project Manager", label: "Project Manager", count: 3 },
        { category: "Project Manager", label: "Project Manager", count: 3 },
        { category: "Project Manager", label: "Project Manager", count: 3 },
        { category: "Project Manager", label: "Project Manager", count: 3 },
    ]

    return (
        <div className="mb-16">
            {/* Title - Outside Container */}
            <h2 className="text-lg font-semibold text-red-900 mb-4">
                Employment Details, Further Education, and Career Outcomes
            </h2>
            <div className="flex gap-12 justify-center border-b border-gray-200">
            </div>


            {/* Containers*/}
            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <p className="text-red-900 text-sm font-medium mb-4">
                    How long did it take you to find a job after graduation?
                </p>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={timeToFindJobData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                        <XAxis dataKey="category" tick={{ fill: '#a3a3a3', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#a3a3a3', fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                            formatter={(value) => [value, 'Count']}
                        />
                        <Bar dataKey="count" fill="#E8C4C4" radius={[8, 8, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <p className="text-red-900 text-sm font-medium mt-1">
                    Current status of employment
                </p>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={currentStatusofEmploymentData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                        <XAxis dataKey="category" tick={{ fill: '#a3a3a3', fontSize: 10 }} interval={0} />
                        <YAxis tick={{ fill: '#a3a3a3', fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                            formatter={(value) => [value, 'Count']}
                        />
                        <Bar dataKey="count" fill="#E8C4C4" radius={[8, 8, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>

            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <p className="text-red-900 text-sm font-medium mt-1">
                    Date hired in present employment if employed, self-employed or with business:
                    (If you cannot recall the exact date, just provide the month and year, and input the day as 1. For example, if you were hired sometime in June 2019, input June 1, 2019.)
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={dateHired} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                            <XAxis dataKey="category" tick={{ fill: '#a3a3a3', fontSize: 10 }} interval={0} />
                            <YAxis tick={{ fill: '#a3a3a3', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                                formatter={(value) => [value, 'Count']}
                            />
                            <Line dataKey="count" stroke="#E8C4C4" strokeWidth={2} dot={{ r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <p className="text-red-900 text-sm font-medium mb-4">
                    Where do you work now? (Please specify company name and location.)
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-2 px-4 text-gray-700 font-semibold">Company & Location</th>
                                <th className="text-center py-2 px-4 text-gray-700 font-semibold">Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentWork.slice(0, 5).map((item, index) => (
                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-2 px-4 text-gray-600">{item.category}</td>
                                    <td className="py-2 px-4 text-center text-gray-600">{item.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {currentWork.length > 5 && (
                    <button
                        onClick={() => setShowCurrentWorkModal(true)}
                        className="mt-4 px-4 py-2 text-red-800 rounded text-xs font-medium hover:underline transition"
                    >
                        View All ({currentWork.length})
                    </button>
                )}
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <p className="text-red-900 text-sm font-medium mb-4">
                    What is your current position for your job?
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-2 px-4 text-gray-700 font-semibold">Position</th>
                                <th className="text-center py-2 px-4 text-gray-700 font-semibold">Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosition.slice(0, 5).map((item, index) => (
                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-2 px-4 text-gray-600">{item.category}</td>
                                    <td className="py-2 px-4 text-center text-gray-600">{item.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {currentPosition.length > 5 && (
                    <button
                        onClick={() => setShowCurrentPositionModal(true)}
                        className="mt-4 px-4 py-2 text-red-800 rounded text-xs font-medium hover:underline transition"
                    >
                        View All ({currentPosition.length})
                    </button>
                )}


            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <p className="text-red-900 text-sm font-medium mt-1">
                    What is the nature of your work? (Education, IT/ICT Position in the Organization/Company, Business, Research and Development, Others, etc.)
                </p>

            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <p className="text-red-900 text-sm font-medium mt-1">
                    Are you pursuing higher studies?
                </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <p className="text-red-900 text-sm font-medium mt-1">
                    If you answered yes above, please specify degree program, field of study, and university. Otherwise, type "N/A"
                </p>
            </div>

            {/* Modals */}
            <CurrentWorkModal
                isOpen={showCurrentWorkModal}
                onClose={() => setShowCurrentWorkModal(false)}
                data={currentWork}
            />

            <CurrentPositionModal
                isOpen={showCurrentPositionModal}
                onClose={() => setShowCurrentPositionModal(false)}
                data={currentPosition}
            />

        </div>
    );
}
