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

const chartData = [
  { name: 'Total Task', value: 123, fill: '#A78BFA' },
  { name: 'Running', value: 75, fill: '#60A5FA' }, 
  { name: 'Pending', value: 78, fill: '#F87171' }, 
];

const chartConfig = {
  totalTask: {
    label: "Total Task",
    color: "#6366F1",
  },
  running: {
    label: "Running",
    color: "#60A5FA",
  },
  pending: {
    label: "Pending",
    color: "#F87171",
  },
};

const TaskPercent = () => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Task Percentage</CardTitle>
        <CardDescription>Total Task: 1234, Running: 8, Pending: 2</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
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
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
        
          Trending up by 0% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing task status.
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskPercent;