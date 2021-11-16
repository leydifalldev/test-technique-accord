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
const hotel = findHotelNearbyWithBestOffer(48.856564, 2.351711, 2, '11/01/2021')
console.log("hotel", hotel);

const template = `
<div class="container">
    <div class="card-list">
        <!-- <div class="card-container"> -->
        <div class="card-thumbnail">
            <img src="./resources/hotel.jpg" class="card-img">
        </div>
        <div class="card-body">
            <div class="main-section">
                <h5 class="card-title">${hotel.commercialName}</h5>
                <p class="card-subtitle">Hôtel - ${hotel.distance.toFixed(2)} km de votre recherche</p>
            </div>
            <div class="rating-section">
                <div class="rating-container">
                    <img src="./resources/tripadvisor.png" class="tripadvisor">
                    <p class="tripadvisor-rating">${hotel.localRating}/5</p>
                    <p class="tripadvisor-opinion">(678899)</p>
                </div>
                <div class="criteria-icons-container">
                    <img src="./resources/parking.svg" class="criteria-icon">
                    <img src="./resources/wifi.svg" class="criteria-icon">
                    <img src="./resources/restaurant.svg" class="criteria-icon">
                    <img src="./resources/air-conditioning.svg" class="criteria-icon">
                    <img src="./resources/beverage.svg" class="criteria-icon">
                </div>
            </div>
            <div class="pricing-section">
                <div class="pricing-header-section">
                    <span class="pricing-header">TARIF À PARTIR DE (1)</span>
                </div>
                <div class="pricing-body-1">
                    <span>Pour 1 nuit | 1 adulte</span>
                </div>
                <div class="pricing-body-2">
                    <span class="pricing-public-container">Public <span class="pricing-public">${hotel.offer.price}€</span></span>
                    <span>|</span>
                    <span class="pricing-member-container">Member <span class="pricing-member">${hotel.offer.price}€</span></span>
                </div>
            </div>
        </div>
        <!-- </div> -->
    </div>
    <div class="footer">
        <div class="footer-left-section"></div>
        <div class="footer-right-section">
            <a href="#">Voir le calendrier des prix</a>
            <button class="footer-button">Selectionner une chambre</button>
        </div>
    </div>
</div>
`
let selector = document.querySelector("#template");
selector.innerHTML = template;