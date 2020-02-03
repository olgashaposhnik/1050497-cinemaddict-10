import ShowMoreButtonComponent from '../components/show-more-button.js';
import {SortType} from '../components/sort.js';
import MovieController, {Mode as MovieControllerMode, EmptyComment} from './movie-controller.js';
import {render, remove, RenderPosition} from '../utils/utils.js';
const FILM_CARD_QUANTITY = 5;
const TOP_RATED_MOVIES_QUANTITY = 2;
const MOST_COMMENTED_MOVIES_QUANTITY = 2;
const SHOWING_FILMS_QUANTITY_BY_BUTTON = 5;

const renderFilms = (filmsList, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const movieController = new MovieController(filmsList, onDataChange, onViewChange);
    movieController.render(film, MovieControllerMode.COMMENT);
    return movieController;
  });
};

export default class PageController {
  constructor(container, sort, moviesModel, api) {
    this._container = container;
    this._sort = sort;
    this._moviesModel = moviesModel;
    this._api = api;

    this._mainFilmControllers = [];
    this._topRatedFilmControllers = [];
    this._mostCommentedFilmControllers = [];
    this._newFilmsByButtonControllers = [];
    this._ShowMoreButtonComponent = new ShowMoreButtonComponent();
    this._creatingComment = null;
    this._siteMainElement = document.querySelector(`.main`);
    this._filmsList = this._container.getElement().querySelector(`.films-list`);
    this._filmsListContainer = this._container.getElement().querySelector(`.films-list__container`);
    this._filmsListExtra = this._container.getElement().querySelectorAll(`.films-list--extra`);
    this._filmsTopRatedContainer = this._filmsListExtra[0].querySelector(`.films-list__container`);
    this._filmsMostCommentedContainer = this._filmsListExtra[1].querySelector(`.films-list__container`);
    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChangeHandler = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);
    this._onFilterChangeHandler = this._onFilterChange.bind(this);
    this._showingFilms = FILM_CARD_QUANTITY;
    this._topRatedFilms = TOP_RATED_MOVIES_QUANTITY;
    this._mostCommentedFilms = MOST_COMMENTED_MOVIES_QUANTITY;
    this._showingFilmsQuantityByButton = SHOWING_FILMS_QUANTITY_BY_BUTTON;

