import React from "react";
import { withAuth } from "@/hoc/auth";
// import {
// 	useCancelReservation,
// 	useGetReservationById,
// } from "@/queries/reservation";
import { useRouter } from "next/router";
import crypto from "@/utilities/crypto";
import Image from "next/image";
import { Divider, IconButton, Typography } from "@mui/material";
import moment from "moment";
import Iconify from "@/components/iconify";
import { QRCode, Spin, Tooltip, message } from "antd";
import Link from "next/link";
import useUser from "@/hooks/useUser";
import useAreYouSure from "@/hooks/useAreYouSure";
import handleResponse from "@/utilities/handleResponse";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ReseravtionDetails = () => {
	const router = useRouter();
	const { id } = router.query;
	// const { userId } = useUser();
	// const { data, isLoading } = useGetReservationById(
	// 	id ? Number(crypto.decryptId(id)) : null
	// );

	// React.useEffect(() => {
	// 	if (!userId || !data) return;
	// 	if (data.userId !== userId) router.replace("/404");
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [data, userId]);

	// const { contextHolder, open } = useAreYouSure({
	// 	title: "Cancel Reservation?",
	// 	okText: "Yes, Cancel it",
	// 	cancelText: "No, Keep it",
	// });

	// const { mutateAsync } = useCancelReservation();

	// const onCancel = async () => {
	// 	message.open({
	// 		type: "loading",
	// 		content: "Cancelling Reservation...",
	// 		duration: 0,
	// 	});

	// 	const res = await handleResponse(
	// 		() => mutateAsync(Number(crypto.decryptId(id))),
	// 		[200]
	// 	);
	// 	message.destroy();
	// 	if (res.status && res.response?.isValid) {
	// 		message.success("Reservation cancelled successfully!");
	// 		router.reload();
	// 	} else {
	// 		message.error(res.message || "Something went wrong!");
	// 	}
	// };

	// isLoading
	return true ? (
		<div
			className={
				"min-h-[60vh] w-full flex flex-col items-center justify-center"
			}
		>
			<Spin />
		</div>
	) : (
		<main>
			{/* {contextHolder}
			<Image
				src={`/assets/reservation/${
					data?.status === "Accepted"
						? "accepted.svg"
						: data?.status === "Seated"
						? "seated.svg"
						: data?.status === "Completed"
						? "done.svg"
						: data?.status === "Canceled"
						? "chef-cry.gif"
						: ""
				}`}
				width={400}
				height={400}
				alt=""
				className="w-[90vw] max-w-sm mx-auto mt-3"
			/>
			<Typography className="mx-auto text-center max-w-sm text-sm font-medium">
				Hello, <b>{data?.fullName}</b>.{" "}
				{data?.status === "Accepted" ? (
					<>
						Your reservation is accepted for{" "}
						<b>{moment(data?.reservationTime).calendar()}</b> at{" "}
						{data?.vendorName}.
					</>
				) : data?.status === "Seated" ? (
					<>
						Welcome to <b>{data?.vendorName}</b>. Enjoy your meal.
					</>
				) : data?.status === "Completed" ? (
					<>
						Your reservation has beed completed. Hope you had a great time in{" "}
						<b>{data?.vendorName}</b>.
					</>
				) : data?.status === "Canceled" ? (
					<>
						Your reservation for <b>{data?.vendorName}</b> of{" "}
						<b>{moment(data?.reservationTime).calendar()}</b> has been
						cancelled.
					</>
				) : (
					""
				)}
			</Typography>

			{!!data?.occasionName && data?.occasionName !== "Select" ? (
				<div className="mx-auto w-fit flex flex-row items-center gap-4 mt-7 mb-5 text-xl font-bold underline">
					<Image
						src={previewOccasionImage(data?.occasionLogo)}
						width={40}
						height={40}
						alt={data?.occasionName}
						className="mx-auto"
					/>
					{data?.occasionName}
					<Image
						src={previewOccasionImage(data?.occasionLogo)}
						width={40}
						height={40}
						alt={data?.occasionName}
						className="mx-auto"
					/>
				</div>
			) : (
				<></>
			)}

			<div className="max-w-lg mx-auto mt-10 p-5 bg-slate-100 rounded-md">
				<h4
					className={`font-bold text-center mb-4 text-xl bg-white p-3 ${
						data?.status === "Accepted"
							? "bg-green-50"
							: data?.status === "Seated"
							? "bg-cyan-50"
							: data?.status === "Completed"
							? "bg-green-50"
							: data?.status === "Canceled"
							? "bg-red-50"
							: ""
					}`}
				>
					{data?.status === "Accepted" ? (
						<span className="text-lime-600">Accepted</span>
					) : data?.status === "Seated" ? (
						<span className="text-cyan-700">Seated</span>
					) : data?.status === "Completed" ? (
						<span className="text-lime-600">Completed</span>
					) : data?.status === "Canceled" ? (
						<span className="text-red-600">Cancelled</span>
					) : (
						""
					)}
				</h4>
				<div className="flex flex-col sm:flex-row gap-4">
					<div className="flex-1">
						<div className="flex flex-row sm:flex-col items-start sm:items-end flex-wrap gap-4">
							<Iconify
								icon={"grommet-icons:restaurant"}
								className="text-slate-700 text-5xl"
							/>
							<div>
								<p className="text-sm text-slate-500 font-medium sm:text-right">
									Restaurant Details
								</p>
								<p className="font-bold sm:text-right">
									{data?.vendorName}{" "}
									<Tooltip
										title={`Visit "${data?.vendorName}"`}
										rootClassName="p-1"
									>
										<Link
											href={`/restaurant/${crypto.encryptId(data?.vendorId)}`}
											target="_blank"
										>
											<IconButton
												className="text-xs text-primary"
												color="default"
												size="small"
											>
												<Iconify icon={"majesticons:open"} />
											</IconButton>
										</Link>
									</Tooltip>
								</p>
								<p className="text-xs font-semibold capitalize text-slate-500 sm:text-right">
									{data?.vendorAddress}
								</p>
							</div>
						</div>
					</div>
					<Divider
						orientation="vertical"
						flexItem
					/>
					<div className="flex-1">
						<div className="flex flex-row sm:flex-col items-start flex-wrap gap-4">
							<Iconify
								icon={"mdi:store-clock"}
								className="text-slate-700 text-5xl"
							/>
							<div>
								<p className="text-sm text-slate-500 font-medium">
									Reservation Details
								</p>
								<p className="font-bold">
									{moment(data?.reservationTime).format("ddd, DD MMM, yyyy")}
								</p>
								<p className="text-xs font-semibold text-slate-500">
									Seat for {data?.numberOfGuest}{" "}
									{data?.numberOfGuest > 1 ? "Person" : "People"}
								</p>
							</div>
						</div>
					</div>
				</div>

				<h4 className="font-bold text-center mt-4 text-2xl bg-white p-3">
					{moment(data?.reservationTime).format("hh:mm a")}
				</h4>
			</div>
			<div className="mx-auto w-fit my-6">
				<QRCode
					errorLevel="H"
					value={JSON.stringify({ reservationId: data?.reservationId })}
					// icon="/favicon.svg"
					// iconSize={45}
					color="#334155"
				/>
				<p className="text-center mt-4 text-sm font-bold">
					Reservation#{data?.reservationId}
				</p>
			</div>

			{data?.status === "Accepted" ? (
				<div className="mx-auto max-w-lg text-center">
					You want to cancel your reservation?{" "}
					<span
						className={"cursor-pointer font-bold text-red-600 underline"}
						onClick={() =>
							open(
								() => onCancel(),
								<>
									<p>
										You are cancelling your reservation for{" "}
										<b>
											{moment(data?.reservationTime).format(
												"ddd, DD MMM, yyyy"
											)}
										</b>{" "}
										at <b>{data?.vendorName}</b>.
									</p>
									<br />
									<p>
										Once the reservation is cancelled, you will not be able to
										undo it. Learn more about Reserveit Cancellation Policy{" "}
										<Link
											href={"/cancellation"}
											className={"font-bold text-primary underline"}
											target="_blank"
										>
											Here
										</Link>
										.
									</p>
								</>
							)
						}
					>
						Cancel Reservation
					</span>{" "}
					or, Learn about{" "}
					<Link
						href={"/cancellation"}
						className={"font-bold text-primary underline"}
						target="_blank"
					>
						Cancellation Policy
					</Link>
				</div>
			) : (
				<></>
			)} */}
		</main>
	);
};

export async function getServerSideProps({ locale }: { locale: string }) {
	return {
		props: {
			...(await serverSideTranslations(locale ?? "en", ["common"])),
			// Will be passed to the page component as props
		},
	};
}

export default withAuth(ReseravtionDetails);
