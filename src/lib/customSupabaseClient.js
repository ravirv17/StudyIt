import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hznqxldtheowxssjgmsu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6bnF4bGR0aGVvd3hzc2pnbXN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NzA0MjUsImV4cCI6MjA2ODE0NjQyNX0.o34bY0gpcT-BugtWgK3d5ZgUIC_7WQ_DYawAow5SLVs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);