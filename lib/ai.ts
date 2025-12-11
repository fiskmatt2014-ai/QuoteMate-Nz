import { LineItem } from "./types";

// TODO: Replace these mock functions with real OpenAI API calls later
// These are placeholder functions that return hardcoded responses
// In production, these would call the OpenAI API with proper prompts

/**
 * Generates a professional quote description based on job type, line items, and notes
 * TODO: Wire to OpenAI API
 */
export async function generateQuoteDescriptionMock(
  jobType: string,
  lineItems: LineItem[],
  notes?: string
): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const itemsSummary = lineItems
    .map((item) => `${item.quantity}x ${item.description}`)
    .join(", ");

  return `Professional ${jobType} Service

Scope of Work:
${itemsSummary || "Various tasks as discussed"}

${notes ? `Additional Notes:\n${notes}\n\n` : ""}This quote includes all labour and materials as specified. GST is included in the final total. Quote is valid for 30 days from the date of issue.

Payment terms: 50% deposit required to commence work, balance due on completion.`;
}

/**
 * Suggests line items based on job type
 * TODO: Wire to OpenAI API for intelligent suggestions
 */
export async function suggestLineItemsMock(
  jobType: string
): Promise<LineItem[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const lowerJobType = jobType.toLowerCase();

  // Return relevant suggestions based on job type keywords
  if (lowerJobType.includes("toilet")) {
    return [
      {
        id: crypto.randomUUID(),
        description: "Remove and dispose of existing toilet",
        quantity: 1,
        unitPrice: 150,
        type: "labour",
      },
      {
        id: crypto.randomUUID(),
        description: "New toilet suite installation",
        quantity: 1,
        unitPrice: 450,
        type: "material",
      },
      {
        id: crypto.randomUUID(),
        description: "Plumbing connection and sealing",
        quantity: 1,
        unitPrice: 200,
        type: "labour",
      },
    ];
  }

  if (lowerJobType.includes("fence")) {
    return [
      {
        id: crypto.randomUUID(),
        description: "Fence posts and materials",
        quantity: 1,
        unitPrice: 1200,
        type: "material",
      },
      {
        id: crypto.randomUUID(),
        description: "Fence installation labour",
        quantity: 8,
        unitPrice: 85,
        type: "labour",
      },
    ];
  }

  if (lowerJobType.includes("heat pump") || lowerJobType.includes("heatpump")) {
    return [
      {
        id: crypto.randomUUID(),
        description: "Heat pump unit supply",
        quantity: 1,
        unitPrice: 2500,
        type: "material",
      },
      {
        id: crypto.randomUUID(),
        description: "Installation and electrical work",
        quantity: 4,
        unitPrice: 150,
        type: "labour",
      },
    ];
  }

  if (lowerJobType.includes("paint")) {
    return [
      {
        id: crypto.randomUUID(),
        description: "Surface preparation and priming",
        quantity: 1,
        unitPrice: 350,
        type: "labour",
      },
      {
        id: crypto.randomUUID(),
        description: "Paint and materials",
        quantity: 1,
        unitPrice: 280,
        type: "material",
      },
      {
        id: crypto.randomUUID(),
        description: "Two coat application",
        quantity: 1,
        unitPrice: 450,
        type: "labour",
      },
    ];
  }

  // Return empty array if no matching job type found
  return [];
}

/**
 * Generates a polite follow-up message for a quote
 * TODO: Wire to OpenAI API for personalized messages
 */
export async function generateFollowUpMessageMock(
  customerName: string,
  quoteNumber: string
): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return `Hi ${customerName},

I hope this message finds you well. I wanted to follow up on the quote (${quoteNumber}) I sent through recently.

Do you have any questions about the scope of work or pricing? I'm happy to discuss any details or make adjustments if needed.

Looking forward to hearing from you.

Cheers,
QuoteMate NZ Team`;
}
