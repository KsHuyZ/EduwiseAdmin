export function removeEmptyParams(obj: any) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v != null && v !== ''),
  );
}

export const htmlDecode = (input: string) => {
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue ?? input;
};

export const formatPrice = (price?: number) => {
  if (!price) return 'Free';
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};
