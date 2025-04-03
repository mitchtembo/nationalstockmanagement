import Link from "next/link"
import { Package, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NationalStockMap } from "@/components/national-stock-map"
import { ProvinceStockTable } from "@/components/province-stock-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MapPage() {
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
          <Link href="/inventory" className="text-sm font-medium text-muted-foreground">
            Inventory
          </Link>
          <Link href="/map" className="text-sm font-medium">
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
          <h1 className="text-2xl font-bold tracking-tight">National Stock Map</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Download Map Data
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full md:w-1/4 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Filter Options</CardTitle>
                <CardDescription>Refine map view by category and status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Item Category</label>
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
                  <label className="text-sm font-medium">Stock Status</label>
                  <Select defaultValue="critical">
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

                <div className="pt-2">
                  <Button className="w-full">
                    <Filter className="mr-2 h-4 w-4" />
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-red-500"></div>
                  <span className="text-sm">Critical Stock (0-25%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-amber-500"></div>
                  <span className="text-sm">Warning Stock (26-50%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-green-500"></div>
                  <span className="text-sm">Normal Stock (51-85%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Excess Stock (86%+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-gray-300"></div>
                  <span className="text-sm">No Data Available</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="w-full md:w-3/4">
            <Tabs defaultValue="map" className="space-y-4">
              <TabsList>
                <TabsTrigger value="map">Map View</TabsTrigger>
                <TabsTrigger value="table">Table View</TabsTrigger>
              </TabsList>
              <TabsContent value="map" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Zimbabwe National Stock Map</CardTitle>
                    <CardDescription>
                      Interactive map showing stock levels across provinces. Click on a province to see district
                      details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-[700px] w-full">
                      <NationalStockMap interactive={true} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="table" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Provincial Stock Levels</CardTitle>
                    <CardDescription>Detailed breakdown of stock levels by province and category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ProvinceStockTable />
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

