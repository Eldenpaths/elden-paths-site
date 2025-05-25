
// EchoForge™ Genome Propagation Engine

async function spawnEntity(speciesId, parentIds = []) {
  const genomeTemplates = await fetch('/cloud/genetics/genome.json').then(res => res.json());
  const registry = await fetch('/cloud/genetics/dna_registry.json').then(res => res.json());

  const template = genomeTemplates.genomes[speciesId];
  if (!template) {
    console.error("Species template not found:", speciesId);
    return;
  }

  // Inherit or use base genome
  const newGenome = mutateGenome(template.base_genome, template.mutation_rate);
  const newId = `${speciesId}_${Date.now()}`;

  // Generate expressed traits (mock, could be more complex)
  const traits = { ...template.expressed_traits };
  if (Math.random() < 0.2 && traits.fur_color) {
    traits.fur_color = "darker " + traits.fur_color;
  }

  const entity = {
    id: newId,
    species: speciesId,
    genome: newGenome,
    generation: parentIds.length ? getGeneration(registry, parentIds) + 1 : 1,
    expressed_traits: traits,
    parents: parentIds,
    tile_origin: "35_22",
    timestamp: new Date().toISOString()
  };

  // Add to registry (demo only)
  registry.entities.push(entity);
  console.log("Spawned:", entity);

  // TODO: POST back to update file on server
}

function mutateGenome(genome, mutationRate) {
  const parts = genome.split('-');
  return parts.map(part => {
    return part.split('').map(base => {
      return Math.random() < mutationRate ? mutateBase(base) : base;
    }).join('');
  }).join('-');
}

function mutateBase(base) {
  const bases = ['A', 'T', 'C', 'G'];
  const other = bases.filter(b => b !== base);
  return other[Math.floor(Math.random() * other.length)];
}

function getGeneration(registry, parentIds) {
  const gens = parentIds.map(pid => {
    const p = registry.entities.find(e => e.id === pid);
    return p ? p.generation : 1;
  });
  return Math.max(...gens, 1);
}
