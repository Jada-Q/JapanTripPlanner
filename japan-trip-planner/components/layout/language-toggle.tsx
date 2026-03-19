"use client"

import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"

export function LanguageToggle() {
  const { i18n } = useTranslation()
  const isZh = i18n.language.startsWith("zh")

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        const next = isZh ? "en" : "zh"
        i18n.changeLanguage(next)
        localStorage.setItem("i18nextLng", next)
      }}
    >
      {isZh ? "EN" : "中文"}
    </Button>
  )
}
