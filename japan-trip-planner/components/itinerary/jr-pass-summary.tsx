"use client"

import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { JRPassRecommendation } from "@/types/itinerary"

interface Props {
  recommendation: JRPassRecommendation
}

export function JRPassSummary({ recommendation }: Props) {
  const { t } = useTranslation()

  return (
    <Card
      className={
        recommendation.recommended
          ? "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950/30"
          : ""
      }
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t("itinerary.jrPass.title")}</CardTitle>
          <Badge
            variant={recommendation.recommended ? "default" : "secondary"}
          >
            {recommendation.recommended
              ? t("itinerary.jrPass.recommended")
              : t("itinerary.jrPass.notRecommended")}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {recommendation.recommended && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[0.625rem] text-muted-foreground">
                  {t("itinerary.jrPass.passType")}
                </p>
                <p className="text-xs font-medium text-foreground">
                  {recommendation.pass_type}
                </p>
              </div>
              <div>
                <p className="text-[0.625rem] text-muted-foreground">
                  {t("itinerary.jrPass.savings", {
                    amount: recommendation.savings_yen.toLocaleString(),
                  })}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[0.625rem] text-muted-foreground">
                  {t("itinerary.jrPass.individualCost")}
                </p>
                <p className="text-xs font-medium text-destructive line-through">
                  ¥
                  {recommendation.individual_tickets_cost_yen.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-[0.625rem] text-muted-foreground">
                  {t("itinerary.jrPass.passCost")}
                </p>
                <p className="text-xs font-medium text-green-700 dark:text-green-400">
                  ¥{recommendation.pass_cost_yen.toLocaleString()}
                </p>
              </div>
            </div>
          </>
        )}

        <p className="text-xs text-muted-foreground">
          {recommendation.recommendation_note}
        </p>

        {recommendation.not_covered_segments.length > 0 && (
          <div>
            <p className="mb-1 text-[0.625rem] font-medium text-amber-700 dark:text-amber-400">
              {t("itinerary.notCoveredByJR")}:
            </p>
            <ul className="space-y-0.5 text-[0.625rem] text-amber-600 dark:text-amber-500">
              {recommendation.not_covered_segments.map((seg, i) => (
                <li key={i}>• {seg}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
