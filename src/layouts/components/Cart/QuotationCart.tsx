import React from "react";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import {
  useDeleteQuoteCart,
  useGetQuoteCarts,
  useUpdateQuoteCart,
} from "@/queries/cart/quote";
import { Empty, Skeleton } from "antd";
import { previewImage } from "@/service";
import Iconify from "@/components/iconify";
import {
  AccountEntry,
  findUnitPrice,
  getLowestQuantities,
} from "@/pages/product/[id]";
import { message } from "@/components/antd/message";
import handleResponse from "@/utilities/handleResponse";
const QuotationCart: React.FC = () => {
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
  const { mutateAsync: update, isLoading: isCartUpdating } =
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
    <>
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
                    {!!isCartUpdating || isDeleteLoading ? (
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
                    isCartUpdating ||
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
                  disabled={isCartUpdating}
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
    </>
  );
};

export default QuotationCart;
