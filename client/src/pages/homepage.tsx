import Navbar from "@/components/NavBar";
import Hero from "@/components/Hero";
import TourCards from "@/components/TourCards";

const Homepage = () => {
  return (
    <main className="min-h-full w-full">
      <header>
        <Navbar />
      </header>
      <section className="relative h-[35rem]">
        <Hero />
      </section>
      <section className="p-4">
        <h1 className="font-bold text-2xl">Trending Tours</h1>
        <div className="grid grid-cols-5 gap-4 p-4 w-full">
          <TourCards />
        </div>
      </section>
    </main>
  );
};
export default Homepage;
