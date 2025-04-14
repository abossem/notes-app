import { Loader2 } from "lucide-react";

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen w-100">
      <Loader2 className="animate-spin text-black " />
    </div>
  );
}

export default Loader;
