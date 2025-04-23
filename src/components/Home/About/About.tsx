import { Button } from '@heroui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaBookOpen } from "react-icons/fa";

const About = () => {
    return (
        <div className='flex flex-col md:flex-row lg:flex-row justify-between gap-x-10 items-center px-5 md:px-10 lg:px-10 py-10'>
            <div className='w-full md:w-[40%] lg:w-[40%] grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3'>
                <div className='space-y-4'>
                    <Image className='rounded-[60px] rounded-br-none' height={300} width={220} alt='' src='https://res.cloudinary.com/durkh1c9d/image/upload/v1745322332/01_lfbzz9.jpg' />
                    <Image className='border' height={120} width={120} alt='' src='https://res.cloudinary.com/depy0i4bl/image/upload/v1738933488/New_Project_plpgem.png' />
                </div>
                <div className='space-y-4'>
                    <Image className='rounded-full object-cover p-1 border-3 border-blue-300 border-dashed' height={300} width={220} alt='' src='https://res.cloudinary.com/durkh1c9d/image/upload/v1745322354/02_fcxh0z.jpg' />
                    <Image className='rounded-[60px] rounded-tl-none' height={300} width={220} alt='' src='https://res.cloudinary.com/durkh1c9d/image/upload/v1745322317/03_s8blmy.jpg' />
                </div>
            </div>
            <div className='w-full md:w-[60%] lg:w-[60%] '>
                <p className='text-blue-500 text-lg flex items-center gap-x-2 mb-5'> <span><FaBookOpen /></span> About Us</p>
                <h1 className='text-2xl md:text-2xl lg:text-4xl font-bold'>Learn <span className='text-blue-500 font-extrabold'>Today</span>, Lead <span className='text-[#FB9220] font-extrabold'>Tomorrow</span>, Be the Bold <span className='text-blue-500 font-extrabold'>Future</span>.</h1>
                <p className=' text-base lg:text-lg font-semibold text-slate-600 my-3 md:my-5 lg:my-8'>Discover a place where academic excellence meets vibrant campus life. At Duaria Abdul Gufoor Model Academy, we empower students to grow, lead, and succeed.</p>
                <div className='flex items-center gap-x-4'>
                    <Link href="/academy"><Button className='block md:hidden lg:hidden bg-blue-500 hover:bg-[#FB9220] text-white rounded-bl-none'>DISCOVER MORE</Button> <Button size='lg' className='hidden md:block lg:block bg-blue-500 hover:bg-[#FB9220] text-white rounded-bl-none'>DISCOVER MORE</Button></Link>
                    <div className=' shadow-lg px-3 py-1 rounded-md flex items-center gap-x-3'>
                        <Image className='' height={40} width={40} alt='' src='https://res.cloudinary.com/durkh1c9d/image/upload/v1745329775/helpdesk_1_zqffvr.gif' />
                        <div>
                            <p className='text-[#FB9220]'>Call Now</p>
                            <p>01863-650645</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;