import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ipuludfsxaltrjbvtwlw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwdWx1ZGZzeGFsdHJqYnZ0d2x3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM4MDE3ODksImV4cCI6MjAzOTM3Nzc4OX0.z9acZIAOlaDUasrK5Tk8EkwMyLxOyAtDbPudrzTvfX0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
