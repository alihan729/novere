import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import type { Favorite, Property } from "@/types/database";

export function useFavorites() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["favorites", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("*, property:properties(*)")
        .eq("user_id", user!.id);
      if (error) throw error;
      return (data ?? []) as (Favorite & { property: Property })[];
    },
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (propertyId: string) => {
      if (!user) throw new Error("Not authenticated");

      const { data: existing, error: selectError } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", user.id)
        .eq("property_id", propertyId)
        .maybeSingle();
      if (selectError) throw selectError;

      if (existing) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("id", (existing as { id: string }).id);
        if (error) throw error;
        return { action: "removed" as const };
      }

      const { error } = await supabase
        .from("favorites")
        .insert({ user_id: user.id, property_id: propertyId });
      if (error) throw error;
      return { action: "added" as const };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}
