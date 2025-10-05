export const cities = [
    "Ajman",
    "Dubai",
    "Sharja",
    "AbuDhabi"
]

// ducument: is a basic unit data of mongodb is a set of key value pairs similar to json object, they are stores in binary json format  
export const exclusiveOffers = [
    {_id: 1, title: "Summer Escape Package", description: "Enjoy a complimentary night and dialy breakfast",priceOff: 25, expiryDate: "Oct 31",  image:"https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOLodFpvysSTWqutKhEcDHfaYACmx18Jn7VQdi"},
    {_id: 2, title: "Romantic Getway", description: "Special couples package including spa treatment",priceOff: 20, expiryDate: "Dec 31", image:"https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOg4KzdHn1cYFnvxdoPAkMflCBwjqSWaimEV5t"},
    {_id: 3, title: "Luxury Retreat", description: "Book 60 days in advance and save on your stay at any of our luxury properties worlwide",priceOff: 30, expiryDate: "Dec 25", image:"https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFObAKnCbF5dTrM8FiKceX4oJnDvCjZlgLYkIm1"},
];

// collection: a grouping of mongodb documents equevalent of of RDBMS table means structure list of data about special sonthing
// شهادات
export const testimonials = [
{ id: 1, name: 'Mona Osman', address: 'UAE Dubai', rating: 5, review: "I've used many booking platforms before, but none compare to the personalized experience and attention to datails that QuickStay provides", image: "https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOgO2xc9n1cYFnvxdoPAkMflCBwjqSWaimEV5t"},
{ id: 2, name: 'Ahmed Suliman', address: 'UAE Sharja', rating: 5, review: "Quick stay exceeded my expectations, the Booking process was seamless and the hotel were absolutely top-notch. High recommended", image: "https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOMMfKLPdgX0eGtD4LH9TpoxCRAiNBFf1QjOmc"},
{ id: 3, name: 'Hossam Ali', address: 'UAE Ajman', rating: 5, review: "Amazing through QuickStay. Their recommendation never disappoint!", image: "https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOLS95HwFysSTWqutKhEcDHfaYACmx18Jn7VQd"},

]; 

export const roomCommonData = [
    {title: "Clean & Safe Stay", description: "A well-maintained and hygienic space just for you ."},
    {title: "Enhanced Cleaning", description: "This host follows Stayhub's strict cleaning standards."},
    {title: "Excellent location", description: "90% of guests rated the location 5 stars."},
    {title: "Smooth Check-In", description: "100% of guests  have check-in a 5-star rating.."},
];

export const hotelDummyData = {
    "_id": "45646413131313",
    "name": "Urbanza Suites",
    "address" : "Main Road 123 Street, 23 Colony",
    "contact" : "+99 9999 99999",
    "owner" : "User_123123123",
    "city": "Abu Dhabi",
}