    this._sort.setSortTypeChangeHandler(this._onSortTypeChange);
    this._moviesModel.setFilterChangeHandler(this._onFilterChangeHandler);
  }

  hide() {
    this._container.hide();
  }

  show() {
    this._container.show();
  }

  render(filmCards) {
    this._filmCards = filmCards;

    const newFilms = renderFilms(this._filmsListContainer, filmCards.slice(0, this._showingFilms), this._onDataChange, this._onViewChange);
    this._mainFilmControllers = this._mainFilmControllers.concat(newFilms);

    const topRatedFilms = renderFilms(this._filmsTopRatedContainer, filmCards.sort((a, b) => b.rating - a.rating).slice(0, this._topRatedFilms), this._onDataChange, this._onViewChange);
    this._topRatedFilmControllers = this._topRatedFilmControllers.concat(topRatedFilms);

    const mostCommentedFilms = renderFilms(this._filmsMostCommentedContainer, filmCards.sort((a, b) => b.comments.length - a.comments.length).slice(0, this._mostCommentedFilms), this._onDataChange, this._onViewChange);
    this._mostCommentedFilmControllers = this._mostCommentedFilmControllers.concat(mostCommentedFilms);

    this._renderShowMoreButton();
  }

  createComment() {
    if (this._creatingComment) {
      return;
    }

    const filmsListContainer = this._filmsListContainer;
    this._creatingComment = new MovieController(filmsListContainer, this._onDataChange, this._onViewChange);
    this._creatingComment.render(EmptyComment, MovieControllerMode.COMMENT);
  }

  _removeFilms() {
    const filmsListContainer = this._filmsListContainer;
    this._mainFilmControllers.forEach((movieController) => movieController.destroy());

    filmsListContainer.innerHTML = ``;
    this._mainFilmControllers = [];
  }

  _renderFilms(filmCards) {
    const newFilms = renderFilms(this._filmsListContainer, filmCards.slice(0, this._showingFilms), this._onDataChange, this._onViewChange);
    this._mainFilmControllers = this._mainFilmControllers.concat(newFilms);
  }

  _renderShowMoreButton() {
    remove(this._ShowMoreButtonComponent);

    if (this._showingFilms >= this._moviesModel.getMovies().length) {
      return;
    }

    render(this._filmsList, this._ShowMoreButtonComponent, RenderPosition.BEFOREEND);
    render(this._filmsList, this._ShowMoreButtonComponent, RenderPosition.BEFOREEND);
    this._ShowMoreButtonComponent.setShowMoreButtonClickHandler(this._onShowMoreButtonClick);
  }

  _updateFilms(count) {
    this._removeFilms();
    this._renderFilms(this._moviesModel.getMovies().slice(0, count));
    this._renderShowMoreButton();
  }

  _onDataChange(movieController, oldData, newData) {
    if (oldData === EmptyComment) {
      this._creatingComment = null;
      if (newData === null) {
        movieController.destroy();
        this._updateFilms(this._showingFilms);
      } else {
        this._moviesModel.addComment(newData);
        movieController.render(newData, MovieControllerMode.COMMENT);

        const destroyedFilm = this._mainFilmControllers.pop();
        destroyedFilm.destroy();
        this._mainFilmControllers = [].concat(movieController, this._mainFilmControllers);
        this._showingFilms = this._mainFilmControllers.length;
      }
    } else if (newData === null) {
      this._moviesModel.removeFilm(oldData.id);
      this._updateFilms(this._showingFilms);
    } else {
      // const isSuccess = this._moviesModel.updateMovie(oldData.id, newData);
      // if (isSuccess) {
      //   movieController.render(newData, MovieControllerMode.COMMENT);
      // }
      this._api.updateFilm(oldData.id, newData)
        .then((moviesModel) => {
          const isSuccess = this._moviesModel.updateTask(oldData.id, moviesModel);

          if (isSuccess) {
            movieController.render(moviesModel, MovieControllerMode.DEFAULT);
            this._updateTasks(this._showingFilms);
          }
        });
    }
  }

  _onViewChange() {
    this._mainFilmControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._showingFilms = FILM_CARD_QUANTITY;
    let sortedFilms = this._moviesModel.slice();

    switch (sortType) {
      case SortType.DATE:
        sortedFilms = sortedFilms.sort((a, b) => b.year - a.year);
        break;
      case SortType.RATING:
        sortedFilms = sortedFilms.sort((a, b) => b.rating - a.rating);
        break;
      case SortType.DEFAULT:
        sortedFilms = this._moviesModel;
        break;
    }

    this._removeTasks();
    this._renderTasks(sortedFilms);
    this._renderShowMoreButton();
  }

  _onShowMoreButtonClick() {
    const showMoreButton = this._ShowMoreButtonComponent.getElement();
    const filmCards = this._moviesModel.getMovies();
    this._ShowMoreButtonComponent.setShowMoreButtonClickHandler(() => {
      let prevFilmsCount = this._showingFilms;
      this._showingFilms = this._showingFilms + this._showingFilmsQuantityByButton;

      const newFilmsByButton = renderFilms(this._filmsListContainer, filmCards.slice(prevFilmsCount, this._showingFilms), this._onDataChange, this._onViewChange);
      this._newFilmsByButtonControllers = this._newFilmsByButtonControllers.concat(newFilmsByButton);

      if (this._showingFilms >= filmCards.length) {
        showMoreButton.remove();
      }
    });
  }

  _onFilterChange() {
    this._removeFilms();
    this._renderFilms(this._moviesModel.getMovies().slice(0, this._showingFilms));
    this._renderShowMoreButton();
    this._updateFilms(FILM_CARD_QUANTITY);
  }
}
