import { GithubLogo } from "@phosphor-icons/react";

function Footer() {
  const data = new Date().getFullYear();

  return (
    <>
      <div className="flex justify-center bg-[#587d33] text-white">
        <div className="container flex justify-center items-center py-4">
          <a href="https://github.com/PI-AgroComPartilha" target="_blank">
            <GithubLogo size={32} />{" "}
          </a>
          <p className="text-xl text-white px-1">
            AgroCompartilha | Copyright: {data}
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
