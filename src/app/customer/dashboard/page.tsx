import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Trophy, Target, Users, ArrowRight, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';

/**
 * Customer Dashboard Page
 * Dashboard untuk peserta/athletes
 */
export default function CustomerDashboardPage() {
  // Data dummy untuk contoh
  const upcomingEvents = [
    {
      id: '1',
      name: 'Kejuaraan Panahan Nasional 2024',
      date: '2024-06-15',
      location: 'Jakarta International Expo',
      category: 'Recurve',
      status: 'registered',
      registrationDeadline: '2024-06-10'
    },
    {
      id: '2',
      name: 'Turnamen Panahan Pemula',
      date: '2024-06-20',
      location: 'Lapangan Panahan Senayan',
      category: 'Barebow',
      status: 'open',
      registrationDeadline: '2024-06-18'
    }
  ];

  const recentScores = [
    {
      id: '1',
      eventName: 'Turnamen Bulanan Maret',
      date: '2024-03-15',
      score: 285,
      maxScore: 300,
      ranking: 3,
      participants: 24
    },
    {
      id: '2',
      eventName: 'Kompetisi Regional',
      date: '2024-02-28',
      score: 267,
      maxScore: 300,
      ranking: 7,
      participants: 18
    }
  ];

  const achievements = [
    { title: 'Peringkat 3 Terbaik', description: 'Turnamen Bulanan Maret', icon: Trophy },
    { title: 'Konsisten Berlatih', description: '30 hari berturut-turut', icon: Target },
    { title: 'Penembak Akurat', description: 'Skor di atas rata-rata', icon: Target },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Peserta</h1>
            <p className="text-gray-600 mt-1">Selamat datang kembali! Lihat progress dan turnamen terbaru Anda.</p>
          </div>
          <Button asChild>
            <Link href="/events">
              <Calendar className="w-4 h-4 mr-2" />
              Lihat Semua Event
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Event Terdaftar</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Kompetisi</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Skor Tertinggi</p>
                  <p className="text-2xl font-bold text-gray-900">285</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ranking Terbaik</p>
                  <p className="text-2xl font-bold text-gray-900">#3</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Event Mendatang
              </CardTitle>
              <CardDescription>
                Turnamen yang akan Anda ikuti dalam waktu dekat
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{event.name}</h3>
                      <Badge variant={event.status === 'registered' ? 'default' : 'secondary'}>
                        {event.status === 'registered' ? 'Terdaftar' : 'Buka'}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(event.date).toLocaleDateString('id-ID', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Target className="w-4 h-4 mr-2" />
                        Kategori: {event.category}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Daftar sebelum: {new Date(event.registrationDeadline).toLocaleDateString('id-ID')}
                      </div>
                    </div>
                    <div className="mt-3">
                      {event.status === 'registered' ? (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/events/${event.id}`}>
                            Lihat Detail <ArrowRight className="w-4 h-4 ml-1" />
                          </Link>
                        </Button>
                      ) : (
                        <Button size="sm" asChild>
                          <Link href={`/events/${event.id}/register`}>
                            Daftar Sekarang <ArrowRight className="w-4 h-4 ml-1" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Scores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Skor Terbaru
              </CardTitle>
              <CardDescription>
                Performa Anda di kompetisi terbaru
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentScores.map((score) => (
                  <div key={score.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{score.eventName}</h3>
                      <Badge variant="outline">
                        #{score.ranking} dari {score.participants}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{score.score}</p>
                        <p className="text-sm text-gray-600">dari {score.maxScore}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {new Date(score.date).toLocaleDateString('id-ID')}
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {((score.score / score.maxScore) * 100).toFixed(1)}% akurasi
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/profile/scores">
                    Lihat Semua Skor <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Pencapaian Terbaru
            </CardTitle>
            <CardDescription>
              Prestasi dan milestone yang telah Anda raih
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div key={index} className="flex items-center p-4 border rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Icon className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
