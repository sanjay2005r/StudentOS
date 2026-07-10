import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function StudyChart({ studyHours }) {
    return (
        <div
            style={{
                width: "100%",
                height: 320,
                background: "#1e293b",
                padding: "20px",
                borderRadius: "12px",
                marginTop: "20px",
            }}
        >
            <ResponsiveContainer>
                <LineChart data={studyHours}>
                    <CartesianGrid
                        stroke="#475569"
                        strokeDasharray="3 3"
                    />
                    <XAxis
                        dataKey="study_date"
                        stroke="#ffffff"
                    />
                    <YAxis
                        stroke="#ffffff"
                    />
                    <Tooltip
                        contentStyle={{
                            background: "#0f172a",
                            border: "none",
                            borderRadius: "10px",
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="hours"
                        stroke="#22c55e"
                        strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default StudyChart;