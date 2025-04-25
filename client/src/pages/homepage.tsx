import Navbar from "@/components/NavBar";
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "@/components/ui/DataRange";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const Homepage = () => {
  return (
    <main className="min-h-full w-full">
      <header>
        <Navbar />
      </header>
      <section className="relative h-[35rem]">
        <img
          src="/assets/wallpaper.jpg"
          alt=""
          className="h-full w-full object-cover absolute inset-0 z-0"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <h1 className="font-bold text-[#fcfcfc] text-2xl">
            Discover Your Next Destination
          </h1>
          <p className=" text-[#fcfcfc] mt-1">
            Find the perfect getaway-just a few clicks away.
          </p>
          <div className="flex bg-[#dedad5] p-2 rounded-sm w-[30rem]">
            <div className="relative">
              <Input
                placeholder="What city can we show you?"
                className="pl-8 text-sm hover:placeholder:text-black"
              />
              <span className="absolute left-2 top-2 text-gray-500">
                <MapPin className="h-5 w-5 hover:text-black" />
              </span>
            </div>
            <DatePickerWithRange />
            <Button className="cursor-pointer">Search</Button>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Homepage;
