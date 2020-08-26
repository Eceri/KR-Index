export const picURL = (type, name) => {
  try {
    return require(`Assets/${type}/${name}.png`);
  } catch (error) {
    console.error(`Picture for ${name} is missing`);
  }
};
