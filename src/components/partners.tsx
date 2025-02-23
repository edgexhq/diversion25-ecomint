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

const AnimatedLogoCloud = () => {
  return (
    <div className="w-full py-12">
      <div className="mx-auto w-full px-4 md:px-8">
        <div
          className="group relative mt-6 flex gap-6 overflow-hidden p-2"
          style={{
            maskImage:
              "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
          }}
        >
          {Array(5)
            .fill(null)
            .map((index) => (
              <div
                key={index}
                className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
              >
                {partners.map((partner, key) => (
                  <img
                    key={key}
                    src={partner.logo}
                    className="h-10 w-28 px-2"
                    alt={`${partner.name}`}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedLogoCloud;
