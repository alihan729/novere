import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import type { Property, ViewingRequest } from "@/types/database";

interface CreateViewingRequestInput {
  propertyId: string;
  preferredDate?: string | null;
  message?: string | null;
}

export function useViewingRequests() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["viewing-requests", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("viewing_requests")
        .select("*, property:properties(*)")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as (ViewingRequest & { property: Property })[];
    },
  });
}

export function useCreateViewingRequest() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (input: CreateViewingRequestInput) => {
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("viewing_requests")
        .insert({
          user_id: user.id,
          property_id: input.propertyId,
          preferred_date: input.preferredDate ?? null,
          message: input.message ?? null,
        })
        .select()
        .single();
      if (error) throw error;
      return data as ViewingRequest;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["viewing-requests"] });
    },
  });
}

export function useCancelViewingRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("viewing_requests")
        .update({ status: "cancelled" })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["viewing-requests"] });
    },
  });
}
