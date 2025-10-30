import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, CheckCircle } from "lucide-react";

export const Processing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate processing time
    const timer = setTimeout(() => {
      navigate("/results");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-primary/5 p-6 relative overflow-hidden">
      <img
        src="/src/assets/secondary-background-blue.png"
        alt=""
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-md opacity-[0.08]"
        aria-hidden="true"
      />
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div className="mb-8">
          <Loader2 className="w-24 h-24 text-primary mx-auto animate-spin-slow" />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-[#1c3150]">
          جارٍ تحليل شحنتك
        </h1>

        <div className="space-y-6">
          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border-2 border-primary/20 animate-fade-slide-in">
            <div className="flex items-center gap-4 justify-end">
              <div className="text-right flex-1">
                <p className="font-semibold text-lg">جارٍ تحليل المستندات</p>
                <p className="text-sm text-muted-foreground">فحص الفاتورة والبوليصة وشهادة المنشأ</p>
              </div>
              <CheckCircle className="w-8 h-8 text-primary flex-shrink-0" />
            </div>
          </div>

          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border-2 border-primary/20 animate-fade-slide-in" style={{ animationDelay: "0.5s" }}>
            <div className="flex items-center gap-4 justify-end">
              <div className="text-right flex-1">
                <p className="font-semibold text-lg">جارٍ تقييم المخاطر</p>
                <p className="text-sm text-muted-foreground">تحليل القيمة والتصنيف وتحديد المسار الجمركي</p>
              </div>
              <Loader2 className="w-8 h-8 text-primary flex-shrink-0 animate-spin" />
            </div>
          </div>

          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border-2 border-primary/20 animate-fade-slide-in" style={{ animationDelay: "1s" }}>
            <div className="flex items-center gap-4 justify-end">
              <div className="text-right flex-1">
                <p className="font-semibold text-lg">جارٍ تحليل الازدحام</p>
                <p className="text-sm text-muted-foreground">مقارنة المنافذ واقتراح التوقيت الأمثل</p>
              </div>
              <Loader2 className="w-8 h-8 text-primary flex-shrink-0 animate-spin" />
            </div>
          </div>
        </div>

        <p className="mt-8 text-muted-foreground">
          يستغرق التحليل عادة من 3 إلى 5 ثوانٍ...
        </p>
      </div>
    </div>
  );
};
