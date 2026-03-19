export type BudgetLevel = 'budget' | 'moderate' | 'luxury';
export type TravelPace = 'relaxed' | 'moderate' | 'intensive';
export type InterestTag =
  | 'temples' | 'food' | 'shopping' | 'nature' | 'anime'
  | 'history' | 'onsen' | 'nightlife' | 'photography' | 'family';

export interface TripRequest {
  start_date: string;
  end_date: string;
  cities: string[];
  budget_level: BudgetLevel;
  pace: TravelPace;
  interests: InterestTag[];
  include_jr_pass_calc: boolean;
  language: string;
}

export interface CityOption {
  id: string;
  name_en: string;
  name_ja: string;
  name_zh: string;
  region: string;
  recommended_days: { min: number; max: number };
}
