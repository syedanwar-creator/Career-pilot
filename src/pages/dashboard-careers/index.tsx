import { CareerLibrary, useCareerExplorerPage } from "@/features/dashboard";
import { ContentPageSkeleton } from "@/shared/components/Skeletons";

export default function DashboardCareersPage(): JSX.Element {
  const { categories, category, filteredCareers, isLoading, search, setCategory, setSearch } = useCareerExplorerPage();

  if (isLoading) {
    return <ContentPageSkeleton />;
  }

  return (
    <CareerLibrary
      categories={categories}
      careers={filteredCareers}
      category={category}
      onCategoryChange={setCategory}
      onSearchChange={setSearch}
      search={search}
    />
  );
}