export const roomsDummyData = [
{
    "_id": "45646413131313",
    "hotel": hotelDummyData,
    "roomType" : "Double Bed",
    "pricePerNight" : 399,
    "amenities" : ["Room Services", "Mountain View", "Pool Access"],
    "isAvailable" : "true",
    "images" : ["https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOYudPtNSMwfH2N3cDGbhtZCrvSdugj8Wl5TqB",
                 "https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOWSkdKLJtuAX8feLh9KnwYCPdRMZGjgvEm4W6",
                "https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFORJuW56BZzu2gDIawshKlSCy74pZXJRic1QUV"
    ]

   },
{
    "_id": "456478975464",
    "hotel": hotelDummyData,
    "roomType" : "Double Bed",
    "pricePerNight" : 325,
    "amenities" : ["Room Services", "Mountain View", "Pool Access"],
    "isAvailable" : "true",
    "images" : ["https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOWSkdKLJtuAX8feLh9KnwYCPdRMZGjgvEm4W6",
                "https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOWSkdKLJtuAX8feLh9KnwYCPdRMZGjgvEm4W6",
                "https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOYudPtNSMwfH2N3cDGbhtZCrvSdugj8Wl5TqB"
                ]
},
{
    "_id": "456412131464",
    "hotel": hotelDummyData,
    "roomType" : "Double Bed",
    "pricePerNight" : 355,
    "amenities" : ["Room Services", "Mountain View", "Pool Access"],
    "isAvailable" : "true",
    "images" : ["https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFORJuW56BZzu2gDIawshKlSCy74pZXJRic1QUV",
        "https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFORJuW56BZzu2gDIawshKlSCy74pZXJRic1QUV",
        "https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFORJuW56BZzu2gDIawshKlSCy74pZXJRic1QUV"
    ]
},
{
    "_id": "4564213131",
    "hotel": hotelDummyData,
    "roomType" : "Double Bed",
    "pricePerNight" : 350,
    "amenities" : ["Room Services", "Mountain View", "Pool Access"],
    "isAvailable" : "true",
    "images" : ["https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOXr4ypqUFA4VW75N3kibEMTwcaKyUpSqHResz",
        "https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOXr4ypqUFA4VW75N3kibEMTwcaKyUpSqHResz",
        "https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOXr4ypqUFA4VW75N3kibEMTwcaKyUpSqHResz"
    ]
},
{
    "_id": "45648123546589",
    "hotel": hotelDummyData,
    "roomType" : "Single Bed",
    "pricePerNight" : 199,
    "amenities" : ["Free Wifi", "Room Services", "Pool Access"],
    "isAvailable" : "true",
    "images" : ["https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOyvZMXNYOc0bkifAnBRj5hG72QteEx8WuNT6P",
        "https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOyvZMXNYOc0bkifAnBRj5hG72QteEx8WuNT6P",
        "https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOyvZMXNYOc0bkifAnBRj5hG72QteEx8WuNT6P"
    ]
},
{
    "_id": "4564213131",
    "hotel": hotelDummyData,
    "roomType" : "Single Bed",
    "pricePerNight" : 150,
    "amenities" : ["Free Wifi", "Room Services", "Pool Access"],
    "isAvailable" : "true",
    "images" :["https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFO98PMzzfhkbwZylBjmYI5xvuMd2LiONXqFHTg", 
        "https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFO98PMzzfhkbwZylBjmYI5xvuMd2LiONXqFHTg", 
        "https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFO98PMzzfhkbwZylBjmYI5xvuMd2LiONXqFHTg"
    ]
},


{
    "_id": "45646413131313",
    "hotel": hotelDummyData,
    "roomType" : "Luxury Bed",
    "pricePerNight" : 1000,
    "amenities" : ["Room Services", "Mountain View", "Pool Access"],
    "isAvailable" : "true",
    "images" : ["https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOYudPtNSMwfH2N3cDGbhtZCrvSdugj8Wl5TqB",
        "https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOYudPtNSMwfH2N3cDGbhtZCrvSdugj8Wl5TqB",
        "https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOYudPtNSMwfH2N3cDGbhtZCrvSdugj8Wl5TqB"
    ]
},
{
    "_id": "456478975464",
    "hotel": hotelDummyData,
    "roomType" : "Family Suite",
    "pricePerNight" : 500,
    "amenities" : ["Room Services", "Mountain View", "Pool Access"],
    "isAvailable" : "true",
    "images" : ["https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOWSkdKLJtuAX8feLh9KnwYCPdRMZGjgvEm4W6",
        "https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOWSkdKLJtuAX8feLh9KnwYCPdRMZGjgvEm4W6",
        "https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOWSkdKLJtuAX8feLh9KnwYCPdRMZGjgvEm4W6"
    ]
},
{
    "_id": "456412131464",
    "hotel": hotelDummyData,
    "roomType" : "Family Suite",
    "pricePerNight" : 500,
    "amenities" : ["Room Services", "Mountain View", "Pool Access"],
    "isAvailable" : "true",
    "images" : ["https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFORJuW56BZzu2gDIawshKlSCy74pZXJRic1QUV",
        "https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFORJuW56BZzu2gDIawshKlSCy74pZXJRic1QUV",
        "https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFORJuW56BZzu2gDIawshKlSCy74pZXJRic1QUV"
    ]
},
{
    "_id": "4564213131",
    "hotel": hotelDummyData,
    "roomType" : "Luxury Bed",
    "pricePerNight" : 1000,
    "amenities" : ["Room Services", "Mountain View", "Pool Access"],
    "isAvailable" : "true",
    "images" : ["https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOXr4ypqUFA4VW75N3kibEMTwcaKyUpSqHResz",
        "https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOXr4ypqUFA4VW75N3kibEMTwcaKyUpSqHResz",
        "https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOXr4ypqUFA4VW75N3kibEMTwcaKyUpSqHResz"
    ]
},

];


export const userDummyData = {
    "_id": "21313154654654",
    "username" : "User-1",
    "email" :"user-1@example.com",
    "role": "hotelOwner",
    "recentSearchCities" : [
        "Sharga"
    ]
}

export const dashboardDummyData = {
    "totalBookings": 25,
    "totalRevenue" : 1025,
}
// user Booking 
export const userBookingDummyData = [
    {
        "_id" : "213456487975",
        "user" : userDummyData  ,
        "room" : roomsDummyData[1],
        "hotel" : hotelDummyData,
        "checkInDate" : "2025-04-30T00:00:00.000Z",
        "checkOutDate" : "2025-05-01T00:00:00.000Z",
        "totalPrice" :325,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Stripe",
        "isPaid" :true,
    },
    {
        "_id" : "213456487975",
        "user" : userDummyData  ,
        "room" : roomsDummyData[0],
        "hotel" : hotelDummyData,
        "checkInDate" : "2025-04-27T00:00:00.000Z",
        "checkOutDate" : "2025-04-28T00:00:00.000Z",
        "totalPrice" :399,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Pay At Hotel",
        "isPaid" :false,
    },
    {
        "_id" : "213456487975",
        "user" : userDummyData  ,
        "room" : roomsDummyData[4],
        "hotel" : hotelDummyData,
        "checkInDate" : "2025-04-27T00:00:00.000Z",
        "checkOutDate" : "2025-04-28T00:00:00.000Z",
        "totalPrice" :199,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Pay At Hotel",
        "isPaid" :false,
    }
]