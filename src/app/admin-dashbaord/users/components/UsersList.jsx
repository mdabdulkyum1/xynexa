'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2';

const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', plan: 'Pro', joined: '2023-01-15', lastActive: '2024-04-26', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Member', status: 'Active', plan: 'Starter', joined: '2023-03-22', lastActive: '2024-04-20', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Admin', status: 'Inactive', plan: 'Premium', joined: '2022-11-10', lastActive: '2024-04-24', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'Member', status: 'Active', plan: 'Pro', joined: '2024-01-05', lastActive: '2024-04-25', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { id: 5, name: 'Chris Brown', email: 'chris@example.com', role: 'Admin', status: 'Inactive', plan: 'Starter', joined: '2023-06-17', lastActive: '2024-04-22', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
];

export default function UsersList() {
  const [users, setUsers] = useState(initialUsers);

  const handleRoleChange = (id, newRole) => {
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
  };

  const handlePlanChange = (id, newPlan) => {
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, plan: newPlan } : user
    );
    setUsers(updatedUsers);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const filteredUsers = users.filter(user => user.id !== id);
        setUsers(filteredUsers);
        Swal.fire('Deleted!', 'The user has been deleted.', 'success');
      }
    });
  };

  const getPlanBadgeColor = (plan) => {
    switch (plan) {
      case 'Starter':
        return 'bg-gray-100 text-gray-700';
      case 'Pro':
        return 'bg-blue-100 text-blue-700';
      case 'Premium':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return '';
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-primary">Xynexa Member List</h1>
      <Card>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Select value={user.role} onValueChange={(value) => handleRoleChange(user.id, value)}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Member">Member</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getPlanBadgeColor(user.plan)}>
                      {user.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.joined}</TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
