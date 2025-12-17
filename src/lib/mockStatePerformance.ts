const STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

export const statePerformance: Record<string, number> =
  Object.fromEntries(
    STATES.map(s => [
      s,
      0.94 + Math.random() * 0.14, // ~94%–108%
    ])
  );

