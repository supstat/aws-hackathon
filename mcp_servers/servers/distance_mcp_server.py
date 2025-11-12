# mcp_server_shipping.py
from mcp.server.fastmcp import FastMCP
from geopy.geocoders import Nominatim
from geopy.distance import geodesic
from functools import lru_cache

mcp = FastMCP(host="0.0.0.0", stateless_http=True)

# Geocoder (set a distinct user_agent per Nominatim policy)
_geolocator = Nominatim(user_agent="mcp-shipping-distance", timeout=10)

@lru_cache(maxsize=512)
def _geocode(city: str, country: str):
    q = f"{city.strip()}, {country.strip()}"
    loc = _geolocator.geocode(q, exactly_one=True, addressdetails=False)
    if not loc:
        raise ValueError(f"Could not geocode: {q}")
    return (loc.latitude, loc.longitude)

@mcp.tool()
def calculate_shipping_metrics(
    city1: str,
    country1: str,
    city2: str,
    country2: str
) -> dict:
    """
    Outputs: Distance in KM, Transport Time in hours for normal and expedited shipping,
    plus transport prices (EUR) at 0.04 €/km (normal) and 0.64 €/km (expedited).
    """
    lat1, lon1 = _geocode(city1, country1)
    lat2, lon2 = _geocode(city2, country2)

    # Distance (km) via great-circle
    distance_km = geodesic((lat1, lon1), (lat2, lon2)).kilometers

    # Shipping speeds
    normal_speed_kmh = 30.0       # ground/standard shipping average
    air_speed_kmh = 850.0         # typical air freight cruise speed
    air_setup_hours = 2.0         # handling/transfer buffer

    # Time calculations
    normal_hours = distance_km / normal_speed_kmh
    expedited_hours = (distance_km / air_speed_kmh) + air_setup_hours

    # Pricing (EUR per km)
    NORMAL_RATE_EUR_PER_KM = 0.04
    EXPEDITED_RATE_EUR_PER_KM = 0.64

    normal_price_eur = distance_km * NORMAL_RATE_EUR_PER_KM
    expedited_price_eur = distance_km * EXPEDITED_RATE_EUR_PER_KM

    return {
        "distance_km": round(distance_km, 2),
        "normal_shipping_hours": round(normal_hours, 2),
        "expedited_shipping_hours": round(expedited_hours, 2),
        "normal_shipping_price_eur": round(normal_price_eur, 2),
        "expedited_shipping_price_eur": round(expedited_price_eur, 2),
    }

if __name__ == "__main__":
    mcp.run(transport="streamable-http")
