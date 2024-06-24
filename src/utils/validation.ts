export const validateRequiredFields = (
  fields: string[],
  body: any
): { valid: boolean; error?: string } => {
  const missingFields = fields.filter((field) => !body[field]);
  if (missingFields.length > 0) {
    return {
      valid: false,
      error: `${missingFields.join(", ")} ${
        missingFields.length > 1 ? "are" : "is"
      } required field${missingFields.length > 1 ? "s" : ""}.`,
    };
  }
  return { valid: true };
};
