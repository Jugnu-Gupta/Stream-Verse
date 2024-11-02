import React from 'react'

const Help: React.FC = () => {
    return (
        <div className='px-2 max-w-[900px] mx-auto w-5/6 bg-background text-sm'>
            <section className='text-white text-center mt-8'>
                <h1 className='text-3xl font-bold'>Help & Support</h1>
                <p className='mt-4 mb-6 text-[16px]'>Welcome to our Help and Support page! Here you'll find answers to frequently asked questions regarding account setup, video management and troubleshooting.</p>
                <hr />
            </section>

            <section className='text-white my-8'>
                <h2 className='text-2xl font-semibold'>General Account Questions</h2>
                <p className='text-xl font-semibold mt-2'>How do I create an account?</p>
                <p>Click the “Sign Up” button at the top of the homepage. Fill in your email, choose a password, and follow the verification steps to activate your account.</p>

                <p className='text-xl font-semibold mt-2'>I forgot my password. How can I reset it?</p>
                <p>Click the “Forgot Password” link on the login page. Enter your email address and follow the instructions in the email sent to you.</p>
            </section>

            <section className='text-white my-8'>
                <h2 className='text-2xl font-semibold'>Video Management</h2>
                <p className='text-xl font-semibold mt-2'>How do I upload a video?</p>
                <p>Click on the “Upload” button at the top of the page. You can then select your video file, add a title and description, and set the video’s privacy settings.</p>

                <p className='text-xl font-semibold mt-2'>Can I edit my video after uploading it?</p>
                <p>Yes, go to your “Video Library,” select the video you want to edit, and make changes to the title, description, thumbnail, or privacy settings.</p>

                <p className='text-xl font-semibold mt-2'>How do I delete a video?</p>
                <p>In your “Video Library,” select the video you wish to delete and click the “Delete” button. This action is permanent, so confirm your choice before proceeding.</p>
            </section>

            <section className='text-white my-8'>
                <h2 className='text-2xl font-semibold'>Watching and Interacting with Videos</h2>
                <p className='text-xl font-semibold mt-2'>How do I create a playlist?</p>
                <p>Go to your “Library” tab and select “Create Playlist.” You can name your playlist and add videos to it for easy access.</p>

                <p className='text-xl font-semibold mt-2'>Can I edit my video after uploading it?</p>
                <p>Yes, go to your “Video Library,” select the video you want to edit, and make changes to the title, description, thumbnail, or privacy settings.</p>

                <p className='text-xl font-semibold mt-2'>How do I leave a comment on a video?                </p>
                <p>Scroll down to the comments section below the video and type your message in the comment box. Hit “Post” to publish it.</p>
            </section>

            <section className='text-white my-8'>
                <h2 className='text-2xl font-semibold'>Troubleshooting</h2>
                < p className='text-xl font-semibold mt-2'>My video won't play. What can I do?</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi voluptas doloremque exercitationem libero possimus incidunt officia quasi a dolores, porro ex aliquid sapiente dicta quo quae maiores laborum labore. Unde.</p>

                <p className='text-xl font-semibold mt-2'>Why is my video buffering or loading slowly?</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet laboriosam, perspiciatis dolor natus vero beatae doloribus quidem, ratione debitis, ducimus maxime exercitationem excepturi architecto officiis quasi pariatur iusto nulla ab.</p>

                <p className='text-xl font-semibold mt-2'>My video upload failed. What should I check?</p>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum, velit perferendis earum, labore eos, laborum odit esse laudantium quis fugiat eum? Numquam nesciunt sint inventore dolores beatae velit iste totam!</p>
            </section>
        </div>
    )
}

export default Help;