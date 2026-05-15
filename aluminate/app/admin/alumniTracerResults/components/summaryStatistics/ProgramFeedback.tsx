"use client";

export default function ProgramFeedback() {
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
                <p className="text-red-900 text-sm font-medium mt-1">
                    Please share your suggestions for activities (programs, mentoring, etc.) that allow us to better help alumni find jobs after graduation. Please elaborate below.
                </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <p className="text-red-900 text-sm font-medium mt-1">
                    What is your level of satisfaction for your undergraduate study under the BSCS degree program?
                </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <p className="text-red-900 text-sm font-medium mt-1">
                    Reasons for giving that rating above:

                </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <p className="text-red-900 text-sm font-medium mt-1">
                    What are your suggestions on how to improve the program in terms of structure, content, teaching, assessments, etc.?
                </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <p className="text-red-900 text-sm font-medium mt-1">
                    Would you like to get updates regarding new DMPCS program offerings, trainings and/or activities for alumni? If yes, please provide your email below.
                </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
                <p className="text-red-900 text-sm font-medium mt-1">
                    Would you be interested in taking part as an alumni interviewer for the review and revision of the BSCS Program?
                </p>
            </div>

        </div>
    );
}
