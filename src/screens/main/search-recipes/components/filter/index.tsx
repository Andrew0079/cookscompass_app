import React from "react";
import FilterLists from "./components/filter-lists";

function Filter({
  section,
  onSetSection,
}: {
  section: string | null;
  onSetSection: (value: string | null) => void;
}) {
  return <FilterLists section={section} onSetSection={onSetSection} />;
}

export default Filter;
