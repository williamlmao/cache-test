import { getProduct } from "./getProduct";

export async function generateStaticParams() {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    return [{ id: '1' }, { id: '2' }, { id: '3' }];
  }



 
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
  