import Link from "next/link"
import { Package, Plus, Search, Filter, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { InventoryTable } from "@/components/inventory-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function InventoryPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6 text-emerald-600" />
          <span className="text-lg font-semibold">Zimbabwe Health Inventory</span>
        </div>
        <nav className="ml-auto flex items-center gap-4 md:gap-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground">
            Dashboard
          </Link>
          <Link href="/inventory" className="text-sm font-medium">
            Inventory
          </Link>
          <Link href="/map" className="text-sm font-medium text-muted-foreground">
            National Map
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground">
            Reports
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground">
            Settings
          </Link>
        </nav>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">National Inventory Management</h1>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem>Export as Excel</DropdownMenuItem>
                <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/inventory/add">
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search inventory..." className="w-full pl-8" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="medications">Medications</SelectItem>
                      <SelectItem value="supplies">Medical Supplies</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="vaccines">Vaccines</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="excess">Excess</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Province</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Provinces</SelectItem>
                      <SelectItem value="harare">Harare</SelectItem>
                      <SelectItem value="bulawayo">Bulawayo</SelectItem>
                      <SelectItem value="manicaland">Manicaland</SelectItem>
                      <SelectItem value="mashonaland_central">Mashonaland Central</SelectItem>
                      <SelectItem value="mashonaland_east">Mashonaland East</SelectItem>
                      <SelectItem value="mashonaland_west">Mashonaland West</SelectItem>
                      <SelectItem value="masvingo">Masvingo</SelectItem>
                      <SelectItem value="matabeleland_north">Matabeleland North</SelectItem>
                      <SelectItem value="matabeleland_south">Matabeleland South</SelectItem>
                      <SelectItem value="midlands">Midlands</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">District</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Districts</SelectItem>
                      <SelectItem value="harare_central">Harare Central</SelectItem>
                      <SelectItem value="chitungwiza">Chitungwiza</SelectItem>
                      <SelectItem value="bulawayo_central">Bulawayo Central</SelectItem>
                      <SelectItem value="gweru">Gweru</SelectItem>
                      <SelectItem value="mutare">Mutare</SelectItem>
                      <SelectItem value="masvingo_city">Masvingo City</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2">
                  <Button className="w-full">
                    <Filter className="mr-2 h-4 w-4" />
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3">
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList className="grid grid-cols-5 h-auto">
                <TabsTrigger value="all" className="py-2">
                  All Items
                </TabsTrigger>
                <TabsTrigger value="medications" className="py-2">
                  Medications
                </TabsTrigger>
                <TabsTrigger value="supplies" className="py-2">
                  Supplies
                </TabsTrigger>
                <TabsTrigger value="equipment" className="py-2">
                  Equipment
                </TabsTrigger>
                <TabsTrigger value="vaccines" className="py-2">
                  Vaccines
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="border-none p-0">
                <Card>
                  <CardHeader>
                    <CardTitle>All Inventory Items</CardTitle>
                    <CardDescription>National inventory across all provinces and districts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <InventoryTable />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="medications" className="border-none p-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Medications</CardTitle>
                    <CardDescription>Pharmaceutical inventory across all provinces and districts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <InventoryTable category="medications" />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="supplies" className="border-none p-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Medical Supplies</CardTitle>
                    <CardDescription>Medical supplies inventory across all provinces and districts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <InventoryTable category="supplies" />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="equipment" className="border-none p-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Equipment</CardTitle>
                    <CardDescription>Medical equipment inventory across all provinces and districts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <InventoryTable category="equipment" />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="vaccines" className="border-none p-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Vaccines</CardTitle>
                    <CardDescription>Vaccine inventory across all provinces and districts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <InventoryTable category="vaccines" />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

