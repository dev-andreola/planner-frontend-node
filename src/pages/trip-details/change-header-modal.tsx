import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, Calendar, MapPin, X } from "lucide-react";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { Button } from "../../components/button";

interface CreateActivityModalProps {
  closeChangeHeaderModal: () => void;
}

export function ChangeHeaderModal({
  closeChangeHeaderModal,
}: CreateActivityModalProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selected, setSelected] = useState<DateRange | undefined>();

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const displayedDate =
    selected && selected.from && selected.to
      ? format(selected.from, "d' de 'LLL")
          .concat(" até ")
          .concat(format(selected.to, "d' de 'LLL"))
      : null;

  return (
    <div className="fixed inset-0 -top-10 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Alterar local/data</h2>

            <button onClick={closeChangeHeaderModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-zinc-400 text-sm ">
            Todos os convidados podem visualizar as informações.
          </p>
        </div>
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
          <div className="flex items-center gap-2 flex-1">
            <MapPin className="size-5 text-zinc-400" />
            <input
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              type="text"
              placeholder="Para onde você vai?"
            />
          </div>

          <button
            onClick={openDatePicker}
            className="flex items-center gap-2 text-left min-w-[150px]"
          >
            <Calendar className="size-5 text-zinc-400" />
            <span className="text-lg text-zinc-400">
              {displayedDate || "Quando?"}
            </span>
          </button>

          {isDatePickerOpen && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
              <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-lg">Selecione a data</h2>

                    <button onClick={closeDatePicker}>
                      <X className="size-5 text-zinc-400" />
                    </button>
                  </div>
                </div>

                <DayPicker
                  className="capitalize"
                  locale={ptBR}
                  mode="range"
                  selected={selected}
                  onSelect={setSelected}
                />
              </div>
            </div>
          )}
        </div>
        <Button size="full" onClick={() => {}}>
          Alterar
          <ArrowRight className="size-5" />
        </Button>
      </div>
    </div>
  );
}
