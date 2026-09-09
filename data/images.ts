import type { ImageAsset } from "@/lib/types";

/* ==========================================================================
   MEDIA LIBRARY
   --------------------------------------------------------------------------
   REPLACE WITH OFFICIAL COLLEGE PHOTOGRAPHY.

   Every photograph on the site is referenced from this one file so the whole
   media set can be swapped without touching a single component.

   To move to real photography:
     1. Save the files into /public/images
     2. Change each `src` below to e.g. "/images/campus-exterior.jpg"
     3. Rewrite the `alt` text to describe the actual photograph
     4. Delete the `remotePatterns` entry in next.config.ts

   The current images are licence-free development placeholders from Unsplash
   and do NOT depict Prime International College Australia.
   ========================================================================== */

const CDN = "https://images.unsplash.com/photo-";

/** Builds a placeholder URL. Local files bypass this entirely. */
function ph(id: string, alt: string, ratio = 1.5): ImageAsset {
  return { src: `${CDN}${id}?auto=format&fit=crop&q=80`, alt, ratio };
}

export const images = {
  /* --- Hero and headline photography ------------------------------------ */
  heroCampus: ph(
    "1571260899304-425eee4c7efc",
    "Students walking together across a campus courtyard carrying books and folders",
    1.6,
  ),
  campusExterior: ph(
    "1562774053-701939374585",
    "A college building fronted by open lawn in late afternoon light",
    1.5,
  ),
  campusModern: ph(
    "1592280771190-3e2e4d571952",
    "The exterior of a contemporary brick teaching building",
    1.5,
  ),

  /* --- Learning spaces --------------------------------------------------- */
  lectureTheatre: ph(
    "1519452575417-564c1401ecc0",
    "An empty tiered lecture theatre with timber seating",
    1.5,
  ),
  libraryStacks: ph(
    "1524995997946-a1c2e315a42f",
    "Curved shelves in a college library reading room",
    1.5,
  ),
  libraryAisle: ph(
    "1427504494785-3a9ca7044f45",
    "A student browsing between tall library shelves",
    1.5,
  ),
  computerLab: ph(
    "1541829070764-84a7d30dd3f3",
    "Rows of workstations in a computer laboratory",
    1.5,
  ),
  techCorridor: ph(
    "1573164713988-8665fc963095",
    "A student working on a laptop in a technology corridor",
    1.5,
  ),
  seminarRoom: ph(
    "1524178232363-1fb2b075b655",
    "A seminar in progress in a small teaching room",
    1.5,
  ),
  brightClassroom: ph(
    "1573164574572-cb89e39749b4",
    "A bright classroom with full-height windows and students seated at long desks",
    1.5,
  ),

  /* --- Students ---------------------------------------------------------- */
  collaboration: ph(
    "1522071820081-009f0129c71c",
    "Students working together on laptops around a shared table",
    1.5,
  ),
  studyGroup: ph(
    "1543269865-cbf427effbad",
    "A group of students in conversation over coffee and notes",
    1.5,
  ),
  diverseOutdoors: ph(
    "1517486808906-6ca8b3f04846",
    "A diverse group of students standing together outdoors",
    1.5,
  ),
  diverseLaptop: ph(
    "1531545514256-b1400bc00f31",
    "Four students from different backgrounds gathered around a laptop",
    1.5,
  ),
  diverseComputers: ph(
    "1531482615713-2afd69097998",
    "Students working side by side at computers in a shared learning space",
    1.5,
  ),
  studyingFocused: ph(
    "1513258496099-48168024aec0",
    "A student studying with headphones on in a quiet space",
    1.5,
  ),
  deskWriting: ph(
    "1517048676732-d65bc937f952",
    "Close view of hands taking notes during a workshop",
    1.5,
  ),
  workshop: ph(
    "1552664730-d307ca884978",
    "A facilitated workshop with participants and a wall of notes",
    1.5,
  ),
  mentoring: ph(
    "1600880292203-757bb62b4baf",
    "A staff member and a student talking together at a desk",
    1.5,
  ),
  whiteboard: ph(
    "1596495577886-d920f1fb7238",
    "A hand writing equations on a whiteboard",
    1.5,
  ),

  /* --- Community and occasions ------------------------------------------ */
  graduationSky: ph(
    "1541339907198-e08756dedf3f",
    "Graduates throwing their caps into the air at sunset",
    1.6,
  ),
  graduationSeats: ph(
    "1590012314607-cda9d9b699ae",
    "Graduation caps laid out on seats before a ceremony",
    1.5,
  ),
  eventHall: ph(
    "1523580494863-6f3031224c94",
    "A large hall set up for an information event",
    1.5,
  ),
  auditorium: ph(
    "1560439514-4e9645039924",
    "An audience seated in a full auditorium",
    1.5,
  ),
  teamwork: ph(
    "1600880292089-90a7e086ee0c",
    "Hands joined together to mark the end of a team session",
    1.5,
  ),

  /* --- Discipline imagery ------------------------------------------------ */
  business: ph(
    "1521737604893-d14cc237f11d",
    "Colleagues working together in a contemporary open office",
    1.5,
  ),
  health: ph(
    "1622253692010-333f2da6031d",
    "A healthcare professional in scrubs with a stethoscope",
    1.5,
  ),
  healthCare: ph(
    "1631217868264-e5b90bb7e133",
    "A health worker speaking with a client in a consulting room",
    1.5,
  ),
  communitySupport: ph(
    "1584515933487-779824d29309",
    "A support worker holding the hands of an older person",
    1.5,
  ),
  hospitalityVenue: ph(
    "1517248135467-4c7edcad34c4",
    "The dining room of a restaurant prepared for service",
    1.5,
  ),
  hospitalityService: ph(
    "1577219491135-ce391730fb2c",
    "A hospitality professional preparing a drink at a bar",
    1.5,
  ),

  /* --- Australian context ------------------------------------------------ */
  sydney: ph(
    "1523428096881-5bd79d043006",
    "Sydney Harbour at dusk with the Opera House and Harbour Bridge",
    1.6,
  ),
  melbourne: ph(
    "1514395462725-fb4566210144",
    "A tram passing Flinders Street Station in Melbourne",
    1.5,
  ),
} as const satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;
