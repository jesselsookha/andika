# ⌕ Changelog

All notable changes to the Andika project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## ⎁ [1.0.0] - 2026-02-11

### ⌗ Added
- **Core Editor:** CodeMirror integration with Markdown syntax highlighting, line numbers, and line wrapping
- **Real-time Preview:** GitHub-flavored Markdown rendering via Marked.js with live updates
- **Diagram Support:** Mermaid.js integration for flowcharts, sequence diagrams, and Gantt charts
- **File System Operations:** Native file Open/Save using File System Access API
  - ⎄ New document creation
  - ⌂ Open existing `.md` files
  - ↓ Save with intelligent Save/Save As behavior
- **Export Capabilities:**
  - ⌕ PDF export via browser print-to-PDF with clean print styles
  - ⌗ HTML export as standalone, styled web documents
- **Template Library:** 25+ student-focused documentation templates across 5 categories
  - ⌗ Project Foundations (Title + Badges, Structure, Objectives, Status)
  - ⎌ Technical Documentation (Technologies, Installation, Configuration, Usage, API)
  - ⌘ Assessment & Submission (Academic Integrity, Challenges, Learnings, Issues, Self-Assessment)
  - ⚌ Collaboration (Contributing, Team Roles, Code of Conduct)
  - ⌂ Release & Maintenance (Changelog, Version History, Roadmap, Support)
- **Template Browser:** Accordion-style category browser with real-time search
- **Markdown Cheatsheet:** Accordion-style reference with 9 categories of syntax examples
  - Headings (H1-H6)
  - Text Formatting (bold, italic, strikethrough, highlight, subscript, superscript)
  - Lists (bulleted, numbered, task, definition)
  - Links & Media (hyperlinks, images, email, footnotes)
  - Code (inline, blocks, syntax highlighting)
  - Tables (generation wizard, alignment)
  - Quotes & Rules
  - Diagrams & Math (Mermaid, LaTeX)
  - Tools (Table Generator Wizard)
- **Table Generator Wizard:** Visual interface for creating Markdown tables
  - Configurable columns (1-10) and rows (1-20)
  - Left/center/right alignment options
  - One-click insertion at cursor position
- **Keyboard Shortcuts:**
  - `Ctrl+B` - Bold (`**text**`)
  - `Ctrl+I` - Italic (`*text*`)
  - `Ctrl+K` - Insert link
  - `Ctrl+[` - Decrease heading level
  - `Ctrl+]` - Increase heading level
  - `Ctrl+L` - Insert bullet list
  - `Ctrl+Alt+C` - Insert code block
  - `Ctrl+Alt+T` - Open Table Generator Wizard
  - `Shift+Ctrl+P` - Export as PDF
  - `Shift+Ctrl+H` - Export as HTML
- **Dark Mode:** ☀︎/☾ toggle with system preference detection and localStorage persistence
- **Auto-save:** Debounced localStorage backup (2 seconds after typing) with restore prompt
- **Word Count:** Real-time word and character counter in editor header
- **Help Modal:** Comprehensive ⌘ How-to guide with modal overlay
- **Unicode Interface:** Complete replacement of emoji icons with distinctive Unicode symbols
  - ⎄ New document
  - ⌂ Open file
  - ↓ Save file
  - ⌕ PDF export, search, preview
  - ⌗ HTML export, project foundations
  - ⌘ Document library, assessment
  - ⎌ Technical documentation
  - ⎁ Editor, usage examples
  - ⚌ Collaboration
  - ⌇ Project structure
  - ⌑ Learning objectives
  - ⌖ Project status, roadmap
  - ⌨ Technologies, support
  - ⎀ Configuration
  - ⌤ API reference
  - ⌭ Challenges
  - ⌽ Known issues
  - ⌯ Self-assessment
  - ⚍⚎⚏ Contributing, team roles, code of conduct

### ⎌ Changed
- **Typography:** Font hierarchy refined for readability
  - Andika → reserved for headings and branding
  - Inter → UI text (buttons, labels, sidebar)
  - Fira Mono → editor/code (unchanged)
  - System fonts → preview pane (GitHub-style)
- **Editor Font Size:** Reduced from 14px to 13px for better content density while maintaining readability (12px/11px considered but rejected to prevent eye strain)
- **Template Content:** All templates enhanced with substantial boilerplate and explicit `[placeholders]`
- **Cheatsheet Layout:** Converted from dense grid to expandable accordion sections
- **Sidebar Width:** Increased from 280px to 320px to accommodate expanded content
- **Modal Design:** Enhanced with grid layout and improved typography
- **Section Headings (Dark Mode):** All main headings now use pure white (`#ffffff`) for maximum contrast and readability
  - ⌘ Document Library
  - ⌕ Markdown Reference
  - ⎁ EDITOR
  - ⌕ PREVIEW
