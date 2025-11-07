import Category from "@/Component/Category";
import HomePage from "@/Component/HomePage";
import AllJob from "@/Component/randomJobs/AllJob";


export default function Home() {
  return (
    <div className="w-[100%]">
       <HomePage></HomePage>
       <AllJob></AllJob>
       <Category></Category>
    </div>
  );
}
