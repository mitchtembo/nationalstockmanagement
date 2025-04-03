import Link from "next/link"
import { Package, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AddItemForm } from "@/components/add-item-form"

export default function AddItemPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6" />
          <span className="text-lg font-semibold">MedStock</span>
        </div>
        <nav className="ml-auto flex items-center gap-4 md:gap-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground">
            Dashboard
          </Link>
          <Link href="/inventory" className="text-sm font-medium">
            Inventory
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
        <div className="flex items-center gap-2">
          <Link href="/inventory">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold md:text-2xl">Add New Inventory Item</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
            <CardDescription>Enter the details of the new inventory item.</CardDescription>
          </CardHeader>
          <CardContent>
            <AddItemForm />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

