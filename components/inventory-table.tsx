"use client"

import { useState } from "react"
import { Edit, MoreHorizontal, Trash, FileDown } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Sample data - in a real app, this would come from a database
const inventoryData = {
  all: [
    {
      id: "INV001",
      name: "Surgical Masks",
      category: "supplies",
      quantity: 15,
      unit: "box",
      expiryDate: "N/A",
      location: "Harare Central Hospital",
      province: "Harare",
      district: "Harare Central",
      status: "critical",
    },
    {
      id: "INV002",
      name: "Nitrile Gloves (M)",
      category: "supplies",
      quantity: 20,
      unit: "box",
      expiryDate: "N/A",
      location: "Parirenyatwa Hospital",
      province: "Harare",
      district: "Harare Central",
      status: "critical",
    },
    {
      id: "INV003",
      name: "Amoxicillin 500mg",
      category: "medications",
      quantity: 150,
      unit: "tablet",
      expiryDate: "2025-05-15",
      location: "Gweru Provincial Hospital",
      province: "Midlands",
      district: "Gweru",
      status: "warning",
    },
    {
      id: "INV004",
      name: "Blood Pressure Monitor",
      category: "equipment",
      quantity: 8,
      unit: "unit",
      expiryDate: "N/A",
      location: "Mutare Provincial Hospital",
      province: "Manicaland",
      district: "Mutare",
      status: "normal",
    },
    {
      id: "INV005",
      name: "Gauze Pads 4x4",
      category: "supplies",
      quantity: 45,
      unit: "pack",
      expiryDate: "N/A",
      location: "Chitungwiza Central Hospital",
      province: "Harare",
      district: "Chitungwiza",
      status: "warning",
    },
    {
      id: "INV006",
      name: "Insulin",
      category: "medications",
      quantity: 30,
      unit: "vial",
      expiryDate: "2025-03-10",
      location: "Mpilo Central Hospital",
      province: "Bulawayo",
      district: "Bulawayo Central",
      status: "normal",
    },
    {
      id: "INV007",
      name: "Disposable Syringes",
      category: "supplies",
      quantity: 200,
      unit: "unit",
      expiryDate: "N/A",
      location: "Masvingo Provincial Hospital",
      province: "Masvingo",
      district: "Masvingo City",
      status: "normal",
    },
    {
      id: "INV008",
      name: "Stethoscope",
      category: "equipment",
      quantity: 12,
      unit: "unit",
      expiryDate: "N/A",
      location: "United Bulawayo Hospitals",
      province: "Bulawayo",
      district: "Bulawayo East",
      status: "normal",
    },
    {
      id: "INV009",
      name: "Ibuprofen 200mg",
      category: "medications",
      quantity: 300,
      unit: "tablet",
      expiryDate: "2026-01-20",
      location: "Bindura Provincial Hospital",
      province: "Mashonaland Central",
      district: "Bindura",
      status: "normal",
    },
    {
      id: "INV010",
      name: "Surgical Sutures",
      category: "supplies",
      quantity: 75,
      unit: "pack",
      expiryDate: "2025-08-30",
      location: "Victoria Falls Hospital",
      province: "Matabeleland North",
      district: "Hwange",
      status: "normal",
    },
    {
      id: "INV011",
      name: "Malaria Test Kits",
      category: "supplies",
      quantity: 8,
      unit: "box",
      expiryDate: "2025-06-15",
      location: "Hwange District Hospital",
      province: "Matabeleland North",
      district: "Hwange",
      status: "critical",
    },
    {
      id: "INV012",
      name: "Polio Vaccines",
      category: "vaccines",
      quantity: 120,
      unit: "vial",
      expiryDate: "2025-04-10",
      location: "Masvingo Provincial Hospital",
      province: "Masvingo",
      district: "Masvingo City",
      status: "warning",
    },
  ],
  medications: [
    {
      id: "INV003",
      name: "Amoxicillin 500mg",
      category: "medications",
      quantity: 150,
      unit: "tablet",
      expiryDate: "2025-05-15",
      location: "Gweru Provincial Hospital",
      province: "Midlands",
      district: "Gweru",
      status: "warning",
    },
    {
      id: "INV006",
      name: "Insulin",
      category: "medications",
      quantity: 30,
      unit: "vial",
      expiryDate: "2025-03-10",
      location: "Mpilo Central Hospital",
      province: "Bulawayo",
      district: "Bulawayo Central",
      status: "normal",
    },
    {
      id: "INV009",
      name: "Ibuprofen 200mg",
      category: "medications",
      quantity: 300,
      unit: "tablet",
      expiryDate: "2026-01-20",
      location: "Bindura Provincial Hospital",
      province: "Mashonaland Central",
      district: "Bindura",
      status: "normal",
    },
  ],
  supplies: [
    {
      id: "INV001",
      name: "Surgical Masks",
      category: "supplies",
      quantity: 15,
      unit: "box",
      expiryDate: "N/A",
      location: "Harare Central Hospital",
      province: "Harare",
      district: "Harare Central",
      status: "critical",
    },
    {
      id: "INV002",
      name: "Nitrile Gloves (M)",
      category: "supplies",
      quantity: 20,
      unit: "box",
      expiryDate: "N/A",
      location: "Parirenyatwa Hospital",
      province: "Harare",
      district: "Harare Central",
      status: "critical",
    },
    {
      id: "INV005",
      name: "Gauze Pads 4x4",
      category: "supplies",
      quantity: 45,
      unit: "pack",
      expiryDate: "N/A",
      location: "Chitungwiza Central Hospital",
      province: "Harare",
      district: "Chitungwiza",
      status: "warning",
    },
    {
      id: "INV007",
      name: "Disposable Syringes",
      category: "supplies",
      quantity: 200,
      unit: "unit",
      expiryDate: "N/A",
      location: "Masvingo Provincial Hospital",
      province: "Masvingo",
      district: "Masvingo City",
      status: "normal",
    },
    {
      id: "INV010",
      name: "Surgical Sutures",
      category: "supplies",
      quantity: 75,
      unit: "pack",
      expiryDate: "2025-08-30",
      location: "Victoria Falls Hospital",
      province: "Matabeleland North",
      district: "Hwange",
      status: "normal",
    },
    {
      id: "INV011",
      name: "Malaria Test Kits",
      category: "supplies",
      quantity: 8,
      unit: "box",
      expiryDate: "2025-06-15",
      location: "Hwange District Hospital",
      province: "Matabeleland North",
      district: "Hwange",
      status: "critical",
    },
  ],
  equipment: [
    {
      id: "INV004",
      name: "Blood Pressure Monitor",
      category: "equipment",
      quantity: 8,
      unit: "unit",
      expiryDate: "N/A",
      location: "Mutare Provincial Hospital",
      province: "Manicaland",
      district: "Mutare",
      status: "normal",
    },
    {
      id: "INV008",
      name: "Stethoscope",
      category: "equipment",
      quantity: 12,
      unit: "unit",
      expiryDate: "N/A",
      location: "United Bulawayo Hospitals",
      province: "Bulawayo",
      district: "Bulawayo East",
      status: "normal",
    },
  ],
  vaccines: [
    {
      id: "INV012",
      name: "Polio Vaccines",
      category: "vaccines",
      quantity: 120,
      unit: "vial",
      expiryDate: "2025-04-10",
      location: "Masvingo Provincial Hospital",
      province: "Masvingo",
      district: "Masvingo City",
      status: "warning",
    },
  ],
}

