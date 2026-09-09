import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { WhyPrime } from "@/components/home/WhyPrime";
import { Programs } from "@/components/home/Programs";
import { FeaturedProgram } from "@/components/home/FeaturedProgram";
import { Admissions } from "@/components/home/Admissions";
import { InternationalStudents } from "@/components/home/InternationalStudents";
import { StudentLife } from "@/components/home/StudentLife";
import { News } from "@/components/home/News";
import { Events } from "@/components/home/Events";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCTA } from "@/components/home/FinalCTA";

/**
 * Homepage band rhythm — dark, light, dark — so the page never reads as an
 * undifferentiated run of sections:
 *   navy hero → white (statement) → cream (why) →
 *   navy (stats) → cream (programs) → photography → white (admissions) →
 *   navy (international) → white (student life) → cream (news) →
 *   white (events) → navy (testimonials) → gold (CTA) → deep navy footer
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyPrime />
      <Stats />
      <Programs />
      <FeaturedProgram />
      <Admissions />
      <InternationalStudents />
      <StudentLife />
      <News />
      <Events />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
