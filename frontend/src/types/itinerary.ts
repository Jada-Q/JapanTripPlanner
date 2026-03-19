export interface TransportSegment {
  from_station: string;
  from_station_ja: string;
  to_station: string;
  to_station_ja: string;
  train_name: string;
  train_type: string;
  departure_time: string;
  arrival_time: string;
  duration_minutes: number;
  fare_yen: number;
  covered_by_jr_pass: boolean;
  seat_type?: string;
  platform_note?: string;
  notes?: string;
}

export interface TransportToNext {
  mode: string;
  duration_minutes: number;
  description: string;
  cost_yen?: number;
}

export interface Activity {
  name: string;
  name_ja: string;
  address: string;
  address_ja: string;
  category: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  estimated_cost_yen?: number;
  description: string;
  tips?: string;
  seasonal_note?: string;
  nearest_station: string;
  nearest_station_ja: string;
  walking_minutes_from_station: number;
  google_maps_url?: string;
  business_hours?: string;
  phone?: string;
  photo_url?: string;
  highlight?: string;
  transport_to_next?: TransportToNext;
}

export interface DayPlan {
  day_number: number;
  date: string;
  city: string;
  city_ja: string;
  theme: string;
  activities: Activity[];
  transport_segments: TransportSegment[];
  daily_transport_cost_yen: number;
  daily_estimated_total_yen: number;
  weather_note?: string;
  morning_tip?: string;
}

export interface JRPassRecommendation {
  recommended: boolean;
  pass_type: string;
  pass_cost_yen: number;
  individual_tickets_cost_yen: number;
  savings_yen: number;
  covered_segments: string[];
  not_covered_segments: string[];
  recommendation_note: string;
}

export interface Itinerary {
  trip_id: string;
  title: string;
  title_ja?: string;
  start_date: string;
  end_date: string;
  num_days: number;
  cities: string[];
  days: DayPlan[];
  jr_pass_recommendation: JRPassRecommendation;
  total_estimated_cost_yen: number;
  seasonal_highlights: string[];
  packing_tips: string[];
  general_tips: string[];
}
