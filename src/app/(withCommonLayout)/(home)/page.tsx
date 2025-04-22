import About from "@/src/components/Home/About/About";
import Banner from "@/src/components/Home/Banner/Banner";
import QuickInfoCards from "@/src/components/Home/Quick Info Cards/QuickInfoCards";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <About />
      <QuickInfoCards />
    </div>
  );
};

export default HomePage;
