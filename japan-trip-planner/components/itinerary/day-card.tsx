"use client"

import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { DayPlan } from "@/types/itinerary"
import { ActivityItem } from "./activity-item"
import { TransportSegmentCard } from "./transport-segment-card"

interface Props {
  day: DayPlan
}

export function DayCard({ day }: Props) {
  const { t } = useTranslation()

  return (
    <Card>
      {/* Day header */}
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {t("itinerary.day", { number: day.day_number })} · {day.city}
              <span className="ml-1 text-xs text-muted-foreground">
                {day.city_ja}
              </span>
            </h3>
            <p className="text-xs text-muted-foreground">{day.theme}</p>
          </div>
          <div className="text-right">
            <p className="text-[0.625rem] text-muted-foreground">{day.date}</p>
            <p className="text-xs font-medium text-foreground">
              ¥{day.daily_estimated_total_yen.toLocaleString()}
            </p>
          </div>
        </div>
        {day.morning_tip && (
          <p className="mt-1 text-[0.625rem] text-primary">
            💡 {day.morning_tip}
          </p>
        )}
        {day.weather_note && (
          <p className="mt-1 text-[0.625rem] text-muted-foreground">
            🌤 {day.weather_note}
          </p>
        )}
      </CardHeader>

      {/* Timeline */}
      <CardContent className="space-y-1">
        {day.activities.map((activity, i) => (
          <ActivityItem
            key={i}
            activity={activity}
            isLast={i === day.activities.length - 1}
          />
        ))}

        {/* Intercity transport segments */}
        {day.transport_segments.length > 0 && (
          <div className="mt-3 border-t border-border pt-3">
            <p className="mb-2 text-[0.625rem] font-medium text-muted-foreground">
              🚄 {t("itinerary.transport")}
            </p>
            {day.transport_segments.map((seg, i) => (
              <TransportSegmentCard key={i} segment={seg} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
