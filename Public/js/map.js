 

  mapboxgl.accessToken = mapToken
    const map = new mapboxgl.Map({
        container: 'map',
        style:"mapbox://style/mapbox/streets-v11", 
        center: listing.geometry.coordinates, 
        zoom: 9
    });
     const marker1 = new mapboxgl.Marker({ color : "red"})
        .setLngLat(listing.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML(`<h4>${listing.title} </h4><p>Exact Location provided after booking</p> `)
    
    .addTo(map))
        .addTo(map);