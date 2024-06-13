export function formatNumber(number) {
  // Convert number to string
  let numStr = String(number);

  // Split the number into integer and decimal parts (if any)
  let parts = numStr.split(".");
  let integerPart = parts[0];
  let decimalPart = parts.length > 1 ? "." + parts[1] : "";

  // Format the integer part
  let len = integerPart.length;
  let formattedInteger = "";

  // Add first comma after three digits from the right
  if (len > 3) {
    formattedInteger = integerPart.substring(len - 3);
    integerPart = integerPart.substring(0, len - 3);

    while (integerPart.length > 2) {
      formattedInteger =
        integerPart.substring(integerPart.length - 2) + "," + formattedInteger;
      integerPart = integerPart.substring(0, integerPart.length - 2);
    }

    // Add the remaining part
    if (integerPart.length > 0) {
      formattedInteger = integerPart + "," + formattedInteger;
    }
  } else {
    formattedInteger = integerPart;
  }

  // Combine integer and decimal parts
  let formattedNumber = formattedInteger + decimalPart;

  return formattedNumber;
}
