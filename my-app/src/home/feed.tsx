import Sidebar from "@/reusable/sidebar";
import {Flex} from "@chakra-ui/react";
import Home from "./home";

const Feed = () => {
	return (
		<div className="flex min-h-screen items-center ">
			<Flex backgroundColor={"white"} padding={5} rounded={"lg"}>
				<Sidebar />
				<Home />
			</Flex>
		</div>
	);
};

export default Feed;
