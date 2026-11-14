/* ---------------------------------------------------------------
   Business details — the single place to update contact info.
   Every phone link, WhatsApp button, email and address on the
   site reads from here.

   ⚠️  The phone / WhatsApp numbers below are placeholders.
       Replace them with the agency's real numbers before launch.
------------------------------------------------------------------*/
export const SITE = {
  name: "Malmitch Insurance Agency",
  shortName: "Malmitch",
  phoneDisplay: "0700 123 456",
  phoneHref: "tel:+254700123456",
  // International format, digits only — used for wa.me links
  whatsapp: "254700123456",
  email: "info@malmitch.co.ke",
  address: {
    line1: "3rd Floor, Fortune Plaza",
    line2: "Westlands, Nairobi",
    mapQuery: "Fortune Plaza, Westlands, Nairobi",
  },
  hours: [
    { days: "Mon – Fri", time: "8:00am – 6:00pm" },
    { days: "Saturday", time: "9:00am – 1:00pm" },
    { days: "Claims line", time: "24 hours, 7 days" },
  ],
  hoursShort: "Mon–Fri 8am–6pm · Sat 9am–1pm",
  founded: 2013,
  // Leave a value empty ("") to hide that icon
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    x: "",
  },
};

export const whatsappLink = (message = "") =>
  `https://wa.me/${SITE.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  SITE.address.mapQuery
)}&output=embed`;

export const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  SITE.address.mapQuery
)}`;
