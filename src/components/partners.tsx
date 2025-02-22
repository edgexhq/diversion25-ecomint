const partners = [
  {
    name: "World Wildlife Fund",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwtrMgRcwBFMOJIBXCEANWdilEPE7S69Wq0w&shttps://upload.wikimedia.org/wikipedia/en/thumb/2/24/WWF_logo.svg/188px-WWF_logo.svg.png",
  },
  {
    name: "Rainforest Alliance",
    logo: "https://www.rainforest-alliance.org/wp-content/uploads/2019/03/cropped-ra-frog-icon-180x180.png.webp",
  },
  {
    name: "Green Peace",
    logo: "https://www.greenpeace.org/static/planet4-india-stateless/2018/05/913c0158-cropped-5b45d6f2-p4_favicon-300x300.png",
  },
  {
    name: "Ocean Conservancy",
    logo: "https://oceanconservancy.org/wp-content/uploads/apple-touch-icons/apple-touch-icon.png",
  },
  {
    name: "Environmental Defense Fund",
    logo: "https://www.edf.org/themes/edf2020/favicons/apple-touch-icon.png",
  },
];

export function Partners() {
  return (
    <section className="px-6 py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-center text-2xl font-semibold mb-20">
          <span className="text-primary">Trusted by</span> Leading Environmental
          Organizations
        </h3>
        <div className="flex items-center justify-between gap-8 transition-opacity overflow-x-auto pb-4">
          {partners.map((partner, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 min-w-[160px]"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                width={80}
                height={20}
                className="rounded-full"
              />
              <span className="text-sm text-muted-foreground">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
