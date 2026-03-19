"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Activity } from "@/types/itinerary"

const CATEGORY_ICONS: Record<string, string> = {
  sightseeing: "🏛",
  temple: "⛩",
  food: "🍜",
  shopping: "🛍",
  experience: "🎌",
  nature: "🌿",
  museum: "🏛",
  landmark: "🗼",
}

const TRANSPORT_MODE_ICONS: Record<string, string> = {
  walk: "🚶",
  metro: "🚇",
  bus: "🚌",
  train: "🚃",
  taxi: "🚕",
}

interface Props {
  activity: Activity
  isLast?: boolean
}

export function ActivityItem({ activity, isLast }: Props) {
  const { t } = useTranslation()
  const [showAddress, setShowAddress] = useState(false)
  const [copied, setCopied] = useState(false)
  const [imgError, setImgError] = useState(false)
  const icon = CATEGORY_ICONS[activity.category] || "📍"

  const copyAddress = async () => {
    await navigator.clipboard.writeText(activity.address_ja)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const transport = activity.transport_to_next

  return (
    <div>
      {/* Activity card */}
      <div className="overflow-hidden rounded-lg border border-border bg-card ring-1 ring-foreground/5">
        {/* Photo banner */}
        {activity.photo_url && !imgError && (
          <div className="h-36 w-full overflow-hidden bg-muted">
            <img
              src={activity.photo_url}
              alt={activity.name}
              className="h-full w-full object-cover"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          </div>
        )}

        <div className="space-y-2 p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span>{icon}</span>
                <h4 className="text-sm font-medium text-foreground">
                  {activity.name}
                </h4>
                <span className="text-xs text-muted-foreground">
                  {activity.name_ja}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {activity.start_time} - {activity.end_time}
                <span className="ml-1 text-muted-foreground/60">
                  ({activity.duration_minutes}min)
                </span>
              </p>
            </div>
            {activity.estimated_cost_yen != null && (
              <span className="text-xs font-medium text-foreground">
                ¥{activity.estimated_cost_yen.toLocaleString()}
              </span>
            )}
          </div>

          {/* Highlight */}
          {activity.highlight && (
            <div className="rounded-md bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
              ✨ {activity.highlight}
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            {activity.description}
          </p>

          {/* Info row */}
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-[0.625rem] text-muted-foreground">
              <span>📍</span>
              <span>
                {activity.nearest_station} ({activity.nearest_station_ja})
              </span>
              <span>· {activity.walking_minutes_from_station}min walk</span>
            </div>

            {activity.business_hours && (
              <div className="flex items-center gap-1 text-[0.625rem] text-muted-foreground">
                <span>🕐</span>
                <span>
                  {t("itinerary.hours")}: {activity.business_hours}
                </span>
              </div>
            )}

            {activity.phone && (
              <div className="flex items-center gap-1 text-[0.625rem] text-muted-foreground">
                <span>📞</span>
                <a
                  href={`tel:${activity.phone}`}
                  className="text-primary hover:underline"
                >
                  {activity.phone}
                </a>
              </div>
            )}
          </div>

          {/* Google Maps link */}
          {activity.google_maps_url && (
            <div>
              <Button variant="secondary" size="xs" asChild>
                <a
                  href={activity.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📍 {t("itinerary.openMaps")}
                </a>
              </Button>
            </div>
          )}

          {activity.seasonal_note && (
            <div className="rounded-md bg-pink-500/10 px-2 py-1 text-[0.625rem] text-pink-600 dark:text-pink-400">
              🌸 {activity.seasonal_note}
            </div>
          )}

          {activity.tips && (
            <div className="rounded-md bg-amber-500/10 px-2 py-1 text-[0.625rem] text-amber-700 dark:text-amber-400">
              💡 {activity.tips}
            </div>
          )}

          {/* Japanese address toggle */}
          <div>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-[0.625rem] text-primary hover:underline"
            >
              {showAddress ? "▲" : "▼"} {t("itinerary.showAddress")}
            </button>
            {showAddress && (
              <div className="mt-1 flex items-center justify-between rounded-md border border-border bg-muted/50 p-2">
                <span className="font-mono text-xs text-foreground">
                  {activity.address_ja}
                </span>
                <button
                  onClick={copyAddress}
                  className="ml-2 whitespace-nowrap text-[0.625rem] text-primary hover:underline"
                >
                  {copied
                    ? t("itinerary.copied")
                    : t("itinerary.copyAddress")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Transport to next activity */}
      {!isLast && transport && (
        <div className="my-2 ml-6 flex items-center gap-2 px-3 py-1.5 text-[0.625rem] text-muted-foreground">
          <span className="text-base">
            {TRANSPORT_MODE_ICONS[transport.mode] || "🚶"}
          </span>
          <div className="flex-1 border-t border-dashed border-border" />
          <span className="text-xs font-medium text-foreground">
            {transport.duration_minutes} min
          </span>
          <div className="flex-1 border-t border-dashed border-border" />
          <span
            className="max-w-[200px] truncate"
            title={transport.description}
          >
            {transport.description}
          </span>
          {transport.cost_yen != null && transport.cost_yen > 0 && (
            <span>¥{transport.cost_yen}</span>
          )}
        </div>
      )}
    </div>
  )
}
