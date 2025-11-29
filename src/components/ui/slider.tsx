"use client";
import { Slider as Primitive } from "radix-ui";
import type { Ref } from "react";

export function Slider(
  props: Omit<Primitive.SliderProps, "className"> & {
    ref?: Ref<HTMLSpanElement>;
  }
) {
  return (
    <Primitive.Root
      className="relative flex h-5 w-full touch-none select-none items-center"
      ref={props.ref}
      {...props}
    >
      <Primitive.Track className="relative h-2 w-full grow rounded-full bg-neutral-700">
        <Primitive.Range className="absolute h-full rounded-full bg-neutral-100" />
      </Primitive.Track>
      <Primitive.Thumb className="block size-5 rounded-full shadow-sm ring-offset-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </Primitive.Root>
  );
}

Slider.displayName = Primitive.Root.displayName;
