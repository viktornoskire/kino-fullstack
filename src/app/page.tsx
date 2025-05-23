import InfoKino from "@/components/startpage/InfoKino";
import MoviesWrapper from "@/components/startpage/MoviesWrapper";
import SearchBar from "@/components/startpage/SearchBar";

export default async function Home() {
  return (
    <>
      <InfoKino />
      <SearchBar />
      <MoviesWrapper />
    </>
  );
}
