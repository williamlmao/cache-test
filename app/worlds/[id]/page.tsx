'use cache';
import { getTemplateWorldByIdOrSlug } from "./query";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const world = await getTemplateWorldByIdOrSlug({ identifier: id });
    return <div className="">{world.name}</div>;
}