export const getVariantId = (variantId?: string): string | null => {
  if (!variantId) return null;

  const variantIdParts = variantId.split("/");
  const variantIdPartsLast = variantIdParts[variantIdParts.length - 1];

  return variantIdPartsLast;
};
