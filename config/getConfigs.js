export function getRequiredVar(key) {
  const value = process.env[key];
  if (value === void 0) {
    throw new Error(`I need a "${key}" env variable to work`);
  } else {
    return { [key]: value };
  }
}

export default (requiredVars = []) => 
  requiredVars.map(getRequiredVar).reduce((acc, ev) => ({ ...acc, ...ev }), {});