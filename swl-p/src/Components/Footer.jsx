import { Footer } from "@zeiss/beyond-online-react";

export const Footer_Comp = () => {
  return (
    <>
      <Footer
        primaryContent={{
          actions: [
            {
              label: "Publisher ",
              href: "https://www.zeiss.com/corporate/en/legal-information/publisher.html",
            },
            {
              label: "Legal Notice ",
              href: "https://www.zeiss.com/corporate/en/legal-information/legal-notice-and-general-terms-and-conditions.html?vaURL=www.zeiss.com/legal-notice",
            },
            {
              label: "Data Protection",
              href: "https://www.zeiss.com/data-protection/en/home.html?vaURL=www.zeiss.com/data-protection",
            },
          ],
          headline: "Legal",
        }}
        productName="Product name v32.0"
        title={{
          label: "ZEISS International",
          onClick: function noRefCheck() {},
        }}
      />
    </>
  );
};
