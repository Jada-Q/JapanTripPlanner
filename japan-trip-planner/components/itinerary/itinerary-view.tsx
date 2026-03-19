"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Itinerary } from "@/types/itinerary"
import { DayCard } from "./day-card"
import { JRPassSummary } from "./jr-pass-summary"

interface Props {
  itinerary: Itinerary
  onNewTrip: () => void
}

export function ItineraryView({ itinerary, onNewTrip }: Props) {
  const { t } = useTranslation()
  const [activeDay, setActiveDay] = useState(0)

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-lg font-bold text-foreground">{itinerary.title}</h2>
        {itinerary.title_ja && (
          <p className="text-xs text-muted-foreground">{itinerary.title_ja}</p>
        )}
        <p className="mt-1 text-[0.625rem] text-muted-foreground">
          {itinerary.start_date} ~ {itinerary.end_date} · {itinerary.num_days}{" "}
          days
        </p>
      </div>

      {/* JR Pass */}
      <JRPassSummary recommendation={itinerary.jr_pass_recommendation} />

      {/* Day navigation tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {itinerary.days.map((day, i) => (
          <Button
            key={i}
            variant={activeDay === i ? "default" : "outline"}
            size="sm"
            className="shrink-0"
            onClick={() => setActiveDay(i)}
          >
            {t("itinerary.day", { number: day.day_number })}
            <span className="ml-1 text-[0.5rem] opacity-75">{day.city}</span>
          </Button>
        ))}
      </div>

      {/* Active day card */}
      <DayCard day={itinerary.days[activeDay]} />

      {/* Seasonal highlights */}
      {itinerary.seasonal_highlights.length > 0 && (
        <Card className="border-pink-200 bg-pink-50 dark:border-pink-800 dark:bg-pink-950/30">
          <CardContent>
            <h3 className="mb-2 text-xs font-semibold text-foreground">
              🌸 {t("itinerary.seasonalHighlights")}
            </h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {itinerary.seasonal_highlights.map((h, i) => (
                <li key={i}>• {h}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Total cost */}
      <Card>
        <CardContent className="text-center">
          <p className="text-xs text-muted-foreground">
            {t("itinerary.totalCost")}
          </p>
          <p className="text-2xl font-bold text-foreground">
            ¥{itinerary.total_estimated_cost_yen.toLocaleString()}
          </p>
        </CardContent>
      </Card>

      {/* Tips */}
      {itinerary.general_tips.length > 0 && (
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30">
          <CardContent>
            <h3 className="mb-2 text-xs font-semibold text-foreground">
              💡 {t("itinerary.tips")}
            </h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {itinerary.general_tips.map((tip, i) => (
                <li key={i}>• {tip}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* New trip button */}
      <Button variant="outline" size="lg" className="w-full" onClick={onNewTrip}>
        {t("itinerary.newTrip")}
      </Button>
    </div>
  )
}
