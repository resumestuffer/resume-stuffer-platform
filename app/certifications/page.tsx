"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Filter,
  Grid,
  List,
  Award,
  DollarSign,
  Clock,
  TrendingUp,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import MobileHeader from "../MobileHeader";
import Footer from "../components/Footer";

// Filter interfaces
interface FilterState {
  search: string;
  providers: string[];
  priceRanges: string[];
  experienceLevels: string[];
  studyTimeRanges: string[];
  sort: string;
  page: number;
}

interface Provider {
  id: string;
  name: string;
  slug: string;
  _count: { certifications: number };
}

const ITEMS_PER_PAGE = 12;

// Price range definitions
const PRICE_RANGES = [
  { id: 'free', label: 'Free', min: 0, max: 0 },
  { id: 'budget', label: '$1 - $200', min: 1, max: 20000 },
  { id: 'mid', label: '$201 - $500', min: 20001, max: 50000 },
  { id: 'premium', label: '$500+', min: 50001, max: 999999 }
];

const EXPERIENCE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

const STUDY_TIME_RANGES = [
  { id: 'quick', label: 'Quick (< 40 hours)', min: 0, max: 39 },
  { id: 'medium', label: 'Medium (40-100 hours)', min: 40, max: 100 },
  { id: 'intensive', label: 'Intensive (100+ hours)', min: 101, max: 9999 }
];

const SORT_OPTIONS = [
  { value: 'salaryIncrease', label: 'Highest Salary Impact' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'title', label: 'Name (A-Z)' },
  { value: 'studyTime', label: 'Shortest Study Time' }
];

// Filter Checkbox Component
function FilterCheckbox({ 
  id, 
  label, 
  count, 
  checked, 
  onChange 
}: { 
  id: string; 
  label: string; 
  count?: number; 
  checked: boolean; 
  onChange: (checked: boolean) => void; 
}) {
  return (
    <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-all cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 rounded border-2 border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
      />
      <span className="text-slate-700 font-medium text-sm flex-1">{label}</span>
      {count !== undefined && (
        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
          {count}
        </span>
      )}
    </label>
  );
}

// Collapsible Filter Section
function FilterSection({ 
  title, 
  icon, 
  children, 
  defaultExpanded = true 
}: { 
  title: string; 
  icon: string; 
  children: React.ReactNode; 
  defaultExpanded?: boolean; 
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="border-b border-slate-200 pb-6 mb-6">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full mb-4 text-left"
      >
        <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide flex items-center gap-2">
          <span>{icon}</span>
          {title}
        </h3>
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {expanded && <div className="space-y-2">{children}</div>}
    </div>
  );
}

