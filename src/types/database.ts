export type UserRole = "client" | "admin";

export type PropertyType = "villa" | "penthouse" | "apartment";
export type DealType = "sale" | "rent";
export type ViewingRequestStatus = "new" | "confirmed" | "cancelled";

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  role: UserRole;
  created_at: string;
}

export interface Property {
  id: string;
  title: string;
  description: string | null;
  price: number;
  type: PropertyType;
  deal_type: DealType;
  location: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  featured: boolean;
  created_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  property_id: string;
  created_at: string;
}

export interface ViewingRequest {
  id: string;
  user_id: string;
  property_id: string;
  preferred_date: string | null;
  message: string | null;
  status: ViewingRequestStatus;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: {
          id: string;
          full_name?: string | null;
          phone?: string | null;
          role?: UserRole;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          phone?: string | null;
          role?: UserRole;
          created_at?: string;
        };
        Relationships: [];
      };
      properties: {
        Row: Property;
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          price: number;
          type: PropertyType;
          deal_type: DealType;
          location: string;
          area: number;
          bedrooms: number;
          bathrooms: number;
          images?: string[];
          featured?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          price?: number;
          type?: PropertyType;
          deal_type?: DealType;
          location?: string;
          area?: number;
          bedrooms?: number;
          bathrooms?: number;
          images?: string[];
          featured?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      favorites: {
        Row: Favorite;
        Insert: {
          id?: string;
          user_id: string;
          property_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          property_id?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      viewing_requests: {
        Row: ViewingRequest;
        Insert: {
          id?: string;
          user_id: string;
          property_id: string;
          preferred_date?: string | null;
          message?: string | null;
          status?: ViewingRequestStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          property_id?: string;
          preferred_date?: string | null;
          message?: string | null;
          status?: ViewingRequestStatus;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export interface PropertyFilters {
  search?: string;
  type?: PropertyType | "all";
  dealType?: DealType | "all";
  location?: string;
  bedrooms?: number;
  priceMin?: number;
  priceMax?: number;
}
