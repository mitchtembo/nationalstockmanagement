"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    name: "Harare",
    medications: 1250,
    supplies: 2340,
    equipment: 560,
    vaccines: 780,
  },
  {
    name: "Bulawayo",
    medications: 980,
    supplies: 1870,
    equipment: 430,
    vaccines: 620,
  },
  {
    name: "Manicaland",
    medications: 850,
    supplies: 1650,
    equipment: 380,
    vaccines: 550,
  },
  {
    name: "Mash. Central",
    medications: 720,
    supplies: 1430,
    equipment: 320,
    vaccines: 480,
  },
  {
    name: "Mash. East",
    medications: 680,
    supplies: 1350,
    equipment: 290,
    vaccines: 450,
  },
  {
    name: "Mash. West",
    medications: 750,
    supplies: 1480,
    equipment: 340,
    vaccines: 510,
  },
  {
    name: "Masvingo",
    medications: 630,
    supplies: 1250,
    equipment: 270,
    vaccines: 420,
  },
  {
    name: "Mat. North",
    medications: 580,
    supplies: 1150,
    equipment: 250,
    vaccines: 380,
  },
  {
    name: "Mat. South",
    medications: 540,
    supplies: 1070,
    equipment: 230,
    vaccines: 350,
  },
  {
    name: "Midlands",
    medications: 690,
    supplies: 1370,
    equipment: 310,
    vaccines: 470,
  },
]

export function Overview() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 justify-center">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-[var(--color-medications)]"></div>
          <span className="text-xs">Medications</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-[var(--color-supplies)]"></div>
          <span className="text-xs">Medical Supplies</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-[var(--color-equipment)]"></div>
          <span className="text-xs">Equipment</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-[var(--color-vaccines)]"></div>
          <span className="text-xs">Vaccines</span>
        </div>
      </div>

      <ChartContainer
        config={{
          medications: {
            label: "Medications",
            color: "hsl(var(--chart-1))",
          },
          supplies: {
            label: "Medical Supplies",
            color: "hsl(var(--chart-2))",
          },
          equipment: {
            label: "Equipment",
            color: "hsl(var(--chart-3))",
          },
          vaccines: {
            label: "Vaccines",
            color: "hsl(var(--chart-4))",
          },
        }}
        className="aspect-[4/3]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={70}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
              label={{ value: "Items", angle: -90, position: "insideLeft", offset: -5, fontSize: 12, fill: "#888888" }}
            />
            <ChartTooltip
              content={<ChartTooltipContent className="bg-background" valueFormatter={(value) => `${value} items`} />}
            />
            <Bar name="Medications" dataKey="medications" fill="var(--color-medications)" radius={[4, 4, 0, 0]} />
            <Bar name="Medical Supplies" dataKey="supplies" fill="var(--color-supplies)" radius={[4, 4, 0, 0]} />
            <Bar name="Equipment" dataKey="equipment" fill="var(--color-equipment)" radius={[4, 4, 0, 0]} />
            <Bar name="Vaccines" dataKey="vaccines" fill="var(--color-vaccines)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div className="text-xs text-center text-muted-foreground">
        Hover over bars to see exact quantities. Click legend items to toggle visibility.
      </div>
    </div>
  )
}

