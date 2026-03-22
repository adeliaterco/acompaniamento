import { useState, useEffect } from "react";
import { Shield, Clock, MessageCircle, CheckCircle, AlertTriangle } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";

const Downsell = () => {
  useEffect(() => {
    // Scroll para o topo quando a página abre
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.hotmart.com/lib/hotmart-checkout-elements.js";
    script.async = true;
    script.onload = () => {
      if (window.checkoutElements) {
        window.checkoutElements.init('salesFunnel').mount('#hotmart-sales-funnel-downsell');
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-background font-body">
      <div className="h-1 bg-gold-gradient w-full" />

      <section className="max-w-2xl mx-auto px-6 py-12 space-y-14 animate-fade-in-up">
        {/* Headline - Emotional Hook */}
        <div className="text-center">
          <span className="text-5xl mb-4 block">⏳</span>
          <h1 className="font-display text-3xl md:text-4xl text-gold-gradient mb-4">
            ESPERA... ¿VAS A HACERLO SOLO?
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            Entiendo. $17 puede parecer mucho ahora.
          </p>
          <p className="text-foreground text-xl font-display italic">
            Pero antes de irte, lee esto...
          </p>
        </div>

        {/* The Risk */}
        <div className="border border-destructive/30 rounded-xl p-8 bg-destructive/5">
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <h2 className="font-display text-2xl text-foreground">LO QUE PASA CUANDO LO HACES SOLO</h2>
          </div>
          <div className="space-y-3 text-muted-foreground text-center">
            <p>❌ Respondes un mensaje equivocado → <strong className="text-foreground">ella se aleja 3 semanas</strong></p>
            <p>❌ Malinterpretas una señal → <strong className="text-foreground">actúas desesperado</strong></p>
            <p>❌ Improvisas en el momento crítico → <strong className="text-foreground">pierdes tu oportunidad</strong></p>
          </div>
          <p className="text-center text-foreground font-semibold mt-6">
            El 73% de los hombres fallan en los primeros 7 días sin guía.
          </p>
        </div>

        {/* Special Offer */}
        <div className="border border-gold rounded-xl p-8 bg-card shadow-gold text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">🎁 OFERTA ESPECIAL — SOLO PARA TI</p>
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
            ÚLTIMO DESCUENTO DISPONIBLE
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            Accede al acompañamiento completo de 7 días por:
          </p>
          <p className="text-muted-foreground line-through text-lg">$97 → $17</p>
          <p className="font-display text-6xl md:text-7xl text-gold-gradient mt-2 mb-2">$14</p>
          <p className="text-muted-foreground text-sm mb-6">Pago único • Acceso inmediato</p>
          <p className="text-primary font-semibold text-sm">
            ⚡ Este precio desaparece cuando cierres esta página
          </p>
        </div>

        {/* What's Included (compact) */}
        <div>
          <p className="text-sm tracking-[0.3em] uppercase text-gold-muted text-center mb-6">✅ TODO ESTO POR $14</p>
          <div className="space-y-3">
            {[
              { icon: <CheckCircle className="w-5 h-5 text-primary mt-0.5" />, text: "Análisis personalizado de tu caso (Día 1)" },
              { icon: <Clock className="w-5 h-5 text-primary mt-0.5" />, text: "Checklist diario + feedback en hasta 2h (Días 2-7)" },
              { icon: <MessageCircle className="w-5 h-5 text-primary mt-0.5" />, text: "Soporte WhatsApp prioritario" },
              { icon: <Shield className="w-5 h-5 text-primary mt-0.5" />, text: "Garantía de 30 días o reembolso + $10" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-card rounded-lg border border-gold">
                {item.icon}
                <p className="text-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Widget Hotmart */}
        <div className="border border-gold rounded-xl p-8 bg-card shadow-gold">
          <div id="hotmart-sales-funnel-downsell" className="mt-6"></div>
        </div>

        {/* Urgency */}
        <div className="text-center bg-card rounded-xl p-8 border border-gold">
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">⏱️ ESTA OFERTA EXPIRA EN</p>
          <p className="font-display text-4xl text-gold-gradient mb-4">
            <CountdownTimer />
          </p>
          <p className="text-muted-foreground">
            Después de esto, el precio vuelve a <strong className="text-foreground">$97</strong>
          </p>
        </div>

        {/* CTA */}
        <div className="text-center pb-8">
          <a
            href="https://pay.hotmart.com/D100233207O?off=k2hleg2c"
            className="inline-block w-full max-w-md bg-gold-gradient text-primary-foreground font-bold text-lg px-10 py-5 rounded-full hover:opacity-90 transition-opacity animate-pulse-gold mb-4"
          >
            SÍ, QUIERO ACOMPAÑAMIENTO POR $14
          </a>
          <p className="text-muted-foreground text-sm mb-8">
            Expira en: <CountdownTimer /> • Acceso inmediato + Garantía total
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="text-muted-foreground text-sm underline hover:text-foreground transition-colors"
          >
            ❌ No, definitivamente prefiero hacerlo solo
          </button>
        </div>
      </section>
    </div>
  );
};

export default Downsell;