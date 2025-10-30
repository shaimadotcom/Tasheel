import zatcaLogo from "@/assets/zatca-logo.png";
import fasahLogo from "@/assets/fasah-logo.png";

export const Footer = () => {
  return (
    <footer className="bg-secondary py-8 sm:py-12">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Section */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-bold mb-4 text-[#1c3150]">تواصل معنا</h3>
            <p className="text-[#1c3150]/80 mb-2">البريد الإلكتروني: info@tasheel.sa</p>
            <p className="text-[#1c3150]/80 mb-2">الهاتف: 920000000</p>
            <p className="text-[#1c3150]/80">العنوان: الرياض، المملكة العربية السعودية</p>
          </div>

          {/* Official Links Section */}
          <div className="text-center">
            <h3 className="text-lg font-bold mb-4 text-[#1c3150]">روابط رسمية</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://zatca.gov.sa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 hover:text-primary transition-colors"
              >
                <img src={zatcaLogo} alt="هيئة الزكاة والضريبة والجمارك" className="h-16" />
              </a>
              <a
                href="https://www.fasah.sa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 hover:text-primary transition-colors"
              >
                <img src={fasahLogo} alt="منصة فسح" className="h-16" />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-4 text-[#1c3150]">روابط سريعة</h3>
            <ul className="space-y-2 text-[#1c3150]/80">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  سياسة الخصوصية
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  شروط الاستخدام
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  الأسئلة الشائعة
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  دليل الاستخدام
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#1c3150]/20 pt-6 text-center">
          <p className="text-[#1c3150]/70 text-sm">
            © {new Date().getFullYear()} تسهيل - جميع الحقوق محفوظة | منصة تحليل ما قبل الفسح الجمركي
          </p>
          <p className="text-[#1c3150]/60 text-xs mt-2">
            تم التطوير بالتعاون مع هيئة الزكاة والضريبة والجمارك (ZATCA)
          </p>
        </div>
      </div>
    </footer>
  );
};
