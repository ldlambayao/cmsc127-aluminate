"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Others2EntryModal from "../modals/others2";
import whySemesterEntryModal from "../modals/whySemester";
import mostHelpfulEntryModal from "../modals/mostHelpful";
import leastHelpfulEntryModal from "../modals/leastHelpful";
import notIncludedEntryModal from "../modals/notIncluded";
import beAddedEntryModal from "../modals/beAdded";
import ChallengesEntryModal from "../modals/challenges";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";

const WhySemesterEntryModal = whySemesterEntryModal;
const MostHelpfulEntryModal = mostHelpfulEntryModal;
const LeastHelpfulEntryModal = leastHelpfulEntryModal;
const NotIncludedEntryModal = notIncludedEntryModal;
const BeAddedEntryModal = beAddedEntryModal;

interface Props {
  program?: string;
}

interface Response {
  name: string;
  classOf: string;
  answer: string;
  program: string;
}

interface ModalEntry {
  category: string;
  label: string;
  count?: number;
}

// Factors & colors 
const FACTORS = [
  { key: "p4q1", label: "Family obligations", color: "#f5dede" },
  { key: "p4q2", label: "Challenges of requirements for each course", color: "#f0d0d0" },
  { key: "p4q3", label: "Volume of requirements for each course", color: "#ebb8b8" },
  { key: "p4q4", label: "Lack of access to the intended faculty", color: "#e6a0a0" },
  { key: "p4q5", label: "Work conditions/demands", color: "#e09898" },
  { key: "p4q6", label: "Financial concerns", color: "#d68080" },
  { key: "p4q7", label: "Lack of motivation", color: "#d07878" },
  { key: "p4q8", label: "Health issues", color: "#c06060" },
  { key: "p4q9", label: "Challenges about the program in general", color: "#b85050" },
  { key: "p4q10", label: "Challenges about the faculty in general", color: "#9b1d2a" },
];

const INFLUENCE_LABELS = [
  "Very Positive",
  "Positive",
  "No Influence",
  "Negative",
  "Very Negative",
  "Not Applicable",
];

const LEAVING_COLORS = ["#9b1d2a", "#f5dede"];

//  Custom donut label 
const renderDonutLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // Only render label for the first (Yes) segment
  if (props.payload.name === "Yes") {
    return (
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize={24} fontWeight={700} fill="#333">
        {(percent * 100).toFixed(0)}%
      </text>
    );
  }
  return null;
};

//  Reusable response card 
function ResponseCard({
  question,
  isHighlighted = false,
  responses,
  onViewAll,
}: {
  question: string;
  isHighlighted?: boolean;
  responses: Response[];
  onViewAll?: () => void;
}) {
  const visible = responses.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl p-7 shadow-sm">
      <p className={isHighlighted ? "text-xs font-semibold text-red-900 mb-4" : "text-xs font-semibold text-gray-800 mb-4"}>
        {question}
      </p>
      <div className="flex flex-col gap-5">
        {visible.length > 0 ? visible.map((r, i) => (
          <div key={i} className="flex flex-col gap-0.5">
            <p className="font-bold text-gray-900 text-sm">{r.name}</p>
            <p className="text-xs text-gray-500">{r.classOf}</p>
            <p className="text-sm text-gray-700">{r.answer}</p>
            <span className="inline-block px-2.5 py-0.75 bg-red-50 text-red-900 rounded-full text-xs font-bold tracking-wide self-start">{r.program}</span>
          </div>
        )) : <p className="text-sm text-gray-500">No responses yet.</p>}
      </div>
      <div className="flex justify-center mt-6 border-t border-gray-100 pt-4">
        <button className="bg-transparent border-none text-red-900 text-sm font-semibold cursor-pointer hover:text-red-800" onClick={onViewAll}>
          View Responses
        </button>
      </div>
    </div>
  );
}

