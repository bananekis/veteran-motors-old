# EmailJS Template Design - Czech

## Template Subject Line

```
Nová zpráva z webu Veteran Motors - {{subject}}
```

## Email Template HTML

```html
<!DOCTYPE html>
<html lang="cs">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Nová zpráva z webu</title>
		<style>
			body {
				font-family: Arial, sans-serif;
				line-height: 1.6;
				color: #333;
				margin: 0;
				padding: 20px;
				background-color: #f4f4f4;
			}
			.container {
				max-width: 600px;
				margin: 0 auto;
				background-color: #ffffff;
				border-radius: 8px;
				box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
				overflow: hidden;
			}
			.header {
				background: linear-gradient(135deg, #8b4513 0%, #a0522d 100%);
				color: white;
				padding: 30px 20px;
				text-align: center;
			}
			.header h1 {
				margin: 0;
				font-size: 28px;
				font-weight: bold;
			}
			.header p {
				margin: 10px 0 0 0;
				opacity: 0.9;
				font-size: 16px;
			}
			.content {
				padding: 30px;
			}
			.info-section {
				margin-bottom: 25px;
				padding: 20px;
				background-color: #f8f9fa;
				border-left: 4px solid #d4af37;
				border-radius: 4px;
			}
			.info-section h3 {
				margin: 0 0 15px 0;
				color: #8b4513;
				font-size: 18px;
			}
			.info-row {
				display: flex;
				margin-bottom: 10px;
				flex-wrap: wrap;
			}
			.info-label {
				font-weight: bold;
				color: #555;
				min-width: 120px;
				margin-right: 10px;
			}
			.info-value {
				color: #333;
				flex: 1;
			}
			.message-section {
				margin-top: 25px;
				padding: 20px;
				background-color: #ffffff;
				border: 2px solid #d4af37;
				border-radius: 4px;
			}
			.message-section h3 {
				margin: 0 0 15px 0;
				color: #8b4513;
			}
			.footer {
				background-color: #8b4513;
				color: white;
				padding: 20px;
				text-align: center;
				font-size: 14px;
			}
			.footer p {
				margin: 5px 0;
			}
			@media (max-width: 600px) {
				.info-row {
					flex-direction: column;
				}
				.info-label {
					min-width: auto;
					margin-bottom: 5px;
				}
			}
		</style>
	</head>
	<body>
		<div class="container">
			<!-- Header -->
			<div class="header">
				<h1>🚗 Veteran Motors</h1>
				<p>Nová zpráva z webových stránek</p>
			</div>

			<!-- Content -->
			<div class="content">
				<div class="info-section">
					<h3>📋 Údaje odesílatele</h3>
					<div class="info-row">
						<span class="info-label">Email:</span>
						<span class="info-value">{{from_email}}</span>
					</div>
					{{#from_phone}}
					<div class="info-row">
						<span class="info-label">Telefon:</span>
						<span class="info-value">{{from_phone}}</span>
					</div>
					{{/from_phone}} {{#from_name}}
					<div class="info-row">
						<span class="info-label">Jméno:</span>
						<span class="info-value">{{from_name}}</span>
					</div>
					{{/from_name}} {{#inquiry_type}}
					<div class="info-row">
						<span class="info-label">Typ dotazu:</span>
						<span class="info-value">{{inquiry_type}}</span>
					</div>
					{{/inquiry_type}}
				</div>

				<!-- Rental Form Specific Info (Pronájem/Svatby) -->
				{{#car_type}}
				<div class="info-section">
					<h3>🚙 Rezervace vozu</h3>
					<div class="info-row">
						<span class="info-label">Typ vozidla:</span>
						<span class="info-value">{{car_type}}</span>
					</div>
					{{#date_from}}
					<div class="info-row">
						<span class="info-label">Datum od:</span>
						<span class="info-value">{{date_from}}</span>
					</div>
					{{/date_from}} {{#date_to}}
					<div class="info-row">
						<span class="info-label">Datum do:</span>
						<span class="info-value">{{date_to}}</span>
					</div>
					{{/date_to}} {{#purpose}}
					<div class="info-row">
						<span class="info-label">Účel pronájmu:</span>
						<span class="info-value">{{purpose}}</span>
					</div>
					{{/purpose}} {{#location}}
					<div class="info-row">
						<span class="info-label">Místo konání:</span>
						<span class="info-value">{{location}}</span>
					</div>
					{{/location}}
				</div>
				{{/car_type}}

				<!-- Sale Form Specific Info (Prodej) -->
				{{#brand}}
				<div class="info-section">
					<h3>🏪 Poptávka vozu</h3>
					<div class="info-row">
						<span class="info-label">Značka:</span>
						<span class="info-value">{{brand}}</span>
					</div>
					{{#type}}
					<div class="info-row">
						<span class="info-label">Typ:</span>
						<span class="info-value">{{type}}</span>
					</div>
					{{/type}} {{#price}}
					<div class="info-row">
						<span class="info-label">Cenová představa:</span>
						<span class="info-value">{{price}}</span>
					</div>
					{{/price}} {{#transmission}}
					<div class="info-row">
						<span class="info-label">Převodovka:</span>
						<span class="info-value">{{transmission}}</span>
					</div>
					{{/transmission}} {{#engine}}
					<div class="info-row">
						<span class="info-label">Motor:</span>
						<span class="info-value">{{engine}}</span>
					</div>
					{{/engine}} {{#condition}}
					<div class="info-row">
						<span class="info-label">Stav:</span>
						<span class="info-value">{{condition}}</span>
					</div>
					{{/condition}}
				</div>
				{{/brand}}

				<!-- Message Section -->
				<div class="message-section">
					<h3>💬 Zpráva</h3>
					<div
						style="white-space: pre-line; font-size: 16px; line-height: 1.6;"
					>
						{{message}}
					</div>
				</div>
			</div>

			<!-- Footer -->
			<div class="footer">
				<p><strong>Veteran Motors s.r.o.</strong></p>
				<p>
					📍 Bílý Kostel nad Nisou 509, 463 31 Bílý Kostel nad Nisou
				</p>
				<p>📞 +420 735 705 601 | ✉️ info@veteranmotors.cz</p>
				<p style="margin-top: 15px; opacity: 0.8;">
					Tato zpráva byla odeslána prostřednictvím kontaktního
					formuláře na webu veteranmotors.cz
				</p>
			</div>
		</div>
	</body>
</html>
```

