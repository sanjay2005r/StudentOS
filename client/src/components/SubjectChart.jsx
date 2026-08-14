import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function SubjectChart ({ subjects }) {
    return (
        <div
            style = {{
                width: "100%",
                height: 300,
                background: "var(--chart-bg)",
                padding: "20px",
                borderRadius: "12px",
                marginTop: "20px",
            }}
        >
            <ResponsiveContainer>
                <BarChart data ={subjects}>
                    <CartesianGrid 
                        stroke="var(--chart-grid)"
                        strokeDasharray="3 3" 
                    />

                    <XAxis 
                        dataKey="name"
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
                    <Bar 
                        dataKey="progress"
                        fill="#06b6d4"
                        radius={[8, 8, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default SubjectChart;