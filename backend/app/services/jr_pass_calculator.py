from app.models.itinerary import TransportSegment, JRPassRecommendation
from app.data.jr_passes import JR_PASSES


class JRPassCalculator:
    def calculate(
        self,
        segments: list[TransportSegment],
        num_days: int,
        language: str = "zh",
    ) -> JRPassRecommendation:
        # Sum fares for JR-covered segments
        jr_eligible_total = sum(
            s.fare_yen for s in segments if s.covered_by_jr_pass
        )

        # Find applicable nationwide passes by trip duration
        applicable_passes = [
            p for p in JR_PASSES["nationwide"]
            if p["duration_days"] >= num_days and p["class"] == "ordinary"
        ]

        # Find best option
        best_option = None
        best_savings = 0

        for pass_info in applicable_passes:
            savings = jr_eligible_total - pass_info["price_yen"]
            if savings > best_savings:
                best_savings = savings
                best_option = pass_info

        # Also check shorter passes if trip is longer
        # (user might use a 7-day pass for a 10-day trip if most travel is in 7 days)
        for pass_info in JR_PASSES["nationwide"]:
            if pass_info["class"] != "ordinary":
                continue
            if pass_info["duration_days"] < num_days:
                savings = jr_eligible_total - pass_info["price_yen"]
                if savings > best_savings:
                    best_savings = savings
                    best_option = pass_info

        covered = [
            f"{s.from_station} → {s.to_station}"
            for s in segments if s.covered_by_jr_pass
        ]
        not_covered = [
            f"{s.from_station} → {s.to_station} ({s.train_name})"
            for s in segments if not s.covered_by_jr_pass
        ]

        if best_option and best_savings > 0:
            note = self._build_note(best_option, best_savings, language)
            return JRPassRecommendation(
                recommended=True,
                pass_type=best_option["name"],
                pass_cost_yen=best_option["price_yen"],
                individual_tickets_cost_yen=jr_eligible_total,
                savings_yen=best_savings,
                covered_segments=covered,
                not_covered_segments=not_covered,
                recommendation_note=note,
            )
        else:
            note = self._no_pass_note(jr_eligible_total, language)
            return JRPassRecommendation(
                recommended=False,
                pass_type="None",
                pass_cost_yen=0,
                individual_tickets_cost_yen=jr_eligible_total,
                savings_yen=0,
                covered_segments=covered,
                not_covered_segments=not_covered,
                recommendation_note=note,
            )

    def _build_note(self, pass_info: dict, savings: int, language: str) -> str:
        if language == "zh":
            return (
                f"推荐购买 {pass_info['name']}（¥{pass_info['price_yen']:,}），"
                f"相比单独购票可节省 ¥{savings:,}。"
                f"注意：Nozomi和Mizuho列车不可使用JR Pass，请乘坐Hikari或Sakura。"
            )
        return (
            f"Recommended: {pass_info['name']} (¥{pass_info['price_yen']:,}), "
            f"saving ¥{savings:,} compared to individual tickets. "
            f"Note: Nozomi and Mizuho trains are NOT covered - use Hikari or Sakura instead."
        )

    def _no_pass_note(self, total: int, language: str) -> str:
        if language == "zh":
            return (
                f"根据您的行程，单独购票总费用为 ¥{total:,}，"
                f"购买JR Pass不划算，建议单独购票。"
            )
        return (
            f"Based on your itinerary, individual tickets total ¥{total:,}. "
            f"A JR Pass would not save money for this trip."
        )
