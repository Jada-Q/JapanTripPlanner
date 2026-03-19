"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RiLoader4Line } from "@remixicon/react"
import type {
  TripRequest,
  BudgetLevel,
  TravelPace,
  InterestTag,
} from "@/types/request"

const CITY_OPTIONS = [
  { value: "tokyo", labelEn: "Tokyo", labelZh: "东京", labelJa: "東京" },
  { value: "kyoto", labelEn: "Kyoto", labelZh: "京都", labelJa: "京都" },
  { value: "osaka", labelEn: "Osaka", labelZh: "大阪", labelJa: "大阪" },
  {
    value: "hiroshima",
    labelEn: "Hiroshima",
    labelZh: "广岛",
    labelJa: "広島",
  },
  { value: "nara", labelEn: "Nara", labelZh: "奈良", labelJa: "奈良" },
  { value: "hakone", labelEn: "Hakone", labelZh: "箱根", labelJa: "箱根" },
  {
    value: "kamakura",
    labelEn: "Kamakura",
    labelZh: "镰仓",
    labelJa: "鎌倉",
  },
  {
    value: "kanazawa",
    labelEn: "Kanazawa",
    labelZh: "金泽",
    labelJa: "金沢",
  },
  {
    value: "fukuoka",
    labelEn: "Fukuoka",
    labelZh: "福冈",
    labelJa: "福岡",
  },
  {
    value: "nagoya",
    labelEn: "Nagoya",
    labelZh: "名古屋",
    labelJa: "名古屋",
  },
  {
    value: "sapporo",
    labelEn: "Sapporo",
    labelZh: "札幌",
    labelJa: "札幌",
  },
  { value: "sendai", labelEn: "Sendai", labelZh: "仙台", labelJa: "仙台" },
  { value: "nikko", labelEn: "Nikko", labelZh: "日光", labelJa: "日光" },
  {
    value: "takayama",
    labelEn: "Takayama",
    labelZh: "高山",
    labelJa: "高山",
  },
  { value: "kobe", labelEn: "Kobe", labelZh: "神户", labelJa: "神戸" },
]

const INTEREST_OPTIONS: InterestTag[] = [
  "temples",
  "food",
  "shopping",
  "nature",
  "anime",
  "history",
  "onsen",
  "nightlife",
  "photography",
  "family",
]

interface Props {
  onSubmit: (request: TripRequest) => void
  isLoading: boolean
}

export function TripInputForm({ onSubmit, isLoading }: Props) {
  const { t, i18n } = useTranslation()
  const isZh = i18n.language.startsWith("zh")

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [cities, setCities] = useState<string[]>([])
  const [budget, setBudget] = useState<BudgetLevel>("moderate")
  const [pace, setPace] = useState<TravelPace>("moderate")
  const [interests, setInterests] = useState<InterestTag[]>([])

  const toggleCity = (value: string) => {
    setCities((prev) =>
      prev.includes(value)
        ? prev.filter((c) => c !== value)
        : [...prev, value]
    )
  }

  const toggleInterest = (tag: InterestTag) => {
    setInterests((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!startDate || !endDate || cities.length === 0) return

    onSubmit({
      start_date: startDate,
      end_date: endDate,
      cities,
      budget_level: budget,
      pace,
      interests,
      include_jr_pass_calc: true,
      language: isZh ? "zh" : "en",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-lg">
          🗾 {t("app.title")}
        </CardTitle>
        <p className="text-center text-xs text-muted-foreground">
          {t("app.subtitle")}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Dates */}
          <div className="space-y-2">
            <Label>{t("form.dates")}</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-[0.625rem] text-muted-foreground">
                  {t("form.startDate")}
                </span>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <span className="text-[0.625rem] text-muted-foreground">
                  {t("form.endDate")}
                </span>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  required
                />
              </div>
            </div>
          </div>

          {/* Cities */}
          <div className="space-y-2">
            <Label>{t("form.cities")}</Label>
            <div className="flex flex-wrap gap-1.5">
              {CITY_OPTIONS.map((c) => (
                <Badge
                  key={c.value}
                  variant={cities.includes(c.value) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleCity(c.value)}
                >
                  {isZh
                    ? `${c.labelZh} ${c.labelJa}`
                    : `${c.labelEn} ${c.labelJa}`}
                </Badge>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <Label>{t("form.budget")}</Label>
            <div className="grid grid-cols-3 gap-2">
              {(["budget", "moderate", "luxury"] as BudgetLevel[]).map(
                (level) => (
                  <Button
                    key={level}
                    type="button"
                    variant={budget === level ? "default" : "outline"}
                    size="lg"
                    onClick={() => setBudget(level)}
                  >
                    {t(`form.budgetOptions.${level}`)}
                  </Button>
                )
              )}
            </div>
          </div>

          {/* Pace */}
          <div className="space-y-2">
            <Label>{t("form.pace")}</Label>
            <div className="grid grid-cols-3 gap-2">
              {(["relaxed", "moderate", "intensive"] as TravelPace[]).map(
                (p) => (
                  <Button
                    key={p}
                    type="button"
                    variant={pace === p ? "default" : "outline"}
                    size="lg"
                    onClick={() => setPace(p)}
                    className="text-[0.625rem]"
                  >
                    {t(`form.paceOptions.${p}`)}
                  </Button>
                )
              )}
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-2">
            <Label>{t("form.interests")}</Label>
            <div className="flex flex-wrap gap-1.5">
              {INTEREST_OPTIONS.map((tag) => (
                <Badge
                  key={tag}
                  variant={interests.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleInterest(tag)}
                >
                  {t(`form.interestOptions.${tag}`)}
                </Badge>
              ))}
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            disabled={
              isLoading || !startDate || !endDate || cities.length === 0
            }
            className="w-full"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <RiLoader4Line className="size-4 animate-spin" />
                {t("form.generating")}
              </span>
            ) : (
              t("form.generate")
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
