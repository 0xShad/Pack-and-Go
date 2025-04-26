import Navbar from "@/components/NavBar";
import Hero from "@/components/Hero";

const Homepage = () => {
  return (
    <main className="min-h-full w-full">
      <header>
        <Navbar />
      </header>
      <section className="relative h-[35rem]">
        <Hero/>
      </section>
    </main>
  );
};
export default Homepage;
