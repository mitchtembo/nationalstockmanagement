'use client';

import { useState } from 'react';
import { useApi } from '@/hooks/use-api';
import { stockService, PageDrug, Pageable, Drug } from '@/lib/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus } from "lucide-react";
import Link from "next/link";

export function DrugsList() {
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Create pageable object for API request
  const pageable: Pageable = {
    page: currentPage,
    size: pageSize,
    sort: ['name,asc']
  };

  // Use the API hook to fetch the data
  const { data, isLoading, error, refetch } = useApi<PageDrug>(
    () => stockService.drugs.getAll(pageable),
    { dependencies: [currentPage, pageSize] }
  );

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle page size changes
  const handlePageSizeChange = (size: string) => {
    setPageSize(parseInt(size));
    setCurrentPage(0); // Reset to first page
  };

  // Filter drugs by name
  const filteredDrugs = searchTerm && data?.content 
    ? data.content.filter(drug => 
        drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (drug.genericName && drug.genericName.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : data?.content || [];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search drugs..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Items per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 per page</SelectItem>
              <SelectItem value="20">20 per page</SelectItem>
              <SelectItem value="50">50 per page</SelectItem>
              <SelectItem value="100">100 per page</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <Filter className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Link href="/inventory/add">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Drug
            </Button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="p-4 text-center text-red-500">
          Error loading drugs: {error.message}
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Generic Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Manufacturer</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Measurement Unit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrugs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">No drugs found</TableCell>
                </TableRow>
              ) : (
                filteredDrugs.map((drug: Drug) => (
                  <TableRow key={drug.id}>
                    <TableCell className="font-medium">{drug.name}</TableCell>
                    <TableCell>{drug.genericName || "-"}</TableCell>
                    <TableCell>
                      {drug.category && (
                        <Badge variant="outline">
                          {drug.category.replace("_", " ")}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{drug.manufacturer || "-"}</TableCell>
                    <TableCell>
                      {drug.unitPrice !== undefined 
                        ? `$${drug.unitPrice.toFixed(2)}` 
                        : "-"}
                    </TableCell>
                    <TableCell>{drug.measurementUnit || "-"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {data && data.totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 0) handlePageChange(currentPage - 1);
                    }}
                    className={currentPage === 0 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: data.totalPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(i);
                      }}
                      isActive={currentPage === i}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < data.totalPages - 1) handlePageChange(currentPage + 1);
                    }}
                    className={currentPage === data.totalPages - 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}

          <div className="text-sm text-muted-foreground">
            {data && (
              <>
                Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, data.totalElements)} of {data.totalElements} drugs
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
} 