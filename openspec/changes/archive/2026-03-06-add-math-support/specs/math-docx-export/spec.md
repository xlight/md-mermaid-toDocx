## ADDED Requirements

### Requirement: System SHALL export math formulas to DOCX as images
The system SHALL convert rendered math formulas to PNG images and embed them in the generated DOCX document.

#### Scenario: Inline formula in DOCX
- **WHEN** user generates DOCX from document containing `The energy is $E=mc^2$`
- **THEN** generated DOCX contains inline PNG image of the formula
- **AND** image is vertically aligned with surrounding text

#### Scenario: Block formula in DOCX
- **WHEN** user generates DOCX from document containing block formula `$$...$$`
- **THEN** generated DOCX contains PNG image of the formula
- **AND** image is centered horizontally
- **AND** image has appropriate spacing from surrounding paragraphs

### Requirement: System SHALL generate high-quality formula images
The system SHALL render math formulas at sufficient resolution for clarity in printed documents.

#### Scenario: Image resolution
- **WHEN** system renders formula to PNG
- **THEN** image uses at least 2x scale factor (retina-ready)
- **AND** image width does not exceed DOCX page width

#### Scenario: Formula with complex notation
- **WHEN** system renders formula like `$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$`
- **THEN** all symbols, subscripts, and superscripts are clearly legible
- **AND** formula maintains aspect ratio

### Requirement: System SHALL preserve formula appearance from preview
The system SHALL ensure formulas in DOCX match their appearance in the browser preview.

#### Scenario: Font consistency
- **WHEN** formula is rendered to PNG
- **THEN** image uses the same MathJax fonts as the preview
- **AND** formula styling (size, spacing) matches preview

#### Scenario: Background transparency
- **WHEN** formula is rendered to PNG
- **THEN** image background is transparent
- **AND** formula can be placed on any document background color

### Requirement: System SHALL handle multiple formulas in one document
The system SHALL correctly export all formulas present in a document without conflicts.

#### Scenario: Document with multiple inline formulas
- **WHEN** user generates DOCX from document with 5+ inline formulas
- **THEN** all formulas are rendered and embedded correctly
- **AND** each formula has unique identifier to prevent conflicts

#### Scenario: Document with mixed content
- **WHEN** user generates DOCX from document containing:
  - Markdown text
  - Inline math formulas
  - Block math formulas
  - Mermaid diagrams
- **THEN** all content types are preserved in the DOCX
- **AND** formulas and diagrams appear in correct positions

### Requirement: System SHALL provide user feedback during export
The system SHALL show status messages during DOCX generation with math formulas.

#### Scenario: Export progress indication
- **WHEN** user clicks "Generate DOCX" button with formulas present
- **THEN** status shows "Generating DOCX..." message
- **AND** status updates to "DOCX generated!" upon completion

#### Scenario: Export with many formulas
- **WHEN** user generates DOCX from document with 10+ formulas
- **THEN** system shows processing indicator during formula rendering
- **AND** UI remains responsive (does not freeze)

### Requirement: System SHALL handle formula export errors gracefully
The system SHALL provide meaningful error messages if formula rendering fails during export.

#### Scenario: Formula rendering fails
- **WHEN** MathJax fails to render a formula during export
- **THEN** system shows error message with formula identifier
- **AND** continues exporting other content
- **AND** places placeholder text for failed formula

#### Scenario: html2canvas library unavailable
- **WHEN** html2canvas CDN fails to load
- **THEN** system shows error message indicating export limitation
- **AND** allows user to proceed with text-only export

### Requirement: System SHALL load html2canvas library for image generation
The system SHALL load html2canvas from CDN for converting formula DOM to images.

#### Scenario: html2canvas loads successfully
- **WHEN** page loads
- **THEN** html2canvas library is available globally
- **AND** console shows success message

#### Scenario: html2canvas CDN fails
- **WHEN** html2canvas CDN is unavailable
- **THEN** system shows warning in console
- **AND** disables math export feature gracefully
- **AND** allows document preview without export

### Requirement: System SHALL support i18n for export messages
The system SHALL provide Chinese and English translations for math export related messages.

#### Scenario: Export success in Chinese
- **WHEN** user selects Chinese and DOCX generates successfully with formulas
- **THEN** success message displays in Chinese

#### Scenario: Export error in English
- **WHEN** user selects English and formula export fails
- **THEN** error message displays in English

### Requirement: System SHALL optimize formula image file size
The system SHALL minimize the file size impact of formula images on the DOCX document.

#### Scenario: Image compression
- **WHEN** formula is rendered to PNG
- **THEN** image uses PNG format with appropriate compression
- **AND** image file size is reasonable (typically < 50KB per formula)

#### Scenario: Multiple formulas file size
- **WHEN** document contains 20 formulas
- **THEN** total DOCX file size remains reasonable (< 5MB)
- **AND** DOCX generation completes within reasonable time (< 10 seconds)