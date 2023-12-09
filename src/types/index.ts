export type IUserId = number | null;

export type IVendorId = number;

export type IReservationId = number;

export type IRoleId = number;

export type IFoodId = number;

export type IMenuId = number;

export type IReservationStatus =
	| "Accepted"
	| "Seated"
	| "Completed"
	| "Canceled"
	| string;

export type IRestaurantFile =
	| "Profile"
	| "Cover"
	| "Food"
	| "Exterior"
	| "Interior";

export type ICuisineCategoryId = number;
export type ISpecialityId = number;
export type IScheduleId = number;

export type INoteId = number;

export type ICardData = {
	createdOn?: string;
	fullName?: string;
	isReviewed?: boolean;
	message?: string;
	numberOfGuest?: number;
	occasionLogo?: string;
	occasionName?: string;
	reason?: string;
	reservationId: IReservationId;
	reservationTime?: string;
	status?: IReservationStatus;
	userId?: number;
	vendorAddress?: string;
	vendorId: number;
	vendorName: string;
	vendorProfileImage: string;
	isDragDisabled?: boolean;
	showDate?: boolean;
};
