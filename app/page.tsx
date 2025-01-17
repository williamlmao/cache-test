'use cache';

export default async function Page() {
  const randomNumber = Math.random();
  const response = await fetch(
    'https://www.randomnumberapi.com/api/v1.0/random?min=1&max=100'
  );
  const [number] = await response.json();
  return <main className="text-4xl text-center p-12">Random 1: {number}, Random 2: {randomNumber}</main>;
}
