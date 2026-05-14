import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Property, PropertyFilters } from "@/types/database";

export function useProperties(filters: PropertyFilters = {}) {
  return useQuery({
    queryKey: ["properties", filters],
    queryFn: async () => {
      let query = supabase
        .from("properties")
        .select("*")
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false });

      if (filters.type && filters.type !== "all") {
        query = query.eq("type", filters.type);
      }
      if (filters.dealType && filters.dealType !== "all") {
        query = query.eq("deal_type", filters.dealType);
      }
      if (filters.location) {
        query = query.ilike("location", `%${filters.location}%`);
      }
      if (filters.bedrooms !== undefined) {
        query = query.gte("bedrooms", filters.bedrooms);
      }
      if (filters.priceMin !== undefined) {
        query = query.gte("price", filters.priceMin);
      }
      if (filters.priceMax !== undefined) {
        query = query.lte("price", filters.priceMax);
      }
      if (filters.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
        );
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as Property[];
    },
  });
}

export function useProperty(id: string | undefined) {
  return useQuery({
    queryKey: ["property", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data as Property;
    },
  });
}

export function useFeaturedProperties(limit = 3) {
  return useQuery({
    queryKey: ["properties", "featured", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("featured", true)
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as Property[];
    },
  });
}
