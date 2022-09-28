import { createClient } from "@supabase/supabase-js";

const superbase = createClient(
  "https://bnnpapxcfcjzammjabuq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJubnBhcHhjZmNqemFtbWphYnVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM1MTc1MjgsImV4cCI6MTk3OTA5MzUyOH0.pGmr1PrcA0-lm9GEZvX0JzgfTpySk9jKkgxSeiEjkVU"
);
//1st arg- superbase url, 2nd arg- superbase api public key
export { superbase };
