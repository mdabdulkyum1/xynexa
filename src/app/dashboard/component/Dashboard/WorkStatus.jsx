"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadialBarChart, RadialBar, Cell } from "recharts";

const WorkStatus = () => {
  const data = [{ value: 70 }];
  const COLORS = ["#6366F1"]; // Indigo-500

  return (
    <Card className="flex flex-col mt-10">
      <CardHeader className="items-start pb-0">
        <CardTitle className="text-lg font-semibold">Working Status</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="relative">
          <RadialBarChart
            width={250}
            height={250} 
            innerRadius={90} 
            outerRadius={110} 
            startAngle={90}
            endAngle={-162}
            data={data}
          >
            <RadialBar
              minAngle={15}
              background
              clockWise={true}
              dataKey="value"
              cornerRadius={15} // Increased corner radius
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </RadialBar>
          </RadialBarChart>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-4xl font-semibold">70%</div>
            <div className="text-sm text-gray-500">Member Working</div>
          </div>
          
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkStatus;