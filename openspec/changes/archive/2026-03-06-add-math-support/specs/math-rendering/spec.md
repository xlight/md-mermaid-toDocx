## ADDED Requirements

### Requirement: System SHALL support LaTeX inline math notation
The system SHALL recognize and render LaTeX inline math formulas enclosed in single dollar signs (`$...$`).

#### Scenario: Inline formula in paragraph
- **WHEN** user types `The energy is $E=mc^2$ according to Einstein`
- **THEN** system renders the formula within the paragraph with proper mathematical formatting

#### Scenario: Multiple inline formulas in one line
- **WHEN** user types `If $x > 0$ and $y < 0$, then $xy < 0$`
- **THEN** system renders all three formulas correctly in the same line

#### Scenario: Inline formula with special characters
- **WHEN** user types `The integral is $\int_a^b f(x) dx$`
- **THEN** system renders the integral symbol with proper subscripts and superscripts

### Requirement: System SHALL support LaTeX block math notation
The system SHALL recognize and render LaTeX block math formulas enclosed in double dollar signs (`$$...$$`).

#### Scenario: Block formula with complex notation
- **WHEN** user types:
  ```
  $$
  \nabla \cdot \vec{E} = \frac{\rho}{\varepsilon_0}
  $$
- **THEN** system renders the formula as a centered block with proper spacing and formatting

#### Scenario: Block formula with multiple lines
- **WHEN** user types:
  ```
  $$
  \begin{aligned}
  x &= a + b \\
  y &= c + d
  \end{aligned}
  $$
- **THEN** system renders the multi-line formula with proper alignment

#### Scenario: Block formula surrounded by text
- **WHEN** user types:
  ```
  The equation below shows Maxwell's equation:
  $$
  \nabla \cdot \vec{E} = \frac{\rho}{\varepsilon_0}
  $$
  This is the differential form.
  ```
- **THEN** system renders the block formula with vertical spacing from surrounding paragraphs

### Requirement: System SHALL integrate MathJax rendering engine
The system SHALL load and initialize MathJax v3 from CDN for high-quality math rendering.

#### Scenario: MathJax loads successfully
- **WHEN** page loads
- **THEN** MathJax library is available globally
- **AND** console shows success message indicating MathJax is ready

#### Scenario: MathJax CDN fails to load
- **WHEN** MathJax CDN is unavailable
- **THEN** system shows warning message in console
- **AND** formulas display as plain text (graceful degradation)

### Requirement: System SHALL prevent math notation conflicts
The system SHALL avoid misinterpreting non-math usage of dollar signs.

#### Scenario: Dollar sign in code block
- **WHEN** user types:
  ```markdown
  Use `echo $HOME` to show home directory.
  ```
- **THEN** system does NOT render `$HOME` as a math formula

#### Scenario: Dollar sign in shell code block
- **WHEN** user types:
  ````markdown
  ```bash
  export PATH=$HOME/bin:$PATH
  ```
  ````
- **THEN** system does NOT render `$HOME` or `$PATH` as math formulas

#### Scenario: Unclosed dollar sign
- **WHEN** user types `The price is $50 dollars`
- **THEN** system does NOT attempt to render formula (no closing `$`)

### Requirement: System SHALL provide math-specific CSS styling
The system SHALL apply appropriate CSS styles for inline and block math formulas.

#### Scenario: Inline math styling
- **WHEN** an inline formula is rendered
- **THEN** formula has class `math-inline`
- **AND** formula is vertically aligned with surrounding text

#### Scenario: Block math styling
- **WHEN** a block formula is rendered
- **THEN** formula has class `math-display`
- **AND** formula is centered horizontally
- **AND** formula has appropriate vertical margins

### Requirement: System SHALL support advanced LaTeX features
The system SHALL render complex mathematical constructs supported by MathJax.

#### Scenario: Matrix rendering
- **WHEN** user types:
  ```
  $$
  \begin{pmatrix}
  a & b \\
  c & d
  \end{pmatrix}
  $$
- **THEN** system renders a properly formatted matrix with brackets and alignment

#### Scenario: Greek letters
- **WHEN** user types `$\alpha, \beta, \gamma$`
- **THEN** system renders Greek letters correctly

#### Scenario: Subscripts and superscripts
- **WHEN** user types `$x_i^2$ or $a_{n-1}$`
- **THEN** system renders subscripts and superscripts with proper positioning

#### Scenario: Fractions
- **WHEN** user types `$\frac{a}{b}$`
- **THEN** system renders the fraction with horizontal line and proper sizing

### Requirement: System SHALL handle math rendering errors gracefully
The system SHALL display user-friendly error messages when LaTeX syntax is invalid.

#### Scenario: Invalid LaTeX syntax
- **WHEN** user types `$\invalid_command$`
- **THEN** system shows error message in the preview
- **AND** console logs the specific error from MathJax

#### Scenario: Unclosed braces
- **WHEN** user types `$\frac{a}{b$`
- **THEN** system shows error message indicating parsing failure
- **AND** preview remains functional (does not crash)

### Requirement: System SHALL support i18n for math-related UI text
The system SHALL provide Chinese and English translations for math-related interface text.

#### Scenario: Chinese interface
- **WHEN** user selects Chinese language
- **THEN** all math-related messages and tooltips display in Chinese

#### Scenario: English interface
- **WHEN** user selects English language
- **THEN** all math-related messages and tooltips display in English