interface InventoryTableProps {
  category?: "medications" | "supplies" | "equipment" | "vaccines"
}

export function InventoryTable({ category = "all" }: InventoryTableProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const data = category === "all" ? inventoryData.all : inventoryData[category]

  // Calculate pagination
  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage)

  const toggleItem = (id: string) => {
    setSelectedItems((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  const toggleAll = () => {
    setSelectedItems((current) => (current.length === paginatedData.length ? [] : paginatedData.map((item) => item.id)))
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedItems.length === paginatedData.length && paginatedData.length > 0}
                  onCheckedChange={toggleAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Province</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => toggleItem(item.id)}
                    aria-label={`Select ${item.name}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell className="capitalize">{item.category}</TableCell>
                <TableCell className="text-right">
                  {item.quantity} {item.unit}
                </TableCell>
                <TableCell>{item.expiryDate}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.province}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.status === "critical" ? "destructive" : item.status === "warning" ? "outline" : "secondary"
                    }
                    className={item.status === "warning" ? "border-amber-500 text-amber-500" : ""}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileDown className="mr-2 h-4 w-4" />
                        Export
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
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

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) setCurrentPage(currentPage - 1)
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage(i + 1)
                  }}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                }}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <div className="text-xs text-muted-foreground">
        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, data.length)} of {data.length} items
      </div>
    </div>
  )
}

