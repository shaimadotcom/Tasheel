import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText, Download, Send, MapPin, Clock, AlertTriangle } from "lucide-react";

export const Results = () => {
  const navigate = useNavigate();
  const [analysisResults, setAnalysisResults] = useState({
    readinessScore: 75,
    channel: "yellow",
    channelLabel: "المسار الأصفر",
    deficiencies: [] as string[],
    bestPort: "الحديثة",
    selectedPort: "جديدة عرعر",
    timeSaving: 35,
    qrId: `TSH-${Date.now()}`,
  });

  useEffect(() => {
    // Calculate mock results based on stored data
    const storedData = sessionStorage.getItem("shipmentData");
    if (!storedData) {
      navigate("/journey");
      return;
    }

    const data = JSON.parse(storedData);
    const value = parseFloat(data.shipmentValue);

    // Mock logic for channel assignment
    let score = 100;
    let channel = "green";
    let channelLabel = "المسار الأخضر";
    let deficiencies: string[] = [];

    if (value > 100000) {
      score = 50;
      channel = "red";
      channelLabel = "المسار الأحمر";
      deficiencies = ["قيمة الشحنة تتجاوز الحد المرتفع (أكثر من 100,000 ريال)", "يتطلب فحص دقيق من الجمارك"];
    } else if (value > 50000) {
      score = 75;
      channel = "yellow";
      channelLabel = "المسار الأصفر";
      deficiencies = ["قيمة الشحنة متوسطة المخاطر", "يُنصح بمراجعة جميع التراخيص"];
    }

    // Mock port recommendation (always recommend Al-Hadithah with 35 min saving)
    setAnalysisResults({
      readinessScore: score,
      channel,
      channelLabel,
      deficiencies,
      bestPort: "الحديثة",
      selectedPort: data.selectedPort === "al-hadithah" ? "الحديثة" : "جديدة عرعر",
      timeSaving: 35,
      qrId: `TSH-${Date.now()}`,
    });
  }, [navigate]);

  const handleGeneratePDF = () => {
    // Mock PDF generation
    const blob = new Blob(
      [
        `تقرير جاهزية الشحنة - تسهيل\n\nمعرف التقرير: ${analysisResults.qrId}\nدرجة الجاهزية: ${analysisResults.readinessScore}%\nالمسار المتوقع: ${analysisResults.channelLabel}\n\nهذا تقرير تجريبي من منصة تسهيل.`,
      ],
      { type: "text/plain" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Tasheel_Report_${analysisResults.qrId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmitToFASAH = () => {
    navigate("/fasah-submission");
  };

  const getChannelColor = () => {
    switch (analysisResults.channel) {
      case "green":
        return "bg-status-green/20 border-status-green text-status-green";
      case "yellow":
        return "bg-status-yellow/20 border-status-yellow text-status-yellow";
      case "red":
        return "bg-status-red/20 border-status-red text-status-red";
      default:
        return "";
    }
  };

  const CircularProgress = ({ score }: { score: number }) => {
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width="200" height="200" className="transform -rotate-90">
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            className="text-muted"
          />
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={`transition-all duration-1000 ${
              score === 100 ? "text-status-green" : score === 75 ? "text-status-yellow" : "text-status-red"
            }`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-[#1c3150]">{score}%</span>
          <span className="text-sm text-muted-foreground">درجة الجاهزية</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-[var(--nav-height)] pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-[#1c3150] text-center">
            نتائج التحليل والتوصيات
          </h1>

          {/* Readiness Assessment */}
          <div className="bg-card rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border-2 border-primary/10">
            <h2 className="text-2xl font-bold mb-6 text-[#1c3150] text-center">
              تقييم الجاهزية الجمركية
            </h2>
            <div className="flex flex-col items-center mb-8">
              <CircularProgress score={analysisResults.readinessScore} />
            </div>
            <div className={`rounded-xl p-6 border-2 text-center mb-6 ${getChannelColor()}`}>
              <p className="text-3xl font-bold mb-2">{analysisResults.channelLabel}</p>
              <p className="text-base opacity-80">المسار المتوقع للفسح الجمركي</p>
            </div>
            {analysisResults.deficiencies.length > 0 && (
              <div className="bg-muted/50 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-status-yellow flex-shrink-0 mt-1" />
                  <h3 className="text-lg font-bold text-secondary">ملاحظات مهمة:</h3>
                </div>
                <ul className="space-y-2">
                  {analysisResults.deficiencies.map((item, index) => (
                    <li key={index} className="text-foreground/80 flex items-start gap-2">
                      <span className="text-status-yellow">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Operational Recommendation */}
          <div className="bg-card rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border-2 border-primary/10">
            <h2 className="text-2xl font-bold mb-6 text-[#1c3150]">
              توصية المسار والتوقيت
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-primary/5 rounded-xl p-6 border-2 border-primary/20">
                <MapPin className="w-10 h-10 text-primary mb-3" />
                <p className="text-sm text-muted-foreground mb-1">المنفذ الأمثل</p>
                <p className="text-2xl font-bold text-[#1c3150] mb-2">{analysisResults.bestPort}</p>
                <p className="text-sm text-foreground/70">
                  بناءً على تحليل الازدحام الحالي في المنافذ البرية
                </p>
              </div>
              <div className="bg-primary/5 rounded-xl p-6 border-2 border-primary/20">
                <Clock className="w-10 h-10 text-primary mb-3" />
                <p className="text-sm text-muted-foreground mb-1">توفير الوقت المتوقع</p>
                <p className="text-2xl font-bold text-primary mb-2">{analysisResults.timeSaving} دقيقة</p>
                <p className="text-sm text-foreground/70">
                  مقارنة بالمنفذ المختار: {analysisResults.selectedPort}
                </p>
              </div>
            </div>
            {analysisResults.timeSaving >= 25 && (
              <div className="mt-6 bg-primary/10 rounded-xl p-4 border-2 border-primary">
                <p className="text-center font-semibold text-[#1c3150]">
                  💡 يُنصح بالتوجه إلى منفذ {analysisResults.bestPort} لتوفير الوقت والجهد
                </p>
              </div>
            )}
          </div>

          {/* Report Generation */}
          <div className="bg-card rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-primary/10">
            <h2 className="text-2xl font-bold mb-6 text-[#1c3150] text-center">
              إصدار التقرير والإرسال
            </h2>
            <div className="space-y-4">
              <Button
                size="lg"
                onClick={handleGeneratePDF}
                className="w-full text-lg py-6 bg-[#1c3150] hover:bg-[#1c3150]/90"
              >
                <Download className="ml-2 h-5 w-5" />
                إصدار التقرير النهائي والباركود
              </Button>
              <Button
                size="lg"
                onClick={handleSubmitToFASAH}
                className="w-full text-lg py-6 bg-primary hover:bg-primary/90"
              >
                <Send className="ml-2 h-5 w-5" />
                الإرسال التلقائي لفسح
              </Button>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              معرف التقرير: {analysisResults.qrId}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
