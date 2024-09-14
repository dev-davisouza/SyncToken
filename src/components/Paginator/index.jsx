import { useEffect, useState } from "react";
import { PaginationItems, Paginators } from "./style";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import handlePerPage from "@/hooks/handlePerPage";
import usePaginatorContext from "@/hooks/usePaginatorContext";

export default function Paginator({ totalItems }) {
  const { perPage, setPerPage, setDirection } = usePaginatorContext();

  const [Icons, setIcons] = useState([]);
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
                onClick={() => handlePerPage("more", setPerPage, setDirection)}
                key={`down-${index}`}
              />
            ) : (
              <Icon
                onClick={() => handlePerPage("less", setPerPage, setDirection)}
                key={`up-${index}`}
              />
            )
          )}
      </Paginators>
    </PaginationItems>
  );
}
