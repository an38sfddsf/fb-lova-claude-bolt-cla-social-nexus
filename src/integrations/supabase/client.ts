// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mqwtmwsexwblejeskqgz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xd3Rtd3NleHdibGVqZXNrcWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDY1NzAsImV4cCI6MjA2NTQ4MjU3MH0.5naQ9gGQLYkBRG_6TOUcTHAa3sjg1hnOcLEck9ArpgM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);