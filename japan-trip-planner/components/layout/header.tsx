"use client"

import { useTranslation } from "react-i18next"
import { LanguageToggle } from "./language-toggle"

export function Header() {
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🗾</span>
          <h1 className="text-sm font-semibold text-foreground">
            {t("app.title")}
          </h1>
        </div>
        <LanguageToggle />
      </div>
    </header>
  )
}
