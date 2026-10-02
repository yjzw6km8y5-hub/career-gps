import { STATE_PACKS } from "./data/common";
import type { Text } from "./data/schema";
import { fill, pick } from "./i18n";
import { useApp } from "./state";

/** Picks the language and fills state-pack slots ({stateName}, {class12Name}, {stateCounselling}). */
export function useStateText() {
  const { s } = useApp();
  const pack = STATE_PACKS[s.profile.state];
  return (text: Text) => fill(pick(text, s.lang), {
    stateName: pick(pack.name, s.lang),
    class12Name: pick(pack.class12Name, s.lang),
    stateCounselling: pick(pack.stateCounselling, s.lang)
  });
}
