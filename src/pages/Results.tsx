import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText, Download, Send, MapPin, Clock, AlertTriangle, QrCode } from "lucide-react";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { selectOptimalPort } from "@/lib/ports";

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
    fasahId: `FSH-${Date.now()}`,
    hsCode: "8517.12",
    shippingMethod: "",
  });
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  useEffect(() => {
    // Calculate mock results based on stored data
    const storedData = sessionStorage.getItem("shipmentData");
    if (!storedData) {
      navigate("/journey");
      return;
    }

    const data = JSON.parse(storedData);
    const value = parseFloat(data.shipmentValue);
    const weight = parseFloat(data.grossWeight || 0);
    const businessType = data.businessType;
    const shippingMethod = data.shippingMethod;

    // Mock logic for channel assignment based on multiple factors
    let score = 100;
    let channel = "green";
    let channelLabel = "المسار الأخضر";
    let deficiencies: string[] = [];

    // High risk factors
    if (value > 100000 || weight > 10000) {
      score = 50;
      channel = "red";
      channelLabel = "المسار الأحمر";
      deficiencies = ["قيمة الشحنة أو وزنها يتجاوز الحد المرتفع", "يتطلب فحص دقيق من الجمارك"];
    }
    // Medium risk factors
    else if (value > 50000 || weight > 5000 || businessType === "government" || shippingMethod === "air") {
      score = 75;
      channel = "yellow";
      channelLabel = "المسار الأصفر";
      deficiencies = ["قيمة الشحنة متوسطة المخاطر، يُنصح بمراجعة جميع التراخيص"];
    }

    // Additional considerations for business type
    if (businessType === "industrial" && shippingMethod === "sea") {
      score = Math.max(score - 10, 50); // Industrial sea shipments might have additional scrutiny
    }
    if (businessType === "government") {
      score = Math.max(score - 15, 40); // Government shipments get extra scrutiny
    }

    // Use intelligent port selection based on shipping method and business type
    const portSelection = selectOptimalPort(shippingMethod, businessType);
    const { bestPort, timeSaving, selectedPort } = portSelection;

    setAnalysisResults({
      readinessScore: score,
      channel,
      channelLabel,
      deficiencies,
      bestPort,
      selectedPort,
      timeSaving,
      qrId: `TSH-${Date.now()}`,
      fasahId: `FSH-${Date.now()}`,
      hsCode: channel === "green" ? "8517.12" : "",
      shippingMethod,
    });
  }, [navigate]);

  useEffect(() => {
    // Generate QR code for the report
    const generateQR = async () => {
      const qrData = JSON.stringify({
        tasheelId: analysisResults.qrId,
        fasahId: analysisResults.fasahId,
        readinessScore: analysisResults.readinessScore,
        channel: analysisResults.channel,
        hsCode: analysisResults.hsCode,
        timestamp: new Date().toISOString(),
      });

      try {
        const url = await QRCode.toDataURL(qrData, {
          width: 256,
          margin: 2,
          color: {
            dark: '#1c3150',
            light: '#FFFFFF'
          }
        });
        setQrCodeUrl(url);
      } catch (err) {
        console.error('Error generating QR code:', err);
      }
    };

    if (analysisResults.qrId) {
      generateQR();
    }
  }, [analysisResults]);

  const handleGeneratePDF = async () => {
    // Assumptions: analysisResults, qrCodeUrl, and shipmentData are available in scope.
    // Logic for HS Code display: 8517.12 only on GREEN channel.

    const getChannelColor = (channel) => {
        if (channel === 'green') return '#62b55b'; // Main Green
        if (channel === 'yellow') return '#ffc107'; // Status Yellow
        if (channel === 'red') return '#dc3545'; // Status Red
        return '#1c3150'; // Deep Blue default
    };

    const finalHsCode = analysisResults.channel === 'green' ? '8517.12' : 'تعذر التبنيد النهائي';
    const hsCodeLabel = analysisResults.channel === 'green' ? 'رمز التبنيد النهائي المعتمد بعد فحص المستندات.' : 'يتعذر إصدار رمز تبنيد نهائي بسبب عدم الامتثال.';

    // Get stored shipment data for the table
    const storedData = sessionStorage.getItem("shipmentData");
    const shipmentData = storedData ? JSON.parse(storedData) : {};

    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    tempDiv.style.width = '210mm';
    tempDiv.style.minHeight = '297mm';
    tempDiv.style.backgroundColor = '#ffffff'; // White background
    tempDiv.style.padding = '20mm';
    tempDiv.style.fontFamily = 'Arial, "Noto Sans Arabic", sans-serif'; // Arabic Font Stack
    tempDiv.style.direction = 'rtl';

    tempDiv.innerHTML = `
        <div style="position: relative; min-height: 100%;">
            <div style="margin-bottom: 30px; padding: 15px; position: relative;">
                <div style="text-align: center;">
                    <h1 style="color: #000; font-size: 32px; margin: 0; font-weight: bold;">تقرير جاهزية الشحنة</h1>
                    <p style="color: #000; font-size: 14px; margin: 5px 0 0 0;">منصة تسهيل - تحليل ما قبل الفسح الجمركي</p>
                    <p style="color: #666; font-size: 12px; margin: 2px 0 0 0;">بالتعاون مع هيئة الزكاة والضريبة والجمارك (ZATCA)</p>
                </div>
                <div style="position: absolute; top: 15px; right: 15px;">
                    <img src="/src/assets/main-logo.png" style="width: 100px; height: auto;" />
                </div>
            </div>

            <div style="position: relative; z-index: 1; padding: 0 10px;">

                <div style="margin-bottom: 25px;">
                    <h2 style="color: #000; font-size: 24px; margin: 0 0 15px 0; text-align: center; font-weight: bold;">${analysisResults.channelLabel}</h2>
                    <div style="text-align: center; display: inline-flex; align-items: center; justify-content: center;">
                        <span style="font-size: 16px; color: #000; font-weight: bold;">درجة الجاهزية: </span>
                        <span style="font-weight: bold; font-size: 18px; margin-right: 8px;">${analysisResults.readinessScore}%</span>
                    </div>
                </div>

                <div style="margin-bottom: 20px;">
                    <h3 style="color: #000; font-size: 16px; margin-bottom: 10px; font-weight: bold;">البيانات التعريفية والتبنيد</h3>
                    <p style="margin: 6px 0; line-height: 1.5; color: #000; font-size: 14px;"><strong>معرف التقرير (TASHEEL ID):</strong> ${analysisResults.qrId}</p>
                    <p style="margin: 6px 0; line-height: 1.5; color: #000; font-size: 14px;"><strong>تاريخ ووقت التحليل:</strong> ${new Date().toLocaleString('ar-SA')}</p>
                    <p style="margin: 6px 0; line-height: 1.5; color: #000; font-size: 14px;"><strong>الرمز الجمركي النهائي:</strong> ${finalHsCode}</p>
                    <p style="margin: 4px 0 0 0; line-height: 1.4; font-style: italic; color: #666; font-size: 12px;">(${hsCodeLabel})</p>
                </div>

                <div style="margin-bottom: 20px;">
                    <h3 style="color: #000; font-size: 16px; margin-bottom: 10px; font-weight: bold;">بيانات الشحنة المعتمد عليها</h3>
                    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #000; width: 40%; border-bottom: 1px solid #ddd;">نوع النشاط</td>
                            <td style="padding: 8px; color: #000; border-bottom: 1px solid #ddd;">${shipmentData.businessType === 'industrial' ? 'منشأة صناعية' : shipmentData.businessType === 'commercial' ? 'منشأة تجارية' : shipmentData.businessType === 'logistics' ? 'شركة لوجستية' : shipmentData.businessType === 'contracting' ? 'شركة مقاولات' : shipmentData.businessType === 'government' ? 'جهة حكومية' : 'غير محدد'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #000; border-bottom: 1px solid #ddd;">المنفذ الأساسي المختار</td>
                            <td style="padding: 8px; color: #000; border-bottom: 1px solid #ddd;">${shipmentData.selectedPort === 'al-hadithah' ? 'الحديثة' : 'جديدة عرعر'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #000; border-bottom: 1px solid #ddd;">قيمة الشحنة المقدرة</td>
                            <td style="padding: 8px; color: #000; border-bottom: 1px solid #ddd;">${shipmentData.shipmentValue || 'غير محدد'} ريال سعودي</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #000; border-bottom: 1px solid #ddd;">الوزن الإجمالي</td>
                            <td style="padding: 8px; color: #000; border-bottom: 1px solid #ddd;">${shipmentData.grossWeight || 'غير محدد'} كيلوغرام</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #000; border-bottom: 1px solid #ddd;">عدد الطرود</td>
                            <td style="padding: 8px; color: #000; border-bottom: 1px solid #ddd;">${shipmentData.numberOfPackages || 'غير محدد'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #000; border-bottom: 1px solid #ddd;">وسيلة النقل</td>
                            <td style="padding: 8px; color: #000; border-bottom: 1px solid #ddd;">${shipmentData.shippingMethod === 'land' ? 'بري' : shipmentData.shippingMethod === 'sea' ? 'بحري' : shipmentData.shippingMethod === 'air' ? 'جوي' : 'غير محدد'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold; color: #000;">وصف البضاعة</td>
                            <td style="padding: 8px; color: #000;">${shipmentData.productDescription || 'أجهزة إلكترونية'}</td>
                        </tr>
                    </table>
                </div>

                <div style="margin-bottom: 25px;">
                    <h3 style="color: #000; font-size: 16px; margin-bottom: 10px; font-weight: bold;">توصية المسار والتوقيت</h3>
                    <p style="margin: 5px 0; line-height: 1.5; color: #000; font-size: 14px;"><strong>المنفذ الأمثل:</strong> ${analysisResults.bestPort}</p>
                    <p style="margin: 5px 0; line-height: 1.5; color: #000; font-size: 14px;"><strong>توفير الوقت المتوقع:</strong> ${analysisResults.timeSaving} دقيقة</p>
                </div>

                <div style="margin-top: 5px; margin-bottom: 100px; text-align: center;">
                    <h2 style="color: #000; font-size: 18px; margin-bottom: 15px;">رمز التحقق الفوري للموظف (ZATCA Verification Code)</h2>
                    <div style="display: inline-block; text-align: center;">
                        <img src="${qrCodeUrl}" style="width: 120px; height: 120px; border: 1px solid #000; display: block; margin: 0 auto;" />
                        <p style="color: #666; font-size: 12px; margin-top: 8px; line-height: 1.3;">امسح الرمز للتحقق السريع من صحة البيانات (TASHEEL ID: ${analysisResults.qrId})</p>
                    </div>
                </div>

            </div>

            <div style="position: absolute; bottom: -35mm; left: 0; right: 0; text-align: center; font-size: 11px; color: #000;">
                <p style="margin: 4px 0;">تم التطوير بالتعاون مع هيئة الزكاة والضريبة والجمارك (ZATCA)</p>
                <p style="margin: 4px 0;">للاستخدام الداخلي والتحقق من الجاهزية المسبقة فقط. (لا يعتبر ترخيص فسح)</p>
            </div>
        </div>
    `;

    document.body.appendChild(tempDiv);

    // PDF Generation Logic remains the same (html2canvas and jsPDF)
    try {
        const canvas = await html2canvas(tempDiv, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff', // Match white background
            width: 794,
            height: 1123,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`Tasheel_Report_${analysisResults.qrId}.pdf`);
    } finally {
        document.body.removeChild(tempDiv);
    }
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
                  <h3 className="text-lg font-bold text-gray-600">ملاحظات مهمة:</h3>
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
                  بناءً على تحليل الازدحام الحالي في المنافذ {analysisResults.shippingMethod === 'land' ? 'البرية' : analysisResults.shippingMethod === 'sea' ? 'البحرية' : analysisResults.shippingMethod === 'air' ? 'الجوية' : 'البرية'}
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


            {/* Report Details */}
            <div className="text-center mb-6" dir="rtl">
              {/* Report Details */}
              <div className="space-y-1 text-sm text-right mb-4" dir="rtl">
                <div className="flex items-center gap-2 py-1 justify-center">
                  <span className="font-semibold text-[#1c3150]">معرف تسهيل:</span>
                  <p className="text-muted-foreground">{analysisResults.qrId}</p>
                </div>
                <div className="flex items-center gap-2 py-1 justify-center">
                  <span className="font-semibold text-[#1c3150]">معرف الفسح:</span>
                  <p className="text-muted-foreground">{analysisResults.fasahId}</p>
                </div>
                {analysisResults.hsCode && (
                  <div className="flex items-center gap-2 py-1 justify-center">
                    <span className="font-semibold text-[#1c3150]">الرمز الجمركي النهائي (HS Code):</span>
                    <p className="text-muted-foreground">{analysisResults.hsCode}</p>
                  </div>
                )}
                <div className="flex items-center gap-2 py-1 justify-center">
                  <span className="font-semibold text-[#1c3150]">حالة الجاهزية:</span>
                  <p className={`font-bold ${analysisResults.channel === 'green' ? 'text-status-green' : analysisResults.channel === 'yellow' ? 'text-status-yellow' : 'text-status-red'}`}>
                    {analysisResults.channelLabel} ({analysisResults.readinessScore}%)
                  </p>
                </div>
              </div>

              {/* Center - QR Code */}
              {qrCodeUrl && (
                <div className="inline-block p-2 bg-white rounded-lg shadow-md border-2 border-primary/20">
                  <img src={qrCodeUrl} alt="QR Code" className="w-24 h-24 mx-auto" />
                  <p className="text-xs text-muted-foreground mt-1 text-center">امسح الرمز للتحقق السريع</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Button
                size="lg"
                onClick={handleGeneratePDF}
                className="w-full text-lg py-6 bg-[#1c3150] hover:bg-[#1c3150]/90"
              >
                <Download className="ml-2 h-5 w-5" />
                إصدار التقرير النهائي
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
