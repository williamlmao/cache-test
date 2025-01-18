import { getProduct } from "./getProduct";




 
  export default async function Page({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) {

    const { id } = await params;

    if (!id) {
        return <div className="">No ID</div>;
    }

    const product = await getProduct(id);

    return <div className="">{product.id} - {product.randomNumber}</div>;
  }
  