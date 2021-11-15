const hotelService = require('./services/hotel-service');
const priceService = require('./services/price-service');

function findHotelNearbyWithBestOffer(lat, lng, radius, date) {
    // TODO implement me
    return null;
}

function findHotelsNearby(lat, lng, radius) {
    // TODO implement me
    const hotels = hotelService.getHotels();
    const prices = priceService.getPrices();

    return new hotelService.Filter(hotels, prices)
        .filterHotelByDistance(lat, lng, radius)
        .getResult();
}


module.exports = {
	findHotelsNearby: findHotelsNearby,
	findHotelNearbyWithBestOffer: findHotelNearbyWithBestOffer
}

const hotels = findHotelsNearby(48.838385, 2.290459, 2)
console.log("hotels", hotels);