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


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route index element={<Home />} />
					<Route path="/search" element={<Search />} />
					<Route path="/search2" element={<EditVideoModal setShowEditVideo={() => { console.log("hello") }} />} />
					<Route path="/search3" element={<DeleteVideoModal setShowDeleteVideo={() => { console.log("hello") }} />} />
					<Route path="/search4" element={<UploadVideoModal setShowUploadVideo={() => { console.log("hello") }} />} />
					<Route path="/help" element={<Help />} />

					<Route path="/" element={<ProtectedLayout />}>
						<Route path="/video/:videoId" element={<VideoDetail />} />
						<Route path="/terms-and-conditions" element={<TermsAndConditions />} />
						<Route path="/tweets/:tweetId" element={<ChannelTweetComment />} />
						<Route path="/history" element={<History />} />
						<Route path="/liked-videos" element={<LikedVideos />} />
						<Route path="/collections" element={<ChannelPlaylists />} />
						<Route path="/subscriptions" element={<Subscriptions />} />
						<Route path="/:adminName/dashboard" element={<Dashboard />} />

						{/* for current user: use adminName. */}
						<Route path="/:adminName/change-password" element={<ChangePassword />} />
						<Route path="/:adminName/personal-information" element={<PersonalInformation />} />
						<Route path="/:adminName/videos" element={<ChannelLayout><ChannelVideos /> </ChannelLayout>} />
						<Route path="/:adminName/playlists" element={<ChannelLayout><ChannelPlaylists /></ChannelLayout>} />
						<Route path="/:adminName/tweets" element={<ChannelLayout><ChannelTweets /> </ChannelLayout>} />
						<Route path="/:adminName/subscribed" element={<ChannelLayout><ChannelSubscribed /> </ChannelLayout>} />
					</Route>

					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/password-reset" element={<PasswordReset />} />
					<Route path="/email-verification" element={<EmailVerification />} />
					<Route path="*" element={<Register />} />
				</Route>
			</Routes>
		</BrowserRouter >
	);
}

export default App;
