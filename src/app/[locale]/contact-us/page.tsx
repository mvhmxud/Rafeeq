import React from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { IoIosMail } from "react-icons/io";
import { FaGooglePlay } from "react-icons/fa";
import img from "../../../../public/contact.png";
import Link from "next/link";
import Image from "next/image";

function page() {
  return (
    <>
      <div className="min-h-screen pt-10 mt-0">
        <div className="items-center bg-white mx-auto w-4/5 md:w-1/3 p-6 rounded-3xl shadow-sm text-center text-maingreen flex flex-col gap-2  text-2xl md:text-5xl  dark:bg-darkmode-light ">
          <div className="md:w-72 w-52 ">
            <Image alt="contact us " className="rtl:mr-4 -ml-4 " src={img} />
          </div>
          <span className="arabic">تواصل معنا </span>
          <div className="flex gap-4 justify-center text-2xl mt-4 text-darkgrey  dark:text-white items-center">
            <Link
              href="https://www.linkedin.com/in/mahmoud-ashraf-4a69931b7/"
              className="hover:text-maingreen hover:scale-[1.2] transition-all"
              target="_blank"
            >
              <BsLinkedin />
            </Link>
            <Link
              href="https://github.com/mvhmxud"
              className="hover:text-maingreen hover:scale-[1.2] transition-all"
              target="_blank"
            >
              <BsGithub />
            </Link>
            <Link
              href="mailto:mvhmxud@gmail.com"
              className="hover:text-maingreen hover:scale-[1.2] transition-all"
            >
              <IoIosMail className="text-3xl" />
            </Link>
          </div>
          <div className="text-2xl text-darkgrey dark:text-white">
            <span className="arabic">قريبا !</span>
          </div>
          <a href="#">
            <FaGooglePlay className="text-2xl transition-all hover:text-darkgrey text-darkgrey dark:text-white  hover:scale-[1.2]" />
          </a>
        </div>
      </div>
    </>
  );
}

export default page;
