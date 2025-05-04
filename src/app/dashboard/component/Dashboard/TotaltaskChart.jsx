"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, Tooltip, XAxis } from "recharts"

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
} from "@/components/ui/chart"

const chartConfig = {
    Task: {
        label: "Task",
        color: "rgb(168 85 247)",
    },
    Member: {
        label: "Member",
        color: "rgb(147 197 253)",
    },
}

// Custom Tooltip Content Component
const CustomTooltipContent = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-2 bg-white border rounded shadow-md text-sm">
                <p className="font-semibold">{label}</p>
                {payload.map((item) => (
                    <p key={item.dataKey} style={{ color: item.color }}>
                        {item.name}: {item.value}
                    </p>
                ))}
                {payload[0]?.payload?.teamName && (
                    <p className="mt-1 text-gray-600">Team: {payload[0].payload.teamName}</p>
                )}
            </div>
        );
    }

    return null;
};

const TotalTaskChart = ({ summary }) => {
    console.log(summary?.teamSummaries);

    const hasData = summary?.teamSummaries && summary.teamSummaries.length > 0;

    const chartData = hasData
        ? summary?.teamSummaries?.map((item) => ({
            month: item?.month || '',
            Task: item?.totalTasks || 0,
            Member: item?.totalMembers || 0,
            teamName: item?.teamName || 'N/A',
        })) || []
        : [];

    return (
        <Card className="">
            <CardHeader className="flex flex-col items-start gap-1">
                <CardTitle className="text-xl font-semibold">Total work</CardTitle>
                <div className="flex items-center justify-between w-full">
                    <CardDescription>Tasks</CardDescription>
                    <div className="flex items-center gap-2">
                        <span className="text-sm">Monthly</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {hasData ? (
                    <ChartContainer config={chartConfig}>
                        <LineChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="teamName" 
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                
                            />
                            <Tooltip content={<CustomTooltipContent />} />
                            <Line
                                dataKey="Task"
                                type="monotone"
                                stroke={chartConfig.Task.color}
                                strokeWidth={2}
                                dot={true}
                                name="Tasks"
                            />
                            <Line
                                dataKey="Member"
                                type="monotone"
                                stroke={chartConfig.Member.color}
                                strokeWidth={2}
                                dot={true}
                                name="Members"
                            />
                        </LineChart>
                    </ChartContainer>
                ) : (
                    <div className="flex justify-center items-center h-32 text-gray-500">
                        No data available.
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            {hasData && (
                                <>
                                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                                </>
                            )}
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            {hasData
                                ? "Showing total visitors for the last 6 months"
                                : "No data available."}
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};

export default TotalTaskChart;