import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Zap, Check, ExternalLink, Database, Key } from 'lucide-react';

const SupabaseInfo = () => {
  return (
    <>
      <Helmet>
        <title>Connect Backend - Supabase</title>
        <meta name="description" content="Instructions on how to connect a Supabase backend to enable features like real-time OTP." />
      </Helmet>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700 text-white shadow-2xl">
            <CardHeader className="text-center">
              <div className="flex justify-center items-center gap-4 mb-4">
                <Zap className="w-10 h-10 text-yellow-400" />
                <CardTitle className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Connect Your Backend</CardTitle>
              </div>
              <CardDescription className="text-slate-300 text-lg">
               
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 p-8">
              <div>
                
        
              </div>
              

              <div className="mt-6 p-4 bg-green-900/50 text-green-200 rounded-lg flex items-center gap-4">
                  <Check className="w-8 h-8 flex-shrink-0" />
              </div>

               <a 
                href="" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full mt-4 inline-block text-center px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold transition-transform transform hover:scale-105"
                >
                 <ExternalLink className="inline-block w-4 h-4 ml-2"/>
               </a>

            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default SupabaseInfo;