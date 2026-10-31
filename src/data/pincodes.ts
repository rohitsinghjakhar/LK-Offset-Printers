/**
 * Local PIN lookup for Rajasthan + Delhi NCR (city/state auto-fill at checkout). Specific codes
 * first, then 3-digit sorting-district prefixes. Anything else is entered manually.
 */
type Place = { city: string; state: string };

const RJ = "Rajasthan";
const DL = "Delhi";
const HR = "Haryana";
const UP = "Uttar Pradesh";

const exact: Record<string, Place> = {
  "321607": { city: "Laxmangarh", state: RJ },
  "301001": { city: "Alwar", state: RJ },
  "301002": { city: "Alwar", state: RJ },
  "301018": { city: "Tijara", state: RJ },
  "301019": { city: "Bhiwadi", state: RJ },
  "301022": { city: "Alwar", state: RJ },
  "301026": { city: "Alwar", state: RJ },
  "301030": { city: "Alwar", state: RJ },
  "301401": { city: "Kherli", state: RJ },
  "301701": { city: "Behror", state: RJ },
  "301705": { city: "Neemrana", state: RJ },
  "301706": { city: "Shahjahanpur", state: RJ },
  "122001": { city: "Gurugram", state: HR },
  "122002": { city: "Gurugram", state: HR },
  "122018": { city: "Gurugram", state: HR },
  "201301": { city: "Noida", state: UP },
  "201304": { city: "Noida", state: UP },
  "201010": { city: "Ghaziabad", state: UP },
  "121001": { city: "Faridabad", state: HR },
  "124507": { city: "Bahadurgarh", state: HR },
};

const prefixes: Record<string, Place> = {
  "301": { city: "Alwar", state: RJ },
  "302": { city: "Jaipur", state: RJ },
  "303": { city: "Jaipur", state: RJ },
  "304": { city: "Tonk", state: RJ },
  "305": { city: "Ajmer", state: RJ },
  "306": { city: "Pali", state: RJ },
  "307": { city: "Sirohi", state: RJ },
  "311": { city: "Bhilwara", state: RJ },
  "312": { city: "Chittorgarh", state: RJ },
  "313": { city: "Udaipur", state: RJ },
  "314": { city: "Dungarpur", state: RJ },
  "321": { city: "Bharatpur", state: RJ },
  "322": { city: "Sawai Madhopur", state: RJ },
  "323": { city: "Bundi", state: RJ },
  "324": { city: "Kota", state: RJ },
  "325": { city: "Kota", state: RJ },
  "326": { city: "Jhalawar", state: RJ },
  "327": { city: "Banswara", state: RJ },
  "328": { city: "Dholpur", state: RJ },
  "331": { city: "Churu", state: RJ },
  "332": { city: "Sikar", state: RJ },
  "333": { city: "Jhunjhunu", state: RJ },
  "334": { city: "Bikaner", state: RJ },
  "335": { city: "Sri Ganganagar", state: RJ },
  "341": { city: "Nagaur", state: RJ },
  "342": { city: "Jodhpur", state: RJ },
  "343": { city: "Jalore", state: RJ },
  "344": { city: "Barmer", state: RJ },
  "345": { city: "Jaisalmer", state: RJ },
  "110": { city: "New Delhi", state: DL },
  "122": { city: "Gurugram", state: HR },
  "121": { city: "Faridabad", state: HR },
  "123": { city: "Rewari", state: HR },
  "124": { city: "Rohtak", state: HR },
  "131": { city: "Sonipat", state: HR },
  "201": { city: "Ghaziabad", state: UP },
  "203": { city: "Greater Noida", state: UP },
};

export function lookupPin(pin: string): Place | null {
  if (!/^[1-9]\d{5}$/.test(pin)) return null;
  return exact[pin] ?? prefixes[pin.slice(0, 3)] ?? null;
}

/** Local delivery is based at the Laxmangarh shop. Other towns use courier. */
export function isLocalPin(pin: string): boolean {
  return pin === "321607";
}
