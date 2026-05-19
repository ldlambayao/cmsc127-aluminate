"use client";

import { useState, useEffect } from "react";
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
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";

interface TextDataPoint {
  category: string;
  label: string;
}

interface LikertDataPoint {
  label: string;
  count: number
}

interface ChartDataPoint {
  name: string;
  label: string;
  count: number;
}

interface SurveyResponseRow {
  share_suggestions: string;
  satisfaction_level: string;
  satisfaction_reason: string;
  degprog_suggestions: string;
  receive_updates: string;
  interview_interest: string;
}

const satisfactionLevel5Options = [
  "Very Satisfied",
  "Satisfied",
  "Neutral",
  "Dissatisfied",
  "Very Dissatisfied"
]

export default function ProgramFeedback() {
  const supabase = getSupabaseBrowserClient();
  const [showSuggestionsModal, setShowSuggestionsModal] = useState(false);
  const [showReasonsForRatingModal, setShowReasonsForRatingModal] = useState(false);
  const [showImprovementModal, setShowImprovementModal] = useState(false);
  const [showEmailsModal, setShowEmailsModal] = useState(false);
  const [shareSuggestionsData, setShareSuggestionsData] = useState<TextDataPoint[]>([]);
  const [satisfactionLevelData, setSatisfactionLevelData] = useState<LikertDataPoint[]>([]);
  const [satisfactionReasonData, setSatisfactionReasonData] = useState<TextDataPoint[]>([]);
  const [degprogSuggestionsData, setDegprogSuggestionsData] = useState<TextDataPoint[]>([]);
  const [receiveUpdatesData, setReceiveUpdatesData] = useState<TextDataPoint[]>([]);
  const [interviewInterestData, setInterviewInterestData] = useState<ChartDataPoint[]>([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        // -----------
        // share suggestions data acquisition
        // -----------
        const { data: shareSuggestionsQuery, error: shareSuggestionsError } = await supabase
          .from("tracer_survey_response")
          .select("share_suggestions")

        if (shareSuggestionsError) throw shareSuggestionsError;

        const shareSuggestionsCounts: Record<string, number> = {}

        if (shareSuggestionsQuery) {
          (shareSuggestionsQuery as SurveyResponseRow[]).forEach((row) => {
            const rawValue = row.share_suggestions;

            const value = rawValue && rawValue.trim() !== "" ? rawValue : "N/A";
            if (!(value in shareSuggestionsCounts)) {
              shareSuggestionsCounts[value] = 0;
            }
            shareSuggestionsCounts[value]++;
          })
        }

        const shareSuggestionsFormatted = Object.keys(shareSuggestionsCounts).map((key) => ({
          category: key,
          label: "",
        }));

        setShareSuggestionsData(shareSuggestionsFormatted)

        // -----------
        // satisfaction level data acquisition
        // -----------
        const { data: satisfactionLevelQuery, error: satisfactionLevelError } = await supabase
          .from("tracer_survey_response")
          .select("satisfaction_level")

        if (satisfactionLevelError) throw satisfactionLevelError;

        const satisfactionLevelCounts: Record<string, number> = {}
        satisfactionLevel5Options.forEach(option => {
          satisfactionLevelCounts[option] = 0;
        });

        if(satisfactionLevelQuery) {
          (satisfactionLevelQuery as SurveyResponseRow[]).forEach((row) => {
            const value = row.satisfaction_level;

            if (value && value in satisfactionLevelCounts){
              satisfactionLevelCounts[value]++;
            }
          })
        }


        const satisfactionLevelFormatted = Object.keys(satisfactionLevelCounts).map((key) => ({
          label: key,
          count: satisfactionLevelCounts[key]
        }));

        setSatisfactionLevelData(satisfactionLevelFormatted);

        // -----------
        // satisfaction reason data acquisition
        // -----------
        const { data: satisfactionReasonQuery, error: satisfactionReasonError } = await supabase
          .from("tracer_survey_response")
          .select("satisfaction_level, satisfaction_reason")

        if (satisfactionReasonError) throw satisfactionReasonError;

        const satisfactionReasonCounts: Record<string, string> = {}

        if (satisfactionReasonQuery) {
          (satisfactionReasonQuery as SurveyResponseRow[]).forEach((row) => {
            const rate = row.satisfaction_level;
            const rawReason = row.satisfaction_reason;

            const reason = rawReason.trim() !== "" ? rawReason : "N/A";

            if (!(reason in satisfactionReasonCounts)){
              satisfactionReasonCounts[reason] = "";
            }
            if (reason && rate && reason in satisfactionReasonCounts) {
              satisfactionReasonCounts[reason] = rate;
            }
          })

        }

        const satisfactionReasonFormatted = Object.keys(satisfactionReasonCounts).map((key) => ({
          category: key,
          label: satisfactionReasonCounts[key]
        }))

        setSatisfactionReasonData(satisfactionReasonFormatted);

        // ---------
        // share suggestions data acquisition
        // ---------
        const { data: degprogSuggestionsQuery, error: degprogSuggestionsError } = await supabase
          .from("tracer_survey_response")
          .select("degprog_suggestions")

        if (degprogSuggestionsError) throw degprogSuggestionsError;

        const degprogSuggestionsCounts: Record<string, number> = {}

        if (degprogSuggestionsQuery) {
          (degprogSuggestionsQuery as SurveyResponseRow[]).forEach((row) => {
            const rawValue = row.degprog_suggestions;

            const value = rawValue.trim() !== "" ? rawValue : "N/A";
            if (value && value in degprogSuggestionsCounts) {
              degprogSuggestionsCounts[value] = 0;
            }
            degprogSuggestionsCounts[value]++;
          })
        }

        const degprogSuggestionsFormatted = Object.keys(degprogSuggestionsCounts).map((key) => ({
          category: key,
          label: ""
        }));

        setDegprogSuggestionsData(degprogSuggestionsFormatted);

        // ---------
        // receive updates data acquisition
        // ---------
        const { data: receiveUpdatesQuery, error: receiveUpdatesError } = await supabase
          .from("tracer_survey_response")
          .select("receive_updates")

        if (receiveUpdatesError) throw receiveUpdatesError;

        const receiveUpdatesCounts: Record<string, number> = {}

        if (receiveUpdatesData) {
          (receiveUpdatesQuery as SurveyResponseRow[]).forEach((row) => {
            const rawValue = row.receive_updates;

            if (rawValue.includes("@")) {
              const value = rawValue;

              if (!(value in receiveUpdatesQuery)) {
                receiveUpdatesCounts[value] = 0
              }
              receiveUpdatesCounts[value]++;
            }
          })
        }

        const receiveUpdatesFormatted = Object.keys(receiveUpdatesCounts).map((key) => ({
          category: key,
          label: ""
        }));

        setReceiveUpdatesData(receiveUpdatesFormatted);

        // ---------
        // iterview interest data acquisition
        // ---------
        const { data: interviewInterestQuery, error: interviewInterestError } = await supabase
          .from("tracer_survey_response")
          .select("interview_interest")

        if (interviewInterestError) throw interviewInterestError;

        const interviewInterestCounts: Record<string, number> = {}

        if (interviewInterestQuery) {
          (interviewInterestQuery as SurveyResponseRow[]).forEach((row) => {
            const value = row.interview_interest;

            if(!(value in interviewInterestCounts)){
              interviewInterestCounts[value] = 0;
            }
            interviewInterestCounts[value]++;
          })
        }

        const interviewInterestFormatted = Object.keys(interviewInterestCounts).map((key) => ({
          name: key,
          label: key,
          count: interviewInterestCounts[key]
        }))

        setInterviewInterestData(interviewInterestFormatted);

      } catch (err) {
        console.error("Error fetching survey metrics:", err);
      }
    }
    fetchData();
  }, [])

  return (
    <div className="mb-16">
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
              {shareSuggestionsData.slice(0, 5).map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-700">
                    <p className="truncate text-gray-600">{item.category.length > 145 ? item.category.substring(0, 145) + "..." : item.category}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {shareSuggestionsData.length > 5 && (
          <button
            onClick={() => setShowSuggestionsModal(true)}
            className="mt-4 px-4 py-2 text-red-800 rounded text-xs font-medium hover:underline transition"
          >
            View All ({shareSuggestionsData.length})
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
        <p className="text-red-900 text-sm font-medium mb-4">
          What is your level of satisfaction for your undergraduate study under the BSCS degree program?
        </p>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={satisfactionLevelData}
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
              {satisfactionReasonData.slice(0, 5).map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-700">
                    <p className="truncate text-gray-600">{item.category.length > 145 ? item.category.substring(0, 145) + "..." : item.category}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {satisfactionReasonData.length > 5 && (
          <button
            onClick={() => setShowReasonsForRatingModal(true)}
            className="mt-4 px-4 py-2 text-red-800 rounded text-xs font-medium hover:underline transition"
          >
            View All ({satisfactionReasonData.length})
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
              {degprogSuggestionsData.slice(0, 5).map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-700">
                    <p className="truncate text-gray-600">{item.category.substring(0, 145)}...</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {degprogSuggestionsData.length > 5 && (
          <button
            onClick={() => setShowImprovementModal(true)}
            className="mt-4 px-4 py-2 text-red-800 rounded text-xs font-medium hover:underline transition"
          >
            View All ({degprogSuggestionsData.length})
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
                {receiveUpdatesData.slice(0, 5).map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">
                      <p className="truncate text-gray-600">{item.category.length > 45 ? item.category.substring(0, 55) + "...": item.category}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {receiveUpdatesData.length > 5 && (
            <button
              onClick={() => setShowEmailsModal(true)}
              className="mt-4 px-4 py-2 text-red-800 rounded text-xs font-medium hover:underline transition"
            >
              View All ({receiveUpdatesData.length})
            </button>
          )}
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p className="text-red-900 text-sm font-medium mb-4">
            Would you be interested in taking part as an alumni interviewer for the review and revision of the BSCS Program?
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart data={interviewInterestData}>
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
                {interviewInterestData.map((entry, index) => (
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
        data={shareSuggestionsData}
      />

      <ReasonsForRatingModal
        isOpen={showReasonsForRatingModal}
        onClose={() => setShowReasonsForRatingModal(false)}
        data={satisfactionReasonData}
      />

      <ImprovementModal
        isOpen={showImprovementModal}
        onClose={() => setShowImprovementModal(false)}
        data={degprogSuggestionsData}
      />

      <EmailsModal
        isOpen={showEmailsModal}
        onClose={() => setShowEmailsModal(false)}
        data={receiveUpdatesData}
      />

    </div>
  );
}
