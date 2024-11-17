import { Route, Routes, BrowserRouter, Outlet } from "react-router-dom";
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

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Outlet />}>
					<Route
						index
						element={<MainLayout> <Home /> </MainLayout>}
					/>
					<Route
						path="/video/:videoId"
						element={<MainLayout> <VideoDetail /> </MainLayout>}
					/>
					<Route
						path="/search"
						element={<MainLayout> <Search /> </MainLayout>}
					/>
					<Route
						path="/search2"
						element={<MainLayout> <EditVideoModal setShowEditVideo={() => { console.log("hello") }} /> </MainLayout>}
					/>
					<Route
						path="/search3"
						element={<MainLayout> <DeleteVideoModal setShowDeleteVideo={() => { console.log("hello") }} /> </MainLayout>}
					/>
					<Route
						path="/search4"
						element={<MainLayout> <UploadVideoModal setShowUploadVideo={() => { console.log("hello") }} /> </MainLayout>}
					/>
					<Route
						path="/help"
						element={<MainLayout><Help /></MainLayout>}
					/>
					<Route
						path="/terms-and-conditions"
						element={<MainLayout><TermsAndConditions /></MainLayout>}
					/>
					<Route
						path="/tweets/:tweetId"
						element={<MainLayout> <ChannelTweetComment /> </MainLayout>}
					/>
					<Route
						path="/email-verification"
						element={<EmailVerification />}
					/>

					<Route
						path="/history"
						element={<MainLayout> <Search /> </MainLayout>}
					/>
					<Route
						path="/liked-videos"
						element={<MainLayout> <Search /> </MainLayout>}
					/>
					<Route
						path="/collections"
						element={<MainLayout> <ChannelPlaylists /> </MainLayout>}
					/>
					<Route
						path="/subscriptions"
						element={<MainLayout> <Search /> </MainLayout>}
					/>

					<Route
						path="/:adminName/dashboard"
						element={<MainLayout> <Dashboard /> </MainLayout>}
					/>
					<Route
						path="/me" // for current user: use adminName. 
						element={
							<MainLayout>
								<ChannelLayout>	<ChangePassword /> </ChannelLayout>
							</MainLayout>
						} />
					<Route
						path="/:adminName/videos" // for current user: use adminName. 
						element={
							<MainLayout>
								<ChannelLayout>	<ChannelVideos /> </ChannelLayout>
							</MainLayout>
						} />
					<Route
						path="/:adminName/playlists"
						element={
							<MainLayout>
								<ChannelLayout>	<ChannelPlaylists /></ChannelLayout>
							</MainLayout>
						} />
					<Route
						path="/:adminName/tweets"
						element={
							<MainLayout>
								<ChannelLayout>	<ChannelTweets /> </ChannelLayout>
							</MainLayout>
						} />
					<Route
						path="/:adminName/subscribed"
						element={
							<MainLayout>
								<ChannelLayout>	<ChannelSubscribed /> </ChannelLayout>
							</MainLayout>
						} />

					<Route path="/login" element={<Login />} />
					<Route path="/password-reset" element={<PasswordReset />} />
					<Route path="/register" element={<Register />} />
					<Route path="*" element={<Register />} />
				</Route>
			</Routes>
		</BrowserRouter >
	);
}

export default App;
