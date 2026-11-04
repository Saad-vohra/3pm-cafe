// Module-level flag: the home ribbon plays once per session.
let homeIntroPlayed = false;
export const homeIntroSeen = () => homeIntroPlayed;
export const markHomeIntroSeen = () => {
  homeIntroPlayed = true;
};
