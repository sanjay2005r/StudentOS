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
            className="study-chart"
            style={{
                width: "100%",
                height: 320,
                background: "var(--chart-bg)",
                padding: "20px",
                borderRadius: "12px",
                marginTop: "20px",
            }}
        >
            <ResponsiveContainer>
                <LineChart data={studyHours}>
                    <CartesianGrid
                        stroke="var(--chart-grid)"
                        strokeDasharray="3 3"
                    />
                    <XAxis
                        dataKey="study_date"
                        stroke="var(--chart-text)"
                    />
                    <YAxis
                        stroke="var(--chart-text)"
                    />
                    <Tooltip
                        contentStyle={{
                            background: "var(--chart-tooltip-bg)",
                            border: "none",
                            borderRadius: "10px",
                            color: "var(--chart-text)",
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