import Navbar from "@/components/NavBar";
import Hero from "@/components/Hero";
import TourCards from "@/components/TourCards";

const Homepage = () => {
  return (
    <main className="min-h-full w-full">
      <header>
        <Navbar />
      </header>
      <section className="relative h-screen md:h-[35rem]">
        <Hero />
      </section>
      <section className="p-4">
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">Trending Tours</h1>
        <div className="grid grid-cols-1 w-full place-items-center p-4 md:grid-cols-3 md:place-items-start">
          <TourCards />
        </div>
      </section>
    </main>
  );
};
export default Homepage;
