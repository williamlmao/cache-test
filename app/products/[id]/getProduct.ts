

export async function getProduct(id: string) {
    'use cache';
    await new Promise((resolve) => setTimeout(resolve, 10000));
    const randomNumber = Math.random();
    return { id, randomNumber }
}