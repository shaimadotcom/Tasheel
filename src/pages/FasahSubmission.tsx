import { useEffect, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import fasahLogo from "@/assets/fasah-logo.png";

export const FasahSubmission = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress
    const intervals = [
      { time: 1000, progress: 33 },
      { time: 2000, progress: 66 },
      { time: 3000, progress: 100 },
    ];

    intervals.forEach(({ time, progress }) => {
      setTimeout(() => setProgress(progress), time);
    });

    // Redirect to FASAH after 5 seconds
    const redirectTimer = setTimeout(() => {
      window.location.href = "https://www.fasah.sa/";
    }, 5000);

    return () => clearTimeout(redirectTimer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-primary/5 p-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <img src={fasahLogo} alt="فسح" className="h-16 mx-auto mb-6" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-[#1c3150]">
          جارٍ الإرسال إلى منصة فسح
        </h1>

        <div className="space-y-6 mb-8">
          <div className={`bg-card/80 backdrop-blur-sm rounded-xl p-6 border-2 transition-all ${progress >= 33 ? "border-primary" : "border-primary/20"}`}>
            <div className="flex items-center gap-4 justify-end">
              <div className="text-right flex-1">
                <p className="font-semibold text-lg">تم التحقق من المستندات</p>
              </div>
              {progress >= 33 ? (
                <CheckCircle className="w-8 h-8 text-primary flex-shrink-0" />
              ) : (
                <Loader2 className="w-8 h-8 text-primary flex-shrink-0 animate-spin" />
              )}
            </div>
          </div>

          <div className={`bg-card/80 backdrop-blur-sm rounded-xl p-6 border-2 transition-all ${progress >= 66 ? "border-primary" : "border-primary/20"}`}>
            <div className="flex items-center gap-4 justify-end">
              <div className="text-right flex-1">
                <p className="font-semibold text-lg">تم تحليل المخاطر وتوليد التقرير</p>
              </div>
              {progress >= 66 ? (
                <CheckCircle className="w-8 h-8 text-primary flex-shrink-0" />
              ) : (
                <Loader2 className="w-8 h-8 text-primary flex-shrink-0 animate-spin" />
              )}
            </div>
          </div>

          <div className={`bg-card/80 backdrop-blur-sm rounded-xl p-6 border-2 transition-all ${progress >= 100 ? "border-primary" : "border-primary/20"}`}>
            <div className="flex items-center gap-4 justify-end">
              <div className="text-right flex-1">
                <p className="font-semibold text-lg">جاري إرسال البيان الجمركي آلياً إلى فسح</p>
              </div>
              {progress >= 100 ? (
                <CheckCircle className="w-8 h-8 text-primary flex-shrink-0" />
              ) : (
                <Loader2 className="w-8 h-8 text-primary flex-shrink-0 animate-spin" />
              )}
            </div>
          </div>
        </div>

        {progress >= 100 && (
          <div className="bg-primary/10 rounded-xl p-6 border-2 border-primary animate-fade-slide-in">
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <p className="text-xl font-bold text-[#1c3150] mb-2">تم الإرسال بنجاح!</p>
            <p className="text-muted-foreground">سيتم تحويلك إلى منصة فسح خلال ثوانٍ...</p>
          </div>
        )}
      </div>
    </div>
  );
};
