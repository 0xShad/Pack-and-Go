import SearchInput from "./SearchInput";
import { Button } from "./ui/button";
import { DatePickerWithRange } from "./ui/DataRange";

const Hero = () => {
  return (
    <>
      <img
        src="/assets/wallpaper.jpg"
        alt=""
        className="h-full w-full object-cover absolute inset-0 z-0 brightness-50"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 className="font-bold text-[#fcfcfc] text-3xl">
          Discover Your Next Destination
        </h1>
        <p className=" text-gray-200 mt-2 text-lg font-light">
          Find the perfect getaway-just a few clicks away.
        </p>
        <div className="flex bg-[#dedad5] p-2 rounded-sm w-[30rem] mt-5">
          <div className="relative">
            <SearchInput />
          </div>
          <DatePickerWithRange />
          <Button className="cursor-pointer">Search</Button>
        </div>
      </div>
    </>
  );
};
export default Hero;
