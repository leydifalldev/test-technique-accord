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

    filterHotelByDistance = (lat, lng, radius) => {
        this.result = this.findHotelsByDistance(this.hotels, lat, lng, radius);
		
        return this;
    }

    findHotelsByDistance = (hotels = [], lat, lng, radius) => {
        return hotels.map((hotel) => ({
            ...hotel,
            distance: helper.distance(lat, lng, hotel.latitude, hotel.longitude) / 1000,
        })).filter((hotel) => hotel.distance <= radius)
    }

}

module.exports = {
    getHotels: getHotels,
    Filter: Filter,
}