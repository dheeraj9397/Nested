export function calculateEducationCorpus({ 
  currentAge, 
  currentCost, 
}) {
  const goalAge = 18;
  const inflationRate = 0.10; // 10%
  const expectedReturn = 0.14; // 14% annual return

  const duration = goalAge - currentAge;

  if (duration <= 0) {
    return {
      futureCost: currentCost,
      sipNeeded: Infinity, // Indicates goal age is reached or passed
      duration: 0,
    };
  }

  // Future Cost of Education = (1.1 ^ Duration) × Current Cost of Education
  const futureCost = currentCost * Math.pow(1 + inflationRate, duration);

  // Required Monthly SIP formula for an annuity due (investment at the beginning of the period)
  // SIP = (FV * r) / ( ((1 + r)^n - 1) * (1 + r) )
  const n = duration * 12; // number of months
  const r = expectedReturn / 12; // monthly rate of return

  if (r === 0) {
    return {
      futureCost: Math.round(futureCost),
      sipNeeded: Math.round(futureCost / n),
      duration,
    }
  }

  const sip = (futureCost * r) / ((Math.pow(1 + r, n) - 1) * (1 + r));

  return {
    futureCost: Math.round(futureCost),
    sipNeeded: Math.round(sip),
    duration,
  };
}
