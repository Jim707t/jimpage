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
          <h1 className="text-2xl sm:text-4xl font-bold mb-2 md:mb-0">I&aposm Jim Quincy Nemorin</h1>
          <p className="text-sm sm:text-base md:text-base lg:text-lg xl:text-lg mt-2 text-gray-300">
            I work every day to become a better human being. I like to build and learn things that interest me. I'm mainly interested in technology topics, but I'm interested in much more than that. I hope that one day I will see myself as the human I want to be.
          </p>
          <p className="mt-2 sm:mt-0">
            <span className="text-gray-100">Email me here -&gt;</span>{" "}
            <a href="mailto:jimnemorin@proton.me" className="text-blue-500 hover:underline" target="_blank">
              jimnemorin@proton.me
            </a>
          </p>
        </div>

        <div className="order-1 md:order-2 mb-4 md:mb-0 md:ml-4">
          <div className="w-32 sm:w-48 md:w-64 lg:w-72 xl:w-80">
            <Image
              src={"/assets/pfr.jpg"}
              alt="Profile"
              width={320}
              height={320}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
