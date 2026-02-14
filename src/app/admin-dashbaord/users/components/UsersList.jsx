"use client";

import React, { useEffect } from 'react';
import useUserStore from '@/store/useUserStore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2';

export default function UsersList() {
  const { users, fetchUsers, updateUser, deleteUser, isLoading } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = async (id, newRole) => {
    try {
      await updateUser(id, { role: newRole });
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  const handlePlanChange = async (id, newPlan) => {
    try {
      await updateUser(id, { plan: newPlan });
    } catch (error) {
      console.error("Failed to update plan:", error);
    }
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(id);
          Swal.fire('Deleted!', 'The user has been deleted.', 'success');
        } catch (error) {
          Swal.fire('Error!', 'Failed to delete user.', 'error');
        }
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
                <TableRow key={user._id || user.id}>
                  <TableCell className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.image || user.imageUrl} alt={user.name || user.firstName} />
                      <AvatarFallback>{(user.name || user.firstName || 'U').charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{user.name || `${user.firstName || ''} ${user.lastName || ''}`}</span>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Select value={user.role} onValueChange={(value) => handleRoleChange(user._id || user.id, value)}>
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
                      {user.status || 'Active'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getPlanBadgeColor(user.plan || 'Starter')}>
                      {user.plan || 'Starter'}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.joined || user.createdAt?.split('T')[0] || 'N/A'}</TableCell>
                  <TableCell>{user.lastActive || 'N/A'}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(user._id || user.id)}>
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
