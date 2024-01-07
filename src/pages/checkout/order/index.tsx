import Label from "@/components/Label";
import ErrorSuffix from "@/components/antd/ErrorSuffix";
import { message } from "@/components/antd/message";
import Iconify from "@/components/iconify";
import { findUnitPrice } from "@/pages/product/[id]";
import { useDeleteCart, useGetCarts } from "@/queries/cart";
import { useCreateOrder } from "@/queries/checkout";
import { previewImage } from "@/service";
import handleResponse from "@/utilities/handleResponse";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Divider, Empty, Input, Skeleton } from "antd";
import Joi from "joi";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const order: React.FC = () => {
  const { data: orderData, isLoading } = useGetCarts();
  const loginResolver = Joi.object({
    recipient_name: Joi.string().required().label("Recipient Name").trim(),
    recipient_number: Joi.string()
      .pattern(/01\d{9}$/)
      .label("Recipient Phone")
      .messages({
        "string.pattern.base": "Invalid Recipient Phone Number",
      })
      .required()
      .trim(),
    recipient_email: Joi.string()
      .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      .label("Recipient Email")
      .messages({
        "string.pattern.base": "Invalid Recipient Email Address",
      })
      .allow("")
      .allow(null)
      .trim(),
    recipient_address: Joi.string().label("Recipient Addess").trim(),
  });

  const { handleSubmit, control, reset } = useForm({
    resolver: joiResolver(loginResolver),
  });

  //Order Submit Section
  const { mutateAsync: create, isLoading: orderCreating } = useCreateOrder();

  /* On Submit Function */
  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Creating Product..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        create({
          ...data,
          product_list: Array.from(orderData || [], (item: any) => ({
            product_id: item?.product?.id,
            quantity: item?.quantity,
            unit_price: findUnitPrice(
              "bb2e",
              item.quantity,
              item.product.price
            ),
            total_price:
              findUnitPrice("bb2e", item.quantity, item.product.price) *
              item.quantity,
          })),
          registered_from: "Website",
          delivery_fee: 0,
          discount: 0,
        }),
      [201]
    );
    message.destroy();
    if (res.status) {
      reset();
      // onDelete(orderData?.id); got some problems
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };

  //Cart Delete Section

  // const { mutateAsync: Delete, isLoading: isDeleteLoading } = useDeleteCart();

  // const onDelete = async (id: number) => {
  //   message.open({
  //     type: "loading",
  //     content: "Deleting Product from Cart..",
  //     duration: 0,
  //   });
  //   const res = await handleResponse(() => Delete(id));

  //   message.destroy();

  //   if (res.status) {
  //     message.success(res.message);
  //     return true;
  //   } else {
  //     message.error(res.message);
  //     return false;
  //   }
  // };
  return (
    <div className="m-6 flex flex-col">
      <p className="font-medium text-2xl my-2">Shopping Cart</p>
      <p className="font-medium my-2">
        Products{" "}
        {isLoading ? (
          ""
        ) : (
          <>({!!orderData?.length && <>{orderData?.length}</>})</>
        )}
      </p>
      <div className="grid grid-cols-7 px-4">
        <div className="col-span-4" />
        <p className="text-center text-sm font-semibold">Unit Price</p>
        <p className="text-center text-sm font-semibold">Quantity</p>
        <p className="text-center text-sm font-semibold">Total</p>
      </div>
      <div className="my-2 py-2 bg-white rounded ">
        <List dense className="p-0 m-0">
          {isLoading ? (
            <Skeleton className="p-2" />
          ) : !!orderData?.length ? (
            orderData?.map?.((item: any, index: number) => (
              <ListItem key={item.id} className="grid grid-cols-7 items-start">
                <div className="flex flex-row col-span-4">
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      className="border-slate-200 border aspect-square h-24 w-24 bg-slate-200 text-slate-600"
                      src={previewImage(item.product.thumbnail_url)}
                    >
                      <Iconify icon={"solar:album-broken"} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    className="ml-4"
                    primary={item.product.name}
                    primaryTypographyProps={{
                      className: "font-semibold text-lg mb-1",
                    }}
                    secondary={
                      <>
                        <span className="flex flex-col gap-1">
                          <span className="font-semibold">
                            Brand :{" "}
                            {item?.product?.brand
                              ? item?.product?.brand?.name
                              : "-"}{" "}
                          </span>
                          <span className="font-semibold">
                            Size :{" "}
                            {item?.product?.unit_of_measure
                              ? item?.product?.unit_of_measure
                              : "-"}{" "}
                          </span>
                        </span>
                      </>
                    }
                  />
                </div>

                <ListItemText
                  className="col-span-1 text-center"
                  primary={
                    <>
                      <span className="flex flex-row justify-center items-center gap-2 text-red-500">
                        {`${findUnitPrice(
                          "bb2e",
                          item.quantity,
                          item.product.price
                        )}৳`}
                        {!!item?.product?.market_price && (
                          <del className="text-sm text-slate-400">
                            {item?.product?.market_price}৳
                          </del>
                        )}
                      </span>
                    </>
                  }
                  primaryTypographyProps={{
                    className: "font-semibold text-lg text-center",
                  }}
                />
                <ListItemText
                  className="col-span-1"
                  primary={item?.quantity}
                  primaryTypographyProps={{
                    className: "font-semibold text-lg text-center",
                  }}
                />
                <ListItemText
                  className="col-span-1"
                  primary={`${
                    findUnitPrice("bb2e", item.quantity, item.product.price) *
                    item.quantity
                  }৳`}
                  primaryTypographyProps={{
                    className: "font-semibold text-lg text-center",
                  }}
                />
                {orderData?.length - 1 !== index && (
                  <Divider className="col-span-7 mt-2 mb-0" />
                )}
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
      <div className="flex flex-row items-center justify-end gap-2 p-1 px-4">
        <p>Subtotal: </p>
        <p className="font-semibold">
          {!!orderData?.length
            ? orderData
                ?.map?.(
                  (item: any) =>
                    findUnitPrice("bb2e", item.quantity, item.product?.price) *
                    item.quantity
                )
                ?.reduce?.((x: number, y: number) => x + y) || 0
            : 0}
          ৳
        </p>
      </div>
      <div className="flex flex-row items-center justify-end gap-2 p-1 px-4">
        <p>Total: </p>
        <p className="font-semibold">
          {!!orderData?.length
            ? orderData
                ?.map?.(
                  (item: any) =>
                    findUnitPrice("bb2e", item.quantity, item.product?.price) *
                    item.quantity
                )
                ?.reduce?.((x: number, y: number) => x + y) || 0
            : 0}
          ৳
        </p>
      </div>
      <p className="font-medium text-2xl my-3">Delivery Information</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-4 bg-white rounded">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            <span className="col-span-2 lg:col-span-1">
              <Label isRequired>Name</Label>
              <Controller
                control={control}
                name={"recipient_name"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    placeholder={"Recipient Name"}
                    size={"large"}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                    suffix={<ErrorSuffix error={error} />}
                  />
                )}
              />
            </span>
            <span>
              <Label isRequired>Phone Number</Label>
              <Controller
                control={control}
                name={"recipient_number"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    placeholder={"Recipient Phone Number"}
                    size={"large"}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                    suffix={<ErrorSuffix error={error} />}
                  />
                )}
              />
            </span>
            <span>
              <Label>Email</Label>
              <Controller
                control={control}
                name={"recipient_email"}
                rules={{ required: false }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    placeholder={"Recipient Email"}
                    size={"large"}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                    suffix={<ErrorSuffix error={error} />}
                  />
                )}
              />
            </span>
            <span className="col-span-2 lg:col-span-3 ">
              <Label isRequired>Address</Label>
              <Controller
                control={control}
                name={"recipient_address"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input.TextArea
                    placeholder={"Recipient Address.."}
                    size={"large"}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                  />
                )}
              />
            </span>
          </div>
        </div>
        <div className="my-4 text-right">
          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={orderCreating}
            type="submit"
            className="rounded-md bg-slate-700 hover:bg-slate-600"
          >
            Confirm Order
          </Button>
          <Link href={"/"}>
            <Button
              variant="text"
              size="large"
              disabled={orderCreating}
              className="mx-2 text-slate-700 underline hover:text-slate-500 hover:bg-transparent"
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      </form>
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
