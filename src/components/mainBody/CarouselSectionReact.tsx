import React, { useEffect, useState } from "react";
import { type CarouselSectionProps, type PaginationDotsProps } from "./interface";
import Carousel from "./Carousel";

function PaginationDots({
  currentPage,
  totalPages,
  onPageClick,
}: Readonly<PaginationDotsProps>) {
  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => onPageClick(index)}
          className={`h-2 w-2 mx-1 rounded-full ${currentPage === index ? "bg-principalColor1" : "bg-principalColor2 border border-black"
            }`}
        />
      ))}
    </div>
  );
}

export default function CarouselSectionReact({
  vinos,
  variedad,
}: Readonly<CarouselSectionProps>) {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const breakpoints = [
        { width: 1440, items: 4 },
        { width: 1024, items: 3 },
        { width: 768, items: 2 },
        { width: 0, items: 1 },
      ];

      const matchingBreakpoint = breakpoints.find(breakpoint => window.innerWidth >= breakpoint.width);
      if (matchingBreakpoint) {
        setItemsPerPage(matchingBreakpoint.items);
      }
    };

    updateItemsPerPage(); // Llama a la función al montar
    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  const totalPages = Math.ceil(vinos.length / itemsPerPage);

  const handleNextPage = () =>
    setPage((prevPage) => (prevPage + 1) % totalPages);
  const handlePrevPage = () =>
    setPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  const handlePageClick = (index: number) => setPage(index);

  return (
    <section className="mx-1 pb-[3%] items-center overflow-x-auto m-0 scroll-smooth">
      <h2 className="my-3 flex items-center justify-center font-poppins text-[2em] font-bold leading-10 text-principalColor1 uppercase">{variedad}</h2>
      <Carousel
        vinos={vinos}
        page={page}
        itemsPerPage={itemsPerPage}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      />
      <PaginationDots
        currentPage={page}
        totalPages={totalPages}
        onPageClick={handlePageClick}
      />
    </section>
  );
}
