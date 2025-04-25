"use client";

import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  ArrowUpDown,
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Filter, 
  Pencil, 
  Plus, 
  Search, 
  SlidersHorizontal, 
  Trash2, 
  Users, 
  X 
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

// Data dummy untuk detail event
const eventDetails = {
  id: "123",
  name: "Kejuaraan Nasional Panahan 2025",
  location: "Lapangan Panahan Senayan, Jakarta",
  date: "15-17 Juni 2025",
  activeArchers: 128,
  teams: 16,
  mixTeams: 8,
};

// Data dummy untuk kategori
const categories = [
  { id: 1, name: "Recurve" },
  { id: 2, name: "Compound" },
  { id: 3, name: "Barebow" },
  { id: 4, name: "Traditional" },
  { id: 5, name: "Standard Bow" },
  { id: 6, name: "Instinctive" }
];

// Data dummy untuk kelas
const classList = [
  { id: 1, name: "U-15" },
  { id: 2, name: "U-18" },
  { id: 3, name: "Senior" },
  { id: 4, name: "Master" }
];

// Data dummy untuk gender
const genderList = [
  { id: 1, name: "Putra" },
  { id: 2, name: "Putri" }
];

// Data dummy untuk peserta individu
const individualArchers = [
  { 
    id: 1, 
    name: "Ahmad Fauzi", 
    club: "Arcadia Archery Club", 
    category: "Recurve", 
    class: "Senior", 
    gender: "Putra",
    targetNo: "01A", 
    status: "Terkonfirmasi",
    qualificationScore: 558,
    memberSince: "2023"
  },
  { 
    id: 2, 
    name: "Dimas Prayoga", 
    club: "Golden Arrow Archery", 
    category: "Recurve", 
    class: "Senior", 
    gender: "Putra",
    targetNo: "01B", 
    status: "Terkonfirmasi",
    qualificationScore: 543,
    memberSince: "2022"
  },
  { 
    id: 3, 
    name: "Maya Sari", 
    club: "Arcadia Archery Club", 
    category: "Recurve", 
    class: "Senior", 
    gender: "Putri",
    targetNo: "02A", 
    status: "Terkonfirmasi",
    qualificationScore: 551,
    memberSince: "2021"
  },
  { 
    id: 4, 
    name: "Dewi Anggraini", 
    club: "Royal Archery", 
    category: "Recurve", 
    class: "Senior", 
    gender: "Putri",
    targetNo: "02B", 
    status: "Terkonfirmasi",
    qualificationScore: 549,
    memberSince: "2023"
  },
  { 
    id: 5, 
    name: "Budi Santoso", 
    club: "Surabaya Archery Club", 
    category: "Compound", 
    class: "Senior", 
    gender: "Putra",
    targetNo: "03A", 
    status: "Terkonfirmasi",
    qualificationScore: 584,
    memberSince: "2020"
  },
  { 
    id: 6, 
    name: "Agus Setiawan", 
    club: "Jakarta Archery Club", 
    category: "Compound", 
    class: "Senior", 
    gender: "Putra",
    targetNo: "03B", 
    status: "Terkonfirmasi",
    qualificationScore: 578,
    memberSince: "2021"
  },
  { 
    id: 7, 
    name: "Siti Nurhaliza", 
    club: "Bandung Archery", 
    category: "Compound", 
    class: "Senior", 
    gender: "Putri",
    targetNo: "04A", 
    status: "Terkonfirmasi",
    qualificationScore: 572,
    memberSince: "2022"
  },
  { 
    id: 8, 
    name: "Ratna Sari", 
    club: "Jakarta Archery Club", 
    category: "Compound", 
    class: "Senior", 
    gender: "Putri",
    targetNo: "04B", 
    status: "Terkonfirmasi",
    qualificationScore: 564,
    memberSince: "2022"
  },
  { 
    id: 9, 
    name: "Rudi Hartono", 
    club: "Yogyakarta Archery", 
    category: "Barebow", 
    class: "Senior", 
    gender: "Putra",
    targetNo: "05A", 
    status: "Terkonfirmasi",
    qualificationScore: 492,
    memberSince: "2023"
  },
  { 
    id: 10, 
    name: "Bayu Pradana", 
    club: "Solo Archery Club", 
    category: "Barebow", 
    class: "Senior", 
    gender: "Putra",
    targetNo: "05B", 
    status: "Terkonfirmasi",
    qualificationScore: 485,
    memberSince: "2021"
  },
  { 
    id: 11, 
    name: "Anisa Putri", 
    club: "Bandung Archery", 
    category: "Barebow", 
    class: "Senior", 
    gender: "Putri",
    targetNo: "06A", 
    status: "Terkonfirmasi",
    qualificationScore: 478,
    memberSince: "2022"
  },
  { 
    id: 12, 
    name: "Dian Ayu", 
    club: "Semarang Archery", 
    category: "Barebow", 
    class: "Senior", 
    gender: "Putri",
    targetNo: "06B", 
    status: "Terkonfirmasi",
    qualificationScore: 470,
    memberSince: "2023"
  },
  { 
    id: 13, 
    name: "Farhan Abdi", 
    club: "Medan Archery", 
    category: "Traditional", 
    class: "Senior", 
    gender: "Putra",
    targetNo: "07A", 
    status: "Terkonfirmasi",
    qualificationScore: 368,
    memberSince: "2021"
  },
  { 
    id: 14, 
    name: "Gunawan", 
    club: "Bali Archery Club", 
    category: "Traditional", 
    class: "Senior", 
    gender: "Putra",
    targetNo: "07B", 
    status: "Terkonfirmasi",
    qualificationScore: 352,
    memberSince: "2022"
  },
  { 
    id: 15, 
    name: "Putri Amelia", 
    club: "Surabaya Archery Club", 
    category: "Traditional", 
    class: "Senior", 
    gender: "Putri",
    targetNo: "08A", 
    status: "Terkonfirmasi",
    qualificationScore: 345,
    memberSince: "2023"
  },
];

