import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { CareerExplorer, useCareerExplorerPage } from "@/features/dashboard";
import { ContentPageSkeleton } from "@/shared/components/Skeletons";

export default function DashboardCareersPage(): JSX.Element {
  const { categories, category, filteredCareers, isLoading, search, selectedCareer, selectCareer, setCategory, setSearch } =
    useCareerExplorerPage();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const careerId = searchParams.get("careerId");

    if (careerId) {
      selectCareer(careerId);
    }
  }, [searchParams, selectCareer]);

  if (isLoading) {
    return <ContentPageSkeleton />;
  }

  return (
    <CareerExplorer
      categories={categories}
      careers={filteredCareers}
      category={category}
      onCategoryChange={setCategory}
      onSearchChange={setSearch}
      onSelectCareer={selectCareer}
      search={search}
      selectedCareer={selectedCareer}
    />
  );
}
