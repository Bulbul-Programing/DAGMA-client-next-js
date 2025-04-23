import About from "@/src/components/Home/About/About";
import Banner from "@/src/components/Home/Banner/Banner";
import Notice from "@/src/components/Home/Notice/Notice";
import PrincipalTalk from "@/src/components/Home/PrincipalTalk/PrincipalTalk";
import QuickInfoCards from "@/src/components/Home/Quick Info Cards/QuickInfoCards";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <Notice />
      <About />
      <QuickInfoCards />
      <PrincipalTalk />
    </div>
  );
};

export default HomePage;
