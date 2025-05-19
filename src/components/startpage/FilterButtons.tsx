"use client";

interface Props {
  selectedTag: string | null;
  onSelect: (tag: string | null) => void;
}

export default function FilterButtons({ selectedTag, onSelect }: Props) {
  return (
    <div className="ml-4 space-x-2">
      <button
        onClick={() => onSelect(null)}
        className={`cursor-pointer px-2 py-2 rounded-xl border font-semibold transition hover:bg-kino-white
        ${selectedTag === null
          ? "bg-kino-white text-kino-black"
          : "border-kino-grey text-white bg-transparent hover:bg-kino-white hover:text-kino-black"}`}
      >
        Now showing
      </button>
      <button
        onClick={() => onSelect("children")}
        className={`cursor-pointer px-2 py-2 rounded-xl border font-semibold transition hover:bg-kino-white
        ${selectedTag === "children"
          ? "bg-kino-white text-kino-black"
          : "border-kino-grey text-white bg-transparent hover:bg-kino-white hover:text-kino-black"}`}
      >
        Children & Family
      </button>
    </div>
  );
}