// Main component
function EnhancedCertificationsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // State
  const [data, setData] = useState<any>({
    certifications: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
  });
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    providers: [],
    priceRanges: [],
    experienceLevels: [],
    studyTimeRanges: [],
    sort: "salaryIncrease",
    page: 1,
  });

  // Initialize filters from URL
  useEffect(() => {
    const newFilters: FilterState = {
      search: searchParams.get("search") || "",
      providers: searchParams.get("providers")?.split(",").filter(Boolean) || [],
      priceRanges: searchParams.get("priceRanges")?.split(",").filter(Boolean) || [],
      experienceLevels: searchParams.get("experienceLevels")?.split(",").filter(Boolean) || [],
      studyTimeRanges: searchParams.get("studyTimeRanges")?.split(",").filter(Boolean) || [],
      sort: searchParams.get("sort") || "salaryIncrease",
      page: parseInt(searchParams.get("page") || "1"),
    };
    setFilters(newFilters);
    setSearchTerm(newFilters.search);
  }, [searchParams]);

  // Update URL when filters change
  const updateURL = (newFilters: FilterState) => {
    const params = new URLSearchParams();
    
    if (newFilters.search) params.set("search", newFilters.search);
    if (newFilters.providers.length > 0) params.set("providers", newFilters.providers.join(","));
    if (newFilters.priceRanges.length > 0) params.set("priceRanges", newFilters.priceRanges.join(","));
    if (newFilters.experienceLevels.length > 0) params.set("experienceLevels", newFilters.experienceLevels.join(","));
    if (newFilters.studyTimeRanges.length > 0) params.set("studyTimeRanges", newFilters.studyTimeRanges.join(","));
    if (newFilters.sort !== "salaryIncrease") params.set("sort", newFilters.sort);
    if (newFilters.page > 1) params.set("page", newFilters.page.toString());

    const newURL = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.push(newURL);
  };

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Build API params
        const apiParams = new URLSearchParams();
        if (filters.search) apiParams.set("search", filters.search);
        if (filters.providers.length > 0) apiParams.set("providers", filters.providers.join(","));
        if (filters.priceRanges.length > 0) apiParams.set("priceRanges", filters.priceRanges.join(","));
        if (filters.experienceLevels.length > 0) apiParams.set("experienceLevels", filters.experienceLevels.join(","));
        if (filters.studyTimeRanges.length > 0) apiParams.set("studyTimeRanges", filters.studyTimeRanges.join(","));
        apiParams.set("sort", filters.sort);
        apiParams.set("page", filters.page.toString());

        const [certificationsResponse, providersResponse] = await Promise.all([
          fetch(`/api/certifications-enhanced?${apiParams.toString()}`),
          fetch("/api/providers"),
        ]);

        const certificationsData = await certificationsResponse.json();
        const providersData = await providersResponse.json();

        setData(certificationsData);
        setProviders(providersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  // Filter handlers
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newFilters = { ...filters, search: searchTerm, page: 1 };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const clearSearch = () => {
    setSearchTerm("");
    const newFilters = { ...filters, search: "", page: 1 };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const toggleProvider = (providerSlug: string) => {
    const newProviders = filters.providers.includes(providerSlug)
      ? filters.providers.filter(p => p !== providerSlug)
      : [...filters.providers, providerSlug];
    
    const newFilters = { ...filters, providers: newProviders, page: 1 };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const togglePriceRange = (rangeId: string) => {
    const newRanges = filters.priceRanges.includes(rangeId)
      ? filters.priceRanges.filter(r => r !== rangeId)
      : [...filters.priceRanges, rangeId];
    
    const newFilters = { ...filters, priceRanges: newRanges, page: 1 };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const toggleExperienceLevel = (level: string) => {
    const newLevels = filters.experienceLevels.includes(level)
      ? filters.experienceLevels.filter(l => l !== level)
      : [...filters.experienceLevels, level];
    
    const newFilters = { ...filters, experienceLevels: newLevels, page: 1 };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const toggleStudyTimeRange = (rangeId: string) => {
    const newRanges = filters.studyTimeRanges.includes(rangeId)
      ? filters.studyTimeRanges.filter(r => r !== rangeId)
      : [...filters.studyTimeRanges, rangeId];
    
    const newFilters = { ...filters, studyTimeRanges: newRanges, page: 1 };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const changeSort = (newSort: string) => {
    const newFilters = { ...filters, sort: newSort, page: 1 };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    const newFilters: FilterState = {
      search: "",
      providers: [],
      priceRanges: [],
      experienceLevels: [],
      studyTimeRanges: [],
      sort: "salaryIncrease",
      page: 1,
    };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  // Get active filter chips
  const getActiveFilters = () => {
    const chips: Array<{ id: string; label: string; remove: () => void }> = [];
    
    if (filters.search) {
      chips.push({
        id: 'search',
        label: `"${filters.search}"`,
        remove: () => {
          setSearchTerm("");
          const newFilters = { ...filters, search: "", page: 1 };
          setFilters(newFilters);
          updateURL(newFilters);
        }
      });
    }

    filters.providers.forEach(provider => {
      const providerData = providers.find(p => p.slug === provider);
      if (providerData) {
        chips.push({
          id: `provider-${provider}`,
          label: providerData.name,
          remove: () => toggleProvider(provider)
        });
      }
    });

    filters.priceRanges.forEach(range => {
      const rangeData = PRICE_RANGES.find(r => r.id === range);
      if (rangeData) {
        chips.push({
          id: `price-${range}`,
          label: rangeData.label,
          remove: () => togglePriceRange(range)
        });
      }
    });

    filters.experienceLevels.forEach(level => {
      chips.push({
        id: `level-${level}`,
        label: level,
        remove: () => toggleExperienceLevel(level)
      });
    });

    filters.studyTimeRanges.forEach(range => {
      const rangeData = STUDY_TIME_RANGES.find(r => r.id === range);
      if (rangeData) {
        chips.push({
          id: `time-${range}`,
          label: rangeData.label,
          remove: () => toggleStudyTimeRange(range)
        });
      }
    });

    return chips;
  };

  const { certifications, totalCount, totalPages } = data;

  if (loading) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center"
        style={{ fontFamily: "Work Sans, system-ui, sans-serif" }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading certifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
      style={{ fontFamily: "Work Sans, system-ui, sans-serif" }}
    >
      {/* Header */}
      <MobileHeader />

      {/* Page Header with Enhanced Search */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6"
              style={{
                fontFamily: "Work Sans, system-ui, sans-serif",
                fontWeight: 700,
              }}
            >
              All{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Certifications
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
              Discover high-impact certifications that can boost your salary and advance your career.
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 mb-6">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search AWS, Google Cloud, Security, Data Analytics..."
                  className="w-full pl-12 pr-24 py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder-slate-500 text-lg"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-20 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm font-medium"
                  >
                    clear
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Filter Chips */}
            {getActiveFilters().length > 0 && (
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-slate-700">Applied Filters:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {getActiveFilters().map(filter => (
                    <span
                      key={filter.id}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {filter.label}
                      <X 
                        className="w-4 h-4 cursor-pointer hover:text-blue-900" 
                        onClick={filter.remove} 
                      />
                    </span>
                  ))}
                  <button
                    onClick={clearAllFilters}
                    className="text-blue-600 text-sm font-medium hover:text-blue-800 ml-2"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Filter Button - Only visible on mobile */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Filter size={20} />
              <span className="font-medium">
                Filters {getActiveFilters().length > 0 && `(${getActiveFilters().length})`}
              </span>
            </button>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Desktop Sidebar - Hidden on mobile */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 sticky top-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-slate-900">Filters</h2>
                  <span className="text-sm text-slate-500">
                    Showing {totalCount} results
                  </span>
                </div>

                {/* Providers */}
                <FilterSection title="PROVIDERS" icon="🏢">
                  {providers.slice(0, 6).map((provider) => (
                    <FilterCheckbox
                      key={provider.slug}
                      id={provider.slug}
                      label={provider.name}
                      count={provider._count.certifications}
                      checked={filters.providers.includes(provider.slug)}
                      onChange={() => toggleProvider(provider.slug)}
                    />
                  ))}
                  {providers.length > 6 && (
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-800 mt-2">
                      + Show {providers.length - 6} more providers
                    </button>
                  )}
                </FilterSection>

                {/* Price Range */}
                <FilterSection title="PRICE RANGE" icon="💰">
                  {PRICE_RANGES.map((range) => (
                    <FilterCheckbox
                      key={range.id}
                      id={range.id}
                      label={range.label}
                      checked={filters.priceRanges.includes(range.id)}
                      onChange={() => togglePriceRange(range.id)}
                    />
                  ))}
                </FilterSection>

                {/* Experience Level */}
                <FilterSection title="EXPERIENCE LEVEL" icon="📈">
                  {EXPERIENCE_LEVELS.map((level) => (
                    <FilterCheckbox
                      key={level}
                      id={level}
                      label={level}
                      checked={filters.experienceLevels.includes(level)}
                      onChange={() => toggleExperienceLevel(level)}
                    />
                  ))}
                </FilterSection>

                {/* Study Time */}
                <FilterSection title="STUDY TIME" icon="⏱️">
                  {STUDY_TIME_RANGES.map((range) => (
                    <FilterCheckbox
                      key={range.id}
                      id={range.id}
                      label={range.label}
                      checked={filters.studyTimeRanges.includes(range.id)}
                      onChange={() => toggleStudyTimeRange(range.id)}
                    />
                  ))}
                </FilterSection>

                {/* Sort Options */}
                <FilterSection title="SORT BY" icon="📊" defaultExpanded={false}>
                  {SORT_OPTIONS.map((option) => (
                    <label key={option.value} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-all cursor-pointer">
                      <input
                        type="radio"
                        name="sort"
                        value={option.value}
                        checked={filters.sort === option.value}
                        onChange={() => changeSort(option.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-slate-700 font-medium text-sm">{option.label}</span>
                    </label>
                  ))}
                </FilterSection>
              </div>
            </div>

            {/* Content Area - Full width on mobile, 3/4 width on desktop */}
            <div className="lg:col-span-3">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-slate-600">
                  {totalCount} certification{totalCount !== 1 ? 's' : ''} found
                  {totalPages > 1 && (
                    <span className="ml-2 text-slate-500">
                      (Page {filters.page} of {totalPages})
                    </span>
                  )}
                </p>
              </div>

              {/* Certifications Grid */}
              <Suspense fallback={<div>Loading certifications...</div>}>
                {certifications.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {certifications.map((cert: any) => (
                      <div
                        key={cert.id}
                        className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all hover:transform hover:-translate-y-1 flex flex-col"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="text-3xl">{cert.category.icon}</div>
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {cert.category.name}
                          </span>
                        </div>

                        {/* Title and Provider */}
                        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                          {cert.title}
                        </h3>
                        <p className="text-slate-600 mb-2 font-medium">
                          {cert.provider.name}
                        </p>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">
                          {cert.description}
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-slate-50 rounded-lg">
                          <div className="text-center">
                            <p className="font-semibold text-slate-900 text-sm mb-1">
                              {cert.price && cert.price > 0
                                ? `$${(cert.price / 100).toLocaleString()}`
                                : "Free"}
                            </p>
                            <p className="text-xs text-slate-500">Cost</p>
                          </div>
                          <div className="text-center">
                            <p className="font-semibold text-green-600 text-sm mb-1">
                              +${cert.salaryIncrease.toLocaleString()}/yr
                            </p>
                            <p className="text-xs text-slate-500">
                              Salary Impact
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="font-semibold text-slate-900 text-sm mb-1">
                              {cert.studyTimeHours}h
                            </p>
                            <p className="text-xs text-slate-500">Study Time</p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-auto">
                          <a
                            href={cert.enrollUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors text-center"
                          >
                            Enroll Now
                          </a>
                          <Link
                            href={`/certifications/${cert.slug}`}
                            className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            Learn More
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      No certifications found
                    </h3>
                    <p className="text-slate-600 mb-6">
                      Try adjusting your filters or search terms to find what you're looking for.
                    </p>
                    <button
                      onClick={clearAllFilters}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Grid size={20} />
                      Clear All Filters
                    </button>
                  </div>
                )}
              </Suspense>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  {filters.page > 1 && (
                    <button
                      onClick={() => {
                        const newFilters = { ...filters, page: filters.page - 1 };
                        setFilters(newFilters);
                        updateURL(newFilters);
                      }}
                      className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                    >
                      Previous
                    </button>
                  )}
                  
                  <span className="px-4 py-2 text-slate-600">
                    Page {filters.page} of {totalPages}
                  </span>

                  {filters.page < totalPages && (
                    <button
                      onClick={() => {
                        const newFilters = { ...filters, page: filters.page + 1 };
                        setFilters(newFilters);
                        updateURL(newFilters);
                      }}
                      className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                    >
                      Next
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50" 
            onClick={() => setMobileFiltersOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-900">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Filter Sections */}
              <div className="space-y-6">
                {/* Results Count */}
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-blue-900">
                    Showing {totalCount} results
                  </span>
                </div>

                {/* Providers */}
                <FilterSection title="PROVIDERS" icon="🏢">
                  {providers.slice(0, 8).map((provider) => (
                    <FilterCheckbox
                      key={provider.slug}
                      id={provider.slug}
                      label={provider.name}
                      count={provider._count.certifications}
                      checked={filters.providers.includes(provider.slug)}
                      onChange={() => toggleProvider(provider.slug)}
                    />
                  ))}
                  {providers.length > 8 && (
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-800 mt-2">
                      + Show {providers.length - 8} more providers
                    </button>
                  )}
                </FilterSection>

                {/* Price Range */}
                <FilterSection title="PRICE RANGE" icon="💰">
                  {PRICE_RANGES.map((range) => (
                    <FilterCheckbox
                      key={range.id}
                      id={range.id}
                      label={range.label}
                      checked={filters.priceRanges.includes(range.id)}
                      onChange={() => togglePriceRange(range.id)}
                    />
                  ))}
                </FilterSection>

                {/* Experience Level */}
                <FilterSection title="EXPERIENCE LEVEL" icon="📈">
                  {EXPERIENCE_LEVELS.map((level) => (
                    <FilterCheckbox
                      key={level}
                      id={level}
                      label={level}
                      checked={filters.experienceLevels.includes(level)}
                      onChange={() => toggleExperienceLevel(level)}
                    />
                  ))}
                </FilterSection>

                {/* Study Time */}
                <FilterSection title="STUDY TIME" icon="⏱️">
                  {STUDY_TIME_RANGES.map((range) => (
                    <FilterCheckbox
                      key={range.id}
                      id={range.id}
                      label={range.label}
                      checked={filters.studyTimeRanges.includes(range.id)}
                      onChange={() => toggleStudyTimeRange(range.id)}
                    />
                  ))}
                </FilterSection>

                {/* Sort Options */}
                <FilterSection title="SORT BY" icon="📊">
                  {SORT_OPTIONS.map((option) => (
                    <label key={option.value} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-all cursor-pointer">
                      <input
                        type="radio"
                        name="sort"
                        value={option.value}
                        checked={filters.sort === option.value}
                        onChange={() => changeSort(option.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-slate-700 font-medium text-sm">{option.label}</span>
                    </label>
                  ))}
                </FilterSection>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-slate-200 space-y-3">
                  <button
                    onClick={() => {
                      setMobileFiltersOpen(false);
                    }}
                    className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Apply Filters
                  </button>
                  
                  {getActiveFilters().length > 0 && (
                    <button
                      onClick={() => {
                        clearAllFilters();
                        setMobileFiltersOpen(false);
                      }}
                      className="w-full px-4 py-3 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

// Wrapped component for Suspense
export default function CertificationsPage() {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <EnhancedCertificationsPage />
    </Suspense>
  );
}