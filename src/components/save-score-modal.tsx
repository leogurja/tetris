"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { createScoreAction } from "@/lib/actions/create-score";
import { createScoreSchema } from "@/lib/schemas/create-score";
import { isClient } from "@/lib/utils/is-client";
import { useTetris } from "@/tetris";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";

interface SaveScoreModalProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

export function SaveScoreModal({ onOpenChange, open }: SaveScoreModalProps) {
  const t = useTranslations("saveScoreModal");
  const score = useTetris((tetris) => tetris.score);

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(createScoreSchema),
    defaultValues: {
      player: (isClient && localStorage.getItem("player")) || "",
      score,
    },
  });

  const onSubmit = handleSubmit(
    async ({ player }) => {
      localStorage.setItem("player", player);
      await createScoreAction({ player, score });
      onOpenChange(false);
    },
    (error) => {
      console.error(error);
    }
  );

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{t("description")}</DialogDescription>
        <form onSubmit={onSubmit}>
          <Input {...register("player")} />
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">{t("ignore")}</Button>
            </DialogClose>
            <Button type="submit">{t("save")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