export default function FactorsAcademicProgress({ program }: Props) {
  const supabase = getSupabaseBrowserClient();
  const [loading, setLoading] = useState(true);
  const [factorsData, setFactorsData] = useState<any[]>([]);
  const [leavingData, setLeavingData] = useState<any[]>([]);
  const [yearData, setYearData] = useState<any[]>([]);

  const [othersResponses, setOthersResponses] = useState<Response[]>([]);
  const [leavingWhyResponses, setLeavingWhyResponses] = useState<Response[]>([]);
  const [favoriteWhyResponses, setFavoriteWhyResponses] = useState<Response[]>([]);
  const [mostHelpfulResponses, setMostHelpfulResponses] = useState<Response[]>([]);
  const [helpfulFutureResponses, setHelpfulFutureResponses] = useState<Response[]>([]);
  const [shouldNotIncludeResponses, setShouldNotIncludeResponses] = useState<Response[]>([]);
  const [shouldBeAddedResponses, setShouldBeAddedResponses] = useState<Response[]>([]);
  const [otherChallengesResponses, setOtherChallengesResponses] = useState<Response[]>([]);

  const [isOthers2ModalOpen, setIsOthers2ModalOpen] = useState(false);
  const [isWhySemesterModalOpen, setIsWhySemesterModalOpen] = useState(false);
  const [isMostHelpfulEntryModalOpen, setIsMostHelpfulEntryModalOpen] = useState(false);
  const [isLeastHelpfulEntryModalOpen, setIsLeastHelpfulEntryModalOpen] = useState(false);
  const [isNotIncludedEntryModalOpen, setIsNotIncludedEntryModalOpen] = useState(false);
  const [isBeAddedEntryModalOpen, setIsBeAddedEntryModalOpen] = useState(false);
  const [isChallengesEntryModalOpen, setIsChallengesEntryModalOpen] = useState(false);

  const [modalData, setModalData] = useState<ModalEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = supabase
          .from("satisfaction_survey_response")
          .select(`
            p4q1, p4q2, p4q3, p4q4, p4q5, p4q6, p4q7, p4q8, p4q9, p4q10,
            p4q11, p4q12, p4q13, p4q14, p4q15, p4q16, p4q17, p4q18, p4q19, p4q20,
            alumni(
              graduation_year,
              program(program_name),
              users(fname, lname)
            )
          `);

        const { data: rawData, error } = await query;
        if (error) throw error;

        if (rawData) {
          const data = program
            ? rawData.filter((row) => (row.alumni as any)?.program?.program_name === program)
            : rawData;

          // Process Factors Data
          const formattedFactorsData = FACTORS.map(f => {
            const entry: Record<string, any> = { factor: f.label };
            INFLUENCE_LABELS.forEach(label => {
              entry[label] = data.filter(row => String((row as any)[f.key]) === label).length;
            });
            return entry;
          });
          setFactorsData(formattedFactorsData);

          // Process Leaving Data
          const yesCount = data.filter(row => (row as any).p4q12 === "Yes").length;
          const noCount = data.filter(row => (row as any).p4q12 === "No").length;
          const total = yesCount + noCount || 1;
          setLeavingData([
            { name: "Yes", value: parseFloat(((yesCount / total) * 100).toFixed(2)) },
            { name: "No", value: parseFloat(((noCount / total) * 100).toFixed(2)) },
          ]);

          // Process Favorite Year Data
          const yearCounts: Record<string, number> = {};
          data.forEach(row => {
            if ((row as any).p4q14) {
              yearCounts[(row as any).p4q14] = (yearCounts[(row as any).p4q14] || 0) + 1;
            }
          });
          setYearData(Object.entries(yearCounts).map(([year, count]) => ({ year, count })));

          // Process Responses
          const mapResponse = (key: string) => data
            .filter(row => (row as any)[key] && (row as any)[key].trim() !== "")
            .map(row => {
              const fname = (row as any).alumni?.users?.fname?.trim();
              const lname = (row as any).alumni?.users?.lname?.trim();
              const graduationYear = (row as any).alumni?.graduation_year;
              const fullName = [fname, lname].filter(Boolean).join(" ");

              return {
                name: fullName || "Anonymous",
                classOf: graduationYear ? `Class of ${graduationYear}` : "Unknown Year",
                answer: (row as any)[key],
                program: (row as any).alumni?.program?.program_name || "Unknown Program"
              };
            });

          setOthersResponses(mapResponse("p4q11"));
          setLeavingWhyResponses(mapResponse("p4q13"));
          setFavoriteWhyResponses(mapResponse("p4q15"));
          setMostHelpfulResponses(mapResponse("p4q16"));
          setHelpfulFutureResponses(mapResponse("p4q17"));
          setShouldNotIncludeResponses(mapResponse("p4q18"));
          setShouldBeAddedResponses(mapResponse("p4q19"));
          setOtherChallengesResponses(mapResponse("p4q20"));
        }
      } catch (err) {
        console.error("Error fetching factors data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [program, supabase]);

  const influenceColors = ["#7a1a23", "#9b1d2a", "#d07878", "#e8b4b4", "#f5dede", "#e0e0e0"];

  const openModal = (responses: Response[], setOpen: (open: boolean) => void) => {
    setModalData(responses.map(r => ({ label: r.name, category: r.answer })));
    setOpen(true);
  };

  if (loading) return <div className="p-8 text-center text-gray-500 text-sm">Loading...</div>;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-red-900 m-0 border-b-2 border-gray-200 pb-2.5">Factors that might have affected your academic progress</h2>

      {/*  Card 1: Factors Chart  */}
      <div className="bg-white rounded-2xl p-7 shadow-sm flex flex-col">
        <p className="text-xs font-semibold text-gray-800 mb-4">
          Please indicate how the following factors might have influenced your progress toward the BSAM degree.
        </p>
        <div className="flex-grow">
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={factorsData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 150, bottom: 10 }}
              barCategoryGap="20%"
            >
              <CartesianGrid horizontal={false} stroke="#f0f0f0" />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#aaa" }}
                allowDecimals={false}
              />
              <YAxis
                type="category"
                dataKey="factor"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#555" }}
                width={140}
              />
              <Tooltip
                cursor={{ fill: "rgba(0,0,0,0.03)" }}
                contentStyle={{ borderRadius: "8px", border: "1px solid #eee", fontSize: "11px" }}
                labelStyle={{ color: "#1a1a1a", fontWeight: 600, marginBottom: "4px" }}
                itemStyle={{ color: "#333" }}
              />
              <Legend
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
                iconType="square"
                iconSize={10}
                wrapperStyle={{ fontSize: "11px", color: "#555", paddingTop: "20px" }}
              />
              {INFLUENCE_LABELS.map((label, index) => (
                <Bar
                  key={label}
                  dataKey={label}
                  stackId="a"
                  fill={influenceColors[index]}
                  radius={index === 0 ? [0, 0, 0, 0] : (index === INFLUENCE_LABELS.length - 1 ? [0, 4, 4, 0] : [0, 0, 0, 0])}
                  maxBarSize={25}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center mt-4 border-t border-gray-100 pt-4">
          <button className="bg-transparent border-none text-red-900 text-sm font-semibold cursor-pointer hover:text-red-800" onClick={() => openModal(othersResponses, setIsOthers2ModalOpen)}>
            View Others
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        {/* Donut chart */}
        <div className="flex-1 bg-white rounded-2xl p-7 shadow-sm min-w-0 flex flex-col">
          <p className="text-xs font-semibold text-gray-800 mb-4">Did you consider leaving the program?</p>
          <div className="flex-1 flex items-center justify-center" style={{ minHeight: "300px" }}>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={leavingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={75}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  labelLine={false}
                  label={renderDonutLabel}
                >
                  {leavingData.map((_, i) => (
                    <Cell key={i} fill={LEAVING_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => `${value}%`}
                  contentStyle={{ borderRadius: "8px", border: "1px solid #eee", fontSize: "12px" }}
                  labelStyle={{ color: "#1a1a1a", fontWeight: 600, marginBottom: "4px" }}
              itemStyle={{ color: "#333" }}
                />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  iconType="square"
                  iconSize={10}
                  wrapperStyle={{ fontSize: "12px", color: "#555" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-6 border-t border-gray-100 pt-4">
            <button className="bg-transparent border-none text-red-900 text-sm font-semibold cursor-pointer hover:text-red-800" onClick={() => openModal(leavingWhyResponses, setIsWhySemesterModalOpen)}>
              View Why
            </button>
          </div>
        </div>

        {/* Favorite year/semester bar chart */}
        <div className="flex-1 bg-white rounded-2xl p-7 shadow-sm min-w-0 flex flex-col">
          <p className="text-xs font-semibold text-gray-800 mb-4">What is your favorite year and semester?</p>
          <div className="flex-1 flex items-center justify-center" style={{ minHeight: "300px" }}>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={yearData}
                margin={{ top: 10, right: 10, left: 10, bottom: 60 }}
                barCategoryGap="25%"
              >
                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 10, fill: "#888" }}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  interval={0}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#888" }}
                  allowDecimals={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(216,154,154,0.10)" }}
                  contentStyle={{ borderRadius: "8px", border: "1px solid #eee", fontSize: "12px" }}
                  labelStyle={{ color: "#1a1a1a", fontWeight: 600, marginBottom: "4px" }}
                  itemStyle={{ color: "#333" }}
                />
                <Bar dataKey="count" fill="#D89A9A" radius={[8, 8, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-6 border-t border-gray-100 pt-4">
            <button className="bg-transparent border-none text-red-900 text-sm font-semibold cursor-pointer hover:text-red-800" onClick={() => openModal(favoriteWhyResponses, setIsWhySemesterModalOpen)}>
              View Why
            </button>
          </div>
        </div>
      </div>

      <ResponseCard
        question="What course/subject/topic do you think will be most helpful in your future endeavors?"
        responses={mostHelpfulResponses}
        onViewAll={() => openModal(mostHelpfulResponses, setIsMostHelpfulEntryModalOpen)}
      />

      <ResponseCard
        question="What course/subject/topic do you think will be helpful in your future endeavors?"
        responses={helpfulFutureResponses}
        onViewAll={() => openModal(helpfulFutureResponses, setIsLeastHelpfulEntryModalOpen)}
      />

      <ResponseCard
        question="What course/subject/topic do you think should not be included in the program?"
        responses={shouldNotIncludeResponses}
        onViewAll={() => openModal(shouldNotIncludeResponses, setIsNotIncludedEntryModalOpen)}
      />

      <ResponseCard
        question="What course/subject/topic do you think should be added to the program?"
        responses={shouldBeAddedResponses}
        onViewAll={() => openModal(shouldBeAddedResponses, setIsBeAddedEntryModalOpen)}
      />

      <ResponseCard
        question="What other specific challenges did you encounter in finishing the program?"
        isHighlighted
        responses={otherChallengesResponses}
        onViewAll={() => openModal(otherChallengesResponses, setIsChallengesEntryModalOpen)}
      />

      {/* Modals */}
      <Others2EntryModal isOpen={isOthers2ModalOpen} onClose={() => setIsOthers2ModalOpen(false)} data={modalData} />
      <WhySemesterEntryModal isOpen={isWhySemesterModalOpen} onClose={() => setIsWhySemesterModalOpen(false)} data={modalData} />
      <MostHelpfulEntryModal isOpen={isMostHelpfulEntryModalOpen} onClose={() => setIsMostHelpfulEntryModalOpen(false)} data={modalData} />
      <LeastHelpfulEntryModal isOpen={isLeastHelpfulEntryModalOpen} onClose={() => setIsLeastHelpfulEntryModalOpen(false)} data={modalData} />
      <NotIncludedEntryModal isOpen={isNotIncludedEntryModalOpen} onClose={() => setIsNotIncludedEntryModalOpen(false)} data={modalData} />
      <BeAddedEntryModal isOpen={isBeAddedEntryModalOpen} onClose={() => setIsBeAddedEntryModalOpen(false)} data={modalData} />
      <ChallengesEntryModal isOpen={isChallengesEntryModalOpen} onClose={() => setIsChallengesEntryModalOpen(false)} data={modalData} />

    </section>
  );
}
