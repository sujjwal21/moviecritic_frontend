import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";

export default function SearchBar({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search, onChange]);

  return (
    <div
      className="flex items-center border-2 border-custom-blue rounded-sm px-3 py-2 w-[450px] mt-5 mb-5"
      data-testid="search-bar"
    >
      <CiSearch />
      <input
        className="w-full bg-transparent outline-none focus:border-blue-700"
        type="text"
        placeholder="Search reviews..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
