export default function serializeVariant(payload: any, variantName: string) {
  const obj: any = {};
  if (
    payload[variantName] &&
    payload[`detailed${variantName}`].length > 0 &&
    isNaN(payload[`detailed${variantName}Price`])
  ) {
    obj["detailedVariant"] = payload[`detailed${variantName}`];
    obj["price"] = parseFloat(payload[`detailed${variantName}Price`]);
    if (payload[variantName].length > 0) {
      const arr: Array<any> = [];
      payload[variantName].forEach((p: any) => arr.push(p));
      obj["variants"] = arr;
    }
  }
  return obj;
}
