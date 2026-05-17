"use client";

import { useState, useEffect } from "react";
import {
  Pie,
  PieChart,
  Cell,
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
import FieldOfStudyModal from "./modals/fieldofStudy";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";

interface ChartDataPoint {
  category: string;
  label: string;
  count: number;
}

interface SurveyResponseRow {
  time_to_find_job: string;
  current_employment_status: string;
}

export default function EmploymentEducationCareer() {
  const supabase = getSupabaseBrowserClient();
  const [showCurrentWorkModal, setShowCurrentWorkModal] = useState(false);
  const [showCurrentPositionModal, setShowCurrentPositionModal] = useState(false);
  const [showFieldOfStudyModal, setShowFieldOfStudyModal] = useState(false);
  const [timeToFindJobData, setTimeToFindJobData] = useState<ChartDataPoint[]>([]);
  const [currentEmploymentStatusData, setCurrentEmploymentStatusData] = useState<ChartDataPoint[]>([]);

  const timeToFindJobOptions = [
    "Less than 1 month",
    "1-3 months",
    "4-6 months",
    "7-12 months",
    "More than 1 year",
    "Not applicable"
  ];

  const currentEmploymentStatusOptions = [
    "Employed (Full-time)",
    "Employed (Part-time)",
    "Self-employed / Business owner",
    "Unemployed (looking for work)",
    "Unemployed (not looking for work)",
    "Further studies / Not yet employed"
  ]

  // Sample data - replace with actual data from backend CC REX
  useEffect(() => {
    const fetchData = async () => {
      try{
        // time to find job data acquisition
        const { data: timeToFindJobQuery, error: timetofindJobError } = await supabase
          .from("tracer_survey_response")
          .select("time_to_find_job");

        if (timetofindJobError) throw timetofindJobError;

        const timeToFindJobCounts: Record<string, number> = {};
        timeToFindJobOptions.forEach(option => {
          timeToFindJobCounts[option] = 0;
        });

        if (timeToFindJobQuery) {
          (timeToFindJobQuery as SurveyResponseRow[]).forEach((row) => {
            const value = row.time_to_find_job;

            if (value && value in timeToFindJobCounts) {
              timeToFindJobCounts[value]++;
            }
          })
        };

        const timeToFindJobFormatted = Object.keys(timeToFindJobCounts).map((key) => ({
          category: key,
          label: key,
          count: timeToFindJobCounts[key],
        }));

        setTimeToFindJobData(timeToFindJobFormatted);

        // current employment status data acquisition
        const { data: currentEmploymentStatusQuery, error: currentEmploymentStatusError} = await supabase
          .from("tracer_survey_response")
          .select("current_employment_status")

        if (currentEmploymentStatusError) throw currentEmploymentStatusError;

        const currentEmploymentStatusCounts: Record<string, number> = {};
        currentEmploymentStatusOptions.forEach((option) => {
          currentEmploymentStatusCounts[option] = 0;
        })

        if (currentEmploymentStatusQuery) {
          (currentEmploymentStatusQuery as SurveyResponseRow[]).forEach((row) => {
            const value = row.current_employment_status;

            if (value && value in currentEmploymentStatusCounts) {
              currentEmploymentStatusCounts[value]++;
            }
          })
        };

        const currentEmploymentStatusFormatted = Object.keys(currentEmploymentStatusCounts).map((key) => ({
          category: key,
          label: key,
          count: currentEmploymentStatusCounts[key],
        }));

        setCurrentEmploymentStatusData(currentEmploymentStatusFormatted);


      } catch (err) {
        console.error("Error fetching survey metrics:", err);
      }
    };

    fetchData();
  }, []);

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

  const workNature = [
    { category: "Education", label: "Education", count: 8 },
    { category: "IT/ICT Position in the Organization/Company", label: "IT/ICT Position in the Organization/Company", count: 12 },
    { category: "Business", label: "Business", count: 5 },
    { category: "Research and Development", label: "Research and Development", count: 3 },
  ]

  const pieChart = [
    { name: "Yes", label: "Yes", count: 15 },
    { name: "No", label: "No", count: 10 },
  ]

  const fieldStudy = [
    { category: "Computer Science", label: "Computer Science", count: 5 },
    { category: "Information Technology", label: "Information Technology", count: 3 },
    { category: "Business Administration", label: "Business Administration", count: 4 },
    { category: "Education", label: "Education", count: 2 },
    { category: "Education", label: "Education", count: 2 },
    { category: "Education", label: "Education", count: 2 },
    { category: "Education", label: "Education", count: 2 },
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
          <BarChart data={currentEmploymentStatusData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
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
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={workNature} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
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
          Are you pursuing higher studies?
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

      <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
        <p className="text-red-900 text-sm font-medium mt-1 mb-4">
          If you answered yes above, please specify degree program, field of study, and university. Otherwise, type "N/A"
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-4 text-gray-700 font-semibold">Field of Study</th>
                <th className="text-center py-2 px-4 text-gray-700 font-semibold">Count</th>
              </tr>
            </thead>
            <tbody>
              {fieldStudy.slice(0, 5).map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-4 text-gray-600">{item.category}</td>
                  <td className="py-2 px-4 text-center text-gray-600">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {fieldStudy.length > 5 && (
          <button
            onClick={() => setShowFieldOfStudyModal(true)}
            className="mt-4 px-4 py-2 text-red-800 rounded text-xs font-medium hover:underline transition"
          >
            View All ({fieldStudy.length})
          </button>
        )}
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

      <FieldOfStudyModal
        isOpen={showFieldOfStudyModal}
        onClose={() => setShowFieldOfStudyModal(false)}
        data={fieldStudy}
      />

    </div>
  );
}
