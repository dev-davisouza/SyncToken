// src/components/Paginator/index.tsx

import { useEffect, useState } from "react";
import { PaginationItems, Paginators } from "./style";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import usePaginatorContext from "@/hooks/usePaginatorContext";
import { IconType } from "react-icons";

export default function Paginator({ totalItems }: { totalItems: number }) {
  const { perPage, handlePerPage } = usePaginatorContext();

  const [Icons, setIcons] = useState<IconType[] | null>(null);
  useEffect(() => {
    if (totalItems <= 10) {
      setIcons(null);
      return;
    }

    if (perPage <= 10) {
      setIcons([FaAngleDown]);
    }
    if (perPage < totalItems && perPage > 10) {
      setIcons([FaAngleDown, FaAngleUp]);
    }
    if (perPage >= totalItems) {
      setIcons([FaAngleUp]);
    }
  }, [perPage, totalItems]);

  return (
    <PaginationItems colSpan={9}>
      <Paginators>
        {Icons &&
          Icons.map((Icon, index) =>
            Icon == FaAngleDown ? (
              <Icon
                onClick={() => handlePerPage("more")}
                key={`down-${index}`}
              />
            ) : (
              <Icon onClick={() => handlePerPage("less")} key={`up-${index}`} />
            )
          )}
      </Paginators>
    </PaginationItems>
  );
}
