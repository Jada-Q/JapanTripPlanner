"use client"

import { useTranslation } from "react-i18next"
import { Badge } from "@/components/ui/badge"
import type { TransportSegment } from "@/types/itinerary"

const TRAIN_ICONS: Record<string, string> = {
  shinkansen: "🚅",
  limited_express: "🚄",
  local: "🚃",
  subway: "🚇",
  bus: "🚌",
}

interface Props {
  segment: TransportSegment
}

export function TransportSegmentCard({ segment }: Props) {
  const { t } = useTranslation()
  const icon = TRAIN_ICONS[segment.train_type] || "🚃"

  return (
    <div className="my-2 ml-4 border-l-2 border-primary/30 py-2 pl-4">
      <div className="flex items-center gap-2 text-xs font-medium text-primary">
        <span>{icon}</span>
        <span>{segment.train_name}</span>
        {segment.covered_by_jr_pass && (
          <Badge variant="secondary" className="text-[0.5rem]">
            JR Pass ✓
          </Badge>
        )}
      </div>

      <div className="mt-1 flex items-start gap-4 text-xs text-muted-foreground">
        <div className="flex flex-col items-center">
          <span className="font-mono font-medium text-foreground">
            {segment.departure_time}
          </span>
          <div className="my-1 h-6 w-px bg-border" />
          <span className="font-mono font-medium text-foreground">
            {segment.arrival_time}
          </span>
        </div>
        <div className="flex flex-col">
          <span>
            {segment.from_station}
            <span className="ml-1 text-muted-foreground/60">
              {segment.from_station_ja}
            </span>
          </span>
          <span className="my-1 text-[0.625rem] text-muted-foreground/60">
            {t("itinerary.duration", { minutes: segment.duration_minutes })}
          </span>
          <span>
            {segment.to_station}
            <span className="ml-1 text-muted-foreground/60">
              {segment.to_station_ja}
            </span>
          </span>
        </div>
      </div>

      <div className="mt-1 text-xs text-muted-foreground">
        ¥{segment.fare_yen.toLocaleString()}
        {segment.platform_note && (
          <span className="ml-2 text-[0.625rem] text-muted-foreground/60">
            {segment.platform_note}
          </span>
        )}
      </div>

      {segment.notes && (
        <p className="mt-1 text-[0.625rem] text-amber-600 dark:text-amber-400">
          {segment.notes}
        </p>
      )}
    </div>
  )
}
