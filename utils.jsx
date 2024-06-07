export function getIncomeBracket(income) {
	if (!income) {
		return "Income not available";
	}
	const bracketSize = 50000;
	const bracketNumber = Math.floor(income / bracketSize);
	const lowerBound = bracketNumber * bracketSize;
	const upperBound = (bracketNumber + 1) * bracketSize - 1;
	return [lowerBound, upperBound];
}