import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Globe, Sun, Moon, UserPlus, Info, Accessibility } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import mainLogo from "@/assets/main-logo.png";

export const Navigation = () => {
  const [mockDialog, setMockDialog] = useState<string | null>(null);

  const MockFeatureDialog = ({ title, description }: { title: string; description: string }) => (
    <Dialog open={mockDialog === title} onOpenChange={() => setMockDialog(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-[#1c3150]">{title}</DialogTitle>
          <DialogDescription className="text-base">{description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary shadow-md" style={{ height: 'var(--nav-height)' }}>
        <div className="max-w-screen-2xl mx-auto h-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-full gap-2">
            {/* Mock Features - Left Side (RTL) */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMockDialog("الوضع الليلي")}
                className="text-[#1c3150]/70 hover:text-[#1c3150] hover:bg-[#1c3150]/10"
                aria-label="تبديل الوضع"
              >
                <Sun className="h-5 w-5 text-[#1c3150]" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMockDialog("إمكانية الوصول")}
                className="text-[#1c3150]/70 hover:text-[#1c3150] hover:bg-[#1c3150]/10"
                aria-label="خيارات إمكانية الوصول"
              >
                <Accessibility className="h-5 w-5 text-[#1c3150]" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMockDialog("تغيير اللغة")}
                className="text-[#1c3150]/70 hover:text-[#1c3150] hover:bg-[#1c3150]/10 hidden sm:flex"
                aria-label="تغيير اللغة"
              >
                <Globe className="h-5 w-5 text-[#1c3150]" />
              </Button>
            </div>

            {/* Center Items */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Button
                variant="ghost"
                onClick={() => setMockDialog("لماذا تسهيل")}
                className="text-[#1c3150]/90 hover:text-[#1c3150] hover:bg-[#1c3150]/10 text-sm sm:text-base hidden md:flex"
              >
                لماذا تسهيل
              </Button>

              <Button
                variant="ghost"
                onClick={() => setMockDialog("تسجيل الدخول")}
                className="text-[#1c3150]/90 hover:text-[#1c3150] hover:bg-[#1c3150]/10 text-sm sm:text-base"
              >
                <UserPlus className="h-4 w-4 ml-2 text-[#1c3150]" />
                دخول
              </Button>
            </div>

            {/* Logo/Home - Right Side (RTL) */}
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
              <img src={mainLogo} alt="تسهيل" className="h-8 sm:h-10 w-auto" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Mock Feature Dialogs */}
      <MockFeatureDialog
        title="تسجيل الدخول"
        description="ستتوفر ميزة تسجيل الدخول قريباً لحفظ بياناتك وتتبع شحناتك السابقة. في الإصدار الكامل، ستتمكن من إنشاء حساب شخصي وإدارة جميع معاملاتك الجمركية."
      />
      <MockFeatureDialog
        title="لماذا تسهيل"
        description="تسهيل هي منصة ذكية للتحقق المسبق من جاهزية الشحنات التجارية قبل الوصول للمنافذ البرية. نوفر لك تحليل المستندات، تقييم المخاطر، واقتراحات التوقيت الأمثل لتوفير الوقت وتجنب المخالفات."
      />
      <MockFeatureDialog
        title="تغيير اللغة"
        description="ستتوفر اللغة الإنجليزية ولغات أخرى قريباً لخدمة جميع المستخدمين في المملكة. حالياً، المنصة متاحة باللغة العربية فقط."
      />
      <MockFeatureDialog
        title="إمكانية الوصول"
        description="نعمل على توفير خيارات إمكانية الوصول الشاملة، بما في ذلك: تكبير النص، الوضع عالي التباين، والقراءة الصوتية للمحتوى. هذه الميزات ستكون متاحة في الإصدار الكامل."
      />
      <MockFeatureDialog
        title="الوضع الليلي"
        description="الوضع الليلي قيد التطوير لتوفير تجربة مريحة للعينين في جميع الأوقات. حالياً، المنصة متاحة بالوضع النهاري فقط."
      />
    </>
  );
};
