export default function getNextStatus(currentStatus: string) {
  if (currentStatus === "stts_0") {
    return "stts_1";
  }
  if (currentStatus === "stts_1") {
    return "stts_2";
  }
  if (currentStatus === "stts_2") {
    return "stts_0";
  } else {
    return "stts_0";
  }
}
