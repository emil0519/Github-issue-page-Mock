import { createClient } from "@supabase/supabase-js";

const superbase = createClient(
  "https://wtnzestddrauuomvswji.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0bnplc3RkZHJhdXVvbXZzd2ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQyNDM0NzksImV4cCI6MTk3OTgxOTQ3OX0.Xr75PI5KuSX4eR96skXPHt4Zx5YoP5fYPtE-aKHwsaI"
);
//1st arg- superbase url, 2nd arg- superbase api public key
export { superbase };
