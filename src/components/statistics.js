import AbstractSmartComponent from './abstract-smart-component.js';

const createStatisticsTemplate = ({movies, dateFrom, dateTo}) => {
  const placeholder = createPlaceholder(dateFrom, dateTo);
  const tasksCount = getTasksByDateRange(tasks, dateFrom, dateTo).length;

export default class Statistics extends AbstractSmartComponent {
  constructor({title, rating, year, duration, genres, image, description, comments, director, writers, actors, releaseDate, isWatchlist, isWatched, isFavorite}) {
    super();

    this._title = title;
    this._rating = rating;
    this._year = year;
    this._duration = duration;
    this._genres = genres;
    this._image = image;
    this._description = description;
    this._comments = comments;
    this._director = director;
    this._writers = writers;
    this._actors = actors;
    this._releaseDate = releaseDate;
    this._isWatchlist = isWatchlist;
    this._isWatched = isWatched;
    this._isFavorite = isFavorite;
    this._сlosePopupButtonClickHandler = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return (
      `
      <section class="statistic">
        <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">Sci-Fighter</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">22 <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">130 <span class="statistic__item-description">h</span> 22 <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">Sci-Fi</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>
      `
    ).trim();
  }
}
