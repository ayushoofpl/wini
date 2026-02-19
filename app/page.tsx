import { Hero } from "@/components/home/Hero";
import { Values } from "@/components/home/Values";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { VideoSection } from "@/components/home/VideoSection";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { StatsSection } from "@/components/home/StatsSection";
import { Partners } from "@/components/home/Partners";
import { Newsletter } from "@/components/shared/Newsletter";
import { ContactTeaser } from "@/components/shared/ContactTeaser";
import { Masonry, MasonryItem } from "@/components/ui/Masonry";
import { Reveal } from "@/components/shared/Reveal";

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
        subtitle="Individual office furniture and holistic furnishing concepts for modern working environments."
        videoBackground="https://www.wini.de/fileadmin/user_upload/wini_videos/WINEA_TEAMS__Konferenz.mp4"
        backgroundImage="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2000"
      />

      <Values />

      {/* The WINI World - Cinematic Section */}
      <section className="w-full bg-neutral-900 text-white py-32 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="container px-6 2xl:px-0 relative z-10">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 space-y-8">
              <Reveal>
                <h2 className="text-5xl md:text-7xl font-slogan leading-none tracking-tight">
                  The WINI <br /><span className="text-primary italic">World.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.4}>
                <p className="text-xl md:text-2xl font-light text-neutral-300 leading-relaxed max-w-xl">
                  Dive into a world where design meets functionality. From agile startups to executive boardrooms,
                  we create spaces that inspire and perform.
                </p>
                <a href="/solutions" className="inline-flex items-center gap-2 text-white border-b border-primary pb-1 hover:text-primary transition-colors text-lg uppercase tracking-widest mt-8">
                  Explore Solutions <span className="text-2xl">→</span>
                </a>
              </Reveal>
            </div>
            <div className="w-full md:w-1/2">
              <Reveal delay={0.2}>
                <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl relative group cursor-pointer">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                  >
                    <source src="https://videos.pexels.com/video-files/853825/853825-hd_1920_1080_25fps.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <FeatureGrid />

      {/* Wini 'Showcase' Video Section - Dark Mode */}
      <VideoSection
        title="Office Furniture with Character."
        description="We create space for personality. Our furniture is not just functional, it's a statement of your corporate culture. Experience the Wini difference."
        buttonText="Our Philosophy"
        buttonLink="/company"
        videoSrc="https://videos.pexels.com/video-files/7578552/7578552-uhd_2560_1440_25fps.mp4"
      />

      <CategoryGrid />

      <StatsSection
        title="Quality through Experience."
        subtitle="Since 1908, we have been developing office furniture that sets standards. In Coppenbrügge, we produce with passion and precision for your success."
        stats={[
          { value: "118", label: "Years of Experience" },
          { value: "200+", label: "Motivated Employees" },
          { value: "100%", label: "Made in Germany" },
          { value: "50k+", label: "Global Projects" }
        ]}
      />

      {/* Wini 'Create' Video Section - Light Mode */}
      <VideoSection
        title="Create your space."
        description="Use our 3D configurator to plan your perfect office. Visualize your ideas and turn them into reality with Wini's modular systems."
        buttonText="Start Configuration"
        buttonLink="/configurator"
        videoSrc="https://videos.pexels.com/video-files/3129671/3129671-sd_640_360_25fps.mp4"
        lightMode={true}
      />


      {/* Recent Projects Showcase */}
      <section className="w-full py-32 bg-white">
        <div className="container px-6 2xl:px-0">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="space-y-6 max-w-3xl">
              <h2 className="text-5xl md:text-7xl font-slogan text-neutral-900 tracking-tight leading-[0.9]">
                Inspiring <span className="text-primary italic">Office Worlds.</span>
              </h2>
              <p className="text-2xl text-neutral-500 font-light leading-relaxed">
                Discover our latest reference projects and see how WINI transforms spaces into productive environments.
              </p>
            </div>
            <a href="/references" className="hidden md:inline-flex px-8 py-4 border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all uppercase tracking-widest text-sm font-medium">
              View All Projects
            </a>
          </div>

          <Masonry columns={3} gap="2rem">
            <MasonryItem>
              <div className="group relative overflow-hidden rounded-none aspect-[4/5] bg-neutral-100 cursor-pointer">
                <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200" alt="Project 1" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                  <p className="text-primary font-medium mb-2 italic tracking-widest text-sm uppercase">Corporate Design</p>
                  <h3 className="text-3xl text-white font-light">IT Campus Hamburg</h3>
                </div>
              </div>
            </MasonryItem>
            <MasonryItem>
              <div className="group relative overflow-hidden rounded-none aspect-square bg-neutral-100 cursor-pointer">
                <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200" alt="Project 2" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                  <p className="text-primary font-medium mb-2 italic tracking-widest text-sm uppercase">Modern Work</p>
                  <h3 className="text-3xl text-white font-light">Creative Studio Berlin</h3>
                </div>
              </div>
            </MasonryItem>
            <MasonryItem>
              <div className="group relative overflow-hidden rounded-none aspect-video bg-neutral-100 cursor-pointer">
                <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200" alt="Project 3" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                  <p className="text-primary font-medium mb-2 italic tracking-widest text-sm uppercase">Acoustics</p>
                  <h3 className="text-3xl text-white font-light">Finance Center Munich</h3>
                </div>
              </div>
            </MasonryItem>
            <MasonryItem>
              <div className="group relative overflow-hidden rounded-none aspect-[3/4] bg-neutral-100 cursor-pointer">
                <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200" alt="Project 4" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                  <p className="text-primary font-medium mb-2 italic tracking-widest text-sm uppercase">Efficiency</p>
                  <h3 className="text-3xl text-white font-light">Logistic Hub Frankfurt</h3>
                </div>
              </div>
            </MasonryItem>
            <MasonryItem>
              <div className="group relative overflow-hidden rounded-none aspect-square bg-neutral-100 cursor-pointer">
                <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200" alt="Project 5" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                  <p className="text-primary font-medium mb-2 italic tracking-widest text-sm uppercase">Agile Teams</p>
                  <h3 className="text-3xl text-white font-light">Tech Startup Cologne</h3>
                </div>
              </div>
            </MasonryItem>
          </Masonry>

          <div className="mt-16 text-center md:hidden">
            <a href="/references" className="inline-flex px-8 py-4 border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all uppercase tracking-widest text-sm font-medium">
              View All Projects
            </a>
          </div>
        </div>
      </section>

      <Partners />

      <Newsletter />

      <ContactTeaser />
    </main>
  );
}
