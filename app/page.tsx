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

// Force static rendering and enable full route cache
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

async function getCharacters() {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/template_characters?select=*,template_classes(name),template_races(name)`;
  const headers = {
    'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    'prefer': 'count=exact'
  };

  const response = await fetch(url, { 
    headers,
    cache: 'force-cache', // Enable full route cache
    next: { 
      tags: ['characters']
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch Characters');
  }
  
  return response.json();
}

export default async function Page() {
  const randomNumber = Math.random();
  // Cache the entire result of getCharacters
  const characters = await getCharacters();
  
  return (
    <main className="p-12">
      <h1 className="text-4xl mb-6">Characters - Random number: {randomNumber}</h1> 
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
