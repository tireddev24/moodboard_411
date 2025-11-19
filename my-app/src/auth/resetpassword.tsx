import {IEyeClose, IEyeOpen} from "@/components/ui/icons";
import {Box, Button, Heading, HStack, Icon, Input} from "@chakra-ui/react";
import {useState} from "react";
import {IoLockClosedOutline} from "react-icons/io5";
import {useNavigate} from "react-router-dom";

export default function Reset() {
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();

	const handleReset = () => {
		navigate("../../../feed");
	};

	return (
		<div className="bg-white ">
			<Box padding={10} textAlign={"center"}>
				<Heading
					margin={10}
					textTransform={"uppercase"}
					fontSize={36}
					fontWeight={"700"}>
					Reset Password
				</Heading>
				<form className="flex flex-col items-center gap-8 *:w-100">
					<div>
						<HStack position={"relative"}>
							<Icon
								position={"absolute"}
								marginLeft={3}
								fontSize={"20px"}>
								<IoLockClosedOutline />
							</Icon>
							<Input
								placeholder="New Password"
								paddingLeft={10}
								h={10}
								w={"full"}
							/>
							<Button
								onClick={() =>
									setShowPassword((prevShow) => !prevShow)
								}
								position={"absolute"}
								right={0}
								variant={"outline"}
								fontSize={"20px"}>
								{showPassword ? <IEyeOpen /> : <IEyeClose />}
							</Button>
						</HStack>
					</div>

					<div>
						<HStack position={"relative"}>
							<Icon
								position={"absolute"}
								marginLeft={3}
								fontSize={"20px"}>
								<IoLockClosedOutline />
							</Icon>
							<Input
								placeholder="Confirm Password"
								paddingLeft={10}
								h={10}
								w={"full"}
							/>
							<Button
								onClick={() =>
									setShowPassword((prevShow) => !prevShow)
								}
								position={"absolute"}
								right={0}
								variant={"outline"}
								fontSize={"20px"}>
								{showPassword ? <IEyeOpen /> : <IEyeClose />}
							</Button>
						</HStack>
					</div>

					<Button
						colorPalette={"primary"}
						bgColor={"f7d4e1"}
						rounded={"2xl"}
						padding={6}
						marginBottom={8}
						onClick={() => handleReset()}>
						Continue
					</Button>
				</form>
			</Box>
		</div>
	);
}
