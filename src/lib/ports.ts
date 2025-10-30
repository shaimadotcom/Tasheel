export interface Port {
  id: string;
  name: string;
  type: 'land' | 'sea' | 'air';
  capacity: 'Very High' | 'High' | 'Moderate' | 'Low';
  baseProcessingTime: number; // minutes
  peakMultiplier: number;
}

export const PORTS: Port[] = [
  {
    id: 'alhadithah',
    name: 'الحديثة (Land)',
    type: 'land',
    capacity: 'High',
    baseProcessingTime: 55,
    peakMultiplier: 1.8
  },
  {
    id: 'arar',
    name: 'جديدة عرعر (Land)',
    type: 'land',
    capacity: 'Low',
    baseProcessingTime: 30,
    peakMultiplier: 1.1
  },
  {
    id: 'jeddah',
    name: 'ميناء جدة الإسلامي (Sea)',
    type: 'sea',
    capacity: 'Very High',
    baseProcessingTime: 120,
    peakMultiplier: 1.5
  },
  {
    id: 'kaia',
    name: 'مطار الملك عبدالعزيز (Air)',
    type: 'air',
    capacity: 'Moderate',
    baseProcessingTime: 40,
    peakMultiplier: 1.2
  },
  {
    id: 'dammam',
    name: 'ميناء الملك عبدالعزيز بالدمام (Sea)',
    type: 'sea',
    capacity: 'High',
    baseProcessingTime: 100,
    peakMultiplier: 1.6
  },
  {
    id: 'riyadh_airport',
    name: 'مطار الملك خالد الدولي (Air)',
    type: 'air',
    capacity: 'Moderate',
    baseProcessingTime: 35,
    peakMultiplier: 1.3
  }
];

export function selectOptimalPort(shippingMethod: string, businessType: string): { bestPort: string; timeSaving: number; selectedPort: string } {
  // Filter ports by shipping method
  const compatiblePorts = PORTS.filter(port => port.type === shippingMethod);

  if (compatiblePorts.length === 0) {
    // Fallback to land ports if no compatible ports found
    return {
      bestPort: "الحديثة",
      timeSaving: 35,
      selectedPort: "جديدة عرعر"
    };
  }

  // Sort by capacity (Very High > High > Moderate > Low)
  const capacityOrder = { 'Very High': 4, 'High': 3, 'Moderate': 2, 'Low': 1 };
  compatiblePorts.sort((a, b) => capacityOrder[b.capacity] - capacityOrder[a.capacity]);

  // Select best port (highest capacity)
  const bestPort = compatiblePorts[0];

  // Calculate time savings based on business type
  let timeSaving = Math.max(0, bestPort.baseProcessingTime - 30); // Compare to slowest land port

  // Business type adjustments
  if (businessType === 'industrial') {
    timeSaving += 15; // Industrial priority processing
  } else if (businessType === 'government') {
    timeSaving += 10; // Government priority
  }

  // Apply peak multiplier for certain conditions
  if (businessType === 'industrial' && shippingMethod === 'sea') {
    timeSaving = Math.round(timeSaving * bestPort.peakMultiplier);
  }

  return {
    bestPort: bestPort.name.split(' (')[0], // Remove type suffix for display
    timeSaving: Math.max(15, timeSaving), // Minimum 15 minutes saving
    selectedPort: compatiblePorts.length > 1 ? compatiblePorts[1].name.split(' (')[0] : bestPort.name.split(' (')[0]
  };
}