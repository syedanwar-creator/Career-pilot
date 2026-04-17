import { useAdminCareerLibraryPage } from "@/features/admin";
import { CareerExplorer } from "@/features/dashboard";
import { TablePageSkeleton } from "@/shared/components/Skeletons";

export default function AdminCareersPage(): JSX.Element {
  const { categories, category, filteredCareers, isLoading, search, selectedCareer, selectCareer, setCategory, setSearch } =
    useAdminCareerLibraryPage();

  if (isLoading) {
    return <TablePageSkeleton />;
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
