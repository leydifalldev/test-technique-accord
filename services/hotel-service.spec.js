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