import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-blue-50 py-10">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Company Info */}
                <div>
                    <Image
                        alt="Company Logo"
                        className="rounded-2xl mb-3"
                        height={80}
                        src="https://res.cloudinary.com/depy0i4bl/image/upload/v1738933488/New_Project_plpgem.png"
                        width={80}
                    />
                    <h2 className="text-xl font-semibold">Duaria Abdul Gufoor Model Academy</h2>
                    <p className=" text-sm mt-2">
                        Duaria, Debidwar, Cumilla.
                    </p>
                    <p className=" text-sm">Phone: +88 01863-650645</p>
                </div>

                {/* Navigation Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link className=" hover:text-blue-500" href="/academy">
                                Our Academy
                            </Link>
                        </li>
                        <li>
                            <Link className=" hover:text-blue-500" href="/blog">
                                BLog
                            </Link>
                        </li>
                        <li>
                            <Link className=" hover:text-blue-500" href="/aboutUs">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link className=" hover:text-blue-500" href="/contactUs">
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
                    <div className="flex space-x-4">
                        <Link
                            className=" hover:text-blue-500 text-xl"
                            href="https://www.facebook.com/duariacollege"
                            target="_blank"
                        >
                            <FaFacebookF />
                        </Link>
                        <Link className=" hover:text-blue-500 text-xl" href="#">
                            <FaTwitter />
                        </Link>
                        <Link className=" hover:text-blue-500 text-xl" href="#">
                            <FaInstagram />
                        </Link>
                        <Link className=" hover:text-blue-500 text-xl" href="#">
                            <FaLinkedinIn />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="text-center  text-sm mt-6">
                &copy; {new Date().getFullYear()} Fiber IT Institute. All rights
                reserved.
            </div>
        </footer>
    );
};

export default Footer;