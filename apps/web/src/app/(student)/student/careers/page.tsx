import Link from "next/link";

import { getCareerCategories, getCareers } from "@/lib/api";
import { requireStudent } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function CareersPage({
  searchParams
}: {
  searchParams?: { q?: string; category?: string };
}): Promise<JSX.Element> {
  await requireStudent();

  const query = searchParams?.q || "";
  const category = searchParams?.category || "";
  const [careers, categories] = await Promise.all([
    getCareers({ q: query, category, page: 1, pageSize: 24 }),
    getCareerCategories()
  ]);

  return (
    <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 24px" }}>
      <p style={{ textTransform: "uppercase", letterSpacing: "0.08em", color: "#4b6480", fontSize: "12px" }}>
        Student
      </p>
      <h1 style={{ marginTop: "8px", fontSize: "36px" }}>Career catalog</h1>
      <p style={{ color: "#334a62", lineHeight: 1.6 }}>
        This is the new managed career library backed by relational data and stable APIs.
      </p>

      <form method="GET" style={{ display: "flex", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
        <input
          name="q"
          defaultValue={query}
          placeholder="Search careers"
          style={{ padding: "12px 14px", borderRadius: "10px", border: "1px solid #c6d4e1", minWidth: "240px" }}
        />
        <select
          name="category"
          defaultValue={category}
          style={{ padding: "12px 14px", borderRadius: "10px", border: "1px solid #c6d4e1", minWidth: "220px" }}
        >
          <option value="">All categories</option>
          {categories.categories.map((item) => (
            <option key={item.id} value={item.slug}>
              {item.name} ({item.count})
            </option>
          ))}
        </select>
        <button
          type="submit"
          style={{ padding: "12px 16px", borderRadius: "10px", border: 0, background: "#142033", color: "#fff" }}
        >
          Search
        </button>
      </form>

      <p style={{ marginTop: "20px", color: "#4b6480" }}>
        Showing {careers.items.length} of {careers.total} careers.
      </p>

      <div
        style={{
          marginTop: "20px",
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))"
        }}
      >
        {careers.items.map((career) => (
          <article
            key={career.id}
            style={{ background: "#fff", border: "1px solid #d8e1eb", borderRadius: "14px", padding: "18px" }}
          >
            <p style={{ margin: 0, fontSize: "12px", color: "#4b6480", textTransform: "uppercase" }}>{career.category.name}</p>
            <h2 style={{ margin: "10px 0 8px", fontSize: "22px" }}>{career.title}</h2>
            <p style={{ margin: 0, color: "#334a62", lineHeight: 1.6 }}>{career.summary}</p>
            <p style={{ marginTop: "12px", color: "#4b6480" }}>
              Skills: {career.skills.slice(0, 3).join(", ") || "Not available"}
            </p>
            <Link href={`/student/careers/${career.slug}`}>Open detail</Link>
          </article>
        ))}
      </div>
    </main>
  );
}
