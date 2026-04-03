export interface Groomer {
  id: string
  name: string
  location: string
  neighborhood: string
  rating: number
  reviewCount: number
  services: string[]
  priceFrom: number
  badge: string
  emoji: string
  bio: string
  experience: string
  certifications: string[]
  availableToday: boolean
}

export interface Review {
  id: string
  groomerId: string
  authorName: string
  authorDog: string
  rating: number
  body: string
  date: string
}

export interface Booking {
  id: string
  userId: string
  groomerId: string
  groomerName: string
  service: string
  date: string
  time: string
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
  price: number
  dogName: string
  notes: string
}

export interface DogProfile {
  id: string
  userId: string
  name: string
  breed: string
  age: number
  size: 'small' | 'medium' | 'large' | 'xlarge'
  notes: string
}
