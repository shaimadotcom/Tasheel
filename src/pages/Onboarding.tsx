import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, Clock } from "lucide-react";
import mainBgLogo from "@/assets/secondary-background-blue.png";

export const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="scroll-snap-container">
      {/* Card 1: Problem & Value Proposition */}
      <section className="scroll-snap-item flex items-center justify-center bg-gradient-to-br from-background to-muted p-6 relative overflow-hidden">
        <img
          src={mainBgLogo}
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-md opacity-[0.08] animate-pulse"
          aria-hidden="true"
        />
        <div className="max-w-3xl mx-auto text-center relative z-10 animate-fade-slide-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[#1c3150]">
            وداعاً للتأخير والمخالفات غير المقصودة
          </h1>
          <p className="text-xl sm:text-2xl text-foreground/80 mb-8 leading-relaxed">
            احصل على تحليل شامل لجاهزية شحنتك قبل الوصول للمنفذ الجمركي
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-3 text-lg">
              <CheckCircle className="text-primary w-6 h-6" />
              <span>توفير الوقت</span>
            </div>
            <div className="flex items-center gap-3 text-lg">
              <CheckCircle className="text-primary w-6 h-6" />
              <span>تجنب الغرامات</span>
            </div>
            <div className="flex items-center gap-3 text-lg">
              <CheckCircle className="text-primary w-6 h-6" />
              <span>فسح سريع</span>
            </div>
          </div>
          <p className="mt-12 text-muted-foreground animate-bounce">
            ⬇ اسحب للأسفل لمعرفة المزيد
          </p>
        </div>
      </section>

      {/* Card 2: Dual Analysis Mechanism */}
      <section className="scroll-snap-item flex items-center justify-center bg-gradient-to-br from-background via-muted to-background p-6 relative overflow-hidden">
        <img
          src={mainBgLogo}
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-md opacity-[0.05] animate-pulse"
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-slide-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-[#1c3150]">
            تحقق مزدوج: المستندات والتوقيت الأمثل للعبور
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Document Analysis */}
            <div className="bg-card/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-2 border-primary/20 hover:border-primary/40 transition-all animate-border-glow">
              <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-[#1c3150]">تحليل المستندات الذكي</h3>
              <ul className="space-y-3 text-right text-foreground/80">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>فحص تلقائي للفاتورة وبوليصة الشحن وشهادة المنشأ</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>تصنيف ذكي للبضائع وتحديد التراخيص المطلوبة</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>تقييم درجة الجاهزية من 50% إلى 100%</span>
                </li>
              </ul>
            </div>

            {/* Timing Optimization */}
            <div className="bg-card/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-2 border-primary/20 hover:border-primary/40 transition-all animate-border-glow">
              <Clock className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-[#1c3150]">تحسين التوقيت والمسار</h3>
              <ul className="space-y-3 text-right text-foreground/80">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>تحليل الازدحام في المنافذ البرية بشكل فوري</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>اقتراح المنفذ والتوقيت الأمثل للعبور</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>توفير حتى ساعات من وقت الانتظار</span>
                </li>
              </ul>
            </div>
          </div>
          <p className="mt-12 text-muted-foreground animate-bounce">
            ⬇ اسحب للأسفل لمعرفة الخطوة النهائية
          </p>
        </div>
      </section>

      {/* Card 3: Final Asset & CTA */}
      <section className="scroll-snap-item flex items-center justify-center bg-gradient-to-br from-primary/5 to-background p-6 relative overflow-hidden">
        <img
          src={mainBgLogo}
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-md opacity-[0.01] animate-pulse"
          aria-hidden="true"
        />
        <div className="max-w-3xl mx-auto text-center relative z-10 animate-fade-slide-in">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-primary/10 border-4 border-primary mb-6">
              <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#1c3150]">
            تقرير جاهزية مُشفّر لفسح فوري
          </h2>
          <p className="text-xl sm:text-2xl text-foreground/80 mb-8 leading-relaxed">
            احصل على تقرير PDF شامل مع باركود QR للتحقق الفوري من قبل موظفي الجمارك
          </p>
          <div className="bg-card/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border-2 border-primary/30 mb-8">
            <h3 className="text-xl font-bold mb-4 text-[#1c3150]">ما الذي ستحصل عليه؟</h3>
            <ul className="space-y-3 text-right text-foreground/80">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>تقييم نهائي للجاهزية (المسار الأخضر/الأصفر/الأحمر)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>توصية بالمنفذ والتوقيت الأمثل لتوفير الوقت</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>تقرير PDF مُشفّر مع QR Code للتحقق الفوري</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>إرسال تلقائي للبيان الجمركي إلى منصة فسح</span>
              </li>
            </ul>
          </div>
          <Button
            size="lg"
            onClick={() => navigate("/journey")}
            className="text-xl px-8 py-6 h-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all hover:scale-105"
          >
            ابدأ الآن - جرّب المنصة
          </Button>
        </div>
      </section>
    </div>
  );
};
