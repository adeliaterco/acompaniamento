import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizQuestion from "@/components/QuizQuestion";
import CountdownTimer from "@/components/CountdownTimer";
import ProgressBar from "@/components/ProgressBar";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { CheckCircle, Shield, Clock, MessageCircle, Headphones, AlertTriangle } from "lucide-react";

type Phase = "congrats" | "quiz" | "results";

const questions = [
  {
    question: "Ella te responde después de 3 días de silencio. ¿Cuál es tu PRIMER IMPULSO?",
    options: [
      { label: "A", text: "Responder inmediatamente (en menos de 1 minuto)", isCorrect: false },
      { label: "B", text: "Esperar 2-3 horas y responder casual", isCorrect: false },
      { label: "C", text: "Dejar pasar 24 horas y responder como si nada", isCorrect: true },
    ],
  },
  {
    question: 'Ella escribe: "Vi una película que te hubiera gustado" ¿Qué significa realmente?',
    options: [
      { label: "A", text: "Que está pensando en ti constantemente", isCorrect: false },
      { label: "B", text: "Que está generando conexión y probando tu reacción", isCorrect: true },
      { label: "C", text: "Que es solo un mensaje casual", isCorrect: false },
    ],
  },
  {
    question: 'En el primer encuentro, ella dice: "No sé si esto sea buena idea" ¿Cuál es tu respuesta CORRECTA?',
    options: [
      { label: "A", text: '"Entiendo, pero yo sí creo que es buena idea. Dame una oportunidad"', isCorrect: false },
      { label: "B", text: '"Está bien, sin presión. Pero me gustaría saber qué te asusta"', isCorrect: true },
      { label: "C", text: '"Entonces no hay nada que hacer. Adiós"', isCorrect: false },
    ],
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("congrats");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizProgress, setQuizProgress] = useState(0);

  const handleStartQuiz = () => setPhase("quiz");

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setCorrectAnswers((prev) => prev + 1);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setQuizProgress(((currentQuestion + 1) / questions.length) * 100);
      } else {
        setQuizProgress(100);
        setTimeout(() => setPhase("results"), 500);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Exit intent popup - only on this page */}
      <ExitIntentPopup onContinue={handleStartQuiz} />
      {/* Top gold line */}
      <div className="h-1 bg-gold-gradient w-full" />

      {phase === "congrats" && (
        <section className="max-w-2xl mx-auto px-6 py-16 text-center animate-fade-in-up">
          <div className="mb-6">
            <span className="text-5xl">🎉</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-gold-gradient mb-4">
            ¡FELICIDADES! TU PLAN ESTÁ CONFIRMADO
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Acceso enviado a tu email en menos de 2 minutos.
          </p>
          <p className="text-foreground text-xl font-display italic mb-12">
            Ahora viene la parte que NADIE te cuenta...
          </p>

          <div className="border border-gold rounded-xl p-8 bg-card shadow-gold">
            <div className="flex items-center justify-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-primary" />
              <span className="text-sm tracking-[0.3em] uppercase text-primary font-semibold">
                Antes de continuar, responde esto
              </span>
            </div>
            <h2 className="font-display text-2xl text-foreground mb-3">
              3 preguntas rápidas para personalizar tu acompañamiento
            </h2>
            <p className="text-muted-foreground mb-8">(Toma 60 segundos)</p>
            <button
              onClick={handleStartQuiz}
              className="bg-gold-gradient text-primary-foreground font-bold text-lg px-10 py-4 rounded-full hover:opacity-90 transition-opacity animate-pulse-gold"
            >
              CONTINUAR
            </button>
          </div>
        </section>
      )}

      {phase === "quiz" && (
        <section className="max-w-2xl mx-auto px-6 py-16">
          <ProgressBar percentage={quizProgress} label="Progreso" />
          <div className="mt-12">
            <QuizQuestion
              key={currentQuestion}
              questionNumber={currentQuestion + 1}
              totalQuestions={questions.length}
              question={questions[currentQuestion].question}
              options={questions[currentQuestion].options}
              onAnswer={handleAnswer}
            />
          </div>
        </section>
      )}

      {phase === "results" && (
        <section className="max-w-2xl mx-auto px-6 py-12 space-y-16 animate-fade-in-up">
          {/* Results */}
          <div className="text-center">
            <p className="text-sm tracking-[0.3em] uppercase text-gold-muted mb-4">📊 Tus Resultados</p>
            <h2 className="font-display text-3xl text-foreground mb-4">
              Respuestas correctas: <span className="text-primary">{correctAnswers} de 3</span>
            </h2>
            <ProgressBar percentage={34} label="Tasa de éxito actual" />
          </div>

          {/* Problem */}
          <div className="border border-destructive/30 rounded-xl p-8 bg-destructive/5">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-destructive text-xl">🚨</span>
              <h3 className="font-display text-2xl text-foreground">AQUÍ ESTÁ EL PROBLEMA</h3>
            </div>
            <p className="text-center text-muted-foreground text-lg leading-relaxed">
              Estás cometiendo los <strong className="text-foreground">ERRORES FATALES</strong> que arruinan el 73% de las reconquistas.
            </p>
            <p className="text-center text-muted-foreground mt-4">
              Respondiste correctamente SOLO <span className="text-primary font-bold">{correctAnswers} pregunta</span>.
              Eso significa que en los próximos 7 días vas a cometer errores que te costarán semanas de progreso.
            </p>
          </div>

          {/* Truth */}
          <div className="text-center">
            <p className="text-sm tracking-[0.3em] uppercase text-gold-muted mb-6">💡 La Verdad</p>
            <p className="text-muted-foreground text-lg mb-8">
              El 73% de los hombres que compran el Plan cometen estos 3 errores en los primeros 7 días:
            </p>
            <div className="space-y-4 text-left max-w-md mx-auto">
              {[
                "Responden demasiado rápido (pierden misterio)",
                "Malinterpretan sus señales (actúan desesperados)",
                "No saben qué hacer en momentos críticos (improvisan y fracasan)",
              ].map((error, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-gold">
                  <span className="text-primary font-bold">{i + 1}️⃣</span>
                  <p className="text-foreground">{error}</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground mt-6 italic">
              Cada error = 2-3 semanas perdidas.
            </p>
          </div>

          {/* Solution */}
          <div className="text-center border border-gold rounded-xl p-8 bg-card shadow-gold">
            <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">🎯 La Solución</p>
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
              7 DÍAS DE ACOMPAÑAMIENTO CON LA ESPECIALISTA
            </h2>
            <p className="text-muted-foreground text-lg">
              No es más contenido. No es un curso.<br />
              Es alguien a tu lado diciendo <strong className="text-foreground">EXACTAMENTE</strong> qué hacer en cada momento.
            </p>
          </div>

          {/* What you receive */}
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-gold-muted text-center mb-8">✅ Lo que recibes</p>
            <div className="space-y-4">
              {[
                {
                  icon: <CheckCircle className="w-5 h-5 text-primary mt-0.5" />,
                  title: "Día 1: Análisis de tu caso",
                  desc: "Descubrimos EXACTAMENTE cuál es tu error crítico AHORA",
                },
                {
                  icon: <Clock className="w-5 h-5 text-primary mt-0.5" />,
                  title: "Días 2-7: Checklist diario + validación en tiempo real",
                  desc: "Tú haces → mandas print → recibes feedback en hasta 2h",
                },
                {
                  icon: <MessageCircle className="w-5 h-5 text-primary mt-0.5" />,
                  title: "Soporte WhatsApp prioritario",
                  desc: "¿Duda? Mandas mensaje, recibes respuesta rápida",
                },
                {
                  icon: <Headphones className="w-5 h-5 text-primary mt-0.5" />,
                  title: "Bônus: Áudio con los 3 errores que arruinan el 73%",
                  desc: "Vas a reconocerte en cada uno",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-5 bg-card rounded-lg border border-gold">
                  {item.icon}
                  <div>
                    <p className="text-foreground font-semibold">{item.title}</p>
                    <p className="text-muted-foreground text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-foreground font-display text-xl italic mt-8">
              Resultado: Tú no improvises. Tú ejecutas con seguridad.
            </p>
          </div>

          {/* Pricing */}
          <div className="border border-gold rounded-xl p-8 bg-card shadow-gold text-center">
            <p className="text-sm tracking-[0.3em] uppercase text-gold-muted mb-4">💰 Inversión</p>
            <p className="text-muted-foreground line-through text-lg">Valor normal: $97</p>
            <p className="text-muted-foreground mt-2">
              Solo por los próximos <CountdownTimer />:
            </p>
            <p className="font-display text-5xl md:text-6xl text-gold-gradient mt-4 mb-2">$17</p>
            <p className="text-muted-foreground text-sm">Pago único • Acceso inmediato</p>

            <!-- HOTMART - Sales Funnel Widget -->

            <!--- sales funnel container --->

            <div id="hotmart-sales-funnel"></div>

            <!--- script load and setup --->

            <script src="https://checkout.hotmart.com/lib/hotmart-checkout-elements.js"></script>

            <script>

            checkoutElements.init('salesFunnel').mount('#hotmart-sales-funnel')

            </script>

            <!-- HOTMART - Sales Funnel Widget -->
          </div>

          {/* Urgency */}
          <div className="text-center bg-card rounded-xl p-8 border border-gold">
            <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">⏱️ Tu ventana de 72 horas ya empezó</p>
            <div className="space-y-3 text-muted-foreground">
              <p>Cada minuto que pasa = más difícil</p>
              <p>Un error en el Día 7 = 3 semanas perdidas</p>
              <p className="text-foreground font-semibold">Con la especialista: CERO margen de error</p>
            </div>
          </div>

          {/* Guarantee */}
          <div className="border border-gold rounded-xl p-8 bg-card text-center">
            <Shield className="w-10 h-10 text-primary mx-auto mb-4" />
            <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">
              🛡️ Garantía "Ella responde o reembolso"
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Si usas el acompañamiento y NO ves mejora en 30 días:<br />
              <strong className="text-foreground">Devolvemos 100% de tu dinero + $10 por tu tiempo</strong><br />
              Sin preguntas. En 24-48 horas.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center pb-8">
            <a
              href="https://pay.hotmart.com/D100233207O?off=r4cz8pgu"
              className="inline-block w-full max-w-md bg-gold-gradient text-primary-foreground font-bold text-lg px-10 py-5 rounded-full hover:opacity-90 transition-opacity animate-pulse-gold mb-4"
            >
              SÍ, QUIERO ACOMPAÑAMIENTO POR $17
            </a>
            <p className="text-muted-foreground text-sm mb-6">
              Expira en: <CountdownTimer /> • Acceso inmediato + Garantía total
            </p>
            <button
              onClick={() => navigate("/downsell")}
              className="text-muted-foreground text-sm underline hover:text-foreground transition-colors"
            >
              ❌ No, prefiero hacerlo solo
            </button>
            <p className="text-muted-foreground text-xs mt-2">(Precio vuelve a $97)</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;