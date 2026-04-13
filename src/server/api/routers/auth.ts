import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { supabase } from "@/lib/supabase";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { data, error } = await supabase
        .from("users")
        .insert({
          email: input.email,
          password: input.password,
        })
        .select()
        .single();

      if (error) throw new Error(error.message);

      return {
        success: true,
        user: data,
      };
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { data, error } = await supabase
        .from("users")
        .insert({
          email: input.email,
          password: input.password,
        })
        .select()
        .single();

      if (error) throw new Error(error.message);

      return {
        success: true,
        user: data,
      };
    }),
});