- **Markdown Reference Heading:** 
  - Font: Now properly uses Andika font family
  - Text Transform: Removed ALL CAPS styling to match Document Library heading convention
  - Visual Hierarchy: Preserved through size (14px) and border weight (1px) rather than uppercase
- **Pane Headers (Dark Mode):** EDITOR and PREVIEW headers now display as pure white text

### ⚌ Fixed
- **Template Insertion:** Resolved issue where click handlers were not attached to dynamically rendered elements (migration to event delegation)
- **File Operations:** Completed missing event listener implementations for New/Open/Save
- **UI Initialization:** Added all missing function definitions (initAccordion, initCheatsheetAccordion, initTemplateSearch, initTemplateInsertion, updateWordCount, autoSaveToLocalStorage, checkForAutoSave)
- **Mermaid Rendering:** Added setTimeout delay to ensure DOM is ready for diagram initialization
- **Dark Mode Variables:** Corrected CSS custom property application for all components
- **Cheatsheet Header Contrast:** Dark mode cheatsheet accordion headers now display as white text on dark teal background (collapsed) and dark text on coral background (expanded/active)
- **Template Category Headers (Dark Mode):** All template category headings now use pure white text with proper Andika font
- **Font Family Consistency:** Ensured all heading-level elements use Andika font family as intended

### ⌇ Removed
- **Emoji Icons:** Replaced all emoji characters with Unicode symbols for universal compatibility and distinctive branding
- **Grid Cheatsheet:** Replaced two-column grid with accordion sections for better space utilization
- **Uppercase Transformation:** Removed `text-transform: uppercase` from Markdown Reference heading to match Document Library convention

---

## ⎀ [0.9.0] - 2026-02-10

### ⌗ Added
- Initial CodeMirror editor setup
- Basic Markdown preview with Marked.js
- Three-column layout (templates | editor | preview)
- Granite/coral/golden pollen colour scheme
- File System Access API prototype
- Basic template set (11 templates)
- Flat list template browser
- Help modal

### ⎌ Changed
- Project name established as "Andika"
- Font selection: Andika for UI, Fira Mono for editor

---

## ⌖ [0.1.0] - 2026-02-09

### ⌗ Added
- Project initialization
- Concept development based on student documentation needs
- Research phase: evaluation of StackEdit, Dillinger, and readme.so
- Decision to develop offline-first, student-centered alternative

---

## ⌕ Acknowledgments

Andika draws inspiration from several open-source projects and web applications that have advanced the practice of technical documentation:

| Project | Author | Influence |
|---------|--------|-----------|
| **StackEdit** | Benoît Schweblin | Split-pane Markdown editing paradigm |
| **Dillinger** | Joe McCann, Martin Broder | Browser-based Markdown simplicity |
| **readme.so** | [Katherine Oelsner](https://github.com/octokatherine) | Template-driven README construction ([repository](https://github.com/octokatherine/readme.so)) |

Katherine's work on readme.so demonstrated that **templates are not just shortcuts—they are teaching tools**. Andika extends this concept specifically for academic contexts, adding assessment-focused templates, academic integrity declarations, and self-reflection frameworks.

> *"If I have seen further, it is by standing on the shoulders of giants."*  
> — Isaac Newton, 1675

---

## ⎁ Design Rationale Notes (v1.0.0)

### Typography Decisions
- **Andika (13px → 18px):** Reserved for wayfinding—headings, section labels, and branding. Named after the tool itself, the font signals "you are in Andika."
- **Inter (11px → 14px):** UI text throughout. Chosen for exceptional readability at small sizes and clean, neutral appearance.
- **Fira Mono (13px):** Editor text. Reduced from 14px → 13px after user testing. Balances lines of code on screen with comfortable readability.

### Dark Mode Contrast Philosophy
All dark mode text now meets or exceeds WCAG AA contrast ratios:
- **Primary headings:** Pure white (#ffffff) on dark backgrounds
- **Secondary headings:** Pure white with coral accents
- **Body text:** High-contrast grey (#e0e0e0)
- **Active states:** Coral backgrounds with dark text for maximum visibility

### Unicode over Emoji
Every interface icon is now a Unicode character. This decision:
- Eliminates external asset dependencies
- Guarantees cross-platform consistency
- Creates a distinctive, scholarly typographic identity
- Reduces cognitive load—symbols are read, not decoded

---

**Andika** — ⌨ write, ⌕ document, ⌂ submit  
Free for students. Forever offline. Forever open source.
