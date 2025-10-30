import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const DocumentUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [files, setFiles] = useState({
    invoice: null as File | null,
    bol: null as File | null,
    coo: null as File | null,
  });
  const [mockRequirements, setMockRequirements] = useState({
    hsCode: "",
    approvals: [] as string[],
  });

  useEffect(() => {
    // Mock AI Classification based on product description
    const storedData = sessionStorage.getItem("shipmentData");
    if (!storedData) {
      navigate("/journey");
      return;
    }

    const data = JSON.parse(storedData);
    const description = data.productDescription.toLowerCase();
    const businessType = data.businessType;
    const shippingMethod = data.shippingMethod;

    // Enhanced mock classification based on business type and shipping method
    let baseRequirements = {
      hsCode: "9999.99",
      approvals: ["SASO - الهيئة السعودية للمواصفات"],
    };

    // Product-based requirements
    if (description.includes("إلكتروني") || description.includes("هاتف") || description.includes("جهاز")) {
      baseRequirements = {
        hsCode: "8517.12",
        approvals: ["CITC - هيئة الاتصالات", "SASO - الهيئة السعودية للمواصفات"],
      };
    } else if (description.includes("غذائ") || description.includes("طعام")) {
      baseRequirements = {
        hsCode: "2106.90",
        approvals: ["SFDA - هيئة الغذاء والدواء", "SASO - الهيئة السعودية للمواصفات"],
      };
    }

    // Business type specific requirements
    if (businessType === "industrial") {
      baseRequirements.approvals.push("MODON - وزارة الصناعة والثروة المعدنية");
    } else if (businessType === "government") {
      baseRequirements.approvals.push("وزارة المالية - إدارة المشتريات الحكومية");
    } else if (businessType === "logistics") {
      baseRequirements.approvals.push("وزارة النقل - هيئة النقل");
    }

    // Shipping method specific requirements
    if (shippingMethod === "sea") {
      baseRequirements.approvals.push("هيئة الموانئ البحرية");
    } else if (shippingMethod === "air") {
      baseRequirements.approvals.push("الهيئة العامة للطيران المدني");
    }

    setMockRequirements(baseRequirements);
  }, [navigate]);

  const handleFileChange = (fileType: keyof typeof files, file: File | null) => {
    setFiles((prev) => ({ ...prev, [fileType]: file }));
  };

  const handleSubmit = () => {
    if (!files.invoice || !files.bol || !files.coo) {
      toast({
        title: "ملفات مفقودة",
        description: "يرجى رفع جميع المستندات المطلوبة",
        variant: "destructive",
      });
      return;
    }

    // Store files info in sessionStorage
    sessionStorage.setItem(
      "uploadedFiles",
      JSON.stringify({
        invoice: files.invoice.name,
        bol: files.bol.name,
        coo: files.coo.name,
      })
    );
    sessionStorage.setItem("mockRequirements", JSON.stringify(mockRequirements));

    navigate("/processing");
  };

  const FileUploadZone = ({
    label,
    fileType,
    file,
  }: {
    label: string;
    fileType: keyof typeof files;
    file: File | null;
  }) => (
    <div className="border-2 border-dashed border-primary/30 rounded-xl p-6 hover:border-primary/60 transition-colors">
      <div className="text-center">
        <input
          type="file"
          id={fileType}
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleFileChange(fileType, e.target.files?.[0] || null)}
          className="hidden"
        />
        <label htmlFor={fileType} className="cursor-pointer block">
          {file ? (
            <div className="flex items-center justify-center gap-3 text-primary">
              <CheckCircle className="w-8 h-8" />
              <div className="text-right">
                <p className="font-semibold">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          ) : (
            <div>
              <Upload className="w-12 h-12 mx-auto mb-3 text-primary" />
              <p className="font-semibold text-lg mb-2">{label}</p>
              <p className="text-sm text-muted-foreground">اضغط لاختيار الملف أو اسحبه هنا</p>
              <p className="text-xs text-muted-foreground mt-2">PDF, JPG, PNG (حتى 10 MB)</p>
            </div>
          )}
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-[var(--nav-height)] pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Mock AI Requirements Section */}
          <div className="bg-primary/5 rounded-2xl p-6 sm:p-8 mb-8 border-2 border-primary/20">
            <div className="flex items-start gap-4 mb-4">
              <FileText className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#1c3150] mb-2">
                  تم استنتاج المتطلبات التالية لسلعتك
                </h2>
                <p className="text-muted-foreground">
                  بناءً على الوصف المدخل، تم تصنيف البضاعة وتحديد التراخيص المطلوبة
                </p>
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">رمز النظام المنسق (HS Code)</p>
                <p className="text-2xl font-bold text-[#1c3150]">{mockRequirements.hsCode}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">التراخيص والموافقات المطلوبة:</p>
                <ul className="space-y-2">
                  {mockRequirements.approvals.map((approval, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="font-medium">{approval}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="bg-card rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12 border-2 border-primary/10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-[#1c3150] text-center">
              رفع المستندات المطلوبة
            </h1>
            <p className="text-center text-muted-foreground mb-8">
              يرجى رفع المستندات الثلاثة الإلزامية للشحنة
            </p>

            <div className="space-y-6 mb-8">
              <FileUploadZone label="الفاتورة التجارية (Invoice)" fileType="invoice" file={files.invoice} />
              <FileUploadZone label="بوليصة الشحن (Bill of Lading)" fileType="bol" file={files.bol} />
              <FileUploadZone label="شهادة المنشأ (Certificate of Origin)" fileType="coo" file={files.coo} />
            </div>

            <Button
              onClick={handleSubmit}
              size="lg"
              disabled={!files.invoice || !files.bol || !files.coo}
              className="w-full text-lg py-6 bg-primary hover:bg-primary/90 disabled:opacity-50"
            >
              تحليل وبدء الفحص
              <ArrowLeft className="mr-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
