import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { VideoSection } from "@/components/home/VideoSection";
import { Newsletter } from "@/components/shared/Newsletter";
import { ContactTeaser } from "@/components/shared/ContactTeaser";
import { Reveal } from "@/components/shared/Reveal";
import { Teaser } from "@/components/home/Teaser";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <Hero
        variant="cinema"
        title={
          <>
            An office <br />
            <span className="italic font-serif">becomes my office.</span>
          </>
        }
        videoBackground="https://www.wini.de/fileadmin/user_upload/wini_videos/WINEA_TEAMS__Konferenz.mp4"
        backgroundImage="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2000"
      />

      {/* Intro Text */}
      <section className="w-full py-24 bg-white text-center">
        <div className="container max-w-4xl px-6">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-light text-neutral-900 leading-tight">
              We create spaces that inspire and perform. <br />
              <span className="text-primary italic">Better. Single. More attractive.</span>
            </h2>
          </Reveal>
        </div>
      </section>

      {/* WINEA STARTUP 2.0 */}
      <Teaser
        title="WINEA STARTUP 2.0"
        subtitle="The Smart Entry"
        description="Height-adjustable by electric motor, customizable, robust and 'Made in Germany' - and all at a convincing price. With the 2025 technical update, new colors, more configuration options and many expansion options."
        imageSrc="https://images.unsplash.com/photo-1595515106962-92182bd893a7?auto=format&fit=crop&q=80&w=1600"
        imageAlt="WINEA STARTUP 2.0 Desk"
        reversed={false}
        lightMode={true}
        linkUrl="/products/desks/startup-20"
      />

      {/* German Design Awards */}
      <Teaser
        title="Double Award!"
        subtitle="German Design Awards 2025"
        description="WINEA ELEMENTS and WINEA FLEX UP whiteboards impressed the international jury of experts with their unique design and functionality."
        imageSrc="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1600"
        imageAlt="German Design Award Winner"
        reversed={true}
        lightMode={true}
        className="bg-neutral-50"
        linkUrl="/be-inspired/german-design-award-2025"
      />

      {/* WINEA TEAMS */}
      <VideoSection
        title="Space for collaboration!"
        description="The office is and remains the central home base for personal exchanges and meetings with colleagues. With the WINEA TEAMS modular furniture system, versatile communication spaces can be created."
        buttonText="More about WINEA TEAMS"
        buttonLink="/products/desks/winea-teams-1"
        videoSrc="https://videos.pexels.com/video-files/3129671/3129671-sd_640_360_25fps.mp4"
        lightMode={true}
      />

      {/* SARA Board */}
      <Teaser
        title="Reduce. Reuse. Recycle."
        subtitle="SARA Board"
        description="With the SARA board (Chipboard Made from Recycled Waste Wood), WINI has for the first time added a chipboard made from 100% recycled waste wood to its range of desks and case furniture."
        imageSrc="https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=1600"
        imageAlt="SARA Board Recycled Wood"
        reversed={true}
        lightMode={true}
        className="bg-neutral-50"
        linkUrl="/sara-chipboard"
      />

      {/* WINEA FLEX UP */}
      <Teaser
        title="With charming screens!"
        subtitle="WINEA FLEX UP"
        description="Hanging from the ceiling, standing on the floor, as a cupboard back panel, on the Wall - with the customizable WINEA FLEX UP polyester panels, you can screen out unwanted outside influences."
        imageSrc="https://images.unsplash.com/photo-1519642918688-7e43b19245d8?auto=format&fit=crop&q=80&w=1600"
        imageAlt="WINEA FLEX UP Acoustics"
        reversed={false}
        lightMode={true}
        linkUrl="/products/room-divider/winea-flex-up"
      />

      <CategoryGrid />

      <Newsletter />

      <ContactTeaser />
    </main>
  );
}
