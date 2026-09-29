import { handleQueryGlobalType, IFicha } from "@/interfaces/recordTypes";

interface PeoplePropsBase {
  isForSelection: boolean;
}

interface PeopleSelectionProps extends PeoplePropsBase {
  isForSelection: true;
  handleQuery: handleQueryGlobalType<IFicha>;
  selectedCount: number;
  onClearSelection: () => void;
}

interface PeopleNonSelectionProps extends PeoplePropsBase {
  isForSelection: false;
  handleQuery?: handleQueryGlobalType<IFicha>;
  selectedCount?: never;
  onClearSelection?: never;
}

export type PeopleProps = PeopleSelectionProps | PeopleNonSelectionProps;
