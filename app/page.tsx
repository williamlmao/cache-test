'use cache';

interface TemplateClass {
  name: string;
}

interface TemplateRace {
  name: string;
}

interface Character {
  id: string;
  name: string;
  template_classes: TemplateClass;
  template_races: TemplateRace;
}

async function getCharacters(id: string) {
  console.log("id", id)
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/template_characters?select=*,template_classes(name),template_races(name)`;
  const headers = {
    'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    'prefer': 'count=exact'
  };

  const response = await fetch(url, { headers });
  
  if (!response.ok) {
    throw new Error('Failed to fetch Characters');
  }
  
  return response.json();
}

export default async function Page() {
  // Cache the entire result of getCharacters
  const characters = await getCharacters('1');
  
  return (
    <main className="p-12">
      <h1 className="text-4xl mb-6">Characters</h1> 
      {characters.map((character: Character) => (
        <div key={character.id}>
          <h2>{character.name}</h2>
          <p>Class: {character.template_classes?.name}</p>
          <p>Race: {character.template_races?.name}</p>
        </div>
      ))}
    </main>
  );
}
