import { AlertCircle, Clock, ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface StockAlertsProps {
  showAll?: boolean
}

export function StockAlerts({ showAll = false }: StockAlertsProps) {
  const criticalAlerts = [
    {
      id: 1,
      type: "low",
      severity: "critical",
      item: "Surgical Masks",
      location: "Harare Central Hospital",
      province: "Harare",
      district: "Harare Central",
      remaining: 15,
      unit: "boxes",
    },
    {
      id: 2,
      type: "low",
      severity: "critical",
      item: "Nitrile Gloves (M)",
      location: "Parirenyatwa Hospital",
      province: "Harare",
      district: "Harare Central",
      remaining: 20,
      unit: "boxes",
    },
    {
      id: 3,
      type: "low",
      severity: "critical",
      item: "Malaria Test Kits",
      location: "Hwange District Hospital",
      province: "Matabeleland North",
      district: "Hwange",
      remaining: 8,
      unit: "boxes",
    },
    {
      id: 4,
      type: "expiry",
      severity: "critical",
      item: "Insulin",
      location: "Mutare Provincial Hospital",
      province: "Manicaland",
      district: "Mutare",
      expiry: "7 days",
    },
    {
      id: 5,
      type: "low",
      severity: "warning",
      item: "Amoxicillin 500mg",
      location: "Gweru Provincial Hospital",
      province: "Midlands",
      district: "Gweru",
      remaining: 150,
      unit: "tablets",
    },
    {
      id: 6,
      type: "expiry",
      severity: "warning",
      item: "Polio Vaccines",
      location: "Masvingo Provincial Hospital",
      province: "Masvingo",
      district: "Masvingo City",
      expiry: "30 days",
    },
    {
      id: 7,
      type: "low",
      severity: "warning",
      item: "Gauze Pads 4x4",
      location: "Chitungwiza Central Hospital",
      province: "Harare",
      district: "Chitungwiza",
      remaining: 45,
      unit: "packs",
    },
  ]

  const displayAlerts = showAll ? criticalAlerts : criticalAlerts.slice(0, 4)

  return (
    <div className="space-y-4">
      {displayAlerts.map((alert) => (
        <Card
          key={alert.id}
          className={`${
            alert.severity === "critical"
              ? "border-red-200 bg-red-50 dark:bg-red-950/10"
              : "border-amber-200 bg-amber-50 dark:bg-amber-950/10"
          }`}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              {alert.type === "low" ? (
                <AlertCircle
                  className={`mt-1 h-5 w-5 ${alert.severity === "critical" ? "text-red-600" : "text-amber-600"}`}
                />
              ) : (
                <Clock
                  className={`mt-1 h-5 w-5 ${alert.severity === "critical" ? "text-red-600" : "text-amber-600"}`}
                />
              )}
              <div className="grid gap-1">
                <div className={`font-semibold ${alert.severity === "critical" ? "text-red-600" : "text-amber-600"}`}>
                  {alert.type === "low" ? "Low Stock Alert" : "Expiring Soon"}
                </div>
                <div className={`text-sm ${alert.severity === "critical" ? "text-red-600/90" : "text-amber-600/90"}`}>
                  {alert.item} -{" "}
                  {alert.type === "low" ? `${alert.remaining} ${alert.unit} remaining` : `Expires in ${alert.expiry}`}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {alert.location}, {alert.district}, {alert.province}
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Badge
                    variant="outline"
                    className={`${
                      alert.severity === "critical" ? "border-red-200 text-red-600" : "border-amber-200 text-amber-600"
                    }`}
                  >
                    {alert.severity === "critical" ? "Critical" : "Warning"}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className={`h-7 ${
                      alert.severity === "critical" ? "border-red-200 text-red-600" : "border-amber-200 text-amber-600"
                    }`}
                  >
                    {alert.type === "low" ? "Reorder" : "Review"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {!showAll && (
        <>
          <Separator />
          <div className="text-center text-sm text-muted-foreground">
            <Button variant="link" size="sm" className="h-auto p-0">
              View all alerts
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

