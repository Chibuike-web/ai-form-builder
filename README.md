# AI Form Builder

An AI-powered form builder that converts natural language prompts into fully structured, validated, and accessible forms at runtime. The system is schema driven, predictable, and designed for production use with AI generated forms.

AI Form Builder takes a plain English description of a form and generates a structured UI schema, applies strict validation rules, and renders a clean, accessible form on the client without manual configuration.

## Overview

AI Form Builder generates:

- A structured UI schema
- Appropriate input types
- Required field logic
- Validation rules
- Accessible, production ready form components

## Key Features

- **Natural language to form schema**  
  Converts prompts into a strict JSON schema using the Vercel AI SDK.

- **Dynamic form rendering**  
  Forms are rendered at runtime directly from the generated schema.

- **Strong validation layer**  
  Handles required fields, input specific validation, error states, and edge cases across dynamic forms.

- **Google Forms style semantics**  
  Radio for single selection, checkbox for multi select only, clear question first layout, no ambiguous boolean fields.

- **Accessible by default**  
  Proper labels and grouping, ARIA attributes for errors, keyboard friendly interactions.

- **Multiple input types supported**  
  Text, text area, number, radio, select, checkbox (multi select), date, file upload.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Vercel AI SDK
- Zod for schema validation
- Tailwind CSS
- shadcn/ui

## How It Works

1. The user describes the form in natural language.
2. The AI generates a structured UI schema following strict mapping rules.
3. The schema is validated against Zod.
4. The form is rendered dynamically on the client.
5. User input is validated in real time and again on submit.

The system enforces one question equals one field, clear separation between schema intent and UI rendering, and predictable state and validation behavior.

## Schema Contract

Each generated form follows this structure:

```json
{
	"fields": [
		{
			"id": "string",
			"label": "string",
			"component": "text | text-area | number | radio | select | checkbox | date | file",
			"required": true,
			"options": []
		}
	]
}
```

---

## Installation

### Prerequisites

Before getting started, make sure you have the following:

- **Node.js 18 or later**
- One package manager:
  - **bun**
  - **npm**
  - **pnpm**
- An AI Gateway is required
- A Database is required for persistence. Sqlite or Postgres works fine

---

### Clone the Repository

````bash
git clone https://github.com/Chibuike-web/ai-form-builder.git
cd ai-form-builder

bun install
npm install
pnpm instal

## Environment Variables

Create a `.env.local` file in the project root and add:

```env
NEXT_PUBLIC_URL=http://localhost:5000
AI_GATEWAY_API_KEY=your_vercel_ai_gateway_key
DATABASE_URL=your_database_connection_string

````

## Run the Development Server

```bash
bun dev
or

npm run dev
or

pnpm dev

The application will be available at:

http://localhost:3000


## Usage

Enter a natural language description of the form you want to generate, submit the prompt, the AI generates a strict validated UI schema, the form is rendered dynamically on the client, then fill and submit the form with full validation and clear error handling.


```
