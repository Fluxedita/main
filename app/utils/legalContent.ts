// Simple content for legal sections
const legalContent = {
  terms: {
    title: 'Terms of Service',
    preview: 'These Terms of Service govern your use of the Fluxedita website and services. By accessing or using our services, you agree to be bound by these terms and our Privacy Policy.',
    content: 'These Terms of Service govern your use of the Fluxedita website and services. By accessing or using our services, you agree to be bound by these terms and our Privacy Policy.'
  },
  privacy: {
    title: 'Privacy Policy',
    preview: 'This Privacy Policy explains how Fluxedita collects, uses, and protects your personal information when you use our website and services. We are committed to protecting your privacy and handling your data in an open and transparent manner.',
    content: 'This Privacy Policy explains how Fluxedita collects, uses, and protects your personal information when you use our website and services. We are committed to protecting your privacy and handling your data in an open and transparent manner.'
  },
  cookies: {
    title: 'Cookie Policy',
    preview: 'This Cookie Policy explains how Fluxedita uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them.',
    content: 'This Cookie Policy explains how Fluxedita uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them.'
  },
  'refund-policy': {
    title: 'Refund Policy',
    preview: 'Our Refund Policy outlines the terms and conditions for requesting refunds for our services. We strive to ensure complete customer satisfaction with all our products and services.',
    content: 'Our Refund Policy outlines the terms and conditions for requesting refunds for our services. We strive to ensure complete customer satisfaction with all our products and services.'
  },
  aup: {
    title: 'Acceptable Use Policy',
    preview: 'This Acceptable Use Policy sets out the terms under which you may access our website and use our services. This policy applies to all users of our website and services.',
    content: 'This Acceptable Use Policy sets out the terms under which you may access our website and use our services. This policy applies to all users of our website and services.'
  },
  accessibility: {
    title: 'Accessibility Statement',
    preview: 'Fluxedita is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.',
    content: 'Fluxedita is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards. Our goal is to make our website accessible to the widest possible audience, regardless of technology or ability.'
  },
  dpa: {
    title: 'Data Processing Agreement',
    preview: 'This Data Processing Agreement (DPA) forms part of our Terms of Service and sets out the data protection requirements for the processing of personal data that you provide to us.',
    content: 'This Data Processing Agreement (DPA) forms part of our Terms of Service and sets out the data protection requirements for the processing of personal data that you provide to us.'
  },
  'eu-compliance': {
    title: 'EU Compliance',
    preview: 'Information about our compliance with EU regulations including GDPR, ePrivacy Directive, and other relevant European Union legislation.',
    content: 'Information about our compliance with EU regulations including GDPR, ePrivacy Directive, and other relevant European Union legislation.'
  }
} as const;

type LegalContentKey = keyof typeof legalContent;

export async function getLegalContent(slug: string) {
  const content = legalContent[slug as LegalContentKey];
  
  if (!content) {
    console.warn(`No content found for legal section: ${slug}`);
    return null;
  }
  
  return content;
}
