// Alterar Per Page
export default function handlePerPage(type, setPerPage, setDirection) {
  // Handle Per Page
  setPerPage((prevPerPage) =>
    type === "more" ? prevPerPage + 10 : prevPerPage - 10
  );

  // Handle direction
  setDirection(type === "more" ? "down" : "up");
}
