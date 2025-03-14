
export interface District {
  id: string;
  name: string;
  population: number;
  coordinates: [number, number]; // [longitude, latitude]
}

export const mpDistricts: District[] = [
  { id: "1", name: "Bhopal", population: 2371061, coordinates: [77.4126, 23.2599] },
  { id: "2", name: "Indore", population: 3276697, coordinates: [75.8577, 22.7196] },
  { id: "3", name: "Jabalpur", population: 2463289, coordinates: [79.9864, 23.1815] },
  { id: "4", name: "Gwalior", population: 2032036, coordinates: [78.1828, 26.2183] },
  { id: "5", name: "Ujjain", population: 1986864, coordinates: [75.7885, 23.1765] },
  { id: "6", name: "Sagar", population: 2378458, coordinates: [78.7378, 23.8388] },
  { id: "7", name: "Dewas", population: 1563715, coordinates: [76.0534, 22.9676] },
  { id: "8", name: "Satna", population: 2228935, coordinates: [80.8320, 24.6005] },
  { id: "9", name: "Ratlam", population: 1455069, coordinates: [75.0367, 23.3315] },
  { id: "10", name: "Rewa", population: 2365106, coordinates: [81.3037, 24.5362] },
  { id: "11", name: "Katni", population: 1292042, coordinates: [80.4022, 23.8343] },
  { id: "12", name: "Khargone", population: 1873046, coordinates: [75.6150, 21.8335] },
  { id: "13", name: "Neemuch", population: 826067, coordinates: [74.8722, 24.4736] },
  { id: "14", name: "Mandsaur", population: 1340411, coordinates: [75.0680, 24.0734] },
  { id: "15", name: "Dhar", population: 2185793, coordinates: [75.3025, 22.6013] },
  { id: "16", name: "Chhindwara", population: 2090922, coordinates: [78.9381, 22.0574] },
  { id: "17", name: "Balaghat", population: 1701698, coordinates: [80.1937, 21.8144] },
  { id: "18", name: "Hoshangabad", population: 1241350, coordinates: [77.7344, 22.7469] },
  { id: "19", name: "Betul", population: 1575362, coordinates: [77.9008, 21.9105] },
  { id: "20", name: "Vidisha", population: 1458875, coordinates: [77.8095, 23.5235] },
  { id: "21", name: "Morena", population: 1965970, coordinates: [77.9947, 26.4946] },
  { id: "22", name: "Shivpuri", population: 1726050, coordinates: [77.6599, 25.4272] },
  { id: "23", name: "Damoh", population: 1264219, coordinates: [79.4365, 23.8425] },
  { id: "24", name: "Tikamgarh", population: 1445166, coordinates: [78.8319, 24.7425] },
  { id: "25", name: "Panna", population: 1016520, coordinates: [80.1892, 24.7180] },
  { id: "26", name: "Sehore", population: 1311332, coordinates: [77.0852, 23.2032] },
  { id: "27", name: "Raisen", population: 1331699, coordinates: [77.7849, 23.3310] },
  { id: "28", name: "Rajgarh", population: 1545814, coordinates: [76.7333, 23.8500] },
  { id: "29", name: "Shajapur", population: 1512681, coordinates: [76.2599, 23.4359] },
  { id: "30", name: "Harda", population: 570465, coordinates: [77.0950, 22.3434] },
  { id: "31", name: "Barwani", population: 1385881, coordinates: [74.9033, 22.0363] },
  { id: "32", name: "Khandwa", population: 1310061, coordinates: [76.3498, 21.8262] },
  { id: "33", name: "Burhanpur", population: 757847, coordinates: [76.2170, 21.3099] },
  { id: "34", name: "Ashoknagar", population: 844979, coordinates: [77.7308, 24.5798] },
  { id: "35", name: "Datia", population: 786754, coordinates: [78.4642, 25.6646] },
  { id: "36", name: "Bhind", population: 1703005, coordinates: [78.7888, 26.5633] },
  { id: "37", name: "Narsinghpur", population: 1092141, coordinates: [79.1950, 22.9479] },
  { id: "38", name: "Seoni", population: 1379131, coordinates: [79.5432, 22.0868] },
  { id: "39", name: "Mandla", population: 1053522, coordinates: [80.3818, 22.5987] },
  { id: "40", name: "Dindori", population: 704524, coordinates: [81.0754, 22.9457] },
  { id: "41", name: "Shahdol", population: 1066063, coordinates: [81.3545, 23.3022] },
  { id: "42", name: "Umaria", population: 644758, coordinates: [80.8371, 23.5249] },
  { id: "43", name: "Sidhi", population: 1127262, coordinates: [81.8828, 24.3956] },
  { id: "44", name: "Singrauli", population: 1178273, coordinates: [82.6741, 24.1992] },
  { id: "45", name: "Jhabua", population: 1025048, coordinates: [74.5970, 22.7704] },
  { id: "46", name: "Alirajpur", population: 728999, coordinates: [74.3554, 22.3123] },
  { id: "47", name: "Anuppur", population: 749521, coordinates: [81.6964, 23.1167] },
  { id: "48", name: "Niwari", population: 320968, coordinates: [78.8023, 25.3820] },
  { id: "49", name: "Agar Malwa", population: 485826, coordinates: [76.0094, 23.7111] },
  { id: "50", name: "Sheopur", population: 687861, coordinates: [76.6983, 25.6731] },
  { id: "51", name: "Chhatarpur", population: 1762375, coordinates: [79.5942, 24.9179] }
];

export const getMadhyaPradeshCenter = (): [number, number] => {
  // Approximate center of Madhya Pradesh
  return [78.6569, 23.4851];
};

export const getMaxPopulation = (): number => {
  return Math.max(...mpDistricts.map(district => district.population));
};

export const getMinPopulation = (): number => {
  return Math.min(...mpDistricts.map(district => district.population));
};
