"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { List, LayoutGrid, MoreVertical, FileText, FileSpreadsheet, FileCode, FileArchive } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

const documents = [
  {
    name: "Annual-report-Q4-023.pdf",
    size: "1.3 MB",
    dateUploaded: "Apr 18, 2025",
    updated: "an hour ago",
    owner: {
      name: "Alex Turner",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  },
  {
    name: "Customer-satisfaction-survey-results.xlsx",
    size: "2.1 MB",
    dateUploaded: "Apr 18, 2025",
    updated: "an hour ago",
    owner: {
      name: "Ethan Reynolds",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg"
    }
  },
  {
    name: "Sales-presentation-overview.html",
    size: "1.2 MB",
    dateUploaded: "Apr 12, 2025",
    updated: "15 minutes ago",
    owner: {
      name: "Edward Whitten",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg"
    }
  },
  {
    name: "Financial-statements-Q4-2023.pdf",
    size: "1.5 MB",
    dateUploaded: "Apr 12, 2025",
    updated: "5 days ago",
    owner: {
      name: "Alex Turner",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  },
  {
    name: "Marketing-campaign-results-summary-2023.zip",
    size: "2.0 MB",
    dateUploaded: "Apr 4, 2025",
    updated: "10 days ago",
    owner: {
      name: "Ethan Reynolds",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg"
    }
  },
  {
    name: "Event-planning-documentation.zip",
    size: "2.3 MB",
    dateUploaded: "Apr 7, 2025",
    updated: "12 days ago",
    owner: {
      name: "Edward Whitten",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg"
    }
  }
]

// Function to determine the file icon based on file extension
const getFileIcon = (fileName) => {
  const extension = fileName.split(".").pop().toLowerCase()
  switch (extension) {
    case "pdf":
      return <FileText className="w-5 h-5 text-red-500" />
    case "xlsx":
      return <FileSpreadsheet className="w-5 h-5 text-green-500" />
    case "html":
      return <FileCode className="w-5 h-5 text-blue-500" />
    case "zip":
      return <FileArchive className="w-5 h-5 text-yellow-500" />
    default:
      return <FileText className="w-5 h-5 text-gray-500" />
  }
}

export default function DocumentsTable() {
  return (
    <div className="p-4 md:p-6 lg:p-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">All documents</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><List className="w-4 h-4 mr-1" /> List</Button>
          <Button variant="outline" size="sm"><LayoutGrid className="w-4 h-4 mr-1" /> Grid</Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File name</TableHead>
              <TableHead>Date uploaded</TableHead>
              <TableHead>Last updated</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc, idx) => (
              <TableRow key={idx} className="hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getFileIcon(doc.name)}
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">{doc.name}</div>
                      <div className="text-xs text-gray-500">{doc.size}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{doc.dateUploaded}</TableCell>
                <TableCell>{doc.updated}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={doc.owner.avatar} />
                      <AvatarFallback>{doc.owner.name.split(" ")[0][0]}</AvatarFallback>
                    </Avatar>
                    <span>{doc.owner.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => console.log("Update", doc.name)}>Update</DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => console.log("Delete", doc.name)}
                        className="text-red-500"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}