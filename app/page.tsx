'use cache';

import Footer from './footer';
import { supabase } from './lib/supabase';

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

async function getCharacters() {
  const { data, error } = await supabase
    .from('template_characters')
    .select('*, template_classes(name), template_races(name)');

  if (error) {
    throw error;
  }

  return data;
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
      <Footer />
    </main>
  );
}
