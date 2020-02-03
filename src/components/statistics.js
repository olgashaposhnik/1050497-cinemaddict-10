import AbstractSmartComponent from './abstract-smart-component.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';

const MINUTES_PER_HOUR = 60;

const getWatсhedFilms = (films) => {
  return films.filter((item) => item.isHistory === true);
};

const sortFilmsByOptions = (films, key) => {
  const filteredArray = films.filter((item) => item[key] === true);
  return filteredArray.length;
};

const getWatсhedFilmsDuration = (films) => {
  const wathedFilms = getWatсhedFilms(films);

  return wathedFilms.reduce((sum, item) => {
    return sum + item.duration;
  }, 0);
};

const getDurationInHours = (films) => {
  const totalDuration = getWatсhedFilmsDuration(films);
  return Math.floor(totalDuration / MINUTES_PER_HOUR);
};

const getDurationInMinutes = (films) => {
  const totalDuration = getDurationInHours(films);
  const hours = Math.floor(totalDuration / MINUTES_PER_HOUR);
  return totalDuration - hours * MINUTES_PER_HOUR;
};

const getGenres = (films) => {
  const wathedFilms = getWatсhedFilms(films);
  const genres = {};

  wathedFilms.forEach((film) => {
    film.genres.forEach((genre) => {
      genres[genre] = genres[genre] ? genres[genre] + 1 : 1;
    });
  });

  return genres;
};

const getFavouriteGenre = (films) => {
  const genres = getGenres(films);
  const maxQuantity = Math.max(...Object.values(genres), 0);
  const topGenres = Object.keys(genres).filter((item) => genres[item] === maxQuantity);

  return topGenres[0] ? topGenres[0] : `-`;
};

const getWatchedTodayFilms = (films) => {
  const begin = moment().startOf(`day`);
  return films.filter((it) => moment(it.watchingDate).isAfter(begin._d));
};

const getWatchedByWeekFilms = (films) => {
  const begin = moment().subtract(7, `days`);

  return films.filter((it) => moment(it.watchingDate).isAfter(begin._d));
};

const getWatchedByMonthFilms = (films) => {
  const begin = moment().subtract(1, `months`);

  return films.filter((it) => moment(it.watchingDate).isAfter(begin._d));
};

const getWatchedByYearFilms = (films) => {
  const begin = moment().subtract(1, `years`);

  return films.filter((it) => moment(it.watchingDate).isAfter(begin._d));
};

const getStatisticMarkup = (films) => {
  return `<li class="statistic__text-item">
    <h4 class="statistic__item-title">You watched</h4>
    <p class="statistic__item-text">${sortFilmsByOptions(films, `isHistory`)} <span class="statistic__item-description">movies</span></p>
  </li>
  <li class="statistic__text-item">
    <h4 class="statistic__item-title">Total duration</h4>
    <p class="statistic__item-text">${getDurationInHours(films)} <span class="statistic__item-description">h</span> ${getDurationInMinutes(films)} <span class="statistic__item-description">m</span></p>
  </li>
  <li class="statistic__text-item">
    <h4 class="statistic__item-title">Top genre</h4>
    <p class="statistic__item-text">${getFavouriteGenre(films)}</p>
  </li>`;
};

export default class Statistics extends AbstractSmartComponent {
  constructor(movies) {
    super();

    this._movies = movies;

    this._сhart = null;
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
        ${getStatisticMarkup(this._movies)}
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>
      `
    ).trim();
  }

  renderChart() {
    const ctx = this.getElement().querySelector(`.statistic__chart`);
    const genres = getGenres(this._getFilteredFilms());
    const genresQuantity = Object.keys(genres).map((item) => genres[item]);

    this._resetChart();

    this._chart = new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: Object.keys(genres),
        datasets: [
          {
            data: genresQuantity,
            backgroundColor: `#FFFD82`,
            borderWidth: 0,
            barThickness: 32
          }
        ]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 16
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            padding: 40
          }
        },
        tooltips: {
          enabled: false
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false,
            ticks: {
              beginAtZero: true,
            }
          }],
          yAxes: [{
            ticks: {
              fontSize: 18,
              fontColor: `#ffffff`,
              padding: 80,
            }
          }]
        }
      }
    });
  }

  recoveryListeners() {}

  show() {
    super.show();

    this.rerender();
  }

  rerender() {
    this._setGeneralStatistic();
    this.renderChart();
  }

  setHandler(handler) {
    const filterElements = this.getElement().querySelectorAll(`.statistic__filters-input`);

    filterElements.forEach((item) => {
      item.addEventListener(`input`, handler);
    });
  }

  _resetChart() {
    if (this._chart) {
      this._chart.destroy();
    }
  }

  _getActiveFilter() {
    const filterElements = this.getElement().querySelectorAll(`.statistic__filters-input`);

    return Array.from(filterElements).find((item) => item.checked).value;
  }

  _getFilteredFilms() {
    const filterValue = this._getActiveFilter();

    switch (filterValue) {
      case `today`:
        return getWatchedTodayFilms(this._movies);

      case `week`:
        return getWatchedByWeekFilms(this._movies);

      case `month`:
        return getWatchedByMonthFilms(this._movies);

      case `year`:
        return getWatchedByYearFilms(this._movies);
    }

    return this._movies;
  }

  _setGeneralStatistic() {
    const statisticTextList = this.getElement().querySelector(`.statistic__text-list`);

    statisticTextList.innerHTML = ``;
    statisticTextList.innerHTML = getStatisticMarkup(this._getFilteredFilms());
  }
}
