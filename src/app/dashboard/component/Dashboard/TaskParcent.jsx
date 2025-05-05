"use client"

import { TrendingUp } from "lucide-react"
import { LabelList, RadialBar, RadialBarChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
    totalTask: {
        label: "Total Task",
        color: "#A78BFA",
    },
    running: {
        label: "Running",
        color: "#60A5FA",
    },
    pending: {
        label: "Pending",
        color: "#F87171",
    },
    completed: {
        label: "Completed",
        color: "#009688",
    },
};

const TaskPercent = ({ summary }) => {
    const overallSummary = summary?.overallSummary || {};
    console.log(overallSummary);

    const { totalTasks, todoTasks, inProgressTasks, doneTasks } = overallSummary;

    const hasData = totalTasks !== undefined && todoTasks !== undefined && inProgressTasks !== undefined && doneTasks !== undefined;

    const chartData = hasData
        ? [
            { name: 'Total Task', value: totalTasks || 0, fill: '#A78BFA' },
            { name: 'Running', value: inProgressTasks || 0, fill: '#60A5FA' },
            { name: 'Pending', value: todoTasks || 0, fill: '#F87171' },
            { name: 'Completed', value: doneTasks || 0, fill: '#009688' },
        ]
        : [];

    const total = chartData.reduce((sum, entry) => sum + entry.value, 0);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Task Percentage</CardTitle>
                <CardDescription>
                    {hasData
                        ? `Total Task: ${totalTasks || 0}, Running: ${inProgressTasks || 0}, Pending: ${todoTasks || 0}, Completed: ${doneTasks || 0}`
                        : "This data is not available." 
                    }
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                {hasData ? (
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[350px]"
                    >
                        <RadialBarChart
                            data={chartData}
                            startAngle={90}
                            endAngle={-270}
                            innerRadius={60}
                            outerRadius={120}
                        >
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel nameKey="name" />}
                            />
                            <RadialBar dataKey="value" background>
                                <LabelList
                                    position="insideStart"
                                    dataKey="name"
                                    className="fill-white capitalize mix-blend-luminosity"
                                    fontSize={12}
                                />
                            </RadialBar>
                        </RadialBarChart>
                    </ChartContainer>
                ) : (
                    <div className="flex justify-center items-center h-32 text-gray-500">
                       No Data
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    {hasData
                        ? <>Trending up by 0% this month <TrendingUp className="h-4 w-4" /></>
                        : null
                    }
                </div>
                <div className="leading-none text-muted-foreground">
                    {hasData ? "Showing task status." : "টাস্কের কোনো ডেটা উপলব্ধ নেই।"}
                </div>
            </CardFooter>
        </Card>
    );
};

export default TaskPercent;