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

interface PieChartDataPoint {
  name: string;
  label: string;
  count: number;
}

interface SurveyResponseRow {
  q01_time_to_find_job: string;
  q02_current_employment_status: string;
  q03_date_hired: string;
  q04_current_workplace: string;
  q05_current_position: string;
  q06_nature_of_work: string;
  q07_higher_studies: string;
  q08_list_for_higher_studies: string;
}

export default function EmploymentEducationCareer() {
  const supabase = getSupabaseBrowserClient();
  const [showCurrentWorkModal, setShowCurrentWorkModal] = useState(false);
  const [showCurrentPositionModal, setShowCurrentPositionModal] = useState(false);
  const [showFieldOfStudyModal, setShowFieldOfStudyModal] = useState(false);
  const [timeToFindJobData, setTimeToFindJobData] = useState<ChartDataPoint[]>([]);
  const [currentEmploymentStatusData, setCurrentEmploymentStatusData] = useState<ChartDataPoint[]>([]);
  const [dateHiredData, setDateHiredData] = useState<ChartDataPoint[]>([]);
  const [currentWorkplaceData, setCurrentWorkplaceData] = useState<ChartDataPoint[]>([]);
  const [currentPositionData, setCurrentPositionData] = useState<ChartDataPoint[]>([]);
  const [natureOfWorkData, setNatureOfWorkData] = useState<ChartDataPoint[]>([]);
  const [higherStudiesData, setHigherStudiesData] = useState<PieChartDataPoint[]>([]);
  const [listForHigherStudiesData, setListForHigherStudiesData] = useState<ChartDataPoint[]>([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try{
        // --------------
        // time to find job data acquisition
        // --------------
        const { data: timeToFindJobQuery, error: timetofindJobError } = await supabase
          .from("tracer_survey_response")
          .select("q01_time_to_find_job");

        if (timetofindJobError) throw timetofindJobError;

        const timeToFindJobCounts: Record<string, number> = {};
        timeToFindJobOptions.forEach(option => {
          timeToFindJobCounts[option] = 0;
        });

        if (timeToFindJobQuery) {
          (timeToFindJobQuery as SurveyResponseRow[]).forEach((row) => {
            const value = row.q01_time_to_find_job;

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

        // --------------
        // current employment status data acquisition
        // --------------
        const { data: currentEmploymentStatusQuery, error: currentEmploymentStatusError} = await supabase
          .from("tracer_survey_response")
          .select("q02_current_employment_status")

        if (currentEmploymentStatusError) throw currentEmploymentStatusError;

        const currentEmploymentStatusCounts: Record<string, number> = {};
        currentEmploymentStatusOptions.forEach((option) => {
          currentEmploymentStatusCounts[option] = 0;
        })

        if (currentEmploymentStatusQuery) {
          (currentEmploymentStatusQuery as SurveyResponseRow[]).forEach((row) => {
            const value = row.q02_current_employment_status;

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

        // --------------
        // date hired data acquisition
        // --------------
        const { data: dateHiredQuery, error: dateHiredError} = await supabase
          .from("tracer_survey_response")
          .select("q03_date_hired")

        if (dateHiredError) throw dateHiredError;

        const dateHiredCounts: Record<string, number> = {};

        if (dateHiredQuery) {
          (dateHiredQuery as SurveyResponseRow[]).forEach((row) => {
            const rawValue = row.q03_date_hired || "N/A";

            if(rawValue) {
              const value = rawValue.substring(0, 4);
              dateHiredCounts[value] = (dateHiredCounts[value] || 0) + 1;
            } else {

            }
          })
        };

        const dateHiredFormatted = Object.keys(dateHiredCounts).map((key) => ({
          category: key,
          label: key,
          count: dateHiredCounts[key],
        }));

        setDateHiredData(dateHiredFormatted);

        // --------------
        // current workplace data acquisition
        // --------------
        const { data: currentWorkplaceData, error: currentWorkplaceError } = await supabase
          .from("tracer_survey_response")
          .select("q04_current_workplace");

        if (currentWorkplaceError) throw currentWorkplaceError;

        const currentWorkplaceCounts: Record<string, number> = {};

        if (currentWorkplaceData) {
          (currentWorkplaceData as SurveyResponseRow[]).forEach((row) => {
            const rawValue = row.q04_current_workplace;

            const value = rawValue && rawValue.trim() !== "" ? rawValue : "N/A";

            if (!(value in currentWorkplaceCounts)) {
              currentWorkplaceCounts[value] = 0;
            }
            currentWorkplaceCounts[value]++;
          });
        }

        const currentWorkplaceFormatted = Object.keys(currentWorkplaceCounts).map((key) => ({
          category: key,
          label: key,
          count: currentWorkplaceCounts[key],
        }));

        setCurrentWorkplaceData(currentWorkplaceFormatted)

        // --------------
        // current position data acquisition
        // --------------
        const { data: currentPositionData, error: currentPositionError } = await supabase
          .from("tracer_survey_response")
          .select("q05_current_position");

        if (currentPositionError) throw currentPositionError;

        const currentPositionCounts: Record<string, number> = {};

        if (currentPositionData) {
          (currentPositionData as SurveyResponseRow[]).forEach((row) => {
            const rawValue = row.q05_current_position;

            const value = rawValue && rawValue.trim() !== "" ? rawValue : "N/A";

            if (!(value in currentPositionCounts)) {
              currentPositionCounts[value] = 0;
            }
            currentPositionCounts[value]++;
          });
        }

        const currentPositionFormatted = Object.keys(currentPositionCounts).map((key) => ({
          category: key,
          label: key,
          count: currentPositionCounts[key],
        }));

        setCurrentPositionData(currentPositionFormatted)

        // -----------
        // nature of work data acquisition
        // -----------
        const { data: natureOfWorkData, error: natureOfWorkError } = await supabase
          .from("tracer_survey_response")
          .select("q06_nature_of_work");

        if (natureOfWorkError) throw natureOfWorkError;

        const natureOfWorkCounts: Record<string, number> = {};

        if (natureOfWorkData) {
          (natureOfWorkData as SurveyResponseRow[]).forEach((row) => {
            const rawValue = row.q06_nature_of_work;

            const value = rawValue && rawValue.trim() !== "" ? rawValue : "N/A";

            if (!(value in natureOfWorkCounts)) {
              natureOfWorkCounts[value] = 0;
            }
            natureOfWorkCounts[value]++;
          });
        }

        const natureOfWorkFormatted = Object.keys(natureOfWorkCounts).map((key) => ({
          category: key,
          label: key,
          count: natureOfWorkCounts[key],
        }));

        setNatureOfWorkData(natureOfWorkFormatted)

        // ------------
        // higher studies data acquisition
        // ------------
        const { data: higherStudiesData, error: higherStudiesError} = await supabase
          .from("tracer_survey_response")
          .select("q07_higher_studies");

        if (higherStudiesError) throw higherStudiesError;

        const higherStudiesCounts: Record<string, number> = {};

        if (higherStudiesData) {
          (higherStudiesData as SurveyResponseRow[]).forEach((row) => {
            const rawValue = row.q07_higher_studies;

            const value = rawValue ? "Yes" : "No";
            if(!(value in higherStudiesCounts)) {
              higherStudiesCounts[value] = 0;
            }
            higherStudiesCounts[value]++;
          });
        }

        const higherStudiesFormatted = Object.keys(higherStudiesCounts).map((key) => ({
          name: key,
          label: key,
          count: higherStudiesCounts[key]
        }));

        setHigherStudiesData(higherStudiesFormatted);


        // -----------
        // list for higher studies data acquisition
        // -----------
        const { data: listForHigherStudiesData, error: listForHigherStudiesError } = await supabase
          .from("tracer_survey_response")
          .select("q08_list_for_higher_studies")

        if (listForHigherStudiesError) throw listForHigherStudiesError;

        const listForHigherStudiesCounts: Record<string, number> = {}

        if (listForHigherStudiesData) {
          (listForHigherStudiesData as SurveyResponseRow[]).forEach((row) => {
            const rawValue = row.q08_list_for_higher_studies;

            const value = rawValue && rawValue.trim() !== "" ? rawValue : "N/A";

            if(!(value in listForHigherStudiesCounts)) {
              listForHigherStudiesCounts[value] = 0;
            }
            listForHigherStudiesCounts[value]++;
          });
        }

        const listForHigherStudiesFormatted = Object.keys(listForHigherStudiesCounts).map((key) => ({
          category: key,
          label: key,
          count: listForHigherStudiesCounts[key]
        }))

        setListForHigherStudiesData(listForHigherStudiesFormatted);

      } catch (err) {
        console.error("Error fetching survey metrics:", err);
      }
    };

    fetchData();
  }, []);

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
            <LineChart data={dateHiredData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
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
              {currentWorkplaceData.slice(0, 5).map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-4 text-gray-600">{item.category}</td>
                  <td className="py-2 px-4 text-center text-gray-600">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {currentWorkplaceData.length > 5 && (
          <button
            onClick={() => setShowCurrentWorkModal(true)}
            className="mt-4 px-4 py-2 text-red-800 rounded text-xs font-medium hover:underline transition"
          >
            View All ({currentWorkplaceData.length})
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
              {currentPositionData.slice(0, 5).map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-4 text-gray-600">{item.category}</td>
                  <td className="py-2 px-4 text-center text-gray-600">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {currentPositionData.length > 5 && (
          <button
            onClick={() => setShowCurrentPositionModal(true)}
            className="mt-4 px-4 py-2 text-red-800 rounded text-xs font-medium hover:underline transition"
          >
            View All ({currentPositionData.length})
          </button>
        )}


      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
        <p className="text-red-900 text-sm font-medium mt-1">
          What is the nature of your work? (Education, IT/ICT Position in the Organization/Company, Business, Research and Development, Others, etc.)
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={natureOfWorkData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
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
          <PieChart data={higherStudiesData}>
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
              {higherStudiesData.map((entry, index) => (
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
              {listForHigherStudiesData.slice(0, 5).map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-4 text-gray-600">{item.category}</td>
                  <td className="py-2 px-4 text-center text-gray-600">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {listForHigherStudiesData.length > 5 && (
          <button
            onClick={() => setShowFieldOfStudyModal(true)}
            className="mt-4 px-4 py-2 text-red-800 rounded text-xs font-medium hover:underline transition"
          >
            View All ({listForHigherStudiesData.length})
          </button>
        )}
      </div>

      {/* Modals */}
      <CurrentWorkModal
        isOpen={showCurrentWorkModal}
        onClose={() => setShowCurrentWorkModal(false)}
        data={currentWorkplaceData}
      />

      <CurrentPositionModal
        isOpen={showCurrentPositionModal}
        onClose={() => setShowCurrentPositionModal(false)}
        data={currentPositionData}
      />

      <FieldOfStudyModal
        isOpen={showFieldOfStudyModal}
        onClose={() => setShowFieldOfStudyModal(false)}
        data={listForHigherStudiesData}
      />

    </div>
  );
}
