import React from "react";
import Image from "next/image";

import { Box } from "@mui/material";

// Swiper Component
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { previewImage } from "@/service";

const Banner: React.FC<{ banners: any[] }> = ({ banners }) => {
	return (
		<>
			<div className="relative">
				<Swiper
					centeredSlides={true}
					autoplay={{
						delay: 3500,
					}}
					spaceBetween={30}
					pagination={{
						dynamicBullets: true,
						clickable: true,
					}}
					modules={[Autoplay, Pagination]}
					className="p-4 pt-2 [&>div.swiper-wrapper]:mb-4 [&>.swiper-pagination>.swiper-pagination-bullet-active]:bg-primary"
				>
					{banners?.map((feedImg: any) =>
						feedImg?.cover_url ? (
							<SwiperSlide key={feedImg.id}>
								<Box
									sx={{
										position: "relative",
										borderRadius: "6px",
										overflow: "hidden",
										// boxShadow: 5,
										"& img": {
											position: "relative",
											width: "100%",
											aspectRatio: "820/360",
											objectFit: "cover",
											// maxHeight: "480px",
											objectPosition: "center",
										},
										"& div": {
											position: "absolute",
											top: 0,
											left: 0,
											width: "100%",
											height: "100%",
											transform: "matrix(-1, 0, 0, 1, 0, 0)",
											background:
												"linear-gradient(118.44deg, rgba(174, 187, 204, 0) 0%, rgba(68, 70, 76, 0.473287) 26.85%, rgba(33, 32, 34, 0.63) 53.18%, rgba(26, 22, 30, 0.99) 97.24%, #161C24 97.25%)",
										},
									}}
								>
									<Image
										src={previewImage(feedImg.cover_url)}
										alt={feedImg.name}
										width={1640}
										height={720}
										priority
									/>
									{/* <div /> */}
								</Box>
							</SwiperSlide>
						) : null
					)}
				</Swiper>
			</div>
		</>
	);
};

export default Banner;
