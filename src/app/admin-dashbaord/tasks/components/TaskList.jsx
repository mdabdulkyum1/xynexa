'use client'

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const TaskList = () => {
  const tasks = [
    {
      id: 1,
      name: 'Design Landing Page',
      creator: 'John Doe',
      email: 'john.doe@example.com',
      remainingTime: '3 days',
      createdAt: '2025-04-27',
      image: 'https://randomuser.me/api/portraits/men/11.jpg'
    },
    {
      id: 2,
      name: 'Fix Login Bug',
      creator: 'Jane Smith',
      email: 'jane.smith@example.com',
      remainingTime: '1 day',
      createdAt: '2025-04-28',
      image: 'https://randomuser.me/api/portraits/women/12.jpg'
    },
    {
      id: 3,
      name: 'Prepare Presentation',
      creator: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      remainingTime: '5 days',
      createdAt: '2025-04-26',
      image: 'https://randomuser.me/api/portraits/women/13.jpg'
    },
    {
      id: 4,
      name: 'Database Migration',
      creator: 'Bob Brown',
      email: 'bob.brown@example.com',
      remainingTime: '2 days',
      createdAt: '2025-04-27',
      image: 'https://randomuser.me/api/portraits/men/14.jpg'
    },
    {
      id: 5,
      name: 'Deploy to Production',
      creator: 'Charlie White',
      email: 'charlie.white@example.com',
      remainingTime: 'Today',
      createdAt: '2025-04-29',
      image: 'https://randomuser.me/api/portraits/men/15.jpg'
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-primary">Task Lists All</h1>

      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task Name</TableHead>
                <TableHead>Creator</TableHead>
                <TableHead>Remaining Time</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={task.image} />
                        <AvatarFallback>{task.creator.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{task.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{task.creator}</TableCell>
                  <TableCell className="text-gray-600">{task.remainingTime}</TableCell>
                  <TableCell className="text-gray-600">{task.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskList;
