export async function generateStaticParams() {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    return [{ id: '1' }, { id: '2' }, { id: '3' }];
  }

export default function Loading() {
    return <div className="">Loading...</div>;
}