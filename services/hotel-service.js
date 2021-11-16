const HOTELS = require('./data/hotels.json').hotels;
const helper = require('./helper');

const getHotels = () => {
    return HOTELS;
}

class Filter {
    hotels = [];
    prices = [];
    result = [];

    constructor(hotels = [], prices = []) {
        this.hotels = hotels;
        this.prices = prices;
    }

    getResult() {
        return this.result;
    }

    getMostRelevant() {
        return this.result[0];
    }

    getProximityHotel(lat, lng, radius) {
        return this.findHotelsByDistance(this.hotels, lat, lng, radius);
    }

    filterHotelByDistance = (lat, lng, radius) => {
        this.hotels = this.findHotelsByDistance(this.hotels, lat, lng, radius);
		
        return this;
    }

    findHotelsByDistance = (hotels = [], lat, lng, radius) => {
        return hotels.map((hotel) => ({
            ...hotel,
            distance: helper.distance(lat, lng, hotel.latitude, hotel.longitude) / 1000,
        })).filter((hotel) => hotel.distance <= radius)
    }

    getHotelWithOffersByDate = (date) => {
        this.prices.map((hotelOffers) => {
            const matched = this.hotels.find((hotel) => hotel.ridCode === hotelOffers.ridCode);
            const matchedOfferByDate = hotelOffers.offers
                .filter((offer) => (offer.fare === "STANDARD" && offer.date === date))
                .sort((a, b) => (a.price - b.price))[0];
            if (matched && matchedOfferByDate) {
                this.result.push({ ...matched, offer: matchedOfferByDate });
            }
        });

        return this;
    }

    sortOfferByPrice = () => {
        this.result = this.result.sort((a, b) => {
            if (a.offer.price < b.offer.price) {
                return -1;
            }
            if (a.offer.price > b.offer.price) {
                return 1;
            }
            if (a.offer.price === b.offer.price) {
                return (a.distance > b.distance) ? 1 : -1;
            }
            return 0;
        })
        return this;
    }

}

module.exports = {
    getHotels: getHotels,
    Filter: Filter,
}