// Data dummy untuk team
const teams = [
  {
    id: 1,
    name: "Arcadia Archery Club",
    category: "Recurve",
    class: "Senior",
    gender: "Putra",
    members: ["Ahmad Fauzi", "Dimas Prayoga", "Reza Fahmi"],
    status: "Terkonfirmasi",
    qualificationScore: 1620
  },
  {
    id: 2,
    name: "Royal Archery",
    category: "Recurve",
    class: "Senior",
    gender: "Putra",
    members: ["Andi Susanto", "Rudi Hartono", "Bayu Pradana"],
    status: "Terkonfirmasi",
    qualificationScore: 1595
  },
  {
    id: 3,
    name: "Jakarta Archery Club",
    category: "Recurve",
    class: "Senior",
    gender: "Putra",
    members: ["Agus Setiawan", "Gunawan", "Farhan Abdi"],
    status: "Terkonfirmasi",
    qualificationScore: 1585
  },
  {
    id: 4,
    name: "Arcadia Archery Club",
    category: "Recurve",
    class: "Senior",
    gender: "Putri",
    members: ["Maya Sari", "Ratna Sari", "Dian Ayu"],
    status: "Terkonfirmasi",
    qualificationScore: 1575
  },
  {
    id: 5,
    name: "Bandung Archery",
    category: "Recurve",
    class: "Senior",
    gender: "Putri",
    members: ["Siti Nurhaliza", "Anisa Putri", "Putri Amelia"],
    status: "Terkonfirmasi",
    qualificationScore: 1560
  },
  {
    id: 6,
    name: "Surabaya Archery Club",
    category: "Compound",
    class: "Senior",
    gender: "Putra",
    members: ["Budi Santoso", "Reza Pratama", "Deni Sumargo"],
    status: "Terkonfirmasi",
    qualificationScore: 1720
  },
  {
    id: 7,
    name: "Golden Arrow Archery",
    category: "Compound",
    class: "Senior",
    gender: "Putra",
    members: ["Agus Setiawan", "Bayu Pradana", "Fahmi Ardiansyah"],
    status: "Terkonfirmasi",
    qualificationScore: 1705
  },
  {
    id: 8,
    name: "Bandung Archery",
    category: "Compound",
    class: "Senior",
    gender: "Putri",
    members: ["Siti Nurhaliza", "Anisa Putri", "Dian Ayu"],
    status: "Terkonfirmasi",
    qualificationScore: 1685
  },
];

