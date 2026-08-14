import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const COLORS = [
    "#22c55e",
    "#f59e0b",
];
function TaskPieChart({
    tasks,
}) {
    const data = [
        {
            name: "Completed",
            value: tasks.filter(
               task => 
                task.status === "Completed"
            ).length,
        },
        {
            name: "Pending",
            value: tasks.filter(
                task => 
                    task.status === "Pending"
            ).length,
        },
    ];

    return(
        <div
            className="task-pie-chart"
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
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        outerRadius={90}
                    >
                        {
                            data.map(
                                (
                                    entry,
                                    index
                                ) => (
                                    <Cell
                                        key={index}
                                        fill={
                                            COLORS[index]
                                        }
                                    />
                                )
                            )
                        }
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            background: "var(--chart-tooltip-bg)",
                            border: "none",
                            borderRadius: "10px",
                            color: "var(--chart-text)",
                        }}
                        formatter={(value, name) => [
                            `${value} Tasks`,
                            name,
                        ]}
                    />
                </PieChart>
            </ResponsiveContainer>
            <div
                style = {{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    marginTop: "15px",
                }}
            >
                <span>
                    🟢 Completed
                </span>
                <span>
                    🟡 Pending
                </span>
            </div>
        </div>
    );
}

export default TaskPieChart;