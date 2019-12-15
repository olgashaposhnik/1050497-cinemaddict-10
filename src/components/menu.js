import {sortFilmsByOptions} from '../mock/sort.js';

export const createSiteMenuTemplate = (filmCard) => {
  const {attributes} = filmCard;
  return (
    `
    <nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count"></span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count"></span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count"></span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>
    `
  );
};

// ${sortFilmsByOptions(attributes)}
// export const createSiteMenuTemplate = () => {
//   return (
//     `
//     <nav class="main-navigation">
//       <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
//       <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${sortFilmsByOptions(`In Watchlist`)}
//       </span></a>
//       <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${sortFilmsByOptions(`In History`)}
//       </span></a>
//       <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${sortFilmsByOptions(`In Favorites`)}
//       </span></a>
//       <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
//     </nav>
//     `
//   );
// };
