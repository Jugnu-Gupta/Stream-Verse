import React, { useEffect } from 'react'
import { ChannelNavItemsProps } from "../../../Constants/ChannelNavbar";
import { Link, useParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

interface ChannelNavbarProps {
    entityType: string;
    channelNavItems: ChannelNavItemsProps[];
}

const ChannelNavbar: React.FC<ChannelNavbarProps> = ({ entityType, channelNavItems }) => {
    const [page, setPage] = React.useState<string>("videos");
    const { adminName } = useParams<{ adminName: string }>();
    const url: string = window.location.href;

    useEffect(() => {
        const path: string | undefined = url.split("/").pop();
        const validPaths: string[] = channelNavItems.map((navItem) => navItem.link);

        if (path && validPaths.includes(path)) {
            setPage(path);
        }
    }, [url, channelNavItems]);

    return (
        <nav className="bg-background-primary flex justify-between items-center text-center xs:text-sm mt-4 text-primary-text font-semibold max-w-2xl">
            {
                channelNavItems.map((navItem: ChannelNavItemsProps) => (
                    <Link key={navItem.id}
                        to={`/${entityType}/${adminName}/${navItem.link}`}
                        className="w-full "
                        onClick={() => setPage(navItem.link)}>
                        <h3
                            className={twMerge(
                                "px-2 py-1 duration-300",
                                page === navItem.link &&
                                "bg-background-secondary rounded-md"
                            )}>
                            {navItem.name}
                        </h3>
                    </Link>
                ))
            }
        </nav>
    )
}

export default ChannelNavbar;