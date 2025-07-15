import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import MainLayout from '@/components/MainLayout';
import PublicSpace from '@/components/PublicSpace';
import AskQuestion from '@/components/AskQuestion';
import Profile from '@/components/Profile';
import SupabaseInfo from '@/components/SupabaseInfo';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <MainLayout>
        <Routes location={location} key={location.pathname}>
          <Route index element={<PublicSpace />} />
          <Route path="/ask" element={<AskQuestion />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connect-backend" element={<SupabaseInfo />} />
        </Routes>
      </MainLayout>
      <Toaster />
    </AuthProvider>
  );
}

export default App;