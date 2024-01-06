import Iconify from "@/components/iconify";
import { useGetCarts } from "@/queries/cart";
import { previewImage } from "@/service";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { Empty, Skeleton } from "antd";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React from "react";

const order: React.FC = () => {
  const { data: orderData, isLoading } = useGetCarts();
  console.log(orderData);
  return (
    <div className="m-6 flex flex-col">
      <p className="font-medium text-2xl my-2">Shopping Cart</p>
      <p className="font-medium my-2 ">
        Products{" "}
        {isLoading ? (
          ""
        ) : (
          <>({!!orderData?.length && <>{orderData?.length}</>})</>
        )}
      </p>
      <div className="my-2 py-2 bg-white rounded ">
        <List dense className="p-0 m-0">
          {isLoading ? (
            <Skeleton className="p-2" />
          ) : !!orderData?.length ? (
            orderData?.map?.((item: any) => (
              <ListItem key={item.id} className="flex ">
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    className="border-slate-200 border h-24 w-full bg-slate-200 text-slate-600"
                    src={previewImage(item.product.thumbnail_url)}
                  >
                    <Iconify icon={"solar:album-broken"} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="mx-4"
                  primary={item.product.name}
                  primaryTypographyProps={{
                    className: "font-semibold text-lg justify-start",
                  }}
                  secondary={"Brand"}
                />
                <ListItemSecondaryAction>
                  {/* <IconButton
                  size="small"
                  onClick={() =>
                    onsubmit(item?.id, { quantity: item.quantity - 1 })
                  }
                  disabled={
                    isCartUpdating ||
                    (item?.product?.minimum_order_quantity &&
                      getLowestQuantities(
                        item?.product?.minimum_order_quantity as AccountEntry[]
                      )?.["bb2e"] >= item?.quantity)
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
                </IconButton> */}
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
      </div>

      {/* <div className="mt-auto">
    <Divider className="my-0" />
    <div className="flex flex-row items-center justify-between p-4">
      <p>Total</p>
      <p className="font-semibold">
        {!!data?.length
          ? data
              ?.map?.(
                (item: any) =>
                  findUnitPrice(
                    "bb2e",
                    item.quantity,
                    item.product?.price
                  ) * item.quantity
              )
              ?.reduce?.((x: number, y: number) => x + y) || 0
          : 0}
        ৳
      </p>
    </div>
    <Button
      variant="contained"
      color="primary"
      size="large"
      disabled={isCartUpdating}
      className="mt-1 rounded-md w-full bg-slate-700 hover:bg-slate-600"
      startIcon={
        <Iconify icon={"material-symbols:shopping-cart-checkout"} />
      }
      // onClick={onSubmit}
    >
      Proceed to Checkout
    </Button>
  </div> */}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? "en", [
        "common",
        "order",
      ])),
      // Will be passed to the page component as props
    },
  };
};
export default order;
