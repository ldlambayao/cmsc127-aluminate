"use client";

export default function EmploymentEducationCareer() {
    return (
        <div className = "mb-16">
            {/* Title - Outside Container */}
            <h2 className="text-lg font-semibold text-red-900 mb-4">
                Employment Details, Further Education, and Career Outcomes
            </h2>
            <div className="flex gap-12 justify-center border-b border-gray-200">
            </div>


            {/* Containers*/}
            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <p className="text-red-900 text-sm font-medium mt-1">
                    How long did it take you to find a job after graduation?
                </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <p className="text-red-900 text-sm font-medium mt-1">
                    Current status of employment
                </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <p className="text-red-900 text-sm font-medium mt-1">
                    Date hired in present employment if employed, self-employed or with business:
                    (If you cannot recall the exact date, just provide the month and year, and input the day as 1. For example, if you were hired sometime in June 2019, input June 1, 2019.)

                </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <p className="text-red-900 text-sm font-medium mt-1">
                    Where do you work now? (Please specify company name and location.)
                </p>
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


        </div>
    );
}
