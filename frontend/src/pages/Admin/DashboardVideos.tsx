import React from 'react';
import VideoListView from "./VideoListView";

const DashboardVideos: React.FC = () => {
    return (
        <div className="overflow-x-auto mt-4">
            <table className="w-full text-white border-collapse">
                <thead>
                    <tr className="text-nowrap border-[1px] border-background-secondary">
                        <th className="px-4 py-2 text-center border-r border-background-secondary w-1/12">Toggle</th>
                        <th className="px-4 py-2 text-center border-r border-background-secondary w-1/12">Status</th>
                        <th className="px-4 py-2 text-center border-r border-background-secondary w-full">Video</th>
                        <th className="px-4 py-2 text-center border-r border-background-secondary w-1/12">Engagement</th>
                        <th className="px-4 py-2 text-center border-r border-background-secondary w-1/12">Upload Date</th>
                        <th className="px-4 py-2 text-center w-1/12">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    <VideoListView />
                    <VideoListView />
                    <VideoListView />
                    <VideoListView />
                    <VideoListView />
                    <VideoListView />
                </tbody>
            </table>
        </div>
    )
}

export default DashboardVideos;