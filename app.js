const hotelService = require('./services/hotel-service');
const priceService = require('./services/price-service');

function findHotelNearbyWithBestOffer(lat, lng, radius, date) {
    // TODO implement me
    if (!lat | !lng | !radius | !date) {
        return null
    }
    // TODO implement me
    const hotels = hotelService.getHotels();
    const prices = priceService.getPrices();

    return new hotelService.Filter(hotels, prices)
        .filterHotelByDistance(lat, lng, radius)
        .getHotelWithOffersByDate(date)
        .sortOfferByPrice()
        .getMostRelevant()
}

function findHotelsNearby(lat, lng, radius) {
    // TODO implement me
    const hotels = hotelService.getHotels();
    const prices = priceService.getPrices();

    return new hotelService.Filter(hotels, prices)
        .getProximityHotel(lat, lng, radius)
}


module.exports = {
	findHotelsNearby: findHotelsNearby,
	findHotelNearbyWithBestOffer: findHotelNearbyWithBestOffer
}

// const hotels = findHotelsNearby(48.838385, 2.290459, 2)
const hotels = findHotelNearbyWithBestOffer(48.856564, 2.351711, 2, '11/01/2021')
console.log("hotels", hotels);