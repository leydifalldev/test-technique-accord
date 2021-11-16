const hotelService = require('./hotel-service');
const priceService = require('./price-service');

const hotels = hotelService.getHotels();
const prices = priceService.getPrices();

describe('HotelService->filterHotelByDistance', () => {
  const result = new hotelService.Filter(hotels, prices).filterHotelByDistance(48.838385, 2.290459, 2).getResult()

  for (let i = 0; i < result.length; i += 1) {
    it(`hotel[${i}] distance should have properties `, () => {
      expect(result[i].distance <= 2).toBeTruthy();
    });
  }
})

describe('HotelService->getHotelWithOffersByDate', () => {
  const matchedDate = "11/01/2021";
  const result = new hotelService.Filter(hotels, prices).getHotelWithOffersByDate(matchedDate).getResult()

  for (let i = 0; i < result.length; i += 1) {
    it(`offer[${i}] date matched `, () => {
      expect(result[i].offer.date == matchedDate).toBeTruthy();
    });
  }
})

describe('HotelService->sortOfferByPrice', () => {
  const matchedDate = "11/01/2021";
  let previous = 100000000;

  const result = new hotelService.Filter(hotels, prices)
    .getHotelWithOffersByDate(matchedDate)
    .sortOfferByPrice()
    .getResult();

  for (let i = 0; i < result.length; i += 1) {
    it(`offer[${i}] must be cheaper then previous `, () => {
      expect(result[i].offer.price <= previous).toBeTruthy();
    });
    previous = result[i].offer.price;
  }
})