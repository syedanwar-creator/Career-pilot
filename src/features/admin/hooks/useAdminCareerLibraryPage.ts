import { startTransition, useCallback, useDeferredValue, useEffect, useMemo, useState } from "react";

import { adminApi } from "@/features/admin/api";
import type { Career } from "@/features/dashboard/types";
import { useUiStore } from "@/store";

export function useAdminCareerLibraryPage(): {
  careers: Career[];
  filteredCareers: Career[];
  categories: string[];
  selectedCareer: Career | null;
  search: string;
  category: string;
  isLoading: boolean;
  setSearch: (value: string) => void;
  setCategory: (value: string) => void;
  selectCareer: (careerId: string) => void;
} {
  const [careers, setCareers] = useState<Career[]>([]);
  const [selectedCareerId, setSelectedCareerId] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const deferredSearch = useDeferredValue(search);
  const deferredCategory = useDeferredValue(category);
  const showNotice = useUiStore((state) => state.showNotice);

  useEffect(() => {
    let isActive = true;

    adminApi
      .getCareers()
      .then((response) => {
        if (!isActive) {
          return;
        }

        setCareers(response.careers);
        setSelectedCareerId(response.careers[0]?.id || "");
      })
      .catch((error: Error) => {
        if (!isActive) {
          return;
        }

        showNotice(error.message, "danger");
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [showNotice]);

  const filteredCareers = useMemo(() => {
    const normalizedSearch = deferredSearch.toLowerCase().trim();
    const normalizedCategory = deferredCategory.toLowerCase().trim();

    return careers.filter((career) => {
      const matchesSearch =
        !normalizedSearch ||
        career.title.toLowerCase().includes(normalizedSearch) ||
        career.category.toLowerCase().includes(normalizedSearch) ||
        career.summary.toLowerCase().includes(normalizedSearch);
      const matchesCategory = !normalizedCategory || career.category.toLowerCase() === normalizedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [careers, deferredCategory, deferredSearch]);

  const categories = useMemo(() => [...new Set(careers.map((career) => career.category))].sort(), [careers]);

  const selectedCareer = useMemo(
    () => filteredCareers.find((career) => career.id === selectedCareerId) || careers.find((career) => career.id === selectedCareerId) || null,
    [careers, filteredCareers, selectedCareerId]
  );

  const selectCareer = useCallback((careerId: string) => {
    startTransition(() => {
      setSelectedCareerId(careerId);
    });
  }, []);

  return {
    careers,
    filteredCareers,
    categories,
    selectedCareer,
    search,
    category,
    isLoading,
    setSearch,
    setCategory,
    selectCareer
  };
}
