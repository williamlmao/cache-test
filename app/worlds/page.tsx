import { supabase } from "../lib/supabase";

export default async function Page() {
    const worlds = await supabase.from('template_worlds').select('*').eq('is_public', true).eq('is_discoverable', true);
    return <div className="">
        {worlds.data?.map((world) => (
            <a href={`/worlds/${world.id}`} key={world.id}>{world.name}</a>
        ))}
    </div>;

}