// Data dummy untuk mix team
const mixTeams = [
  {
    id: 1,
    name: "Arcadia Archery Club",
    category: "Recurve",
    class: "Senior",
    members: ["Ahmad Fauzi", "Maya Sari"],
    status: "Terkonfirmasi",
    qualificationScore: 1109
  },
  {
    id: 2,
    name: "Royal Archery",
    category: "Recurve",
    class: "Senior",
    members: ["Andi Susanto", "Dewi Anggraini"],
    status: "Terkonfirmasi",
    qualificationScore: 1092
  },
  {
    id: 3,
    name: "Jakarta Archery Club",
    category: "Recurve",
    class: "Senior",
    members: ["Agus Setiawan", "Ratna Sari"],
    status: "Terkonfirmasi",
    qualificationScore: 1085
  },
  {
    id: 4,
    name: "Surabaya Archery Club",
    category: "Compound",
    class: "Senior",
    members: ["Budi Santoso", "Putri Amelia"],
    status: "Terkonfirmasi",
    qualificationScore: 1156
  },
  {
    id: 5,
    name: "Bandung Archery",
    category: "Compound",
    class: "Senior",
    gender: "Putri",
    members: ["Rudi Hartono", "Siti Nurhaliza"],
    status: "Terkonfirmasi",
    qualificationScore: 1144
  },
  {
    id: 6,
    name: "Golden Arrow Archery",
    category: "Compound",
    class: "Senior",
    members: ["Dimas Prayoga", "Anisa Putri"],
    status: "Terkonfirmasi",
    qualificationScore: 1135
  },
  {
    id: 7,
    name: "Medan Archery",
    category: "Barebow",
    class: "Senior",
    members: ["Farhan Abdi", "Dian Ayu"],
    status: "Terkonfirmasi",
    qualificationScore: 960
  },
  {
    id: 8,
    name: "Yogyakarta Archery",
    category: "Barebow",
    class: "Senior",
    members: ["Bayu Pradana", "Putri Amelia"],
    status: "Terkonfirmasi",
    qualificationScore: 945
  },
];

// --- Helper functions for filtering ---

// Helper function to check category match
const isCategoryMatch = (itemCategory: string, selectedCategoryIds: number[]) => {
  if (selectedCategoryIds.length === 0) return true; // No filter applied
  return selectedCategoryIds.some(id => categories.find(c => c.id === id)?.name === itemCategory);
};

// Helper function to check class match
const isClassMatch = (itemClass: string, selectedClassIds: number[]) => {
  if (selectedClassIds.length === 0) return true; // No filter applied
  return selectedClassIds.some(id => classList.find(c => c.id === id)?.name === itemClass);
};

// Helper function to check gender match
const isGenderMatch = (itemGender: string | undefined, selectedGenderIds: number[]) => {
  if (selectedGenderIds.length === 0) return true; // No filter applied
  if (itemGender === undefined) return false; // Gender filter active, but item has no gender
  return selectedGenderIds.some(id => genderList.find(g => g.id === id)?.name === itemGender);
};

// Helper function to filter individual archers
const filterIndividualArchers = (
  archers: typeof individualArchers,
  query: string,
  selectedCategories: number[],
  selectedClasses: number[],
  selectedGenders: number[]
) => {
  const lowerCaseQuery = query.toLowerCase();

  return archers.filter(archer => {
    const queryMatch = !query || (
      archer.name.toLowerCase().includes(lowerCaseQuery) ||
      archer.club.toLowerCase().includes(lowerCaseQuery) ||
      archer.targetNo.toLowerCase().includes(lowerCaseQuery)
    );

    const categoryMatch = isCategoryMatch(archer.category, selectedCategories);
    const classMatch = isClassMatch(archer.class, selectedClasses);
    const genderMatch = isGenderMatch(archer.gender, selectedGenders);

    return queryMatch && categoryMatch && classMatch && genderMatch;
  });
};

// Helper function to filter teams (generic)
const filterTeamsData = <T extends typeof teams[0] | typeof mixTeams[0]>(
  teamsData: T[], 
  query: string,
  selectedCategories: number[],
  selectedClasses: number[],
  selectedGenders?: number[] // Optional for mix teams
): T[] => {
  const lowerCaseQuery = query.toLowerCase();

  return teamsData.filter(team => {
    const queryMatch = !query || (
      team.name.toLowerCase().includes(lowerCaseQuery) ||
      team.members.some(member => member.toLowerCase().includes(lowerCaseQuery))
    );

    const categoryMatch = isCategoryMatch(team.category, selectedCategories);
    const classMatch = isClassMatch(team.class, selectedClasses);
    // Check gender only if selectedGenders is provided
    const genderMatch = !selectedGenders || isGenderMatch('gender' in team ? team.gender : undefined, selectedGenders);

    return queryMatch && categoryMatch && classMatch && genderMatch;
  });
};

