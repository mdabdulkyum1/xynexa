'use client'

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const TeamList = () => {
  const teams = [
    {
      id: 1,
      name: 'Team Alpha',
      creator: 'John Doe',
      email: 'john.doe@example.com',
      image: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: 2,
      name: 'Team Beta',
      creator: 'Jane Smith',
      email: 'jane.smith@example.com',
      image: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      id: 3,
      name: 'Team Gamma',
      creator: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      image: 'https://randomuser.me/api/portraits/women/3.jpg'
    },
    {
      id: 4,
      name: 'Team Delta',
      creator: 'Bob Brown',
      email: 'bob.brown@example.com',
      image: 'https://randomuser.me/api/portraits/men/4.jpg'
    },
    {
      id: 5,
      name: 'Team Epsilon',
      creator: 'Charlie White',
      email: 'charlie.white@example.com',
      image: 'https://randomuser.me/api/portraits/men/5.jpg'
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-primary">Team List</h1>

      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team Name</TableHead>
                <TableHead>Creator</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {teams.map((team) => (
                <TableRow key={team.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={team.image} />
                        <AvatarFallback>{team.creator.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{team.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{team.creator}</TableCell>
                  <TableCell className="text-gray-500">{team.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamList;
