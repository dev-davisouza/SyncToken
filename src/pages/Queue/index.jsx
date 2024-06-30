import QueueTable from "@/components/QueueTable";
import Container from "@/components/Container";
import { Legend } from "@/components/MiniBall";

export default function Queue() {
  return (
    <Container>
      <Legend />
      <QueueTable />
    </Container>
  );
}