export default function ParticipantsPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("individual");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<number[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<number[]>([]);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Filtered data
  const [filteredIndividuals, setFilteredIndividuals] = useState(individualArchers);
  const [filteredTeams, setFilteredTeams] = useState(teams);
  const [filteredMixTeams, setFilteredMixTeams] = useState(mixTeams);
  
  // Apply filters
  useEffect(() => {
    const individuals = filterIndividualArchers(
      individualArchers, 
      searchQuery, 
      selectedCategories, 
      selectedClasses, 
      selectedGenders
    );
    setFilteredIndividuals(individuals);

    // Explicitly type the call for regular teams
    const regularTeams = filterTeamsData<typeof teams[0]>(
      teams, 
      searchQuery, 
      selectedCategories, 
      selectedClasses, 
      selectedGenders // Pass gender for regular teams
    );
    setFilteredTeams(regularTeams);

    // Explicitly type the call for mix teams
    const mixedTeams = filterTeamsData<typeof mixTeams[0]>(
      mixTeams, 
      searchQuery, 
      selectedCategories, 
      selectedClasses 
      // No gender filter for mix teams
    );
    setFilteredMixTeams(mixedTeams);
    
  }, [searchQuery, selectedCategories, selectedClasses, selectedGenders]);
  
  // Get current items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIndividuals = filteredIndividuals.slice(indexOfFirstItem, indexOfLastItem);
  const currentTeams = filteredTeams.slice(indexOfFirstItem, indexOfLastItem);
  const currentMixTeams = filteredMixTeams.slice(indexOfFirstItem, indexOfLastItem);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Toggle category selection
  const toggleCategory = (categoryId: number) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  // Toggle class selection
  const toggleClass = (classId: number) => {
    setSelectedClasses(prev => 
      prev.includes(classId)
        ? prev.filter(id => id !== classId)
        : [...prev, classId]
    );
  };
  
  // Toggle gender selection
  const toggleGender = (genderId: number) => {
    setSelectedGenders(prev => 
      prev.includes(genderId)
        ? prev.filter(id => id !== genderId)
        : [...prev, genderId]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedClasses([]);
    setSelectedGenders([]);
    setSearchQuery("");
  };

  // Format filter labels
  const getFilterLabels = () => {
    const categoryLabels = selectedCategories.map(id => 
      categories.find(c => c.id === id)?.name
    );
    
    const classLabels = selectedClasses.map(id => 
      classList.find(c => c.id === id)?.name
    );
    
    const genderLabels = selectedGenders.map(id => 
      genderList.find(g => g.id === id)?.name
    );
    
    return {
      categories: categoryLabels.join(", ") || "Semua Kategori",
      classes: classLabels.join(", ") || "Semua Kelas",
      genders: genderLabels.join(", ") || "Semua Gender"
    };
  };
  
  const filterLabels = getFilterLabels();
  const activeFiltersCount = selectedCategories.length + selectedClasses.length + selectedGenders.length;
  
  // Helper function to get total items based on active tab
  const getTotalItems = () => {
    if (activeTab === "individual") return filteredIndividuals.length;
    if (activeTab === "team") return filteredTeams.length;
    if (activeTab === "mixTeam") return filteredMixTeams.length;
    return 0;
  };

  // Helper function to get page count
  const getPageCount = () => {
    const total = getTotalItems();
    return Math.ceil(total / itemsPerPage);
  };

  // Helper function to render pagination info text
  const renderPaginationInfo = () => {
    const total = getTotalItems();
    const start = Math.min((currentPage - 1) * itemsPerPage + 1, total);
    const end = Math.min(currentPage * itemsPerPage, total);
    
    let itemType: string;
    if (activeTab === "individual") {
      itemType = "peserta";
    } else if (activeTab === "team") {
      itemType = "tim";
    } else { // mixTeam
      itemType = "mix team";
    }
    
    return `Menampilkan ${start}-${end} dari ${total} ${itemType}`;
  };

  // Helper function to render page buttons
  const renderPageButtons = () => {
    const pageCount = getPageCount();
    const pages = [];
    
    // Logic to determine which page numbers to show (e.g., first, last, current, neighbors)
    // For simplicity, showing first 3 pages as in the original code
    const maxVisiblePages = 3; 
    let startPage = 1;
    let endPage = Math.min(maxVisiblePages, pageCount);

    // Adjust if current page is near the end
    if (currentPage > pageCount - Math.floor(maxVisiblePages / 2)) {
        startPage = Math.max(1, pageCount - maxVisiblePages + 1);
        endPage = pageCount;
    } 
    // Adjust if current page is somewhere in the middle
    else if (currentPage > Math.floor(maxVisiblePages / 2)) {
        startPage = currentPage - Math.floor(maxVisiblePages / 2);
        endPage = currentPage + Math.floor(maxVisiblePages / 2);
    }

    // Ensure endPage doesn't exceed pageCount
    endPage = Math.min(endPage, pageCount);

    // Add ellipsis if needed at the beginning
    if (startPage > 1) {
        pages.push(
            <Button key="start-ellipsis" variant="ghost" size="sm" className="h-8 w-8 p-0" disabled>...</Button>
        );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button 
          key={i}
          variant="outline" 
          size="sm" 
          className={`h-8 w-8 p-0 flex items-center justify-center ${
            currentPage === i ? "bg-blue-100 text-blue-600 border-blue-300" : ""
          }`}
          onClick={() => paginate(i)}
        >
          {i}
        </Button>
      );
    }

    // Add ellipsis if needed at the end
    if (endPage < pageCount) {
        pages.push(
            <Button key="end-ellipsis" variant="ghost" size="sm" className="h-8 w-8 p-0" disabled>...</Button>
        );
    }
    
    return pages;
  };

  return (
    <MainLayout>
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6">
        <Link 
          href={`/scoring/${params.eventId}/dashboard`}
          className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-slate-100"
        >
          <ArrowLeft size={20} className="text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Daftar Peserta</h1>
          <p className="text-slate-500 text-sm mt-1">
            {eventDetails.name} • {eventDetails.date}
          </p>
        </div>
      </div>
      
      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Peserta Individu</p>
              <p className="text-2xl font-bold text-blue-600">{individualArchers.length}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Users size={20} className="text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Team</p>
              <p className="text-2xl font-bold text-green-600">{teams.length}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <Users size={20} className="text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Mix Team</p>
              <p className="text-2xl font-bold text-purple-600">{mixTeams.length}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Users size={20} className="text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Filter and search bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Cari nama, klub, atau target..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                <SlidersHorizontal size={14} className="mr-2" />
                Filter
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 bg-blue-500">{activeFiltersCount}</Badge>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Filter Peserta</DialogTitle>
                <DialogDescription>
                  Pilih filter untuk menyesuaikan tampilan data peserta
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Kategori</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`category-${category.id}`} 
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => toggleCategory(category.id)} 
                        />
                        <label 
                          htmlFor={`category-${category.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Kelas</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {classList.map((cls) => (
                      <div key={cls.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`class-${cls.id}`} 
                          checked={selectedClasses.includes(cls.id)}
                          onCheckedChange={() => toggleClass(cls.id)} 
                        />
                        <label 
                          htmlFor={`class-${cls.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {cls.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Gender</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {genderList.map((gender) => (
                      <div key={gender.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`gender-${gender.id}`} 
                          checked={selectedGenders.includes(gender.id)}
                          onCheckedChange={() => toggleGender(gender.id)} 
                        />
                        <label 
                          htmlFor={`gender-${gender.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {gender.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter className="flex justify-between sm:justify-between">
                <Button variant="outline" onClick={clearFilters} type="button">
                  Reset Filter
                </Button>
                <Button type="button" onClick={() => setShowFilterDialog(false)}>
                  Terapkan Filter
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <Download size={14} className="mr-2" />
            Export
          </Button>
          
          <Button className="flex items-center bg-blue-600 hover:bg-blue-700">
            <Plus size={14} className="mr-2" />
            Tambah Peserta
          </Button>
        </div>
      </div>
      
      {/* Active filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 p-3 bg-slate-50 rounded-md border">
          <div className="flex items-center mr-2">
            <Filter size={14} className="mr-1 text-slate-500" />
            <span className="text-sm font-medium">Filter Aktif:</span>
          </div>
          
          {selectedCategories.length > 0 && (
            <Badge variant="outline" className="flex items-center gap-1 bg-blue-50">
              Kategori: {filterLabels.categories}
              <button onClick={() => setSelectedCategories([])} className="ml-1 hover:bg-blue-100 rounded-full">
                <X size={12} />
              </button>
            </Badge>
          )}
          
          {selectedClasses.length > 0 && (
            <Badge variant="outline" className="flex items-center gap-1 bg-green-50">
              Kelas: {filterLabels.classes}
              <button onClick={() => setSelectedClasses([])} className="ml-1 hover:bg-green-100 rounded-full">
                <X size={12} />
              </button>
            </Badge>
          )}
          
          {selectedGenders.length > 0 && (
            <Badge variant="outline" className="flex items-center gap-1 bg-purple-50">
              Gender: {filterLabels.genders}
              <button onClick={() => setSelectedGenders([])} className="ml-1 hover:bg-purple-100 rounded-full">
                <X size={12} />
              </button>
            </Badge>
          )}
          
          <button 
            onClick={clearFilters}
            className="ml-auto text-xs text-blue-600 hover:text-blue-800 hover:underline"
          >
            Hapus semua filter
          </button>
        </div>
      )}
      
      {/* Tabs */}
      <Tabs defaultValue="individual" className="mb-6" onValueChange={(value) => setActiveTab(value)}>
        <TabsList className="mb-4">
          <TabsTrigger value="individual">
            Individu ({filteredIndividuals.length})
          </TabsTrigger>
          <TabsTrigger value="team">
            Team ({filteredTeams.length})
          </TabsTrigger>
          <TabsTrigger value="mixTeam">
            Mix Team ({filteredMixTeams.length})
          </TabsTrigger>
        </TabsList>
        
        {/* Individual Tab */}
        <TabsContent value="individual" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          No Target
                          <ArrowUpDown size={14} className="ml-1 text-slate-400" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          Nama
                          <ArrowUpDown size={14} className="ml-1 text-slate-400" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          Klub
                          <ArrowUpDown size={14} className="ml-1 text-slate-400" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          Kategori
                          <ArrowUpDown size={14} className="ml-1 text-slate-400" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                        <div className="flex items-center justify-center">
                          Kelas
                          <ArrowUpDown size={14} className="ml-1 text-slate-400" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                        <div className="flex items-center justify-center">
                          Gender
                          <ArrowUpDown size={14} className="ml-1 text-slate-400" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentIndividuals.length > 0 ? (
                      currentIndividuals.map((archer) => (
                        <tr key={archer.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900">
                            {archer.targetNo}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
                            {archer.name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
                            {archer.club}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
                            {archer.category}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900 text-center">
                            {archer.class}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900 text-center">
                            {archer.gender}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              {archer.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Pencil size={14} />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="px-4 py-6 text-center text-sm text-slate-500">
                          Tidak ada data peserta yang sesuai dengan filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Team Tab */}
        <TabsContent value="team" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          Nama Tim
                          <ArrowUpDown size={14} className="ml-1 text-slate-400" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          Kategori
                          <ArrowUpDown size={14} className="ml-1 text-slate-400" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                        <div className="flex items-center justify-center">
                          Kelas
                          <ArrowUpDown size={14} className="ml-1 text-slate-400" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                        <div className="flex items-center justify-center">
                          Gender
                          <ArrowUpDown size={14} className="ml-1 text-slate-400" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Anggota
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentTeams.length > 0 ? (
                      currentTeams.map((team) => (
                        <tr key={team.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900">
                            {team.name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
                            {team.category}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900 text-center">
                            {team.class}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900 text-center">
                            {team.gender}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-900">
                            <div className="flex flex-wrap gap-1">
                              {team.members.map((member) => (
                                <Badge key={member} variant="outline" className="bg-slate-50">
                                  {member}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              {team.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Pencil size={14} />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-4 py-6 text-center text-sm text-slate-500">
                          Tidak ada data tim yang sesuai dengan filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Mix Team Tab */}
        <TabsContent value="mixTeam" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          Nama Tim
                          <ArrowUpDown size={14} className="ml-1 text-slate-400" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          Kategori
                          <ArrowUpDown size={14} className="ml-1 text-slate-400" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                        <div className="flex items-center justify-center">
                          Kelas
                          <ArrowUpDown size={14} className="ml-1 text-slate-400" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Anggota
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentMixTeams.length > 0 ? (
                      currentMixTeams.map((team) => (
                        <tr key={team.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900">
                            {team.name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
                            {team.category}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900 text-center">
                            {team.class}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-900">
                            <div className="flex flex-wrap gap-1">
                              {team.members.map((member) => (
                                <Badge key={member} variant="outline" className="bg-slate-50">
                                  {member}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              {team.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Pencil size={14} />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-4 py-6 text-center text-sm text-slate-500">
                          Tidak ada data mix team yang sesuai dengan filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-slate-600">
          {renderPaginationInfo()}
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0 flex items-center justify-center"
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </Button>
          
          {renderPageButtons()}
          
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0 flex items-center justify-center"
            onClick={() => paginate(Math.min(getPageCount(), currentPage + 1))}
            disabled={currentPage === getPageCount()}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}