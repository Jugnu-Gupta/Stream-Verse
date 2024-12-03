import { Route, Routes, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register/Register.js";
import Login from "./pages/Login/Login.js";
import EmailVerification from "./pages/EmailVerification/EmailVerification.tsx";
import PasswordReset from "./pages/PasswordReset/PasswordReset.tsx";
import MainLayout from "./Layouts/MainLayout.tsx";
import Home from "./pages/Home/Home.tsx";
import Search from "./pages/Search/Search.tsx";
import ChannelVideos from "./pages/Channel/Videos/ChannelVideos.tsx";
import ChannelPlaylists from "./pages/Channel/Playlists/ChannelPlaylists.tsx";
import ChannelTweets from "./pages/Channel/Tweets/ChannelTweets.tsx";
import ChannelTweetComment from "./pages/Channel/Tweets/ChannelTweetComments.tsx";
import ChannelSubscribed from "./pages/Channel/Subscribed/ChannelSubscribed.tsx";
import Dashboard from "./pages/Admin/Dashboard.tsx";
import VideoDetail from "./pages/Video/VideoDetail.tsx";
import Help from "./pages/Help/Help.tsx";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions.tsx";
import EditVideoModal from "./components/Popup/EditVideoModal.tsx";
import DeleteVideoModal from "./components/Popup/DeleteVideoModal.tsx";
import UploadVideoModal from "./components/Popup/UploadVideoModal.tsx";
import ChannelLayout from "./Layouts/ChannelLayout.tsx";
import ChangePassword from "./pages/Channel/ChangePassword/ChangePassword.tsx";
import PersonalInformation from "./pages/Channel/PersonalInformation.tsx/PersonalInfomation.tsx";
import Subscriptions from "./pages/Subscriptions/Subscriptions.tsx";
import History from "./pages/History/History.tsx";
import LikedVideos from "./pages/LikedVideos/LikedVideos.tsx";
import ProtectedLayout from "./Layouts/ProtectedLayout.tsx";
import ProtectedAdminLayout from "./Layouts/ProtectedAdminLayout.tsx";

// check api for subscription and video details using dummy data

//  add publish or not video feature
// basic check for no subscribers in videoDetails
// add video upload feature
// add video edit feature
// add video delete feature
// add video like feature
// add video dislike feature
// add video comment feature
// add video share feature
// add video view feature
// add video playlist feature
// add video search feature
// add video sort feature
// add video pagination feature
// add video filter feature
// add video history feature
// add video watch later, subscription, liked-videos, playlist feature


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainLayout />}>

					{/* Public Routes */}
					<Route index element={<Home />} />
					<Route path="search" element={<Search />} />
					<Route path="video/:videoId" element={<VideoDetail />} />
					<Route path="search2" element={<EditVideoModal setShowEditVideo={() => { console.log("hello") }} />} />
					<Route path="search3" element={<DeleteVideoModal setShowDeleteVideo={() => { console.log("hello") }} />} />
					<Route path="search4" element={<UploadVideoModal setShowUploadVideo={() => { console.log("hello") }} />} />
					<Route path="help" element={<Help />} />

					{/* for current user and channel of other users */}
					<Route path=":adminName/videos" element={<ChannelLayout><ChannelVideos /> </ChannelLayout>} />
					<Route path=":adminName/playlists" element={<ChannelLayout><ChannelPlaylists /></ChannelLayout>} />
					<Route path=":adminName/tweets" element={<ChannelLayout><ChannelTweets /> </ChannelLayout>} />
					<Route path=":adminName/subscribed" element={<ChannelLayout><ChannelSubscribed /> </ChannelLayout>} />

					<Route element={<ProtectedLayout />}>
						<Route path="terms-and-conditions" element={<TermsAndConditions />} />
						<Route path="tweets/:tweetId" element={<ChannelTweetComment />} />
						<Route path="history" element={<History />} />
						<Route path="liked-videos" element={<LikedVideos />} />
						<Route path="playlists" element={<ChannelPlaylists />} />
						<Route path="subscriptions" element={<Subscriptions />} />

						<Route path=":adminName" element={<ProtectedAdminLayout />} >
							<Route path="dashboard" element={<Dashboard />} />

							{/* for current user: use adminName. */}
							<Route path="change-password" element={<ChangePassword />} />
							<Route path="personal-information" element={<PersonalInformation />} />
						</Route>
					</Route>

					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route path="password-reset" element={<PasswordReset />} />
					<Route path="email-verification" element={<EmailVerification />} />

					{/* Catch-all for undefined routes */}
					<Route path="*" element={<Register />} />
				</Route>
			</Routes>
		</BrowserRouter >
	);
}

export default App;
