import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faXTwitter, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FaRss } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="container mx-auto p-10 rounded-md border-b-2 border-gray-300">
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="order-2 md:order-1 md:mr-4 text-center md:text-left">
          <h1 className="text-2xl sm:text-4xl font-bold mb-2 md:mb-0">Jim Quincy Nemorin</h1>
          <p className="text-sm sm:text-base md:text-base lg:text-lg xl:text-xl mt-2 text-gray-300">
            I just like to build and learn useful things.
          </p>
          <div className="flex space-x-4 mt-4 items-center md:items-start justify-center md:justify-start">
            {[
              { href: "https://github.com/jim707t", icon: faGithub },
              { href: "https://x.com/jimnemorin", icon: faXTwitter },
              { href: "https://www.linkedin.com/in/jim-quincy-nemorin-7106b2280/", icon: faLinkedinIn },
            ].map((item, index) => (
              <Link key={index} href={item.href} legacyBehavior target="_blank">
                <a className="text-white-500 hover:text-gray-500">
                  <FontAwesomeIcon icon={item.icon} size={"2x"} />
                </a>
              </Link>
            ))}
              <a href="https://jimnemorin.substack.com/" className="text-white-500 hover:text-gray-500" target="_blank">
                <FaRss size={30} />
              </a>
          </div>
          <p className="mt-2 sm:mt-0">
            <span className="text-gray-400">Contact:</span>{" "}
            <a href="mailto:jimnemorin@proton.me" className="text-blue-500 hover:underline" target="_blank">
            jimnemorin@proton.me
            </a>
          </p>
        </div>

        <div className="order-1 md:order-2 mb-4 md:mb-0 md:ml-4">
          <Image
            src={"/assets/pfr.jpg"}
            alt="Profile"
            width={200}
            height={200}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
