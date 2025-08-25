import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdMore, IoMdArrowBack } from "react-icons/io";
import { MdDeleteOutline, MdOutlineReport, MdOutlineMarkEmailUnread, MdOutlineWatchLater, MdOutlineAddTask, MdOutlineDriveFileMove } from "react-icons/md";
import { BiArchiveIn } from "react-icons/bi";
const Mail = ({ mail }) => {
    // is component ka intent hai ek single email ka detail dikhana
    const navigate = useNavigate();
    return (
        <div className='flex-1 bg-white rounded-xl mx-5'>
            {/* Upar ke action buttons aur back button yahan dikh rahe hain */}
            <div className='flex items-center justify-between px-4'>
                <div className='flex items-center gap-2 text-gray-700 py-2'>
                    <div onClick={() => navigate("/")} className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <IoMdArrowBack size={"20px"} />
                    </div>
                    <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <BiArchiveIn size={"20px"} />
                    </div>
                    <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <MdOutlineReport size={"20px"} />
                    </div>
                    <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <MdDeleteOutline size={"20px"} />
                    </div>
                    <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <MdOutlineMarkEmailUnread size={"20px"} />
                    </div>
                    <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <MdOutlineWatchLater size={"20px"} />
                    </div>
                    <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <MdOutlineAddTask size={"20px"} />
                    </div>
                    <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <MdOutlineDriveFileMove size={"20px"} />
                    </div>
                    <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <IoMdMore size={"20px"} />
                    </div>
                </div>
            </div>
            {/* Neeche email ka detail dikh raha hai */}
            <div className='p-6'>
                <h1 className='text-xl font-medium mb-2'>{mail?.subject}</h1>
                <div className='text-gray-500 text-sm mb-2'>
                    <span>{mail?.to}</span> <span className='ml-2'>to me</span>
                </div>
                <div className='text-gray-400 text-xs mb-4'>
                    {mail?.createdAt && new Date(mail.createdAt.seconds * 1000).toUTCString()}
                </div>
                <div className='my-10'>
                    <p>{mail?.message}</p>
                </div>
            </div>
        </div>
    );
}

export default Mail