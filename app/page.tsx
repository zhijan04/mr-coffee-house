import Hero from "@/components/hero";
import Stats from "@/components/stats";
import Story from "@/components/story";
import Experience from "@/components/experience";
import MenuSection from "@/components/menu-section";
import Gallery from "@/components/gallery";
import Testimonials from "@/components/testimonials";
import InstagramFeed from "@/components/instagram-feed";
import Location from "@/components/location";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Story />
      <Experience />
      <MenuSection />
      <Gallery />
      <Testimonials />
      <InstagramFeed />
      <Location />
    </>
  );
}
