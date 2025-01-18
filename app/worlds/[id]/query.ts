export async function getTemplateWorldByIdOrSlug({
    identifier,
    profileId,
  }: {
    identifier: string;
    profileId?: string;
  }) {
    'use cache';
    const randomNumber = Math.random();
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      throw new Error('Missing Supabase environment variables');
    }
    
    let url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/template_worlds?select=id,name,image,is_public,is_discoverable,authors_note,profile_id,description,theme,currency1_name,currency2_name,currency3_name,currency1_slug,currency2_slug,currency3_slug,play_count,clone_count,created_at,updated_at,include_defaults,generate_character,generate_poi,generate_area,generate_class,generate_race,generate_item,generate_spell,clone_parent_id,slug,template_worlds_access(permission),public_profiles(username,image),parent_world:clone_parent_id(name,slug,is_discoverable,public_profiles(username))`;

    // Add filters
    url += `&id=eq.${identifier}`;
    
    if (profileId) {
      url += `&template_worlds_access.profile_id=eq.${profileId}`;
    }

    // Add single row limit
    url += '&limit=1';

    const headers = {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      prefer: 'return=representation'
    };

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { world: data[0], randomNumber }; // Return first item since we're expecting a single result
  }
  