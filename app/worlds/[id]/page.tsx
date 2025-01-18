
import { getTemplateWorldByIdOrSlug } from "./query";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    const {world, randomNumber  } = await getTemplateWorldByIdOrSlug({ identifier: id });
    return <div className="">{world.name} - {randomNumber}</div>;
}