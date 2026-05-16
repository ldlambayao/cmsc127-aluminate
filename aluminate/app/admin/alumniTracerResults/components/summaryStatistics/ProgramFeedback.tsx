"use client";

import { useState } from "react";
import {
    Cell,
    Pie,
    PieChart,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import SuggestionsForActivitiesModal from "./modals/suggestionsForActivitiesModal";
import ReasonsForRatingModal from "./modals/reasonsForRating";
import ImprovementModal from "./modals/suggestionsImprovement";
import EmailsModal from "./modals/emails";

const suggestionsForActivities = [
        { category: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", label: " " },
        { category: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", label: " " },
        { category: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", label: " " },
        { category: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", label: " " },
        { category: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", label: " " },
        { category: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", label: " " },
    ];

const satisfactionLikertData = [
    { label: "Very Satisfied", count: 28 },
    { label: "Satisfied", count: 35 },
    { label: "Neutral", count: 15 },
    { label: "Dissatisfied", count: 8 },
    { label: "Very Dissatisfied", count: 4 },
];

const reasonsForRating = [
    { category: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { category: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { category: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { category: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { category: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { category: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { category: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
]

const improvementSuggestions = [
    { category: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { category: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { category: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { category: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { category: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { category: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { category: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
]

const pieChart = [
        { name: "Yes", label: "Yes", count: 15 },
        { name: "No", label: "No", count: 10 },
    ]

const emails = [
    { category: "lelambayao@gmail.com" },
    { category: "john.doe@example.com" },
    { category: "jane.smith@example.com" },
    { category: "jane.smith@example.com" },
    { category: "jane.smith@example.com" },
    { category: "jane.smith@example.com" },
    { category: "jane.smith@example.com" },
    { category: "jane.smith@example.com" },
    { category: "jane.smith@example.com" },
    { category: "jane.smith@example.com" },
    { category: "jane.smith@example.com" },
    { category: "jane.smith@example.com" },
    { category: "jane.smith@example.com" },
    ]


export default function ProgramFeedback() {
    const [showSuggestionsModal, setShowSuggestionsModal] = useState(false);
    const [showReasonsForRatingModal, setShowReasonsForRatingModal] = useState(false);
    const [showImprovementModal, setShowImprovementModal] = useState(false);
    const [showEmailsModal, setShowEmailsModal] = useState(false);

    return (
        <div className = "mb-16">
            {/* Title - Outside Container */}
            <h2 className="text-lg font-semibold text-red-900 mb-4">
                Program Feedback
            </h2>
            <div className="flex gap-12 justify-center border-b border-gray-200">
            </div>

            {/* Containers*/}
            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <p className="text-red-900 text-sm font-medium mb-4">
                    Please share your suggestions for activities (programs, mentoring, etc.) that allow us to better help alumni find jobs after graduation. Please elaborate below.
                </p>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                    Suggestions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {suggestionsForActivities.slice(0, 5).map((item, index) => (
                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4 text-gray-700">
                                        <p className="truncate text-gray-600">{item.category.substring(0, 145)}...</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {suggestionsForActivities.length > 5 && (
                    <button
                        onClick={() => setShowSuggestionsModal(true)}
                        className="mt-4 px-4 py-2 text-red-800 rounded text-xs font-medium hover:underline transition"
                    >
                        View All ({suggestionsForActivities.length})
                    </button>
                )}
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <p className="text-red-900 text-sm font-medium mb-4">
                    What is your level of satisfaction for your undergraduate study under the BSCS degree program?
                </p>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                        data={satisfactionLikertData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, bottom: 5 }}
                    >
                        <XAxis type="number" tick={{ fill: '#a3a3a3', fontSize: 10 }} interval={0} />
                        <YAxis dataKey="label" type="category" width={150} tick={{ fontSize: 11 }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            }}
                            formatter={(value) => [value, 'Responses']}
                        />
                        <Bar
                            dataKey="count"
                            fill="#D89A9A"
                            radius={[0, 8, 8, 0]}
                            barSize={30}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <p className="text-red-900 text-sm font-medium mb-4">
                    Reasons for giving that rating above:
                </p>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                    Reasons
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {reasonsForRating.slice(0, 5).map((item, index) => (
                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4 text-gray-700">
                                        <p className="truncate text-gray-600">{item.category.substring(0, 145)}...</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {reasonsForRating.length > 5 && (
                    <button
                        onClick={() => setShowReasonsForRatingModal(true)}
                        className="mt-4 px-4 py-2 text-red-800 rounded text-xs font-medium hover:underline transition"
                    >
                        View All ({reasonsForRating.length})
                    </button>
                )}
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <p className="text-red-900 text-sm font-medium mb-4">
                    What are your suggestions on how to improve the program in terms of structure, content, teaching, assessments, etc.?
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                    Suggestions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {improvementSuggestions.slice(0, 5).map((item, index) => (
                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4 text-gray-700">
                                        <p className="truncate text-gray-600">{item.category.substring(0, 145)}...</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {improvementSuggestions.length > 5 && (
                    <button
                        onClick={() => setShowImprovementModal(true)}
                        className="mt-4 px-4 py-2 text-red-800 rounded text-xs font-medium hover:underline transition"
                    >
                        View All ({improvementSuggestions.length})
                    </button>
                )}
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-red-900 text-sm font-medium mb-4">
                    Would you like to get updates regarding new DMPCS program offerings, trainings and/or activities for alumni? If yes, please provide your email below.
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                    Emails
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {emails.slice(0, 5).map((item, index) => (
                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4 text-gray-700">
                                        <p className="truncate text-gray-600">{item.category.substring(0, 145)}...</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {emails.length > 5 && (
                    <button
                        onClick={() => setShowEmailsModal(true)}
                        className="mt-4 px-4 py-2 text-red-800 rounded text-xs font-medium hover:underline transition"
                    >
                        View All ({emails.length})
                    </button>
                )}
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-red-900 text-sm font-medium mb-4">
                    Would you be interested in taking part as an alumni interviewer for the review and revision of the BSCS Program?
                </p>
                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart data={pieChart}>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                                            formatter={(value, name, props) => [value, props.payload.name]}
                                        />
                                        <Pie
                                            dataKey="count"
                                            label={({ name, value }) => `${name} (${value})`}
                                            labelLine={false}
                                            nameKey="name"
                                        >
                                            {pieChart.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={entry.name === 'Yes' ? '#E29692' : '#FAECEB'}
                                                />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                
            </div>
            </div>

            {/* Modals */}
            <SuggestionsForActivitiesModal
                isOpen={showSuggestionsModal}
                onClose={() => setShowSuggestionsModal(false)}
                data={suggestionsForActivities}
            />

            <ReasonsForRatingModal
                isOpen={showReasonsForRatingModal}
                onClose={() => setShowReasonsForRatingModal(false)}
                data={reasonsForRating}
            />

            <ImprovementModal
                isOpen={showImprovementModal}
                onClose={() => setShowImprovementModal(false)}
                data={improvementSuggestions}
            />

            <EmailsModal
                isOpen={showEmailsModal}
                onClose={() => setShowEmailsModal(false)}
                data={emails}
            />

        </div>
    );
}
