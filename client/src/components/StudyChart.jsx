import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function StudyChart({ studyHours, theme }) {
    return (
        <div
            className="study-chart"
            style={{
                width: "100%",
                height: 320,
                background: theme === "light" ? "#ffffff" : "#1e293b",
                padding: "20px",
                borderRadius: "12px",
                marginTop: "20px",
            }}
        >
            <ResponsiveContainer>
                <LineChart data={studyHours}>
                    <CartesianGrid
                        stroke={theme === "light" ? "#cbd5e1" : "#475569"}
                        strokeDasharray="3 3"
                    />
                    <XAxis
                        dataKey="study_date"
                        stroke = {theme === "light" ? "#0f172a" : "#ffffff"}
                    />
                    <YAxis
                        stroke = {theme === "light" ? "#0f172a" : "#ffffff"}
                    />
                    <Tooltip
                        contentStyle={{
                            background: theme === "light" ? "#ffffff" : "#0f172a",
                            color: theme === "light" ? "#0f172a" : "#ffffff",
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