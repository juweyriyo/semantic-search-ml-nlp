"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type ReportRow = {
  title: string;
  category: string;
  year: number;
  score: number;
};

interface DataTableProps {
  data: ReportRow[];
}

export function DataTable({ data }: DataTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">📘 Title</TableHead>
            <TableHead>📂 Category</TableHead>
            <TableHead>🎓 Year</TableHead>
            <TableHead>📊 Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                ❌ No data found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.year}</TableCell>
                <TableCell>{row.score.toFixed(2)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
