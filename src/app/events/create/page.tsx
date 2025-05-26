"use client";

import { Trophy, Users, BookOpen, Calendar } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";
import { EventTypeCard } from "@/components/events/EventTypeCard";
import { EventTypeOption } from "@/types/events";

const eventTypes: EventTypeOption[] = [
	{
		id: "tournament",
		title: "Tournament / Kejuaraan",
		description:
			"Kompetisi panahan skala kecil atau besar dengan berbagai kategori dan sistem penilaian yang komprehensif.",
		icon: <Trophy size={36} className="text-orange-500" />,
		link: "/events/create/tournament",
		popular: true,
	},
	{
		id: "league",
		title: "Liga",
		description:
			"Format multi-match yang berjalan dalam jangka waktu yang panjang dengan sistem poin dan klasemen real-time.",
		icon: <Trophy size={36} className="text-blue-500" />,
		link: "/events/create/league",
		coming: true,
	},
	{
		id: "series",
		title: "Series",
		description:
			"Rangkaian turnamen terkait dengan peringkat kumulatif dan grand final yang menegangkan.",
		icon: <Calendar size={36} className="text-purple-500" />,
		link: "/events/create/series",
		coming: true,
	},
	{
		id: "workshop",
		title: "Workshop",
		description:
			"Acara edukasi dan pelatihan teknik panahan untuk berbagai level kemampuan dari pemula hingga mahir.",
		icon: <BookOpen size={36} className="text-green-500" />,
		link: "/events/create/workshop",
		coming: true,
	},
	{
		id: "training",
		title: "Training Camp",
		description:
			"Program latihan intensif jangka pendek atau panjang dengan pelatih berpengalaman dan fasilitas lengkap.",
		icon: <Users size={36} className="text-red-500" />,
		link: "/events/create/training",
		coming: true,
	},
];

export default function CreateEventPage() {
	return (
		<MainLayout>
			<div className="space-y-8">
				{/* Header Section */}
				<div className="text-center">
					<h1 className="text-2xl font-bold text-slate-900 mb-2">
						Buat Event Baru
					</h1>
					<p className="text-slate-600 max-w-2xl mx-auto">
						Pilih jenis event yang ingin Anda buat. Setiap jenis event memiliki
						fitur konfigurasi yang disesuaikan dengan kebutuhan spesifik dan
						karakteristik penyelenggaraan.
					</p>
				</div>

				{/* Event Types Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{eventTypes.map((eventType) => (
						<EventTypeCard key={eventType.id} eventType={eventType} />
					))}
				</div>

				{/* Additional Info */}
				<div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
					<h3 className="font-medium text-blue-900 mb-2">
						Butuh bantuan memilih?
					</h3>
					<p className="text-blue-700 text-sm">
						Untuk acara pertama kali, kami merekomendasikan memulai dengan{" "}
						<strong>Tournament</strong> karena memiliki fitur paling lengkap dan
						mudah dikonfigurasi.
					</p>
				</div>
			</div>
		</MainLayout>
	);
}