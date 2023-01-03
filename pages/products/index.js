import React from "react";
import ProductItem from "../../components/ProductItem";
import Head from "next/head";

export async function getServerSideProps() {
  let products;
  try {
    const res = await fetch(`${process.env.NEXT_AUTH_URL}/api/products`);
    products = (await res.json());
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      products,
    },
  };
}

const index = ({ products }) => {
  return (
    <div>
      <Head>
        <title>AyQ Beverages-Products</title>
        <meta
          name="description"
          content="AyQ Beverages website products page"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product) => {
          return <ProductItem product={product} key={product.slug} />;
        })}
      </div>
    </div>
  );
};

export default index;
