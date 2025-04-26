import Features from "@/components/landing/features-01/features-01";
import Footer from "@/components/landing/footer-05/footer-05";
import Hero from "@/components/landing/hero-06/hero-06";
import Navbar from "@/components/landing/navbar-04/navbar-04";
import Testimonial from "@/components/landing/testimonial-04/testimonial-04";
import Pricing from "./pricing/page";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();
  if (session) {
    return redirect("/app");
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <Testimonial />
        <Footer />
      </main>
    </>
  );
}
