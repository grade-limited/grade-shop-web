import Iconify from "@/components/iconify";
import {
	AppBar,
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	IconButton,
	Typography,
} from "@mui/material";
import { Badge, Input } from "antd";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { useTranslation } from "next-i18next";
import ScrollToTop from "react-scroll-to-top";

const Footer: React.FC = () => {
	const { t } = useTranslation("common");

	const [newsletterEmail, setNewsletterEmail] = React.useState("");

	return (
		<footer>
			<ScrollToTop
				smooth
				style={{
					bottom: "105px",
					right: "35px",
				}}
				className="z-30 bg-slate-800 shadow-slate-900 shadow-md"
				component={
					<div className="flex flex-row items-center text-white text-xl justify-center">
						<Iconify icon={"line-md:arrow-up"} />
					</div>
				}
			/>
			<AppBar className="bg-slate-800 relative shadow-none pt-16 z-20">
				{/* <Avatar
						variant="square"
						src={"/logo.svg"}
						className="w-fit"
					/> */}
				<Grid
					container
					className="pb-0 px-8"
					rowGap={5}
					columnGap={3}
				>
					<Grid
						item
						xs={12}
						lg={3.5}
					>
						<Typography
							variant="subtitle2"
							className="font-semibold uppercase"
						>
							{t("FOOTER.COMPANY")}
						</Typography>
						<Typography
							variant="body2"
							className="my-5 md:max-w-xs"
						>
							{t("META.DESCRIPTION")}
						</Typography>
					</Grid>

					<Grid
						item
						xs={5.7}
						md={3}
						lg={1.2}
					>
						<Typography
							variant="subtitle2"
							className="font-semibold uppercase"
						>
							{t("FOOTER.COMPANY_NAME")}
						</Typography>

						<div className="mt-3 flex flex-col gap-2">
							<Link
								href={"https://www.gradebd.com/about/"}
								target="_blank"
							>
								<Typography
									variant="caption"
									// className="font-semibold"
								>
									{t("FOOTER.ABOUT")}
								</Typography>
							</Link>
						</div>
					</Grid>
					<Grid
						item
						xs={5.7}
						md={3}
						lg={1.9}
					>
						<Typography
							variant="subtitle2"
							className="font-semibold uppercase"
						>
							{t("FOOTER.CONTACT")}
						</Typography>

						<div className="mt-3 flex flex-col gap-2">
							<Link
								href={`mailto:${t("FOOTER.CONTACT_EMAIL")}`}
								target="_blank"
							>
								<Typography variant="caption">
									{t("FOOTER.CONTACT_EMAIL")}
								</Typography>
							</Link>
							<Link
								href={`tel:${t("FOOTER.CONTACT_NUMBER")}`}
								target="_blank"
							>
								<Typography variant="caption">
									{t("FOOTER.CONTACT_NUMBER")}
								</Typography>
							</Link>
						</div>
					</Grid>
					<Grid
						item
						xs={5.7}
						md={5.3}
						lg={4}
					>
						<Typography
							variant="subtitle2"
							className="font-semibold uppercase"
						>
							{t("FOOTER.DOWNLOAD_TEXT")}
						</Typography>

						<div className="mt-3 flex flex-row gap-4">
							<Button
								// component={"a"}
								// href="https://play.google.com/store/apps/details?id=com.reserveit.user"
								// target="_blank"
								// rel="noreferrer"
								color="primary"
								className="p-0 min-w-[90px] max-w-[100px] flex-1"
							>
								<Badge.Ribbon
									text="Upcoming!"
									color="red"
									className="text-xs h-fit py-1 -top-2"
								>
									<Avatar
										variant="square"
										src={"/assets/PlayStoreButton.svg"}
										alt="get it on playstore"
										className="w-full h-auto"
									/>
								</Badge.Ribbon>
							</Button>
							<Button
								// component={"a"}
								// href="https://apps.apple.com/us/app/reserveit-bd/id6463799781"
								// target="_blank"
								// rel="noreferrer"
								color="primary"
								className="p-0 min-w-[90px] max-w-[100px] flex-1"
							>
								<Badge.Ribbon
									text="Upcoming!"
									color="red"
									className="text-xs h-fit py-1 -top-2"
								>
									<Avatar
										variant="square"
										src={"/assets/AppStoreButton.svg"}
										alt="get it on playstore"
										className="w-full h-auto"
									/>
								</Badge.Ribbon>
							</Button>
						</div>

						<Typography
							variant="subtitle2"
							className="font-semibold uppercase mt-8"
						>
							{t("FOOTER.NEWSLETTER")}
						</Typography>
						<Typography
							variant="body2"
							className="my-2 md:max-w-xs"
						>
							{t("FOOTER.NEWSLETTER_DESCRIPTION")}
						</Typography>
						<form
							onSubmit={(e) => {
								e.preventDefault(); // !important
								console.log(newsletterEmail);
								// Submit from here
								setNewsletterEmail("");
							}}
						>
							<Input
								value={newsletterEmail}
								placeholder={t("FOOTER.NEWSLETTER_PLACEHOLDER")}
								bordered={false}
								className="bg-slate-600 max-w-xs mt-2 pl-3 pr-1 [&>input]:text-white [&>input]:placeholder-slate-400 placeholder-white text-white"
								onChange={(e) => setNewsletterEmail(e.target.value)}
								suffix={
									<IconButton
										color="primary"
										className="bg-slate-800 rounded-md"
										type="submit"
									>
										<Iconify icon="lets-icons:send-duotone" />
									</IconButton>
								}
							/>
						</form>
					</Grid>
				</Grid>
				<div className="bg-slate-900 py-10 mt-10 flex flex-row items-center justify-between px-10">
					<Typography variant="caption">
						© {moment().format("yyyy") !== "2023" ? "2023 -" : ""}{" "}
						{moment().format("yyyy")} {t("FOOTER.RIGHTS_TEXT")}
					</Typography>
					<div className="flex-1" />
					<Typography
						variant="caption"
						className="font-semibold"
					>
						{t("FOOTER.FOLLOWUSONSOCIALMEDIA")}:
					</Typography>

					{/* social media icons */}
					<div className="m-4 mr-0 flex flex-row gap-2 flex-wrap">
						<Link
							href={"https://www.facebook.com/gradebangladesh"}
							target="_blank"
						>
							<IconButton
								size="small"
								color="info"
								className="border-2 border-solid border-slate-400"
								aria-label="Facebook Link"
							>
								<Iconify icon={"ri:facebook-fill"} />
							</IconButton>
						</Link>
						<Link
							href={"https://www.linkedin.com/company/gradebd"}
							target="_blank"
						>
							<IconButton
								size="small"
								color="info"
								className="border-2 border-solid border-slate-400"
								aria-label="Linkedin Link"
							>
								<Iconify icon={"eva:linkedin-fill"} />
							</IconButton>
						</Link>
						{/* <Link
							href={"https://www.instagram.com/reserveitbd/"}
							target="_blank"
						>
							<IconButton
								size="small"
								color="info"
								className="border-2 border-solid border-slate-400"
								aria-label="Instagram Link"
							>
								<Iconify icon={"uil:instagram-alt"} />
							</IconButton>
						</Link> */}
					</div>
				</div>
			</AppBar>
		</footer>
	);
};

export default Footer;
