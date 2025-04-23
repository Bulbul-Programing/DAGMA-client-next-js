'use client'
import { useGetAllNoticesUserQuery } from '@/src/redux/Notice/noticeManagementApi';
import { TNotice } from '@/src/types/TNotice';
import Link from 'next/link';
import Marquee from "react-fast-marquee";
import React, { useState } from 'react';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@heroui/modal';
import { Button } from '@heroui/button';
import Image from 'next/image';
import { TFilter } from '@/src/types/TFilter';
import NoticeLoadingSkeleton from '@/src/Skeleton/Home/NoticeLoadingSkeleton';

const Notice = () => {
    const [sortFelid, setSortFelid] = useState<TFilter>({ sort: "createdAt" });
    const { data: notices, isLoading } = useGetAllNoticesUserQuery(sortFelid)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    const [noticeDetailsId, setNoticeDetailId] = useState('')


    if(isLoading){
        return <NoticeLoadingSkeleton />
    }

    return (
        <div className="bg-slate-200 my-5 mx-5 md:mx-10 lg:mx-10 rounded-lg flex items-center ">

            <Button className="btn bg-blue-400 hover:bg-[#FB9220] text-white font-bold" onPress={onOpen}>All Notice</Button>
            {/* <button className="btn bg-blue-400 hover:text-slate-600 text-white font-bold" onClick={() => document.getElementById('my_modal_5').showModal()}>All Notice</button> */}

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">All Notice</ModalHeader>
                            <ModalBody>
                                <div>
                                    {
                                        notices?.data?.map((notice: TNotice, index: number) =>
                                            <div key={notice._id}>
                                                {
                                                    !notice.isBlock &&
                                                    <div className='w-full'>
                                                        <Button onPress={() => (onOpen2(), setNoticeDetailId(notice._id))} className=" w-full flex justify-start bg-transparent mb-3 hover:text-blue-400 transition shadow-md rounded-lg">
                                                            <p>{index + 1}. </p>
                                                            <p>{notice.noticeTitle.length > 42 ? notice.noticeTitle.slice(0, 42) : notice.noticeTitle}{notice.noticeTitle.length > 42 ? '...' : ''} </p>
                                                            <p> Pub: {new Date(notice.createdAt).toLocaleDateString()}</p>
                                                        </Button>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <div className="overflow-hidden w-full">
                <Marquee pauseOnHover={true} className="">
                    {
                        notices?.data?.map((notice: TNotice) =>
                            <div key={notice._id}>
                                {
                                    !notice.isBlock &&
                                    <div className="mr-10">
                                        <Button onPress={() => (onOpen2(), setNoticeDetailId(notice._id))} className='bg-transparent hover:text-blue-400 transition'>| {notice.noticeTitle} |</Button>
                                        {/* <Link href={notice.image} className="hover:text-blue-400 transition" target="_blank"> | {notice.noticeTitle} | </Link> */}
                                    </div>
                                }
                            </div>
                        )
                    }
                </Marquee>
            </div>

            {/* notice Details */}
            <Modal isOpen={isOpen2} onOpenChange={onOpenChange2}>
                <ModalContent>
                    {(onClose2) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Notice Details</ModalHeader>
                            <ModalBody>
                                <div>
                                    {
                                        notices?.data?.map((notice: TNotice) => notice._id === noticeDetailsId && (
                                            <div key={notice._id}>
                                                <h3 className='text-lg font-semibold'>{notice.noticeTitle}</h3>
                                                <p className='font-medium text-slate-500 my-3'>{notice.noticeDescription}</p>
                                                <Link href={notice.image} className="transition my-3" target="_blank"><Image className='mx-auto hover:shadow-lg border border-slate-400 transition-all rounded-lg h-[250px] w-[300px] object-cover' height={250} width={300} src={notice.image} alt={notice.noticeTitle} /></Link>
                                            </div>
                                        ))
                                    }
                                </div>
                                <Button className='mb-3 border border-red-400 hover:bg-red-500 hover:text-white' variant="bordered" onPress={onClose2}>
                                    Close
                                </Button>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div >
    );
};

export default Notice;