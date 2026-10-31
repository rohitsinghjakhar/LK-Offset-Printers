import type { MockupKind } from "@/types/catalog";
import { Canvas, FlexRoll, Signboard, Standee } from "./largeformat";
import { Booklet, Dangler, PaperSheet, TrifoldBrochure } from "./marketing";
import { Carton, HangTag, LabelRoll, PaperBag, SweetBox } from "./packaging";
import { SchoolDiary } from "./school";
import { BillBook, BusinessCardStack, Envelope, IdCard, Letterhead, Stamp } from "./stationery";
import { WeddingCardWithFoil } from "./wedding";
import { Calendar, CorporateDiary, Keychain, Mug, PhotoFrame, PhotoStack, TShirt } from "./gifts";
import type { MockupProps } from "./primitives";
import { PrintPhoto, printPhotos } from "@/components/catalog/PrintPhoto";

export { MockupDefs } from "./primitives";
export { BusinessCardStack, TrifoldBrochure, FlexRoll, Standee, Mug, TShirt, WeddingCardWithFoil, LabelRoll, SchoolDiary };

/**
 * Maps a catalog mockup key to its stock photo, or to its SVG illustration when there is no photo
 * or `illustration` is set. Safe in Server Components.
 */
export function Mockup({ kind, illustration = false, ...props }: MockupProps & { kind: MockupKind; illustration?: boolean }) {
  if (!illustration && printPhotos[kind]) return <PrintPhoto kind={kind} className={props.className} />;
  switch (kind) {
    case "business-cards":
      return <BusinessCardStack {...props} />;
    case "letterhead":
      return <Letterhead {...props} />;
    case "envelope":
      return <Envelope {...props} />;
    case "shagun-envelope":
      return <Envelope variant="shagun" {...props} />;
    case "bill-book":
      return <BillBook {...props} />;
    case "stamp":
      return <Stamp {...props} />;
    case "id-card":
      return <IdCard {...props} />;
    case "flyer":
      return <PaperSheet variant="flyer" {...props} />;
    case "poster":
      return <PaperSheet variant="poster" {...props} />;
    case "certificate":
      return <PaperSheet variant="certificate" {...props} />;
    case "question-paper":
      return <PaperSheet variant="question-paper" {...props} />;
    case "report-card":
      return <PaperSheet variant="report-card" {...props} />;
    case "menu-card":
      return <PaperSheet variant="menu-card" {...props} />;
    case "trifold":
      return <TrifoldBrochure {...props} />;
    case "booklet":
      return <Booklet {...props} />;
    case "notebook":
      return <Booklet variant="notebook" {...props} />;
    case "spiral-binding":
      return <Booklet variant="spiral" {...props} />;
    case "hard-binding":
      return <Booklet variant="hard" {...props} />;
    case "dangler":
      return <Dangler {...props} />;
    case "flex-roll":
      return <FlexRoll {...props} />;
    case "signboard":
      return <Signboard {...props} />;
    case "standee":
      return <Standee {...props} />;
    case "canvas":
      return <Canvas {...props} />;
    case "wedding-card":
      return <WeddingCardWithFoil {...props} />;
    case "label-roll":
      return <LabelRoll {...props} />;
    case "carton":
      return <Carton {...props} />;
    case "paper-bag":
      return <PaperBag {...props} />;
    case "sweet-box":
      return <SweetBox {...props} />;
    case "hang-tag":
      return <HangTag {...props} />;
    case "school-diary":
      return <SchoolDiary {...props} />;
    case "mug":
      return <Mug {...props} />;
    case "tshirt":
      return <TShirt {...props} />;
    case "calendar":
      return <Calendar {...props} />;
    case "diary":
      return <CorporateDiary {...props} />;
    case "keychain":
      return <Keychain {...props} />;
    case "photo-frame":
      return <PhotoFrame {...props} />;
    case "cushion":
      return <PhotoFrame variant="cushion" {...props} />;
    case "photo-print":
      return <PhotoStack {...props} />;
    case "photocopy":
      return <PhotoStack variant="copies" {...props} />;
    case "lamination":
      return <PhotoStack variant="lamination" {...props} />;
  }
}
