import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Register from "./pages/Register/Register.js";
import Login from "./pages/Login/Login.js";
import EmailVerification from "./pages/EmailVerification/EmailVerification.tsx";
import PasswordReset from "./pages/PasswordReset/PasswordReset.tsx";
import MainLayout from "./Layouts/MainLayout.tsx";
import Home from "./pages/Home/Home.tsx";
import Search from "./pages/Search/Search.tsx";
import ChannelVideos from "./pages/Channel/Videos/ChannelVideos.tsx";
// import ChannelPlaylists from "./pages/Channel/Playlists/ChannelPlayists.tsx";
import Playlists from "./pages/Playlists/Playlists.tsx";
import ChannelTweets from "./pages/Channel/Tweets/ChannelTweets.tsx";
import TweetDetails from "./pages/Tweet/TweetDetails.tsx";
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
import WatchHistory from "./pages/WatchHistory/WatchHistory.tsx";
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
					<Route path=":adminName" element={<ChannelLayout />}>
						{/* // No params after adminName, then send to No page found */}
						<Route index element={<Navigate to="/register" />} />
						<Route path="videos" element={<ChannelVideos />} />
						<Route path="playlists" element={<Playlists />} />
						<Route path="tweets" element={<ChannelTweets />} />
						<Route path="subscribed" element={<ChannelSubscribed />} />
					</Route >

					<Route element={<ProtectedLayout />}>
						<Route path="terms-and-conditions" element={<TermsAndConditions />} />
						<Route path="tweets/:tweetId" element={<TweetDetails />} />
						<Route path="history" element={<WatchHistory />} />
						<Route path="liked-videos" element={<LikedVideos />} />
						<Route path="playlists" element={<Playlists />} />
						<Route path="subscriptions" element={<Subscriptions />} />

						<Route path=":adminName" element={<ProtectedAdminLayout />} >
							{/* // No params after adminName, then send to No page found */}
							<Route index element={<Navigate to="/register" />} />

							<Route path="dashboard" element={<Dashboard />} />
							{/* for current user: use adminName. */}
							<Route path="change-password" element={<ChangePassword />} />
							<Route path="personal-information" element={<PersonalInformation />} />
						</Route>
					</Route>
				</Route>

				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="password-reset" element={<PasswordReset />} />
				<Route path="email-verification" element={<EmailVerification />} />

				{/* Catch-all for undefined routes */}
				<Route path="*" element={<Register />} />
			</Routes>
		</BrowserRouter >
	);
}

export default App;
