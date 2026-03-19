"use client"

import { useState } from "react"
import { isAxiosError } from "axios"
import { Header } from "@/components/layout/header"
import { TripInputForm } from "@/components/trip-input/trip-input-form"
import { ItineraryView } from "@/components/itinerary/itinerary-view"
import { useGenerateItinerary } from "@/hooks/use-generate-itinerary"
import type { TripRequest } from "@/types/request"
import type { Itinerary } from "@/types/itinerary"

function getErrorMessage(error: Error): string {
  if (isAxiosError(error)) {
    const detail = error.response?.data?.detail
    if (typeof detail === "string") {
      if (detail.includes("rate limit") || detail.includes("频率超限")) {
        return detail
      }
      if (detail.includes("429") || detail.includes("Quota exceeded")) {
        return "API 请求频率超限，请等待1-2分钟后重试。"
      }
      return detail.length > 200 ? detail.slice(0, 200) + "..." : detail
    }
    return error.message
  }
  return error.message
}

export default function HomePage() {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null)
  const mutation = useGenerateItinerary()

  const handleSubmit = (request: TripRequest) => {
    mutation.mutate(request, {
      onSuccess: (data) => setItinerary(data),
    })
  }

  const handleNewTrip = () => {
    setItinerary(null)
    mutation.reset()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {mutation.error && (
        <div className="mx-auto mt-4 max-w-xl px-4">
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-xs text-destructive">
            {getErrorMessage(mutation.error)}
          </div>
        </div>
      )}

      {itinerary ? (
        <div className="mx-auto max-w-3xl px-4 py-8">
          <ItineraryView itinerary={itinerary} onNewTrip={handleNewTrip} />
        </div>
      ) : (
        <div className="mx-auto max-w-xl px-4 py-12">
          <TripInputForm
            onSubmit={handleSubmit}
            isLoading={mutation.isPending}
          />
        </div>
      )}
    </div>
  )
}
