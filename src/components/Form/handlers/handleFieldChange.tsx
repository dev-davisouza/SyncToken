export default function handleFieldChange(
  name: string,
  rawValue: string,
  handleValue?: (name: string, value: string) => string
): string {
  return handleValue ? handleValue(name, rawValue) : rawValue;
}
