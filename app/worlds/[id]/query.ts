import { supabase } from "@/app/lib/supabase";


export async function getTemplateWorldByIdOrSlug({
    identifier,
    profileId,
  }: {
    identifier: string;
    profileId?: string; // Make profileId optional
  }) {
    'use cache';
    
    let query = supabase.from('template_worlds').select(
      `id, name, image, is_public, is_discoverable, authors_note, profile_id, description, theme,
           currency1_name, currency2_name, currency3_name, currency1_slug, currency2_slug, currency3_slug, play_count, clone_count, created_at, updated_at, include_defaults,
           generate_character, generate_poi, generate_area, generate_class, generate_race, generate_item, generate_spell, clone_parent_id, slug,
           template_worlds_access(permission),
           public_profiles(username, image),
           parent_world:clone_parent_id(name, slug, is_discoverable, public_profiles(username))`
    );
  
    
      query = query.eq('id', identifier);

  
    // Conditionally add the filter for template_worlds_access.profile_id
    if (profileId) {
      query = query.eq('template_worlds_access.profile_id', profileId);
    }
  
    const { data, error } = await query.single();
  
    if (error) {
      throw new Error(error.message);
    }
  
    return data
  }
  