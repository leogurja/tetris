import { Range, Root, type SliderProps, Thumb, Track } from "@radix-ui/react-slider";
import type { Ref } from "react";

export function Slider(
  props: Omit<SliderProps, "className"> & {
    ref?: Ref<HTMLSpanElement>;
  },
) {
  return (
    <Root ref={props.ref} className="relative flex w-full touch-none select-none items-center h-5" {...props}>
      <Track className="relative h-2 w-full grow rounded-full bg-neutral-700">
        <Range className="absolute h-full rounded-full bg-neutral-100" />
      </Track>
      <Thumb className="block size-5 rounded-full shadow-sm ring-offset-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </Root>
  );
}

Slider.displayName = Root.displayName;
