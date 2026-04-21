import { SplitSection } from "./SplitSection";
import { StackedSection } from "./StackedSection";
import { PromptCardVisual } from "./visuals/PromptCardVisual";
import { StudioAppCardVisual } from "./visuals/StudioAppCardVisual";
import { InfrastructureCardVisual } from "./visuals/InfrastructureCardVisual";

// Map content `visualKey` values to their concrete visual components so that
// the content/home.js file can stay plain data (no JSX). Must stay in sync
// with the equivalent map in ValuePropsStory.jsx (desktop variant) so the
// same content renders on both breakpoints.
const VISUALS = {
  promptCard: PromptCardVisual,
  studioApp: StudioAppCardVisual,
  infrastructure: InfrastructureCardVisual,
};

function renderVisual(key) {
  if (!key) return undefined;
  const Component = VISUALS[key];
  return Component ? <Component /> : undefined;
}

export function ValueProps({ items = [] }) {
  return (
    <>
      {items.map((item, i) => {
        const visual = item.visual ?? renderVisual(item.visualKey);
        if (item.layout === "stacked") {
          return (
            <StackedSection
              key={i}
              eyebrow={item.eyebrow}
              heading={item.heading}
              body={item.body}
              visual={visual}
            />
          );
        }
        return (
          <SplitSection
            key={i}
            orientation={item.orientation}
            eyebrow={item.eyebrow}
            heading={item.heading}
            body={item.body}
            visual={visual}
          />
        );
      })}
    </>
  );
}
