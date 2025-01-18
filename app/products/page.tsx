


 
  export default async function Page({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) {

    const { id } = await params;

    if (!id) {
        return <div className="">No ID</div>;
    }


    return <div className="">products</div>;
  }
  