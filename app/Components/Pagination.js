"use client";
import { Pagination } from "@mui/material";
import { useRouter } from "next/navigation";

export default function MyPagination({ pageNum, totalPages }) {
  const router = useRouter();
  const handleGoTo = (event, value) => {
    if (value != 1) {
      router.push(`/moviepages/${value}`);
    } else {
      router.push(`/`);
    }
  };
  return <Pagination className="fw-bold red-bac main-rounded w-fit" page={pageNum ? Number(pageNum) : 1} onChange={handleGoTo} count={totalPages} shape="rounded" />;
}
