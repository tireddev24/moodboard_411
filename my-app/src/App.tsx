import {Box, Container} from "@chakra-ui/react";
import {Route, Routes} from "react-router-dom";
import Register from "./auth/create";
import ForgotPassword from "./auth/forgotpassword";
import Login from "./auth/login";
import Reset from "./auth/resetpassword";
import VerifyCode from "./auth/verify";
import Feed from "./home/feed";

function App() {
	return (
		<>
			<Box className=" bg-dark ">
				<Container maxWidth="breakpoint-4xl">
					<Routes>
						<Route path="login" element={<Login />}>
							<Route
								path="forgot-password"
								element={<ForgotPassword />}>
								<Route path="verify" element={<VerifyCode />} />
								<Route path="reset" element={<Reset />} />
							</Route>
						</Route>
						<Route path="register" element={<Register />} />
						<Route path="feed" element={<Feed />} />
					</Routes>
				</Container>
			</Box>
		</>
	);
}

export default App;
