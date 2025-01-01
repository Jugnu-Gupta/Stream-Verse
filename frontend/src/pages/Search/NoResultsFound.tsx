import React from 'react';
import { BiCommentDetail } from 'react-icons/bi';
import { FaRegUser } from 'react-icons/fa';
import { HiOutlineVideoCamera } from 'react-icons/hi';
import { HiOutlineUsers } from "react-icons/hi2";
import { PiFolder } from "react-icons/pi";
import { twMerge } from 'tailwind-merge';

interface NoResultsFoundProps {
    style?: string;
    entityName: string;
    heading: string;
    message: string;
}
const NoResultsFound: React.FC<NoResultsFoundProps> = ({ style, entityName, heading, message }) => {
    return (
        <div className="flex flex-col justify-center items-center text-center text-primary-text px-4 w-full max-w-7xl tracking-wide mx-auto mt-4 z-0 mb-4">
            <div className={twMerge('p-1.5 bg-blue-100 rounded-full', style)}>
                {entityName === 'playlist' && <PiFolder className="text-4xl text-primary p-1" />}
                {entityName === 'channel' && <FaRegUser className="text-4xl text-primary p-1" />}
                {entityName === 'video' && <HiOutlineVideoCamera className="text-4xl text-primary p-1" />}
                {entityName === 'tweet' && <HiOutlineUsers className="text-4xl text-primary p-1" />}
                {entityName === 'comment' && <BiCommentDetail className="text-4xl text-primary p-1" />}
                {entityName === 'subscriber' && <HiOutlineUsers className="text-4xl text-primary p-1" />}
            </div>
            <h1 className="text-md font-semibold">{heading}</h1>
            <p className="text-sm">{message}</p>
        </div>
    )
}

export default NoResultsFound;