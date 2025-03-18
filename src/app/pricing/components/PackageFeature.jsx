import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { CircleX, CircleCheckBig } from "lucide-react";
  import React from "react";
  
  const PackageFeature = () => {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-xl md:text-4xl lg:text-5xl font-bold text-center mb-3">
          Smart solutions, unbeatable prices
        </h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Key Features</TableHead>
              <TableHead className="text-center font-bold uppercase">Free</TableHead>
              <TableHead className="text-center font-bold uppercase">Diamond</TableHead>
              <TableHead className="text-center font-bold uppercase">Platinum</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold">Projects</TableCell>
              <TableCell className="text-center">5</TableCell>
              <TableCell className="text-center">10</TableCell>
              <TableCell className="text-center">20</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Teams</TableCell>
              <TableCell className="text-center">10</TableCell>
              <TableCell className="text-center">30</TableCell>
              <TableCell className="text-center">50</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Tasks</TableCell>
              <TableCell className="text-center">50</TableCell>
              <TableCell className="text-center">100</TableCell>
              <TableCell className="text-center">500</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Meetings</TableCell>
              <TableCell className="text-center">
                <CircleX className="text-red-500 inline-block" />
              </TableCell>
              <TableCell className="text-center">
                <CircleX className="text-red-500 inline-block" />
              </TableCell>
              <TableCell className="text-center">
                <CircleCheckBig className="text-green-500 inline-block" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Group Chat</TableCell>
              <TableCell className="text-center">
                <CircleX className="text-red-500 inline-block" />
              </TableCell>
              <TableCell className="text-center">
                <CircleCheckBig className="text-green-500 inline-block" />
              </TableCell>
              <TableCell className="text-center">
                <CircleCheckBig className="text-green-500 inline-block" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Canvas</TableCell>
              <TableCell className="text-center">
                <CircleX className="text-red-500 inline-block" />
              </TableCell>
              <TableCell className="text-center">
                <CircleCheckBig className="text-green-500 inline-block" />
              </TableCell>
              <TableCell className="text-center">
                <CircleCheckBig className="text-green-500 inline-block" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Custom Views</TableCell>
              <TableCell className="text-center">Unlimited</TableCell>
              <TableCell className="text-center">Unlimited</TableCell>
              <TableCell className="text-center">Unlimited</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  };
  
  export default PackageFeature;
  