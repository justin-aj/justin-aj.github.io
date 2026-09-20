import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Experience } from '@/components/experience';
import { Work } from '@/components/work';
import { Recommendations } from '@/components/recommendations';
import { Contact } from '@/components/contact';

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <Hero />
      <About />
      <Experience />
      <Work />
      <Recommendations />
      <Contact />
    </div>
  );
}
