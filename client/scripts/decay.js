
// EchoForge™ Structure Decay System

async function applyDecayToStructure(structureBlocks, daysElapsed = 1, environmental = {}) {
  const decayLog = [];
  const { fire = false, wetness = 0.5, cold = false } = environmental;

  const updated = structureBlocks.map(block => {
    const data = blockData[block.type];
    if (!data) return block;

    let durability = block.durability ?? data.base_durability;

    // Passive decay
    durability -= data.decay_rate_per_day * daysElapsed;

    // Weather decay
    durability -= (1 - data.weather_resistance) * wetness * daysElapsed;

    // Fire event
    if (fire) {
      durability -= (1 - data.fire_resistance) * 20;
    }

    // Cold snap
    if (cold && data.material === "wood") {
      durability -= 2 * daysElapsed;
    }

    const updatedBlock = {
      ...block,
      durability: Math.max(0, Math.round(durability))
    };

    if (updatedBlock.durability <= 0) {
      decayLog.push(`Block ${block.type} at ${JSON.stringify(block.position)} has collapsed.`);
      // Optional: trigger sketch or remove block
    }

    return updatedBlock;
  });

  console.log("Decay Summary:", decayLog);
  return updated;
}

// Sample block data map (imported from structure.json normally)
const blockData = {
  "wooden_floor": { base_durability: 100, weather_resistance: 0.6, fire_resistance: 0.2, decay_rate_per_day: 0.5, material: "wood" },
  "log_wall": { base_durability: 150, weather_resistance: 0.75, fire_resistance: 0.4, decay_rate_per_day: 0.3, material: "wood" },
  "stone_block": { base_durability: 300, weather_resistance: 0.95, fire_resistance: 0.95, decay_rate_per_day: 0.05, material: "stone" }
};

// Example use
// const newBlocks = applyDecayToStructure(existingBlocks, 3, { fire: true, wetness: 0.8 });
