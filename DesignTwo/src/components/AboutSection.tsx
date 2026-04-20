const AboutSection = () => {
  return (
    <section className="px-4 md:px-8 lg:px-16 py-16 md:py-24 bg-card">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-gold/60 text-xs tracking-[0.3em] font-body mb-2 uppercase">About Us</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
          Demo Cafe
        </h2>
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="w-12 h-[1px] bg-gold" />
          <span className="w-2 h-2 bg-gold rotate-45" />
          <span className="w-12 h-[1px] bg-gold" />
        </div>
        <p className="text-muted-foreground font-body text-sm leading-relaxed mb-12">
          Located in the heart of South Goa, surrounded by lush greenery and forest-inspired ambiance. 
          Whether you're planning a relaxed morning, a date night, or an evening out with friends — we celebrate 
          the spirit of the coast with flavors from Continental, Asian, and Indian cuisines. From a four-chair 
          nook to an 80-seater café, bar, and beyond, Demo Cafe has evolved into a vibrant destination 
          where every guest feels like family.
        </p>

        <p className="text-gold/60 text-xs tracking-[0.3em] font-body mb-2 uppercase">discover</p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
          Our Story
        </h2>
        <div className="text-muted-foreground font-body text-sm leading-relaxed space-y-4 text-left md:text-center">
          <p>
            In 2020, when the Pandemic struck, Sneha Rano, an Architect & Urban Designer based in Hyderabad, 
            was on maternity leave with a newborn baby. But instead of waiting for the world to return to normal, 
            she found purpose in helping others.
          </p>
          <p>
            With the support of the municipal corporation and a few like-minded people, she started Care Packages — 
            delivering freshly cooked meals to frontline workers, migrant labourers and families in need.
          </p>
          <p>
            From a four-chair nook to a 60-seater restaurant and bar, Café Chai Coffee has grown into a vibrant 
            dining destination. Alongside it thrives BAOWICH, Sneha's Asian-inspired brand born out of her love 
            for food and travel.
          </p>
          <p>
            At Demo Cafe, every detail — from design to dishes — is inspired by nature and crafted with love. Whether 
            you're meeting friends, enjoying a family lunch, or a night of live music, we bring you flavours and 
            moments worth remembering.
          </p>
        </div>
        <p className="font-heading italic text-gold-light text-lg mt-8">— Sneha Rano Bhandare</p>
      </div>
    </section>
  );
};

export default AboutSection;
