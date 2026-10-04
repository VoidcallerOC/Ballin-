export const DEMO_PEG = 0.02;

export const sports = ["Basketball", "Football", "Baseball", "Soccer"] as const;
export const rarities = ["Common", "Rare", "Legend", "1/1"] as const;

export type Sport = (typeof sports)[number];
export type Rarity = (typeof rarities)[number];
export type ListType = "buy" | "auction";

export type DemoCard = {
  id: string;
  athlete: string;
  sport: Sport;
  rarity: Rarity;
  number: string;
  edition: string;
  setName: string;
  price: number;
  list: ListType;
  bid?: number;
  clock?: string;
  seller: string;
  heat: number;
};

export type Collector = {
  id: string;
  name: string;
  line: string;
  bio: string;
};

export const collectors: Collector[] = [
  {
    id: "waxroom",
    name: "Wax Room",
    line: "Demo collector",
    bio: "Buys the loud ones. Sells when the group chat goes quiet.",
  },
  {
    id: "courtside",
    name: "Courtside",
    line: "Demo collector",
    bio: "Basketball first. Will talk you through every parallel.",
  },
  {
    id: "boxbreak",
    name: "Box Break",
    line: "Demo collector",
    bio: "Opens everything. Keeps almost nothing. The floor's dealer.",
  },
];

export const cards: DemoCard[] = [
  {
    id: "jordan",
    athlete: "Michael Jordan",
    sport: "Basketball",
    rarity: "1/1",
    number: "23",
    edition: "1 / 1",
    setName: "Night Game",
    price: 88000,
    list: "buy",
    seller: "waxroom",
    heat: 100,
  },
  {
    id: "lebron",
    athlete: "LeBron James",
    sport: "Basketball",
    rarity: "Legend",
    number: "6",
    edition: "8 / 25",
    setName: "Night Game",
    price: 42000,
    list: "buy",
    seller: "courtside",
    heat: 96,
  },
  {
    id: "mahomes",
    athlete: "Patrick Mahomes",
    sport: "Football",
    rarity: "Legend",
    number: "15",
    edition: "14 / 50",
    setName: "Night Game",
    price: 31000,
    bid: 27500,
    list: "auction",
    clock: "2h 14m",
    seller: "boxbreak",
    heat: 94,
  },
  {
    id: "messi",
    athlete: "Lionel Messi",
    sport: "Soccer",
    rarity: "Legend",
    number: "10",
    edition: "3 / 20",
    setName: "Night Game",
    price: 36000,
    list: "buy",
    seller: "waxroom",
    heat: 91,
  },
  {
    id: "wemby",
    athlete: "Victor Wembanyama",
    sport: "Basketball",
    rarity: "Rare",
    number: "1",
    edition: "41 / 99",
    setName: "Night Game",
    price: 12500,
    bid: 9800,
    list: "auction",
    clock: "46m",
    seller: "courtside",
    heat: 88,
  },
  {
    id: "clark",
    athlete: "Caitlin Clark",
    sport: "Basketball",
    rarity: "Rare",
    number: "22",
    edition: "22 / 99",
    setName: "Night Game",
    price: 15400,
    list: "buy",
    seller: "courtside",
    heat: 86,
  },
  {
    id: "ohtani",
    athlete: "Shohei Ohtani",
    sport: "Baseball",
    rarity: "Rare",
    number: "17",
    edition: "17 / 75",
    setName: "Night Game",
    price: 19800,
    list: "buy",
    seller: "boxbreak",
    heat: 84,
  },
  {
    id: "brady",
    athlete: "Tom Brady",
    sport: "Football",
    rarity: "Rare",
    number: "12",
    edition: "60 / 150",
    setName: "Night Game",
    price: 8900,
    list: "buy",
    seller: "waxroom",
    heat: 70,
  },
  {
    id: "griffey",
    athlete: "Ken Griffey Jr.",
    sport: "Baseball",
    rarity: "Legend",
    number: "24",
    edition: "5 / 30",
    setName: "Night Game",
    price: 24000,
    bid: 21250,
    list: "auction",
    clock: "5h 02m",
    seller: "boxbreak",
    heat: 80,
  },
  {
    id: "jeter",
    athlete: "Derek Jeter",
    sport: "Baseball",
    rarity: "Common",
    number: "2",
    edition: "214 / 500",
    setName: "Night Game",
    price: 2400,
    list: "buy",
    seller: "waxroom",
    heat: 54,
  },
];

export type DemoBeat = {
  id: string;
  actorId: string;
  verb: string;
  cardId: string;
  detail: string;
};

export const beats: DemoBeat[] = [
  {
    id: "listed-jordan",
    actorId: "waxroom",
    verb: "put up",
    cardId: "jordan",
    detail: "Night Game 1/1",
  },
  {
    id: "bid-mahomes",
    actorId: "boxbreak",
    verb: "is bidding",
    cardId: "mahomes",
    detail: "27,500 BALLN",
  },
  {
    id: "listed-clark",
    actorId: "courtside",
    verb: "put up",
    cardId: "clark",
    detail: "22 / 99",
  },
  {
    id: "clock-griffey",
    actorId: "boxbreak",
    verb: "is watching",
    cardId: "griffey",
    detail: "Demo clock 5h 02m",
  },
  {
    id: "listed-ohtani",
    actorId: "boxbreak",
    verb: "put up",
    cardId: "ohtani",
    detail: "17 / 75",
  },
  {
    id: "bid-wemby",
    actorId: "courtside",
    verb: "is bidding",
    cardId: "wemby",
    detail: "9,800 BALLN",
  },
];

export const sportDoors: { sport: Sport; line: string }[] = [
  { sport: "Basketball", line: "The hardwood" },
  { sport: "Football", line: "Sunday leather" },
  { sport: "Baseball", line: "The diamond" },
  { sport: "Soccer", line: "The pitch" },
];

export type MarketSearch = {
  sport: string;
  rarity: string;
  list: string;
  sort: string;
  q: string;
};

export function marketSearch(partial: Partial<MarketSearch> = {}): MarketSearch {
  return { sport: "all", rarity: "all", list: "all", sort: "heat", q: "", ...partial };
}

export function cardById(id: string) {
  return cards.find((card) => card.id === id);
}

export function collectorById(id: string) {
  return collectors.find((collector) => collector.id === id);
}

export function heldBy(seller: string) {
  return cards.filter((card) => card.seller === seller);
}

export function askOf(card: DemoCard) {
  return card.list === "auction" ? (card.bid ?? card.price) : card.price;
}

export function filterCards(search: MarketSearch) {
  const q = search.q.trim().toLowerCase();
  const next = cards.filter((card) => {
    if (search.sport !== "all" && card.sport !== search.sport) return false;
    if (search.rarity !== "all" && card.rarity !== search.rarity) return false;
    if (search.list === "auction" && card.list !== "auction") return false;
    if (search.list === "buy" && card.list !== "buy") return false;
    if (!q) return true;
    return (
      card.athlete.toLowerCase().includes(q) ||
      card.sport.toLowerCase().includes(q) ||
      card.rarity.toLowerCase().includes(q)
    );
  });
  next.sort((a, b) => {
    if (search.sort === "price-asc") return a.price - b.price;
    if (search.sort === "price-desc") return b.price - a.price;
    if (search.sort === "new") return a.athlete.localeCompare(b.athlete);
    return b.heat - a.heat;
  });
  return next;
}

export function formatBalln(value: number) {
  return value.toLocaleString("en-US");
}

export function formatDemoUsd(value: number) {
  return (value * DEMO_PEG).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}
