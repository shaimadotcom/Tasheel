import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

export const DataInput = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shipmentType: "commercial",
    productDescription: "",
    sourceCountry: "",
    selectedPort: "",
    shipmentValue: "",
    invoiceNumber: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store form data in sessionStorage for next screens
    sessionStorage.setItem("shipmentData", JSON.stringify(formData));
    navigate("/upload");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-[var(--nav-height)] pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="bg-popover rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-[#1c3150] text-center">
              بيانات الشحنة
            </h1>
            <p className="text-center text-muted-foreground mb-8">
              أدخل البيانات الأساسية لشحنتك للبدء في التحليل
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipment Type */}
              <div>
                <Label className="text-lg font-semibold mb-3 block">نوع الشحنة *</Label>
                <RadioGroup
                  value={formData.shipmentType}
                  onValueChange={(value) => setFormData({ ...formData, shipmentType: value })}
                  className="grid grid-cols-2 gap-4"
                >
                  <Label
                    htmlFor="commercial"
                    className={`cursor-pointer flex items-center justify-center p-6 border-2 rounded-lg transition-all ${
                        formData.shipmentType === 'commercial'
                          ? 'border-primary bg-primary/10 font-semibold'
                          : 'border-border bg-muted hover:border-primary/50'
                      }`}
                  >
                    <RadioGroupItem value="commercial" id="commercial" className="sr-only" />
                    <span className="text-lg">تجارية</span>
                  </Label>
                  <Label
                    htmlFor="personal"
                    className={`cursor-pointer flex items-center justify-center p-6 border-2 rounded-lg transition-all ${
                        formData.shipmentType === 'personal'
                          ? 'border-primary bg-primary/10 font-semibold'
                          : 'border-border bg-muted hover:border-primary/50'
                      }`}
                  >
                    <RadioGroupItem value="personal" id="personal" className="sr-only" />
                    <span className="text-lg">شخصية</span>
                  </Label>
                </RadioGroup>
              </div>

              {/* Product Description */}
              <div>
                <Label htmlFor="productDescription" className="text-lg font-semibold mb-3 block">
                  طبيعة البضاعة (وصف تفصيلي) *
                </Label>
                <Textarea
                  id="productDescription"
                  value={formData.productDescription}
                  onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })}
                  placeholder="مثال: أجهزة إلكترونية - هواتف ذكية"
                  required
                  className="min-h-32 text-base bg-input"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  سيتم استخدام هذا الوصف لتصنيف البضاعة وتحديد التراخيص المطلوبة
                </p>
              </div>

              {/* Source Country */}
              <div>
                <Label htmlFor="sourceCountry" className="text-lg font-semibold mb-3 block">
                  بلد المصدر *
                </Label>
                <Input
                  id="sourceCountry"
                  value={formData.sourceCountry}
                  onChange={(e) => setFormData({ ...formData, sourceCountry: e.target.value })}
                  placeholder="مثال: الصين"
                  required
                  className="text-base bg-input"
                />
              </div>

              {/* Selected Port */}
              <div>
                <Label htmlFor="selectedPort" className="text-lg font-semibold mb-3 block">
                  المنفذ المقترح مبدئياً *
                </Label>
                <Select
                  value={formData.selectedPort}
                  onValueChange={(value) => setFormData({ ...formData, selectedPort: value })}
                  required
                >
                  <SelectTrigger id="selectedPort" className="text-base bg-input">
                    <SelectValue placeholder="اختر المنفذ البري" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="al-hadithah">الحديثة</SelectItem>
                    <SelectItem value="jadidah-arar">جديدة عرعر</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Shipment Value */}
              <div>
                <Label htmlFor="shipmentValue" className="text-lg font-semibold mb-3 block">
                  قيمة الشحنة (ريال سعودي) *
                </Label>
                <Input
                  id="shipmentValue"
                  type="number"
                  value={formData.shipmentValue}
                  onChange={(e) => setFormData({ ...formData, shipmentValue: e.target.value })}
                  placeholder="مثال: 50000"
                  required
                  min="0"
                  step="0.01"
                  className="text-base bg-input"
                />
              </div>

              {/* Invoice Number */}
              <div>
                <Label htmlFor="invoiceNumber" className="text-lg font-semibold mb-3 block">
                  رقم الفاتورة *
                </Label>
                <Input
                  id="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                  placeholder="مثال: INV-2024-001"
                  required
                  className="text-base bg-input"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full text-lg py-6 bg-primary hover:bg-primary/90"
              >
                متابعة لرفع المستندات
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
