const HeroSection = () => {
  return (
    <section className="container mx-auto flex flex-col-reverse md:flex-row items-center mt-5 justify-between">
      <div className="info md:w-[700px] text-center md:text-left">
        <h1 className="text-6xl font-bold mb-5 text-[#2C3338] w-[550px]">
          Simplify Your Workflow
        </h1>
        <p className="mb-15">
          Manage tasks easily with a modern and secure platform
        </p>
        <div className="space-x-3 mb-5">
          <a
            className="bg-[#5576FA] py-2.5 px-10 text-white rounded-[8px]"
            href=""
          >
            Login
          </a>
          <a
            className="bg-[#F25D26] py-2.5 px-10 text-white rounded-[8px]"
            href=""
          >
            Register
          </a>
        </div>
      </div>
      <div className="image ">
        <img
          className="w-[400px] md:w-[500px]"
          src="/src/assets/images/landing-page.webp"
          alt="Landing Page"
        />
      </div>
    </section>
  );
};

export default HeroSection;
