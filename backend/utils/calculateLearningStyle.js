// Calculate learning style based on VARK model
function calculateLearningStyle(answers) {
  console.log('📊 Calculating learning style for answers:', answers);

  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    throw new Error('Invalid answers array');
  }

  const scores = {
    'V': 0, // Visual
    'A': 0, // Auditory
    'R': 0, // Reading/Writing
    'K': 0  // Kinesthetic
  };

  // Count scores for each learning style
  answers.forEach(answer => {
    const upperAnswer = answer.toString().toUpperCase();
    if (scores.hasOwnProperty(upperAnswer)) {
      scores[upperAnswer]++;
    }
  });
  console.log('📈 Scores:', scores);

  // Find the style with highest score
  let maxScore = -1;
  let dominantStyle = 'V';

  for (const style in scores) {
    if (scores[style] > maxScore) {
      maxScore = scores[style];
      dominantStyle = style;
    }
  }
console.log('🎯 Dominant style:', dominantStyle);
  return dominantStyle;
}

module.exports =  calculateLearningStyle ;