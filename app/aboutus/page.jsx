import MainLayout from "@/components/layout/RootLayout";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <>
      <MainLayout>
        <div>
          <h1 className="py-20 text-black text-center text-4xl font-bold mb-10">
            About OLX Group
          </h1>
          <p className="px-96 text-center text-black">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            auctor neque eu risus tincidunt, a vulputate ligula dignissim. Nulla
            ut massa sit amet nisl convallis fringilla at id libero.
          </p>
        </div>
      </MainLayout>
      <Footer />
    </>
  );
};

export default AboutUs;
