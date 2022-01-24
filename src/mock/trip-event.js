import dayjs from 'dayjs';
import {PLACES, POINTTYPES} from '../const.js';
import {getRandomInteger} from '../utils.js';

const generateType = () => {
  const types = POINTTYPES;
  const randomIndex = getRandomInteger(0, types.length - 1);
  return types[randomIndex];
};

const generateOffers = () => {
  const isOptions = Boolean(getRandomInteger(0, 1));

  if (!isOptions) {
    return null;
  }

  const maxOptions = 4;
  const optionsGap = getRandomInteger(1, maxOptions);
  const options = Array.from({length:optionsGap+1}).map((item, ix) => {
    const option = `option ${ix+1}`;
    const optionPrice = getRandomInteger(1, 200);
    const optionId = +ix+1;

    item = {
      id: optionId,
      title: option,
      price: optionPrice,
      isChecked: Boolean(getRandomInteger(0, 1))
    };
    return item;
  });

  return options;
};

const generateDestination = () => {
  const destinations = PLACES;

  const randomIndex = getRandomInteger(0, destinations.length - 1);

  const generateDescription = () => {
    const isDescription = Boolean(getRandomInteger(0, 1));

    if (!isDescription) {
      return null;
    }

    const descriptions = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Cras aliquet varius magna, non porta ligula feugiat eget.',
      'Fusce tristique felis at fermentum pharetra.',
      'Aliquam id orci ut lectus varius viverra.',
      'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
      'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
      'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
      'Sed sed nisi sed augue convallis suscipit in sed felis.',
      'Aliquam erat volutpat.',
      'Nunc fermentum tortor ac porta dapibus.',
      'In rutrum ac purus sit amet tempus.'
    ];

    const randomQuantity = getRandomInteger(1, 5);
    let description = '';

    for (let i = 0; i < randomQuantity; i++) {
      const randomDescIndex = getRandomInteger(0, descriptions.length - 1);
      description = `${description}${descriptions[randomDescIndex]} `;
    }

    return description;
  };

  const generatePhotos = () => {
    const isPhotos = Boolean(getRandomInteger(0, 1));

    if (!isPhotos) {
      return null;
    }

    const maxPhotos = 7;
    const photosGap = getRandomInteger(1, maxPhotos);
    const pictures = [];

    for (let i = 0; i < photosGap; i++) {
      const generateSrc = `http://picsum.photos/248/152?r=${Math.random()}`;
      const picture = {
        src: generateSrc,
        description: 'description'
      };

      pictures.push(picture);
    }

    return pictures;
  };

  const destination = {
    description: generateDescription(),
    name: destinations[randomIndex],
    pictures: generatePhotos()
  };

  return destination;
};

const generateStartDate = () => {
  const maxDaysGap = 30;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const generateDateGap = getRandomInteger(0, 86400000);
  const startDate = dayjs().add(daysGap, 'day').add(generateDateGap, 'milliseconds').toDate();

  return startDate;
};

const genegateFinishDate = (startDate) => {
  const generateDateGap = getRandomInteger(0, 86400000);
  const finishDateMs = +startDate + generateDateGap;
  const finishDate = new Date(finishDateMs);
  return finishDate;
};

const maxPriceGap = 1250;

export const generateEvent = () => {
  const offers = generateOffers();
  const dateFrom = generateStartDate();
  const dateTo = genegateFinishDate(dateFrom);

  return {
    type: generateType(),
    dateFrom,
    dateTo,
    price: getRandomInteger(0, maxPriceGap),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers,
    destination: generateDestination(),
  };
};
