import {
	useAddToCart,
	useDeleteCart,
	useGetCarts,
	useUpdateCart,
} from "@/queries/cart";
import handleResponse from "@/utilities/handleResponse";
import { message } from "antd";

const useCart = () => {
	const { isLoading, data } = useGetCarts();

	//Update Function
	const { mutateAsync: update, isLoading: isCartUpdating } = useUpdateCart();
	const onSubmit = async (id: number, data: any) => {
		message.open({
			type: "loading",
			content: "Updating Cart..",
			duration: 0,
		});
		const res = await handleResponse(() =>
			update({
				id,
				data,
			})
		);
		message.destroy();
		if (res.status) {
			message.success(res.message);
		} else {
			message.error(res.message);
		}
	};

	const { mutateAsync: addToCart, isLoading: isAddingToCart } = useAddToCart();

	const onAdd = async (product_id: number, quantity: number) => {
		message.open({
			type: "loading",
			content: "Adding products to cart..",
			duration: 0,
		});
		const res = await handleResponse(
			() =>
				addToCart({
					product_id,
					quantity,
				}),
			201
		);
		message.destroy();
		if (res.status) {
			message.success(res.message);
		} else {
			message.error(res.message);
		}
	};

	//Delete Cart Section
	const { mutateAsync: Delete, isLoading: isDeleteLoading } = useDeleteCart();

	const onDelete = async (id: number) => {
		message.open({
			type: "loading",
			content: "Deleting Product from Cart..",
			duration: 0,
		});

		const res = await handleResponse(() => Delete(id));
		message.destroy();
		if (res.status) {
			message.success(res.message);
			return true;
		} else {
			message.error(res.message);
			return false;
		}
	};

	return {
		isLoading,
		cart: data || [],
		findProduct: (id: number) =>
			data?.find((item: any) => item.product.id === id),
		onUpdate: onSubmit,
		isCartUpdating,
		onAdd,
		isAddingToCart,
		isDeleting: isDeleteLoading,
		onDelete,
	};
};

export default useCart;
