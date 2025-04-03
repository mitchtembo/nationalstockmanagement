"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export function AddItemForm() {
  const router = useRouter()
  const [date, setDate] = useState<Date>()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save the data to a database
    // For demo purposes, we'll just navigate back to the inventory page
    router.push("/inventory")
  }

  return (
    <Form>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            name="name"
            render={() => (
              <FormItem>
                <FormLabel>Item Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter item name" />
                </FormControl>
                <FormDescription>The full name of the inventory item.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="category"
            render={() => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="medications">Medications</SelectItem>
                    <SelectItem value="supplies">Medical Supplies</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                    <SelectItem value="disposables">Disposables</SelectItem>
                    <SelectItem value="ppe">PPE</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>The category this item belongs to.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="quantity"
            render={() => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" min="0" placeholder="0" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="unit"
            render={() => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <Select>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="unit">Unit</SelectItem>
                    <SelectItem value="box">Box</SelectItem>
                    <SelectItem value="pack">Pack</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="vial">Vial</SelectItem>
                    <SelectItem value="bottle">Bottle</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>The unit of measurement.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="expiryDate"
            render={() => (
              <FormItem className="flex flex-col">
                <FormLabel>Expiry Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !date && "text-muted-foreground")}
                      >
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormDescription>Leave blank for items without an expiry date.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="location"
            render={() => (
              <FormItem>
                <FormLabel>Storage Location</FormLabel>
                <Select>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="storage_a">Storage Room A</SelectItem>
                    <SelectItem value="storage_b">Storage Room B</SelectItem>
                    <SelectItem value="pharmacy">Pharmacy</SelectItem>
                    <SelectItem value="refrigerator_1">Refrigerator 1</SelectItem>
                    <SelectItem value="exam_room_1">Exam Room 1</SelectItem>
                    <SelectItem value="exam_room_2">Exam Room 2</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Where this item is stored.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="notes"
          render={() => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Add any additional information about this item" className="min-h-[100px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.push("/inventory")}>
            Cancel
          </Button>
          <Button type="submit">Save Item</Button>
        </div>
      </form>
    </Form>
  )
}

