'use client'
import React, { useEffect, useState } from 'react';
import bloop from '/Blop/blop.png'
import Image from 'next/image';
import CountUp from 'react-countup'
import { useCountTeacherQuery } from '@/src/redux/Teacher/teacherManagementApi';
import { motion } from 'framer-motion'

const QuickInfoCards = () => {
    const [countStart, setCountStart] = useState(false)
    const { data: teacher } = useCountTeacherQuery(undefined)

    useEffect(() => {
        const element = document.getElementById('quickInfoDiv');

        const handleScroll = () => {
            const react = element?.getBoundingClientRect();
            if (react && react.top < 400) {
                setCountStart(true)
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll); // Always clean up!
    }, []);

    const isElementInViewport = (el: HTMLElement) => {
        const rect = el.getBoundingClientRect()
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    return (
        <div id='quickInfoDiv' className="w-full h-[300px] bg-fixed bg-cover bg-center bg-no-repeat mb-5 transition-all duration-500 ease-in-out bg-[url('https://i.ibb.co/VVgHWbb/New-Project-8.jpg')]">
            <div className=" px-3 grid gap-x-2 grid-cols-2 md:grid-cols-2 lg:grid-cols-4 justify-between items-center text-white w-full h-full bg-slate-700 bg-opacity-65">
                <motion.div
                    initial={{
                        opacity: 0,
                        // if odd index card,slide from right instead of left
                        y: 50
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0, // Slide in to its original position
                        transition: {
                            duration: 1 // Animation duration
                        }
                    }}
                    viewport={{ once: true }}
                >
                    <div className="flex justify-center items-center gap-2">
                        <Image className="bg-white rounded-md" height={80} width={80} alt="" priority src="https://res.cloudinary.com/durkh1c9d/image/upload/v1745228988/building_imxak2.gif" />
                        <div className='flex flex-col'>
                            <p className="text-lg font-semibold">Established in</p>
                            {countStart && <div className='flex gap-x-3 items-center'><CountUp className='text-4xl font-bold' start={1850} end={1961} duration={2.5}></CountUp></div>}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{
                        opacity: 0,
                        // if odd index card,slide from right instead of left
                        y: 80
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0, // Slide in to its original position
                        transition: {
                            duration: 1.2 // Animation duration
                        }
                    }}
                    viewport={{ once: true }}
                >
                    <div className="flex justify-center items-center gap-2">
                        <Image className="bg-white rounded-md" height={80} width={80} alt="" priority src="https://res.cloudinary.com/durkh1c9d/image/upload/v1745228994/training_fumdkl.gif" />
                        <div className='flex flex-col'>
                            {countStart && <div className='flex gap-x-1'><p><CountUp className='text-4xl font-bold' start={0} end={teacher?.data ? teacher?.data : 0} duration={2.5}></CountUp></p><span className='text-2xl -mt-2'>+</span></div>}
                            <p className="text-lg font-semibold">Teacher</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{
                        opacity: 0,
                        // if odd index card,slide from right instead of left
                        y: 110
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0, // Slide in to its original position
                        transition: {
                            duration: 1.3 // Animation duration
                        }
                    }}
                    viewport={{ once: true }}
                >
                    <div className="flex justify-center items-center gap-2">
                        <Image className="bg-white rounded-md" height={80} width={80} alt="" priority src="https://res.cloudinary.com/durkh1c9d/image/upload/v1745229011/win_newww8.gif" />
                        <div className='flex flex-col'>
                            {countStart && <div className='flex gap-x-1'><p><CountUp className='text-4xl font-bold' start={0} end={25} duration={2.5}></CountUp></p><span className='text-2xl -mt-2'>+</span></div>}
                            <p className="text-lg font-semibold">Awards Won</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{
                        opacity: 0,
                        // if odd index card,slide from right instead of left
                        y: 140
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0, // Slide in to its original position
                        transition: {
                            duration: 1.4 // Animation duration
                        }
                    }}
                    viewport={{ once: true }}
                >
                    <div className="flex justify-center items-center gap-2">
                        <Image className="bg-white rounded-md" height={80} width={80} alt="" priority src="https://res.cloudinary.com/durkh1c9d/image/upload/v1745229009/cctv_hgnzvg.gif" />
                        <div className='flex flex-col'>
                            {countStart && <div className='flex gap-x-1'><p><CountUp className='text-4xl font-bold' start={0} end={24} duration={2.5}></CountUp></p><span className='text-lg mt-3'>/7</span></div>}
                            <p className="text-lg font-semibold">CCTV Surveillance</p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default QuickInfoCards;