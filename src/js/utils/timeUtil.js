export const calculateTimeDifference = (t1, t2) => {
  const t1s = toSeconds(t1.substr(0, 2), t1.substr(3));
  const t2s = toSeconds(t2.substr(0, 2), t2.substr(3));

  console.log(t1s);
  let delta = Math.abs(t1s - t2s);

  return delta;
};

const toSeconds = (ho, mi) => {
  console.log(mi);
  let h = parseInt(ho);
  let m = parseInt(mi);

  const s = h * 3600 + m * 60;
  console.log(s);
  return s;
};
