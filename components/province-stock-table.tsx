"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ProvinceStockTable() {
  const [expandedProvinces, setExpandedProvinces] = useState<string[]>([])

  const toggleProvince = (provinceId: string) => {
    setExpandedProvinces((current) =>
      current.includes(provinceId) ? current.filter((id) => id !== provinceId) : [...current, provinceId],
    )
  }

  // Sample data for provinces and districts
  const provinces = [
    {
      id: "harare",
      name: "Harare",
      medications: { total: 1250, critical: 120, warning: 230, normal: 900 },
      supplies: { total: 2340, critical: 340, warning: 450, normal: 1550 },
      equipment: { total: 560, critical: 20, warning: 40, normal: 500 },
      vaccines: { total: 780, critical: 80, warning: 100, normal: 600 },
      districts: [
        {
          id: "harare_central",
          name: "Harare Central",
          medications: { total: 750, critical: 70, warning: 130, normal: 550 },
          supplies: { total: 1340, critical: 240, warning: 250, normal: 850 },
          equipment: { total: 360, critical: 10, warning: 20, normal: 330 },
          vaccines: { total: 480, critical: 50, warning: 60, normal: 370 },
        },
        {
          id: "chitungwiza",
          name: "Chitungwiza",
          medications: { total: 500, critical: 50, warning: 100, normal: 350 },
          supplies: { total: 1000, critical: 100, warning: 200, normal: 700 },
          equipment: { total: 200, critical: 10, warning: 20, normal: 170 },
          vaccines: { total: 300, critical: 30, warning: 40, normal: 230 },
        },
      ],
    },
    {
      id: "bulawayo",
      name: "Bulawayo",
      medications: { total: 980, critical: 100, warning: 180, normal: 700 },
      supplies: { total: 1870, critical: 270, warning: 350, normal: 1250 },
      equipment: { total: 430, critical: 30, warning: 50, normal: 350 },
      vaccines: { total: 620, critical: 70, warning: 90, normal: 460 },
      districts: [
        {
          id: "bulawayo_central",
          name: "Bulawayo Central",
          medications: { total: 580, critical: 60, warning: 100, normal: 420 },
          supplies: { total: 1070, critical: 170, warning: 200, normal: 700 },
          equipment: { total: 230, critical: 20, warning: 30, normal: 180 },
          vaccines: { total: 320, critical: 40, warning: 50, normal: 230 },
        },
        {
          id: "bulawayo_east",
          name: "Bulawayo East",
          medications: { total: 400, critical: 40, warning: 80, normal: 280 },
          supplies: { total: 800, critical: 100, warning: 150, normal: 550 },
          equipment: { total: 200, critical: 10, warning: 20, normal: 170 },
          vaccines: { total: 300, critical: 30, warning: 40, normal: 230 },
        },
      ],
    },
    {
      id: "manicaland",
      name: "Manicaland",
      medications: { total: 850, critical: 150, warning: 200, normal: 500 },
      supplies: { total: 1650, critical: 350, warning: 400, normal: 900 },
      equipment: { total: 380, critical: 80, warning: 100, normal: 200 },
      vaccines: { total: 550, critical: 150, warning: 150, normal: 250 },
      districts: [
        {
          id: "mutare",
          name: "Mutare",
          medications: { total: 450, critical: 100, warning: 100, normal: 250 },
          supplies: { total: 850, critical: 250, warning: 200, normal: 400 },
          equipment: { total: 180, critical: 50, warning: 50, normal: 80 },
          vaccines: { total: 250, critical: 100, warning: 75, normal: 75 },
        },
        {
          id: "chipinge",
          name: "Chipinge",
          medications: { total: 400, critical: 50, warning: 100, normal: 250 },
          supplies: { total: 800, critical: 100, warning: 200, normal: 500 },
          equipment: { total: 200, critical: 30, warning: 50, normal: 120 },
          vaccines: { total: 300, critical: 50, warning: 75, normal: 175 },
        },
      ],
    },
  ]

  const getStatusBadge = (category: any) => {
    const criticalPercentage = (category.critical / category.total) * 100

    if (criticalPercentage > 15) {
      return <Badge variant="destructive">Critical</Badge>
    } else if (criticalPercentage > 5) {
      return (
        <Badge variant="outline" className="border-amber-500 text-amber-500">
          Warning
        </Badge>
      )
    } else {
      return (
        <Badge variant="outline" className="border-green-500 text-green-500">
          Normal
        </Badge>
      )
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Province/District</TableHead>
          <TableHead>Medications</TableHead>
          <TableHead>Medical Supplies</TableHead>
          <TableHead>Equipment</TableHead>
          <TableHead>Vaccines</TableHead>
          <TableHead>Overall Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {provinces.map((province) => (
          <>
            <TableRow key={province.id} className="hover:bg-muted/50">
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 p-0 font-medium"
                  onClick={() => toggleProvince(province.id)}
                >
                  {expandedProvinces.includes(province.id) ? (
                    <ChevronDown className="mr-2 h-4 w-4" />
                  ) : (
                    <ChevronRight className="mr-2 h-4 w-4" />
                  )}
                  {province.name}
                </Button>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span>{province.medications.total} items</span>
                  <span className="text-xs text-muted-foreground">{province.medications.critical} critical</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span>{province.supplies.total} items</span>
                  <span className="text-xs text-muted-foreground">{province.supplies.critical} critical</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span>{province.equipment.total} items</span>
                  <span className="text-xs text-muted-foreground">{province.equipment.critical} critical</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span>{province.vaccines.total} items</span>
                  <span className="text-xs text-muted-foreground">{province.vaccines.critical} critical</span>
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(province.medications)}</TableCell>
            </TableRow>

            {/* District rows */}
            {expandedProvinces.includes(province.id) &&
              province.districts.map((district) => (
                <TableRow key={district.id} className="bg-muted/30">
                  <TableCell className="pl-10">{district.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{district.medications.total} items</span>
                      <span className="text-xs text-muted-foreground">{district.medications.critical} critical</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{district.supplies.total} items</span>
                      <span className="text-xs text-muted-foreground">{district.supplies.critical} critical</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{district.equipment.total} items</span>
                      <span className="text-xs text-muted-foreground">{district.equipment.critical} critical</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{district.vaccines.total} items</span>
                      <span className="text-xs text-muted-foreground">{district.vaccines.critical} critical</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(district.medications)}</TableCell>
                </TableRow>
              ))}
          </>
        ))}
      </TableBody>
    </Table>
  )
}

