import Iconify from "@/components/iconify";
import { findUnitPrice } from "@/pages/product/[id]";
import { useGetCarts } from "@/queries/cart";
import { useAuth } from "@/service/auth";
import { DialogTitle, Drawer, IconButton } from "@mui/material";
import React from "react";
import OrderCart from "./OrderCart";
import { useToggle } from "@tam11a/react-use-hooks";
import { Icon } from "@iconify/react";
import { Divider, Tabs } from "antd";
import QuotationCart from "./QuotationCart";
import { useGetQuoteCarts } from "@/queries/cart/quote";

const Cart: React.FC = () => {
  //Fetch Data Section
  const { data, isLoading } = useGetCarts(); //Cart Data Fetched
  const { data: quoteData, isLoading: isQuoteLoading } = useGetQuoteCarts(); //Quotation Data Fetched
  const { isAuthenticated, isValidationLoading } = useAuth(); //Authentication Data Fetched

  //States for data management
  const { state, toggleState } = useToggle(false);
  const [cartType, setCartType] = React.useState<any>("bb2e");

  if (isLoading || isQuoteLoading || !isAuthenticated || isValidationLoading)
    return null;
  return (
    <div>
      <div
        className="absolute z-[1500] top-1/3 right-0 -translate-y-1/2 bg-slate-800 p-3 flex flex-row items-center justify-center rounded-l shadow-md shadow-slate-900 gap-2 border-r-0 cursor-pointer"
        onClick={toggleState}
      >
        <Iconify
          icon={"solar:cart-3-bold"}
          className="text-4xl text-primary-600"
        />
        <div className="text-white">
          <p className="text-center text-slate-400 text-sm">
            Cart ({!!data?.length && data?.length})
          </p>
          <p className="font-semibold">
            {!!data?.length
              ? data
                  ?.map?.(
                    (item: any) =>
                      findUnitPrice(
                        "bb2e",
                        item.quantity,
                        item.product?.price || []
                      ) * item.quantity
                  )
                  ?.reduce?.((x: number, y: number) => x + y) || 0
              : 0}
            ৳
          </p>
        </div>
      </div>
      <Drawer
        open={state}
        onClose={toggleState}
        anchor="right"
        className="z-[1501]"
        PaperProps={{
          className: "w-[95vw] max-w-sm",
        }}
      >
        <DialogTitle className="flex flex-row items-center justify-between">
          <p>
            Cart
            {cartType === "bb2e" ? (
              <>({!!data?.length && <>{data?.length}</>})</>
            ) : (
              <>({!!quoteData?.length && <>{quoteData?.length}</>})</>
            )}
          </p>
          <IconButton onClick={toggleState}>
            <Icon icon={"mdi:close"} />
          </IconButton>
        </DialogTitle>
        <Divider className="my-0" />
        <Tabs
          defaultActiveKey="bb2e"
          className="flex-1 px-4"
          onChange={(e) => setCartType(e)}
          items={[
            {
              key: "bb2e",
              label: "Personal",
              children: <OrderCart toggleState={toggleState} />,
            },
            {
              key: "b2b",
              label: "Company",
              children: <QuotationCart toggleState={toggleState} />,
            },
          ]}
        />
      </Drawer>
    </div>
  );
};

export default Cart;
