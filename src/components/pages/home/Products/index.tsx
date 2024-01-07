import Iconify from "@/components/iconify";
import { previewImage } from "@/service";
import { Avatar, Button, Typography } from "@mui/material";
import { Badge, Empty, Tag } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { findUnitPrice } from "../../../../pages/product/[id]/index";

const Products: React.FC<{ products: any[] }> = ({ products }) => {
  return products?.length === 0 ? (
    <div>
      <Empty
        description="No Products Found"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2 relative">
      {products?.map((product, index) => {
        const b2b_price = findUnitPrice("b2b", 1, product?.price);
        const bb2e_price = findUnitPrice("bb2e", 1, product?.price);

        var price = 0;

        if (b2b_price == 0 && bb2e_price == 0) price = 0;
        else if (b2b_price == 0 && bb2e_price != 0) price = bb2e_price;
        else if (b2b_price != 0 && bb2e_price == 0) price = b2b_price;
        else if (b2b_price != 0 && bb2e_price != 0)
          price = b2b_price < bb2e_price ? b2b_price : bb2e_price;

        var off_price = 0;
        if (product?.market_price && price != 0)
          off_price = Math.round(
            ((product?.market_price - price) / product?.market_price) * 100
          );

        return (
          <div
            key={index}
            className="flex flex-col border h-full border-slate-300 hover:border-primary-400 rounded-xl p-2 relative"
          >
            <Badge.Ribbon
              text={
                <>
                  <Iconify
                    icon={"iconamoon:discount-fill"}
                    className="text-2xl text-white mr-1 inline-flex"
                  />
                  {off_price}% Off!
                </>
              }
              style={{
                display: off_price > 0 ? "unset" : "none",
                paddingTop: "6px",
                height: "35px",
              }}
            >
              <Link href={`/product/${product.id}`}>
                {product?.thumbnail_url ? (
                  <Image
                    src={previewImage(product?.thumbnail_url)}
                    height={500}
                    width={280}
                    alt={product.name}
                    className="relative h-60 w-full object-cover rounded-md border border-slate-200 shadow-md shadow-slate-300"
                  />
                ) : (
                  <Avatar
                    className="relative text-slate-600 h-60 w-full bg-slate-200 object-cover rounded-md border border-slate-200 shadow-md shadow-slate-300"
                    sx={{
                      bgcolor: "transparent",
                      fontSize: "6rem",
                    }}
                  >
                    <Iconify icon={"solar:wallpaper-broken"} />
                  </Avatar>
                )}
              </Link>
            </Badge.Ribbon>
            <div className="flex-1 flex flex-col mt-2 min-h-14 p-1 relative">
              <Link href={`/product/${product.id}`} className="flex-1">
                <Typography className="text-center font-bold">
                  {product.name}
                </Typography>
              </Link>
              <div className="text-center">
                {!!product?.price?.length && (
                  <span className="text-sm font-bold text-slate-700">
                    {price}৳
                  </span>
                )}
                {!!product?.market_price && (
                  <>
                    {" "}
                    <del className="text-sm text-slate-400">
                      {product?.market_price}৳
                    </del>
                  </>
                )}
              </div>
            </div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              className="mt-2 rounded-md bg-slate-700 hover:bg-slate-600"
              startIcon={<Iconify icon={"fa-solid:cart-plus"} />}
            >
              Add to Cart
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
