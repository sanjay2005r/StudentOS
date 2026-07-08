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
                background: "#1e293b",
                padding: "20px",
                borderRadius: "12px",
                marginTop: "20px",
            }}
        >
            <ResponsiveContainer>
                <BarChart data ={subjects}>
                    <CartesianGrid 
                        stroke="#475569"
                        strokeDasharray="3 3" 
                    />

                    <XAxis 
                        dataKey="name"
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
                            color: "#fff",
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