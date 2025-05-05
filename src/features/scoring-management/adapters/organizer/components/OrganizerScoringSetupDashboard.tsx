"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  ArrowLeft, 
  Award, 
  BarChart4, 
  CalendarDays, 
  Clock, 
  Cog, 
  Flag, 
  LucideTarget, 
  Medal, 
  Settings, 
  Tablet, 
  Users, 
  UserCog
} from "lucide-react";
import Link from "next/link";
import { ScoringSetup } from "../../../models/scoring-setup";

interface OrganizerScoringSetupDashboardProps {
  setup: ScoringSetup;
}

// Helper function to get icon component based on name
const getIconComponent = (iconName: string, size: number = 20, className: string = "") => {
  const iconMap: Record<string, React.ReactNode> = {
    Cog: <Cog size={size} className={className} />,
    Users: <Users size={size} className={className} />,
    Tablet: <Tablet size={size} className={className} />,
    BarChart4: <BarChart4 size={size} className={className} />,
    Award: <Award size={size} className={className} />,
    UserCog: <UserCog size={size} className={className} />,
    Flag: <Flag size={size} className={className} />,
    LucideTarget: <LucideTarget size={size} className={className} />
  };
  
  return iconMap[iconName] || <Settings size={size} className={className} />;
};

export function OrganizerScoringSetupDashboard({ setup }: Readonly<OrganizerScoringSetupDashboardProps>) {
  const { eventDetail, scoringMenus, statistics, topScores, upcomingMatches } = setup;

  return (
    <div>
      {/* Header with back button and event info */}
      <div className="flex items-center gap-4 mb-6">
        <Link 
          href="/organizer/scoring"
          className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-slate-100"
        >
          <ArrowLeft size={20} className="text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{eventDetail.name}</h1>
          <div className="flex items-center mt-1">
            <span className="text-sm text-slate-500">
              <Clock size={14} className="inline mr-1" />
              {eventDetail.date} • {eventDetail.location}
            </span>
          </div>
        </div>
        
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <Settings size={16} className="mr-2" />
            Pengaturan Event
          </Button>
          <Button size="sm" className="flex items-center bg-blue-600 hover:bg-blue-700">
            Sedang Berlangsung
          </Button>
        </div>
      </div>

      {/* Responsive Tabs for mobile */}
      <div className="block md:hidden mb-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4 w-full">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="quick">Quick Actions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>Overview pertandingan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {statistics.map(stat => (
                    <div key={stat.id} className="flex flex-col items-center justify-center p-3 border rounded-md">
                      {getIconComponent(stat.icon, 20, stat.textColor)}
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <p className="text-xs text-slate-500">{stat.title}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="menu">
            <div className="grid grid-cols-2 gap-3">
              {scoringMenus.map(menu => (
                <Card key={menu.id} className={`${menu.color} cursor-pointer hover:shadow-md transition-shadow`}>
                  <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                    <div className="p-1">{getIconComponent(menu.icon, 40)}</div>
                    <CardTitle className="text-sm mb-1">{menu.title}</CardTitle>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="quick">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button className="w-full flex items-center justify-start" variant="outline">
                    <LucideTarget size={16} className="mr-2" />
                    Input Skor Kualifikasi
                  </Button>
                  <Button className="w-full flex items-center justify-start" variant="outline">
                    <Activity size={16} className="mr-2" />
                    Input Skor Eliminasi
                  </Button>
                  <Button className="w-full flex items-center justify-start" variant="outline">
                    <Medal size={16} className="mr-2" />
                    Leaderboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex flex-col space-y-6">
        {/* Section Title for Quick Statistics */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Overview Pertandingan</h2>
          <p className="text-sm text-slate-500">Terakhir diperbarui: {new Date().toLocaleTimeString()}</p>
        </div>
        
        {/* Quick Statistics - Compact version with consistent color */}
        <div className="grid grid-cols-4 gap-4">
          {statistics.map(stat => (
            <Card key={stat.id} className="bg-slate-50 border border-slate-200">
              <CardContent className="py-2 px-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-500">{stat.title}</p>
                    <div className="flex items-baseline gap-1.5">
                      <p className="text-xl font-bold text-slate-800">{stat.value}</p>
                      <p className="text-xs text-slate-500">{stat.secondaryInfo}</p>
                    </div>
                  </div>
                  <div className={`h-8 w-8 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                    {getIconComponent(stat.icon, 20, stat.textColor)}
                  </div>
                </div>
                <div className="mt-1 text-xs text-slate-500 flex items-center">
                  {stat.trendUp !== null && (
                    <span className={`inline-block h-1.5 w-1.5 rounded-full mr-1 ${stat.trendUp ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  )}
                  {stat.trend}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section Title for Main Menu */}
        <div className="pt-2">
          <h2 className="text-lg font-semibold text-slate-800">Manajemen Pertandingan</h2>
          <p className="text-sm text-slate-500 mt-1">Pilih menu untuk mengelola berbagai aspek pertandingan</p>
        </div>
        
        {/* Main Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {scoringMenus.map(menu => (
            <Card key={menu.id} className={`${menu.color} hover:shadow-md transition-shadow`}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-4">
                    {getIconComponent(menu.icon, 40)}
                  </div>
                  <div>
                    <CardTitle className="text-base mb-1">{menu.title}</CardTitle>
                    <CardDescription className="text-xs">{menu.description}</CardDescription>
                  </div>
                </div>
                <Link href={`/organizer/scoring/123/${menu.path}`}>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    <Settings size={14} />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section Title for Analysis */}
        <div className="pt-2">
          <h2 className="text-lg font-semibold text-slate-800">Analisis & Jadwal</h2>
          <p className="text-sm text-slate-500 mt-1">Pantau performa peserta dan jadwal pertandingan mendatang</p>
        </div>
        
        {/* Bottom Row: Top Scores & Upcoming Matches */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Top Scores */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Top Scores</CardTitle>
                <Button variant="link" size="sm" className="flex items-center p-0">
                  <Medal size={16} className="mr-1" />
                  Lihat Semua
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-md border">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-12">
                        Rank
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Pemanah
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Kategori
                      </th>
                      <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Skor
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {topScores.map((score) => (
                      <tr key={`${score.name}-${score.category}`}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-slate-900">
                          {score.rank}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-slate-900">
                          <div>
                            <div className="font-medium">{score.name}</div>
                            <div className="text-xs text-slate-500">{score.club}</div>
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-slate-900">
                          {score.category}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-bold text-right">
                          {score.score}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Matches */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Jadwal Pertandingan</CardTitle>
                <Button variant="link" size="sm" className="flex items-center p-0">
                  <CalendarDays size={16} className="mr-1" />
                  Lihat Semua
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-md border">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-16">
                        Waktu
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Kategori
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        FOP
                      </th>
                      <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {upcomingMatches.map((match) => (
                      <tr key={`${match.time}-${match.fieldOfPlay}-${match.category}`}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-slate-900">
                          {match.time}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-slate-900">
                          {match.category}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-slate-900">
                          {match.fieldOfPlay}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-center">
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            {match.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Access Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-2 flex items-center justify-between md:hidden">
        <Button variant="ghost" size="sm" className="flex flex-col items-center text-xs">
          <LucideTarget className="h-5 w-5 mb-1" />
          Scoring
        </Button>
        <Button variant="ghost" size="sm" className="flex flex-col items-center text-xs">
          <Users className="h-5 w-5 mb-1" />
          Peserta
        </Button>
        <Button variant="ghost" size="sm" className="flex flex-col items-center text-xs">
          <Medal className="h-5 w-5 mb-1" />
          Leaderboard
        </Button>
        <Button variant="ghost" size="sm" className="flex flex-col items-center text-xs">
          <Settings className="h-5 w-5 mb-1" />
          Setting
        </Button>
      </div>
    </div>
  );
}
