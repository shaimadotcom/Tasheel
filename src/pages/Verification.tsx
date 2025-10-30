import { useParams } from "react-router-dom";
import { Shield, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import zatcaLogo from "@/assets/zatca-logo.png";

export const Verification = () => {
  const { qrId } = useParams();

  // Mock verification data
  const verificationData = {
    qrId: qrId || "TSH-UNKNOWN",
    timestamp: new Date().toLocaleString("ar-SA"),
    readinessScore: 75,
    channel: "yellow",
    channelLabel: "المسار الأصفر",
    fasahId: `FSH-${Date.now()}`,
    valid: true,
  };

  const getChannelConfig = () => {
    switch (verificationData.channel) {
      case "green":
        return {
          icon: CheckCircle,
          color: "text-status-green",
          bgColor: "bg-status-green/10",
          borderColor: "border-status-green",
        };
      case "yellow":
        return {
          icon: AlertTriangle,
          color: "text-status-yellow",
          bgColor: "bg-status-yellow/10",
          borderColor: "border-status-yellow",
        };
      case "red":
        return {
          icon: XCircle,
          color: "text-status-red",
          bgColor: "bg-status-red/10",
          borderColor: "border-status-red",
        };
      default:
        return {
          icon: Shield,
          color: "text-primary",
          bgColor: "bg-primary/10",
          borderColor: "border-primary",
        };
    }
  };

  const config = getChannelConfig();
  const Icon = config.icon;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary to-secondary/80 p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 sm:p-12">
        {/* ZATCA Logo */}
        <div className="flex justify-center mb-8">
          <img src={zatcaLogo} alt="ZATCA" className="h-16" />
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-secondary mb-2">
            صفحة التحقق - موظف الجمارك
          </h1>
          <p className="text-muted-foreground">معلومات الشحنة من منصة تسهيل</p>
        </div>

        {/* Main Status Card */}
        <div className={`${config.bgColor} ${config.borderColor} border-4 rounded-2xl p-8 mb-8`}>
          <div className="flex flex-col items-center text-center">
            <Icon className={`w-24 h-24 ${config.color} mb-4`} />
            <p className={`text-4xl font-bold ${config.color} mb-2`}>{verificationData.channelLabel}</p>
            <p className="text-5xl font-bold text-secondary mb-4">{verificationData.readinessScore}%</p>
            <p className="text-lg text-muted-foreground">درجة الجاهزية المحسوبة</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-muted/30 rounded-xl p-4 border">
            <p className="text-sm text-muted-foreground mb-1">معرف تسهيل</p>
            <p className="text-lg font-bold text-secondary break-all">{verificationData.qrId}</p>
          </div>
          <div className="bg-muted/30 rounded-xl p-4 border">
            <p className="text-sm text-muted-foreground mb-1">معرف فسح (تقديري)</p>
            <p className="text-lg font-bold text-secondary break-all">{verificationData.fasahId}</p>
          </div>
          <div className="bg-muted/30 rounded-xl p-4 border sm:col-span-2">
            <p className="text-sm text-muted-foreground mb-1">وقت الإصدار</p>
            <p className="text-lg font-bold text-secondary">{verificationData.timestamp}</p>
          </div>
        </div>

        {/* Validity Badge */}
        {verificationData.valid && (
          <div className="bg-primary/10 border-2 border-primary rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-6 h-6 text-primary" />
              <p className="text-lg font-bold text-primary">التقرير صالح ومُصدر من تسهيل</p>
            </div>
          </div>
        )}

        {/* Footer Note */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          هذا النظام للاستخدام الرسمي من قبل موظفي هيئة الزكاة والضريبة والجمارك فقط
        </p>
      </div>
    </div>
  );
};
