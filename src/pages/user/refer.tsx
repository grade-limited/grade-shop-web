import React from "react";
import UserNav from "@/components/pages/user/nav";
import { InlineIcon } from "@iconify/react";
import { Divider, Input, QRCode, Spin, Timeline } from "antd";
import { Button, IconButton } from "@mui/material";
import Iconify from "@/components/iconify";
import {
	FacebookShareButton,
	WhatsappShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	FacebookMessengerShareButton,
} from "react-share";
import { withAuth } from "@/hoc/auth";
import { message as msg } from "@/components/antd/message";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useUser from "@/hooks/useUser";
const message =
	"🍽️ Hi there! Join Grade E-mart Ltd., your tech-enabled solution to rising prices and superfluous middlemen. \n \n Sign up with my Referral Code to get Coupon:";
const hashtags = "#GradeLTD#GradeEMart#GradeEmployeeMart";

const Refer: React.FC = () => {
	const user = useUser();
	const [url, setUrl] = React.useState("");

	// eslint-disable-next-line react-hooks/exhaustive-deps
	React.useEffect(() => {
		if (!user?.id) return;
		setUrl(`/sign/register?referral=${user.referral_code}`);
	}, [user]);

	return (
		<UserNav>
			<div>
				<div className="flex flex-row items-start my-4  gap-4">
					<InlineIcon
						icon={"icon-park-outline:share-sys"}
						className="text-5xl"
					/>

					<h1 className="font-medium text-2xl flex flex-col items-start` ">
						Share &amp; Refer a friend
						<span className="text-base font-medium text-slate-500">
							you can both earn points after signing up with reference.
						</span>
					</h1>
				</div>
				<div className="bg-slate-100 p-4 rounded flex flex-col gap-6 ">
					<div className="flex flex-col sm:flex-row gap-6 items-center">
						<div>
							<Spin
								tip="Loading"
								size="large"
								spinning={!user?.id}
							>
								{!user?.id ? (
									<div className="h-40 w-40" />
								) : (
									<QRCode
										errorLevel="H"
										value={url}
										color={"#334155"}
									/>
								)}
							</Spin>
						</div>
						<div className="flex flex-row sm:flex-col flex-wrap items-center justify-center sm:items-start gap-1 gap-y-5 sm:gap-y-1 w-full sm:pl-4 [&>button]:px-2">
							<Button
								disableRipple
								disableFocusRipple
								disableTouchRipple
								className="hover:bg-transparent  min-w-0 w-fit px-0 hover:text-primary hover:font-medium"
								component={WhatsappShareButton}
								title={message}
								url={url}
								startIcon={
									<Iconify
										icon={"mdi:whatsapp"}
										className={"text-2xl sm:text-lg"}
									/>
								}
							>
								<span className="hidden sm:inline">WhatsApp</span>
							</Button>

							<Button
								disableRipple
								disableFocusRipple
								disableTouchRipple
								className="hover:bg-transparent min-w-0 w-fit px-0 hover:text-primary hover:font-medium"
								component={FacebookShareButton}
								quote={message}
								hashtag={hashtags}
								url={url}
								startIcon={
									<Iconify
										icon={"lucide:facebook"}
										className={"text-2xl sm:text-lg"}
									/>
								}
							>
								<span className="hidden sm:inline">Facebook</span>
							</Button>
							<Button
								disabled
								disableRipple
								disableFocusRipple
								disableTouchRipple
								className="hover:bg-transparent w-fit min-w-0 px-0 hover:text-primary hover:font-medium"
								component={FacebookMessengerShareButton}
								appId={""}
								url={url}
								startIcon={
									<Iconify
										icon={"mingcute:messenger-line"}
										className={"text-2xl sm:text-lg"}
									/>
								}
							>
								<span className="hidden sm:inline">Messenger</span>
							</Button>
							<Button
								disableRipple
								disableFocusRipple
								disableTouchRipple
								className="hover:bg-transparent w-fit min-w-0 px-0 hover:text-primary hover:font-medium"
								component={TwitterShareButton}
								url={url}
								title={message}
								hashtags={hashtags.split("#")}
								startIcon={
									<Iconify
										icon={"lucide:twitter"}
										className={"text-2xl sm:text-lg"}
									/>
								}
							>
								<span className="hidden sm:inline">Twitter</span>
							</Button>
							<Button
								disableRipple
								disableFocusRipple
								disableTouchRipple
								className="hover:bg-transparent w-fit px-0 min-w-0 hover:text-primary hover:font-medium"
								component={LinkedinShareButton}
								url={url}
								title="Join Reserveit!"
								summary={message}
								source={"Reserveitbd"}
								startIcon={
									<Iconify
										icon={"lucide:linkedin"}
										className={"text-2xl sm:text-lg"}
									/>
								}
							>
								<span className="hidden sm:inline">LinkedIn</span>
							</Button>
						</div>
					</div>
					<div className="sm:col-span-2 flex flex-row items-center justify-center">
						<Input
							// size="large"
							id="clipboard-area"
							value={url}
							readOnly
							className="text-sm md:text-base font-medium border-none text-slate-300"
							suffix={
								<IconButton
									color="primary"
									onClick={() => {
										const inptbdy = document?.getElementById(
											"clipboard-area"
										) as HTMLInputElement;
										inptbdy?.focus?.();
										inptbdy?.select?.();
										window?.navigator?.clipboard?.writeText(inptbdy.value);
										msg?.success("Referral Link Copied to the Clipboard.");
									}}
								>
									<Iconify icon={"uil:copy"} />
								</IconButton>
							}
						/>
					</div>
				</div>
				<Divider
					className="mt-5 mb-2 border-slate-300 text-lg font-bold items-center"
					// orientation="left"
					// orientationMargin={0}
				>
					How it works
				</Divider>

				<div className="p-6">
					<Timeline
						items={[
							{
								dot: (
									<InlineIcon
										icon={"mingcute:invite-line"}
										className="text-3xl "
									/>
								),
								children: (
									<>
										<h2 className="text-xl font-bold ml-2">
											Invite your friends
										</h2>
										<p className="text-sm text-slate-500 font-medium ml-2">
											Just share your link, or referral code via QR code, or
											social media.
										</p>
									</>
								),
							},
							{
								dot: (
									<InlineIcon
										icon={"mdi:sign"}
										className="text-3xl"
									/>
								),
								children: (
									<>
										<h2 className="text-xl font-bold ml-2">
											They hit the road
										</h2>
										<p className="text-sm text-slate-500 font-medium ml-2">
											Signing up with your shared link or referral code and get
											💰 11 points.
										</p>
									</>
								),
							},
							{
								dot: (
									<InlineIcon
										icon={"ic:twotone-celebration"}
										className="text-3xl"
									/>
								),
								children: (
									<>
										<h2 className="text-xl font-bold ml-2">You make points!</h2>
										<p className="text-sm text-slate-500 ml-2 font-medium">
											Then you get 💰 2 points 🎉
										</p>
									</>
								),
							},
						]}
					/>
				</div>
			</div>
		</UserNav>
	);
};

export async function getStaticProps({ locale }: { locale: string }) {
	return {
		props: {
			...(await serverSideTranslations(locale ?? "en", ["common"])),
			// Will be passed to the page component as props
		},
	};
}

export default withAuth(Refer);