## Alternative Simple Text Template

If you prefer a simpler text-only template:

```text
🚗 VETERAN MOTORS - Nová zpráva z webu

Předmět: {{subject}}

📋 ÚDAJE ODESÍLATELE:
Email: {{from_email}}
{{#from_phone}}Telefon: {{from_phone}}{{/from_phone}}
{{#from_name}}Jméno: {{from_name}}{{/from_name}}
{{#inquiry_type}}Typ dotazu: {{inquiry_type}}{{/inquiry_type}}

{{#car_type}}
🚙 REZERVACE VOZU:
Typ vozidla: {{car_type}}
{{#date_from}}Datum od: {{date_from}}{{/date_from}}
{{#date_to}}Datum do: {{date_to}}{{/date_to}}
{{#purpose}}Účel pronájmu: {{purpose}}{{/purpose}}
{{#location}}Místo konání: {{location}}{{/location}}

{{/car_type}}
{{#brand}}
🏪 POPTÁVKA VOZU:
Značka: {{brand}}
{{#type}}Typ: {{type}}{{/type}}
{{#price}}Cenová představa: {{price}}{{/price}}
{{#transmission}}Převodovka: {{transmission}}{{/transmission}}
{{#engine}}Motor: {{engine}}{{/engine}}
{{#condition}}Stav: {{condition}}{{/condition}}

{{/brand}}
💬 ZPRÁVA:
{{message}}

---
Veteran Motors s.r.o.
Bílý Kostel nad Nisou 509, 463 31 Bílý Kostel nad Nisou
Tel: +420 735 705 601
Email: info@veteranmotors.cz

Tato zpráva byla odeslána prostřednictvím kontaktního formuláře na webu veteranmotors.cz
```

## Setup Instructions

1. **In EmailJS Dashboard:**

    - Go to Email Templates
    - Click "Create New Template"
    - Copy and paste the HTML template above
    - Set the subject line to: `Nová zpráva z webu Veteran Motors - {{subject}}`

2. **Template Features:**

    - ✅ Responsive design for mobile devices
    - ✅ Professional vintage styling matching your brand
    - ✅ Conditional sections (only shows relevant info)
    - ✅ Clear structure with contact details
    - ✅ Works for all three form types
    - ✅ Czech language throughout

3. **Form Types Supported:**

    - 📞 **General Contact Form** (Kontakt page) - Shows inquiry type and contact details
    - 🚙 **Rental Forms** (Pronájem/Svatby pages) - Shows car reservation details
    - 🏪 **Sale Inquiry Form** (Prodej page) - Shows car purchase specifications

4. **Variables Used:**

    - **Common:** `{{from_name}}`, `{{from_email}}`, `{{from_phone}}`, `{{subject}}`, `{{message}}`
    - **Contact:** `{{inquiry_type}}`
    - **Rental:** `{{car_type}}`, `{{date_from}}`, `{{date_to}}`, `{{purpose}}`, `{{location}}`
    - **Sale:** `{{brand}}`, `{{type}}`, `{{price}}`, `{{transmission}}`, `{{engine}}`, `{{condition}}`
    - Conditional rendering using `{{#variable}}` syntax

5. **Styling:**
    - Brand colors (brown/gold theme)
    - Professional typography
    - Clear visual hierarchy
    - Mobile-responsive layout

## How the Template Works:

The template intelligently detects which form was submitted and shows only the relevant sections:

### 📞 **General Contact Form** (Kontakt page)

Shows: Contact details + inquiry type + message

### 🚙 **Rental Forms** (Pronájem/Svatby pages)

Shows: Contact details + car reservation info (dates, location, purpose) + message

### 🏪 **Sale Inquiry Form** (Prodej page)

Shows: Contact details + car specifications (brand, type, price, etc.) + message
