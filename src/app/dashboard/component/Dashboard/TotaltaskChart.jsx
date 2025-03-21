"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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

const chartData = [
  { month: "January", Task: 186, Member: 80 },
  { month: "February", Task: 305, Member: 200 },
  { month: "March", Task: 237, Member: 120 },
  { month: "April", Task: 73, Member: 190 },
  { month: "May", Task: 209, Member: 130 },
  { month: "June", Task: 214, Member: 140 },
]

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

const TotalTaskChart = () => {
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
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="Task"
              type="monotone"
              stroke={chartConfig.Task.color} 
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="Member"
              type="monotone"
              stroke={chartConfig.Member.color}
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TotalTaskChart;