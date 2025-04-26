import { Input } from "./ui/input";
import { MapPin } from "lucide-react";


const SearchInput = () => {
  return (
    <>
      <Input
        placeholder="What city can we show you?" 
        className="pl-8 text-sm hover:placeholder:text-black placeholder:text-[11px]"
      />
      <span className="absolute left-2 top-2 text-gray-500">
        <MapPin className="h-5 w-5 text-black" />
      </span>
    </>
  );
};
export default SearchInput;
