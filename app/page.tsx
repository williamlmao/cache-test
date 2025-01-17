'use cache';

import { headers } from 'next/headers';

async function getSpells() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/template_spells?select=*`,
    {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        'prefer': 'count=exact'
      },
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch spells');
  }
  
  const data = await response.json();
  console.log("🚀 ~ getSpells ~ data:", data);
  return data;
}

export default async function Page() {
  const spells = await getSpells();
  const randomNumber = Math.random();
  return (
    <main className="p-12">
      <h1 className="text-4xl mb-6">Spells - Random number: {randomNumber}</h1>
      {spells.map((spell: any) => (
        <div key={spell.id}>
          <h2>{spell.name}</h2>
        </div>
      ))}
    </main>
  );
}
