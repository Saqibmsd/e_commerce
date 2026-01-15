import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import NewArrivals from "./components/pages/home/NewArrivals";
import Brands from "./components/pages/home/Brands";
import Hero from "./components/pages/home/Hero";
import TopSelling from "./components/pages/home/TopSellings";
import Browse from "./components/pages/home/Browse";
import Reviews from "./components/pages/home/Reviews";
import Newsletter from "./components/pages/home/Newsletter";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Brands />
      <NewArrivals />
      <TopSelling />
      <Browse />
      <Reviews />
      <Newsletter />

      <Footer />

    </>
  );
}
