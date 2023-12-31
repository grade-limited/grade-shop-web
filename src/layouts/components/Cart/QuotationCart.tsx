import React from "react";
import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import {
  useDeleteQuoteCart,
  useGetQuoteCarts,
  useUpdateQuoteCart,
} from "@/queries/cart/quote";
import { Divider, Empty, Skeleton } from "antd";
import { previewImage } from "@/service";
import Iconify from "@/components/iconify";
import {
  AccountEntry,
  findUnitPrice,
  getLowestQuantities,
} from "@/pages/product/[id]";
import { message } from "@/components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import Link from "next/link";
const QuotationCart: React.FC<{ toggleState: () => void }> = ({
  toggleState,
}) => {
  const { data, isLoading } = useGetQuoteCarts();

  //delete function
  const { mutateAsync: DeleteQoute, isLoading: isDeleteLoading } =
    useDeleteQuoteCart();

  const onDelete = async (id: number) => {
    message.open({
      type: "loading",
      content: "Deleting Product from Cart..",
      duration: 0,
    });
    const res = await handleResponse(() => DeleteQoute(id));

    message.destroy();

    if (res.status) {
      message.success(res.message);
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };

  //update function
  const { mutateAsync: update, isLoading: isQuoteCartUpdating } =
    useUpdateQuoteCart();
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
  return (
    <div className="min-h-[85vh] pb-3 flex flex-col">
      <List dense className="flex-1 p-0 m-0">
        {isLoading ? (
          <Skeleton />
        ) : !!data?.length ? (
          data?.map?.((item: any) => (
            <ListItem key={item.id}>
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  className="border-slate-200 border bg-slate-200 text-slate-600"
                  src={previewImage(item.product.thumbnail_url)}
                >
                  <Iconify icon={"solar:album-broken"} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <>
                    {item.product.name}{" "}
                    {!!isQuoteCartUpdating || isDeleteLoading ? (
                      ""
                    ) : (
                      <>
                        &bull;{" "}
                        <span
                          className="text-primary underline cursor-pointer"
                          onClick={() => onDelete(item.id)}
                        >
                          Delete
                        </span>
                      </>
                    )}{" "}
                  </>
                }
                secondary={`${findUnitPrice(
                  "b2b",
                  item.quantity,
                  item.product.price
                )}৳ × ${item.quantity} items = ${
                  findUnitPrice("b2b", item.quantity, item.product.price) *
                  item.quantity
                }৳`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  size="small"
                  onClick={() =>
                    onSubmit(item?.id, { quantity: item.quantity - 1 })
                  }
                  disabled={
                    isQuoteCartUpdating ||
                    (item?.product?.minimum_order_quantity &&
                      getLowestQuantities(
                        item?.product?.minimum_order_quantity as AccountEntry[]
                      )?.["b2b"] >= item?.quantity)
                  }
                >
                  <Iconify icon={"mdi:minus"} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() =>
                    onSubmit(item?.id, { quantity: item.quantity + 1 })
                  }
                  disabled={isQuoteCartUpdating}
                >
                  <Iconify icon={"mdi:plus"} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={"No products!"}
          />
        )}
      </List>

      <div className="mt-auto">
        <Divider className="my-0" />
        <div className="flex flex-row items-center justify-between p-4">
          <p>Total</p>
          <p className="font-semibold">
            {!!data?.length
              ? data
                  ?.map?.(
                    (item: any) =>
                      findUnitPrice("b2b", item.quantity, item.product?.price) *
                      item.quantity
                  )
                  ?.reduce?.((x: number, y: number) => x + y) || 0
              : 0}
            ৳
          </p>
        </div>
        <Link href={"/checkout/quotation"}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={isQuoteCartUpdating}
            className="mt-1 rounded-md w-full bg-slate-700 hover:bg-slate-600"
            startIcon={
              <Iconify icon={"material-symbols:shopping-cart-checkout"} />
            }
            onClick={toggleState}
          >
            Proceed to Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default QuotationCart;
