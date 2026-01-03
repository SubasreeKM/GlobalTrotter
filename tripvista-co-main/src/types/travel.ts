// Core travel planning types for GlobeTrotter

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  language: string;
  currency: string;
  notifications: boolean;
}

export interface Trip {
  id: string;
  userId: string;
  name: string;
  description?: string;
  coverImage?: string;
  startDate: Date;
  endDate: Date;
  status: 'draft' | 'planned' | 'ongoing' | 'completed';
  isPublic: boolean;
  totalBudget?: number;
  stops: TripStop[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TripStop {
  id: string;
  tripId: string;
  cityId: string;
  city: City;
  arrivalDate: Date;
  departureDate: Date;
  order: number;
  activities: Activity[];
  accommodation?: Accommodation;
  transportToNext?: Transport;
  notes?: string;
}

export interface City {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  region?: string;
  image: string;
  description: string;
  costIndex: number; // 1-5 scale
  popularity: number; // 1-100
  coordinates: {
    lat: number;
    lng: number;
  };
  timezone: string;
  bestTimeToVisit?: string[];
}

export interface Activity {
  id: string;
  stopId: string;
  name: string;
  description: string;
  category: ActivityCategory;
  duration: number; // in hours
  cost: number;
  image?: string;
  address?: string;
  startTime?: string;
  date?: Date;
  rating?: number;
  isBooked: boolean;
}

export type ActivityCategory = 
  | 'sightseeing'
  | 'food'
  | 'adventure'
  | 'culture'
  | 'relaxation'
  | 'shopping'
  | 'nightlife'
  | 'nature'
  | 'entertainment';

export interface Accommodation {
  id: string;
  name: string;
  type: 'hotel' | 'hostel' | 'apartment' | 'resort' | 'villa';
  address: string;
  checkIn: Date;
  checkOut: Date;
  costPerNight: number;
  totalCost: number;
  image?: string;
  rating?: number;
  isBooked: boolean;
}

export interface Transport {
  id: string;
  type: 'flight' | 'train' | 'bus' | 'car' | 'ferry';
  from: string;
  to: string;
  departureTime: Date;
  arrivalTime: Date;
  cost: number;
  provider?: string;
  isBooked: boolean;
}

export interface BudgetBreakdown {
  transport: number;
  accommodation: number;
  activities: number;
  food: number;
  other: number;
  total: number;
}

export interface TripSummary {
  id: string;
  name: string;
  coverImage?: string;
  startDate: Date;
  endDate: Date;
  destinationCount: number;
  totalBudget: number;
  status: Trip['status'];
}
