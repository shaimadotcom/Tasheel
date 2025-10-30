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
    productType: "",
    productDescription: "",
    sourceCountry: "",
    destination: "",
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
                <Label className="text-lg font-semibold mb-3 block">نوع الشحنة: تجارية</Label>
              </div>

              {/* Product Type */}
              <div>
                <Label htmlFor="productType" className="text-lg font-semibold mb-3 block">
                  طبيعة البضاعة *
                </Label>
                <Select
                  value={formData.productType}
                  onValueChange={(value) => setFormData({ ...formData, productType: value })}
                  required
                >
                  <SelectTrigger id="productType" className="text-base bg-input">
                    <SelectValue placeholder="اختر طبيعة البضاعة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">إلكترونيات</SelectItem>
                    <SelectItem value="clothing">ملابس</SelectItem>
                    <SelectItem value="food">مواد غذائية</SelectItem>
                    <SelectItem value="machinery">معدات</SelectItem>
                    <SelectItem value="chemicals">مواد كيميائية</SelectItem>
                    <SelectItem value="furniture">أثاث</SelectItem>
                    <SelectItem value="automotive">قطع غيار سيارات</SelectItem>
                    <SelectItem value="pharmaceuticals">أدوية</SelectItem>
                    <SelectItem value="cosmetics">مستحضرات تجميل</SelectItem>
                    <SelectItem value="other">أخرى</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Product Description */}
              <div>
                <Label htmlFor="productDescription" className="text-lg font-semibold mb-3 block">
                  وصف تفصيلي
                </Label>
                <Textarea
                  id="productDescription"
                  value={formData.productDescription}
                  onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })}
                  placeholder="مثال: أجهزة إلكترونية - هواتف ذكية"
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
                <Select
                  value={formData.sourceCountry}
                  onValueChange={(value) => setFormData({ ...formData, sourceCountry: value })}
                  required
                >
                  <SelectTrigger id="sourceCountry" className="text-base bg-input">
                    <SelectValue placeholder="اختر بلد المصدر" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="china">الصين</SelectItem>
                    <SelectItem value="usa">الولايات المتحدة</SelectItem>
                    <SelectItem value="germany">ألمانيا</SelectItem>
                    <SelectItem value="japan">اليابان</SelectItem>
                    <SelectItem value="uk">المملكة المتحدة</SelectItem>
                    <SelectItem value="france">فرنسا</SelectItem>
                    <SelectItem value="italy">إيطاليا</SelectItem>
                    <SelectItem value="south-korea">كوريا الجنوبية</SelectItem>
                    <SelectItem value="india">الهند</SelectItem>
                    <SelectItem value="turkey">تركيا</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Destination */}
              <div>
                <Label htmlFor="destination" className="text-lg font-semibold mb-3 block">
                  وجهة التسليم *
                </Label>
                <Select
                  value={formData.destination}
                  onValueChange={(value) => setFormData({ ...formData, destination: value })}
                  required
                >
                  <SelectTrigger id="destination" className="text-base bg-input">
                    <SelectValue placeholder="اختر وجهة التسليم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="riyadh">الرياض</SelectItem>
                    <SelectItem value="jeddah">جدة</SelectItem>
                    <SelectItem value="dammam">الدمام</SelectItem>
                    <SelectItem value="khobar">الخبر</SelectItem>
                    <SelectItem value="mecca">مكة المكرمة</SelectItem>
                    <SelectItem value="medina">المدينة المنورة</SelectItem>
                    <SelectItem value="taif">الطائف</SelectItem>
                    <SelectItem value="abha">أبها</SelectItem>
                    <SelectItem value="jizan">جازان</SelectItem>
                    <SelectItem value="hail">حائل</SelectItem>
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
