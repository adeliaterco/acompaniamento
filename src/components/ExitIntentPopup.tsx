import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface ExitIntentPopupProps {
  onContinue: () => void;
}

const ExitIntentPopup = ({ onContinue }: ExitIntentPopupProps) => {
  const [open, setOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setOpen(true);
        setHasShown(true);
      }
    };

    const handlePopState = (e: PopStateEvent) => {
      if (!hasShown) {
        e.preventDefault();
        window.history.pushState(null, "", window.location.href);
        setOpen(true);
        setHasShown(true);
      }
    };

    // Push state so we can intercept back button
    window.history.pushState(null, "", window.location.href);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [hasShown]);

  const handleContinue = () => {
    setOpen(false);
    onContinue();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-card border-gold text-foreground max-w-md mx-auto">
        <DialogHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="font-display text-2xl text-gold-gradient">
            ¡ESPERA! NO TE VAYAS AÚN
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-base leading-relaxed space-y-3">
            <p>
              El <strong className="text-foreground">93% de los hombres</strong> que saltan este paso
              cometen errores que les cuestan <strong className="text-foreground">semanas de progreso</strong>.
            </p>
            <p>
              Estas 3 preguntas rápidas son <strong className="text-foreground">la clave</strong> para
              personalizar tu plan y <strong className="text-foreground">multiplicar tus resultados</strong>.
            </p>
            <p className="text-primary font-semibold">Solo toma 60 segundos.</p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={handleContinue}
            className="w-full bg-gold-gradient text-primary-foreground font-bold text-lg px-8 py-4 rounded-full hover:opacity-90 transition-opacity animate-pulse-gold"
          >
            SÍ, QUIERO RESPONDER
          </button>
          <button
            onClick={() => setOpen(false)}
            className="text-muted-foreground text-sm hover:text-foreground transition-colors"
          >
            No, quiero salir
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
