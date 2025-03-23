import { getReciters } from "./getReciters";
import QuranRecitersList from "./RecitersList";

export default async function QuranRecitersPage() {
  const reciters = await getReciters();

  return <QuranRecitersList reciters={reciters} />;
}
