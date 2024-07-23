import { Route, Routes, BrowserRouter, Outlet } from "react-router-dom";
import Register from "./pages/Register/Register.js";
import Login from "./pages/Login/Login.js";
import EmailVerification from "./pages/EmailVerification/EmailVerification.tsx";
import PasswordReset from "./pages/PasswordReset/PasswordReset.tsx";
import MainLayout from "./Layouts/MainLayout.tsx";
import Home from "./pages/Home/Home.tsx";
import Search from "./pages/Search/Search.tsx";
import ChannelHeader from "./pages/Channel/Header/ChannelHeader.tsx";
import ChannelVideos from "./pages/Channel/Videos/ChannelVideos.tsx";
import ChannelPlaylists from "./pages/Channel/Playlists/ChannelPlaylists.tsx";
import ChannelTweets from "./pages/Channel/Tweets/ChannelTweets.tsx";
import ChannelTweetComment from "./pages/Channel/Tweets/ChannelTweetComments.tsx";
import ChannelSubscribed from "./pages/Channel/Subscribed/ChannelSubscribed.tsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Outlet />}>
					<Route
						index
						element={
							<MainLayout>
								<Home />
							</MainLayout>
						}
					/>
					<Route
						path="/search"
						element={
							<MainLayout>
								<Search />
							</MainLayout>
						}
					/>
					<Route
						path="/:userName"
						element={
							<MainLayout>
								<div className="w-full">
									<ChannelHeader />
									<Outlet />
								</div>
							</MainLayout>
						}>
						<Route path="videos" element={<ChannelVideos />} />
						<Route
							path="playlists"
							element={<ChannelPlaylists />}
						/>
						<Route path="tweets" element={<ChannelTweets />} />
						<Route
							path="tweets/:tweetId"
							element={<ChannelTweetComment />}
						/>
						<Route
							path="subscribed"
							element={<ChannelSubscribed />}
						/>
					</Route>
				</Route>
				<Route
					path="email-verification"
					element={<EmailVerification />}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/password-reset" element={<PasswordReset />} />
				<Route path="/register" element={<Register />} />
				<Route path="*" element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
