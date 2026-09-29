export interface Testimonial {
  quote: string;
  name: string;
  detail: string;
  category: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "I didn't know I qualified for the Swadhar hostel scholarship until YojanaSetu matched it to my profile. It walked me through every document and I had my application in within a day.",
    name: 'Rahul S. Patil',
    detail: 'Engineering student, Pune',
    category: 'Education & Scholarships',
  },
  {
    quote:
      "The eligibility checker flagged that my income certificate was about to expire before I even applied. That single alert saved me from a rejected application.",
    name: 'Sunita Devi',
    detail: 'Farmer, Nagpur district',
    category: 'Agriculture & Subsidy',
  },
  {
    quote:
      "I connected DigiLocker once and never had to re-upload a document again across three different scheme applications. Tracking status in one place made all the difference.",
    name: 'Imran Shaikh',
    detail: 'Small business owner, Kolhapur',
    category: 'Credit & Enterprise Support',
  },
];
