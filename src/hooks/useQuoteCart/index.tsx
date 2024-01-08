import { useAddToCart, useDeleteCart } from "@/queries/cart";
import {
  useAddToQuoteCart,
  useDeleteQuoteCart,
  useGetQuoteCarts,
  useUpdateQuoteCart,
} from "@/queries/cart/quote";
import handleResponse from "@/utilities/handleResponse";
import { message } from "antd";

const useQuoteCart = () => {
  const { isLoading, data } = useGetQuoteCarts();

  //Update Function
  const { mutateAsync: update, isLoading: isQuoteUpdating } =
    useUpdateQuoteCart();
  const onSubmit = async (id: number, data: any) => {
    message.open({
      type: "loading",
      content: "Updating Quotation..",
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

  const { mutateAsync: addToQuoteCart, isLoading: isAddingToQuoteCart } =
    useAddToQuoteCart();

  const onAdd = async (product_id: number, quantity: number) => {
    message.open({
      type: "loading",
      content: "Adding products to cart..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        addToQuoteCart({
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
  const { mutateAsync: Delete, isLoading: isDeleteLoading } =
    useDeleteQuoteCart();

  const onQuoteDelete = async (id: number) => {
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
    quoteCart: data || [],
    findonQuoteProduct: (id: number) =>
      data?.find((item: any) => item.product.id === id),
    onQuoteUpdate: onSubmit,
    isQuoteUpdating,
    onAdd,
    isAddingToQuoteCart,
    isQuoteDeleting: isDeleteLoading,
    onQuoteDelete,
  };
};

export default useQuoteCart;
