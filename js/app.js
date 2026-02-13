/**
 * ============================================
 * Andika — Offline Markdown Editor
 * Version 2.5
 * ============================================
 * 
 * A student-centered documentation tool for READMEs,
 * CHANGELOGs, and academic submissions.
 * 
 * FEATURES:
 * ✓ CodeMirror editor with syntax highlighting
 * ✓ Real-time preview (GitHub-flavored + Mermaid diagrams)
 * ✓ File System Access API for local file operations
 * ✓ 25+ student-focused templates with accordion browser
 * ✓ Unicode interface (no emoji, no external icons)
 * ✓ PDF export via print-to-PDF
 * ✓ HTML export (standalone styled document)
 * ✓ Dark mode toggle with system preference detection
 * ✓ Auto-save to localStorage with restore prompt
 * ✓ Word/character count
 * ✓ Keyboard shortcuts (Ctrl+B, Ctrl+I, Ctrl+K, Ctrl+[, Ctrl+])
 * ✓ Table Generator Wizard
 * ✓ Cheatsheet accordion
 * 
 * Author: Jessel Sookha / Andika Project
 * License: MIT
 * ============================================
 */

// ============================================
// 1. CORE EDITOR INITIALIZATION
// ============================================

/**
 * Initialize CodeMirror on the <textarea> element.
 * Provides line numbers, markdown syntax highlighting,
 * and line wrapping for long content.
 */
const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    lineNumbers: true,
    mode: 'markdown',
    theme: 'default',
    lineWrapping: true,
    extraKeys: {
        // Keyboard shortcuts for common Markdown formatting
        'Ctrl-B': () => wrapSelection('**', '**'),        // Bold
        'Ctrl-I': () => wrapSelection('*', '*'),          // Italic
        'Ctrl-K': () => insertLink(),                    // Link
        'Ctrl-[': () => decreaseHeading(),               // Decrease heading level
        'Ctrl-]': () => increaseHeading(),               // Increase heading level
        'Ctrl-L': () => insertBulletList(),              // Bullet list
        'Ctrl-Alt-C': () => insertCodeBlock(),           // Code block
        'Ctrl-Alt-T': () => openTableWizard(),           // Table wizard
        'Shift-Ctrl-P': () => exportAsPDF(),             // PDF export
        'Shift-Ctrl-H': () => exportAsHTML()             // HTML export
    }
});

// ============================================
// 2. TEMPLATE DATA STRUCTURE
// ============================================

/**
 * TEMPLATE LIBRARY — STUDENT FOCUSED
 * 25+ templates with substantial boilerplate.
 * Students MUST edit placeholders—this teaches documentation.
 */
const templates = {
    // ------------------------------------------------------------
    // ⌗ PROJECT FOUNDATIONS
    // ------------------------------------------------------------
    
    'title-badges': `# ${getCurrentFilename()}

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.0.0-brightgreen)

**Course:** [Course Code/Name]  
**Author:** [Your Full Name]  
**Student Number:** [Your Student ID/Number]  
**Submission Date:** ${new Date().toLocaleDateString('en-ZA')}

## Brief Description

[Write 2-3 sentences explaining what this project does and why it exists. What problem does it solve? What did you learn?]

`,

    'project-structure': `## Project Structure

\`\`\`
📁 project-root/
├── 📁 src/                 # Source code
│   ├── 📁 components/      # Reusable components
│   ├── 📁 utils/           # Helper functions
│   └── index.js            # Entry point
├── 📁 tests/               # Unit/integration tests
├── 📁 docs/                # Additional documentation
├── 📄 README.md            # You are here
├── 📄 package.json         # Dependencies
└── 📄 .gitignore           # Version control
\`\`\`

**Key Files:**
- \`src/index.js\` - Main application entry point
- \`[add other important files]\`

`,

    'objectives': `## Learning Objectives

This project demonstrates proficiency in:

- [ ] **Objective 1:** [e.g., Implementing RESTful API endpoints]
- [ ] **Objective 2:** [e.g., Database design and normalization]
- [ ] **Objective 3:** [e.g., Responsive front-end development]
- [ ] **Objective 4:** [e.g., Version control with Git/GitHub]

**Self-Assessment:** [Rate your confidence in each objective: Excellent/Good/Needs Improvement]

`,

    'status': `## Project Status

🚧 **Current Phase:** [Planning / Development / Testing / Complete]

**Progress:**
- [x] Core functionality implemented
- [ ] Testing in progress
- [ ] Documentation complete
- [ ] Ready for submission

**Known Limitations:**
- [List any features not yet implemented or known bugs]

`,

    // ------------------------------------------------------------
    // ⎌ TECHNICAL DOCUMENTATION
    // ------------------------------------------------------------
    
    'tech': `## Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| [React](https://reactjs.org/) | 18.2.0 | Frontend UI library |
| [Node.js](https://nodejs.org/) | 20.x | Runtime environment |
| [Express](https://expressjs.com/) | 4.18.0 | Backend framework |
| [MongoDB](https://www.mongodb.com/) | 7.0 | Database |
| [Additional tools] | | |

**Development Tools:**
- Android Studio
- Visual Studio
- VS Code with [extensions used]
- Git for version control
- [Testing framework]

`,

    'install': `## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Database] (if applicable)

### Local Setup

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Configure environment variables**
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your local settings
   \`\`\`

4. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to \`http://localhost:3000\`

`,

    'configuration': `## Configuration

### Environment Variables

Create a \`.env\` file in the root directory:

\`\`\`env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/dbname

# API Keys
API_KEY=your_api_key_here
JWT_SECRET=your_secret_key

# Optional Settings
DEBUG_MODE=true
LOG_LEVEL=info
\`\`\`

### Configuration Files

- \`config/default.js\` - Default application settings
- \`config/production.js\` - Production overrides
- \`config/development.js\` - Development overrides

`,

    'usage': `## Usage Examples

### Basic Usage

\`\`\`javascript
// Import the library
import { Project } from './src';

// Initialize with configuration
const app = new Project({
  port: 3000,
  debug: true
});

// Start the application
app.start();
\`\`\`

### Common Operations

**Example 1: [Describe what this does]**
\`\`\`javascript
// Code example here
\`\`\`

**Example 2: [Describe what this does]**
\`\`\`bash
# CLI example here
\`\`\`

### Expected Output

\`\`\`
[Show what the user should see]
\`\`\`

`,

    'api': `## API Reference

### Base URL
\`https://api.yourproject.com/v1\`

### Authentication
All API requests require an API key via the \`Authorization\` header:
\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`

### Endpoints

#### GET /items
Retrieve all items.

**Parameters:**
| Name | Type | In | Description |
|------|------|-----|-------------|
| \`limit\` | integer | query | Number of items to return (default: 10) |
| \`offset\` | integer | query | Pagination offset |

**Response:**
\`\`\`json
{
  "data": [...],
  "pagination": {
    "total": 100,
    "limit": 10,
    "offset": 0
  }
}
\`\`\`

#### POST /items
Create a new item.

**Request Body:**
\`\`\`json
{
  "name": "string",
  "description": "string"
}
\`\`\`

`,

    // ------------------------------------------------------------
    // ⌘ ASSESSMENT & SUBMISSION
    // ------------------------------------------------------------
    
    'academic-declaration': `## Academic Integrity Declaration

I hereby confirm that:

✅ This submission is my own original work  
✅ All code and content from external sources are properly cited  
✅ I have not copied work from other students or online sources without attribution  
✅ I understand the consequences of academic dishonesty as outlined in the course policy  

**Name:** ______________________________  
**Student Num:** ________________________  
**Date:** ${new Date().toLocaleDateString('en-ZA')}

---
*"I have read, understood, and complied with the academic integrity policy."*

`,

    'challenges': `## Challenges Faced & Solutions

| Challenge | Approach Taken | Outcome |
|-----------|---------------|---------|
| **Challenge 1:** [Describe a technical difficulty] | [How you attempted to solve it] | [What worked/didn't work] |
| **Challenge 2:** [Time management, learning curve, etc.] | [Your strategy] | [Result] |
| **Challenge 3:** [Collaboration/teamwork issue] | [How you resolved it] | [Lesson learned] |

### Most Significant Challenge

[Write a paragraph about the most difficult problem you encountered and how you ultimately solved it. What resources did you use? Who helped you?]

### What I Would Do Differently

[Reflection: If you started this project again, what would you change about your approach?]

`,

    'what-i-learned': `## What I Learned

### Technical Skills Gained

| Skill | Proficiency Level | Evidence |
|-------|------------------|----------|
| [Skill 1: e.g., Async/await] | ⭐⭐⭐⭐ | [Link to code/commit] |
| [Skill 2: e.g., Database indexing] | ⭐⭐⭐ | [Explain where you applied it] |
| [Skill 3: e.g., Responsive design] | ⭐⭐⭐⭐ | [Screenshot or description] |

### Professional Skills Developed

- **Problem-solving:** [Specific example of debugging process]
- **Time management:** [How you planned and executed work]
- **Documentation:** [Improvement in writing technical docs]
- **Version control:** [Git workflow learned]

### Key Takeaways

> [One sentence that summarizes the most important lesson from this project]

`,

    'known-issues': `## Known Issues & Limitations

### Current Issues

1. **[Issue description]**  
   - **Impact:** [Who it affects, how severe]  
   - **Workaround:** [How to avoid or mitigate]  
   - **Planned fix:** [In next version / not planned]

2. **[Issue description]**  
   - **Impact:**  
   - **Workaround:**  
   - **Planned fix:**

### Limitations

- [Architectural limitation or design trade-off]
- [Feature not implemented due to time constraints]
- [Performance consideration]

### Browser/Environment Compatibility

| Browser | Status | Notes |
|---------|--------|-------|
| Chrome | ✅ Fully supported | |
| Firefox | ✅ Fully supported | |
| Safari | ⚠️ Partial | [Issue details] |
| Edge | ✅ Fully supported | |

`,

    'self-assessment': `## Self-Assessment Checklist

### Functional Requirements

| Requirement | Completed | Notes |
|-------------|-----------|-------|
| [Requirement 1 from assignment] | ✅ / ❌ | [Brief justification] |
| [Requirement 2 from assignment] | ✅ / ❌ | |
| [Requirement 3 from assignment] | ✅ / ❌ | |
| [Bonus/extension] | ✅ / ❌ | |

### Code Quality

- [ ] Code is properly formatted and consistent
- [ ] Variables/functions have meaningful names
- [ ] Comments explain "why" not "what"
- [ ] No commented-out code or console.log statements
- [ ] Error handling is implemented

### Documentation

- [ ] README includes all required sections
- [ ] Setup instructions are clear and tested
- [ ] API documentation is complete
- [ ] Comments document complex logic

### Final Grade Expectation

**I believe this work deserves:** _____ / 100  

**Justification:** [Explain why this grade is appropriate based on the rubric]

`,

    // ------------------------------------------------------------
    // ⚌ COLLABORATION
    // ------------------------------------------------------------
    
    'contributing': `## Contributing Guidelines

Thank you for considering contributing to this project! This is a student project, but feedback and suggestions are welcome.

### How to Contribute

1. **Fork the repository** (if applicable)
2. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`
3. **Commit your changes**
   \`\`\`bash
   git commit -m "Add: brief description of change"
   \`\`\`
4. **Push to the branch**
   \`\`\`bash
   git push origin feature/your-feature-name
   \`\`\`
5. **Open a Pull Request**

### Code Style

- Use 2 spaces for indentation
- Follow existing naming conventions
- Write clear commit messages

### Reporting Issues

If you find a bug or have a suggestion:
1. Check if it's already reported
2. Open a new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior

`,

    'team-roles': `## Team Roles & Responsibilities

| Team Member | Role | Primary Responsibilities |
|-------------|------|------------------------|
| [Name 1] | Project Lead | Overall coordination, final submission |
| [Name 2] | Frontend Developer | UI components, user experience |
| [Name 3] | Backend Developer | API, database, server logic |
| [Name 4] | Documentation Lead | README, comments, guides |

### Communication

- **Primary channel:** [Slack/Discord/Teams]
- **Meeting schedule:** [Day/Time, e.g., Mon/Wed 3pm]
- **Task tracking:** [Trello/GitHub Projects/Notion]

### Contribution Summary

| Team Member | Contributions | Commits | Lines of Code |
|-------------|--------------|---------|---------------|
| [Name 1] | [Brief summary] | [#] | [#] |
| [Name 2] | [Brief summary] | [#] | [#] |

`,

    'code-of-conduct': `## Code of Conduct

### Our Pledge

We as members, contributors, and leaders pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behaviour includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community

**Unacceptable behaviour includes:**
- Sexualized language or imagery
- Trolling, insulting, derogatory comments
- Public or private harassment
- Publishing others' private information

### Enforcement

Project maintainers are responsible for clarifying and enforcing this code. Instances of abusive behaviour may be reported by contacting [email address].

`,

    // ------------------------------------------------------------
    // ⌂ RELEASE & MAINTENANCE
    // ------------------------------------------------------------
    
    'changelog-enhanced': `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- [New feature] - [Brief description]
- [New feature] - [Brief description]

### Changed
- [Modification] - [Reason for change]
- [Dependency update] - [From version → to version]

### Fixed
- [Bug fix] - [Issue resolved]
- [Performance improvement] - [Impact]

### Deprecated
- [Feature] - [Will be removed in version X]

## [1.0.0] - ${new Date().toLocaleDateString('en-ZA')}

### Added
- Initial release
- Core functionality implemented
- Basic documentation

### Notes
This is the first stable release submitted for assessment.

`,

    'version': `## Version History

### v1.0.0 (${new Date().toLocaleDateString('en-ZA')})
- Initial submission for assessment
- Core features complete
- [Link to release/tag]

### v0.9.0 (Previous milestone)
- Beta version with key features
- Testing and bug fixes

### v0.1.0 (Development start)
- Project initialization
- Basic setup

**Repository:** [Link to GitHub repo]  
**License:** [MIT/GPL/Other]  
**Author:** [Your name/team]

`,

    'roadmap': `## Future Roadmap

### Short-term (Next 2 weeks)

- [ ] **Feature:** [e.g., Dark mode toggle]  
  *Priority: High*  
  *Why: Improves user experience*

- [ ] **Enhancement:** [e.g., Improved error handling]  
  *Priority: Medium*

- [ ] **Testing:** [e.g., Unit tests for API]  
  *Priority: High*

### Medium-term (Next month)

- [ ] **Integration:** [e.g., Third-party API]  
- [ ] **Performance:** [e.g., Lazy loading images]  
- [ ] **Deployment:** [e.g., CI/CD pipeline]  

### Long-term (Future semesters)

- [ ] **Major feature:** [Idea description]  
- [ ] **Refactoring:** [Architectural improvement]  
- [ ] **Research:** [New technology to explore]  

**Feedback welcome!** Open an issue or contact the development team with suggestions.

`,

    'support': `## Support & Contact

### Getting Help

If you encounter issues with this project:

1. **First, check the documentation** in this README
2. **Review known issues** in the [Issues](link-to-issues) section
3. **Search existing discussions** for similar problems

### Contact Methods

| Purpose | Contact | Response Time |
|---------|---------|---------------|
| **Course-related questions** | [Instructor/TA email] | 24-48 hours |
| **Technical issues** | [Developer email] | 1-3 days |
| **General inquiries** | [Project email] | 3-5 days |

### Reporting Problems

When reporting an issue, please include:
- Description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/OS version

**We aim to respond to all inquiries within 48 hours.**

`
};

// ============================================
// 3. APPLICATION STATE
// ============================================

let fileHandle = null;
let autoSaveTimer = null;

// ============================================
// 4. HELPER FUNCTIONS
// ============================================

/**
 * Get current filename from input field
 */
function getCurrentFilename() {
    const input = document.getElementById('filename');
    return input?.value?.replace('.md', '') || 'Project Title';
}

/**
 * Wrap selected text with prefix and suffix (for bold, italic, etc.)
 */
function wrapSelection(prefix, suffix) {
    const selection = editor.getSelection();
    if (selection) {
        editor.replaceSelection(prefix + selection + suffix);
    } else {
        // If no selection, insert placeholder and position cursor between
        const cursor = editor.getCursor();
        editor.replaceRange(prefix + 'text' + suffix, cursor);
        // Move cursor inside the markers
        const newPos = {
            line: cursor.line,
            ch: cursor.ch + prefix.length
        };
        editor.setCursor(newPos);
    }
    editor.focus();
}

/**
 * Insert link at cursor position
 */
function insertLink() {
    const selection = editor.getSelection();
    if (selection) {
        editor.replaceSelection('[' + selection + '](url)');
        // Position cursor after url
        const cursor = editor.getCursor();
        editor.setCursor({
            line: cursor.line,
            ch: cursor.ch - 1
        });
    } else {
        editor.replaceSelection('[text](url)');
        // Move cursor to 'text' position
        const cursor = editor.getCursor();
        editor.setCursor({
            line: cursor.line,
            ch: cursor.ch - 7
        });
    }
    editor.focus();
}

/**
 * Increase heading level (#)
 */
function increaseHeading() {
    const cursor = editor.getCursor();
    const line = editor.getLine(cursor.line);
    
    if (line.startsWith('#')) {
        // Add one more #
        editor.replaceRange('#', { line: cursor.line, ch: 0 });
    } else {
        // Add # at beginning
        editor.replaceRange('# ', { line: cursor.line, ch: 0 });
    }
}

/**
 * Decrease heading level (remove one #)
 */
function decreaseHeading() {
    const cursor = editor.getCursor();
    const line = editor.getLine(cursor.line);
    
    if (line.startsWith('#')) {
        // Remove one # and following space if present
        if (line.startsWith('# ')) {
            editor.replaceRange('', { line: cursor.line, ch: 0 }, { line: cursor.line, ch: 2 });
        } else {
            editor.replaceRange('', { line: cursor.line, ch: 0 }, { line: cursor.line, ch: 1 });
        }
    }
}

/**
 * Insert bullet list at cursor
 */
function insertBulletList() {
    const cursor = editor.getCursor();
    editor.replaceRange('- ', cursor);
    editor.focus();
}

/**
 * Insert code block
 */
function insertCodeBlock() {
    editor.replaceSelection('```\n\n```');
    const cursor = editor.getCursor();
    editor.setCursor({
        line: cursor.line - 1,
        ch: 0
    });
    editor.focus();
}

// ============================================
// 5. EXPORT FUNCTIONS
// ============================================

/**
 * EXPORT AS PDF
 * Uses browser's print-to-PDF functionality
 */
function exportAsPDF() {
    const originalTitle = document.title;
    const filename = document.getElementById('filename').value.replace('.md', '');
    document.title = `${filename} - Andika Export`;
    window.print();
    document.title = originalTitle;
}

/**
 * EXPORT AS HTML
 * Creates standalone HTML document from preview content
 */
function exportAsHTML() {
    const filename = document.getElementById('filename').value.replace('.md', '') || 'document';
    const content = document.getElementById('preview').innerHTML;
    const author = extractAuthorFromContent() || 'Andika User';
    const date = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    const css = `
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
            line-height: 1.6;
            max-width: 900px;
            margin: 40px auto;
            padding: 0 20px;
            color: #24292e;
        }
        h1, h2 { border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
        h1 { font-size: 2em; }
        h2 { font-size: 1.5em; }
        h3 { font-size: 1.25em; }
        code {
            background-color: #f6f8fa;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-family: 'Fira Mono', monospace;
            font-size: 85%;
        }
        pre {
            background-color: #f6f8fa;
            padding: 16px;
            overflow: auto;
            border-radius: 6px;
        }
        pre code { background: none; padding: 0; }
        blockquote {
            border-left: 4px solid #ff715bff;
            padding: 0 1em;
            color: #6a737d;
            margin: 0;
        }
        table {
            border-collapse: collapse;
            width: 100%;
        }
        th, td {
            border: 1px solid #dfe2e5;
            padding: 6px 13px;
        }
        th { background-color: #f6f8fa; }
        .metadata {
            color: #586069;
            font-size: 14px;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eaecef;
        }
    `;
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${filename} - Andika Export</title>
    <style>${css}</style>
</head>
<body>
    <h1>${filename}</h1>
    <div class="metadata">
        <strong>Author:</strong> ${author}<br>
        <strong>Date:</strong> ${date}<br>
        <strong>Generated by:</strong> Andika Markdown Editor
    </div>
    ${content}
</body>
</html>`;
    
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.html`;
    a.click();
    URL.revokeObjectURL(url);
}

/**
 * Extract author name from document content
 */
function extractAuthorFromContent() {
    const content = editor.getValue();
    const authorMatch = content.match(/(?:Author|By)[:\s]+([^\n]+)/i);
    return authorMatch ? authorMatch[1].trim() : null;
}

// ============================================
// 6. DARK MODE
// ============================================

function initDarkMode() {
    const darkModeBtn = document.getElementById('btn-dark-mode');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('andika-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        body.classList.add('dark-mode');
        darkModeBtn.textContent = '☾';
    } else {
        darkModeBtn.textContent = '☀︎';
    }
    
    darkModeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('andika-theme', 'dark');
            darkModeBtn.textContent = '☾';
        } else {
            localStorage.setItem('andika-theme', 'light');
            darkModeBtn.textContent = '☀︎';
        }
    });
}

// ============================================
// 7. UI INITIALIZATION FUNCTIONS
// ============================================

/**
 * Initialize accordion for templates
 */
function initAccordion() {
    const headers = document.querySelectorAll('.accordion-header');
    
    headers.forEach(header => {
        header.addEventListener('click', function(e) {
            const category = this.dataset.category;
            const content = document.getElementById(`category-${category}`);
            const isActive = this.classList.contains('active');
            
            headers.forEach(h => {
                h.classList.remove('active');
            });
            document.querySelectorAll('.accordion-content').forEach(c => {
                c.style.display = 'none';
            });
            
            if (!isActive) {
                this.classList.add('active');
                if (content) content.style.display = 'block';
            }
        });
    });
    
    // Open first accordion by default
    const firstHeader = document.querySelector('.accordion-header');
    if (firstHeader) {
        firstHeader.classList.add('active');
        const firstCategory = firstHeader.dataset.category;
        const firstContent = document.getElementById(`category-${firstCategory}`);
        if (firstContent) firstContent.style.display = 'block';
    }
}

/**
 * Initialize cheatsheet accordion
 */
function initCheatsheetAccordion() {
    const headers = document.querySelectorAll('.cheatsheet-header');
    
    headers.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all others
            headers.forEach(h => {
                h.classList.remove('active');
            });
            document.querySelectorAll('.cheatsheet-content').forEach(c => {
                c.style.display = 'none';
            });
            
            // Open clicked one if it wasn't active
            if (!isActive) {
                this.classList.add('active');
                content.style.display = 'block';
            }
        });
    });
    
    // Open first cheatsheet section by default
    const firstHeader = document.querySelector('.cheatsheet-header');
    if (firstHeader) {
        firstHeader.classList.add('active');
        const firstContent = firstHeader.nextElementSibling;
        if (firstContent) firstContent.style.display = 'block';
    }
}

/**
 * Initialize template search functionality
 */
function initTemplateSearch() {
    const searchInput = document.getElementById('template-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        const allTemplates = document.querySelectorAll('.template-list li');
        
        allTemplates.forEach(template => {
            const text = template.textContent.toLowerCase();
            const matches = text.includes(searchTerm) || searchTerm === '';
            template.style.display = matches ? 'flex' : 'none';
        });
        
        document.querySelectorAll('.accordion-item').forEach(item => {
            const visibleTemplates = Array.from(item.querySelectorAll('.template-list li'))
                .filter(li => li.style.display !== 'none').length;
            item.style.display = visibleTemplates > 0 ? 'block' : 'none';
        });
    });
}

/**
 * Initialize template insertion
 */
function initTemplateInsertion() {
    // Use event delegation for dynamically added elements
    document.addEventListener('click', function(e) {
        const templateItem = e.target.closest('.template-list li');
        if (!templateItem) return;
        
        e.stopPropagation();
        
        const templateName = templateItem.getAttribute('data-template');
        const templateText = templates[templateName];
        
        if (templateText) {
            editor.replaceSelection(templateText);
            editor.focus();
        }
    });
}

/**
 * Update word count in real-time
 */
function updateWordCount() {
    const text = editor.getValue();
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    
    const wordCountElement = document.getElementById('word-count');
    if (wordCountElement) {
        wordCountElement.textContent = `${words} words`;
        wordCountElement.title = `${chars} characters`;
    }
}

/**
 * Auto-save to localStorage
 */
function autoSaveToLocalStorage() {
    const content = editor.getValue();
    const filename = document.getElementById('filename').value;
    
    try {
        localStorage.setItem('andika-autosave-content', content);
        localStorage.setItem('andika-autosave-filename', filename);
        localStorage.setItem('andika-autosave-timestamp', Date.now().toString());
    } catch (e) {
        console.warn('Auto-save failed:', e);
    }
}

/**
 * Check for auto-saved content on load
 */
function checkForAutoSave() {
    const savedContent = localStorage.getItem('andika-autosave-content');
    const savedFilename = localStorage.getItem('andika-autosave-filename');
    const savedTimestamp = localStorage.getItem('andika-autosave-timestamp');
    
    if (savedContent && savedContent.trim() !== '') {
        const date = savedTimestamp ? new Date(parseInt(savedTimestamp)).toLocaleString() : 'recently';
        
        if (confirm(`Found unsaved work from ${date}. Would you like to restore it?`)) {
            editor.setValue(savedContent);
            if (savedFilename) {
                document.getElementById('filename').value = savedFilename;
            }
        } else {
            localStorage.removeItem('andika-autosave-content');
            localStorage.removeItem('andika-autosave-filename');
            localStorage.removeItem('andika-autosave-timestamp');
        }
    }
}

// ============================================
// 8. TABLE GENERATOR WIZARD
// ============================================

/**
 * Open table wizard modal
 */
function openTableWizard() {
    const modal = document.getElementById('table-wizard-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

/**
 * Initialize table wizard
 */
function initTableWizard() {
    const modal = document.getElementById('table-wizard-modal');
    const openBtn = document.getElementById('btn-table-wizard');
    const closeBtn = document.getElementById('close-table-wizard');
    const cancelBtn = document.getElementById('btn-cancel-table');
    const insertBtn = document.getElementById('btn-insert-table');
    
    if (openBtn) {
        openBtn.addEventListener('click', openTableWizard);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    if (insertBtn) {
        insertBtn.addEventListener('click', () => {
            const cols = parseInt(document.getElementById('table-cols').value) || 3;
            const rows = parseInt(document.getElementById('table-rows').value) || 4;
            const align = document.getElementById('table-align').value;
            
            let table = '';
            
            // Header row
            table += '|';
            for (let i = 0; i < cols; i++) {
                table += ` Column ${i + 1} |`;
            }
            table += '\n';
            
            // Separator row with alignment
            table += '|';
            for (let i = 0; i < cols; i++) {
                switch(align) {
                    case 'left': table += ' :--- |'; break;
                    case 'center': table += ' :---: |'; break;
                    case 'right': table += ' ---: |'; break;
                    default: table += ' --- |';
                }
            }
            table += '\n';
            
            // Data rows
            for (let r = 0; r < rows - 1; r++) {
                table += '|';
                for (let c = 0; c < cols; c++) {
                    table += '  |';
                }
                table += '\n';
            }
            
            editor.replaceSelection(table);
            editor.focus();
            modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// ============================================
// 9. EVENT LISTENERS
// ============================================

/**
 * Editor change handler (preview, word count, auto-save)
 */
editor.on('change', () => {
    const markdownText = editor.getValue();
    
    try {
        const htmlContent = marked.parse(markdownText, {
            gfm: true,
            breaks: true,
            headerIds: true,
            mangle: false,
            smartLists: true,
            smartypants: true
        });
        
        document.getElementById('preview').innerHTML = htmlContent;
        
        // Initialize Mermaid diagrams
        setTimeout(() => {
            mermaid.init(undefined, document.querySelectorAll('.language-mermaid'));
        }, 100);
        
        updateWordCount();
        
        clearTimeout(autoSaveTimer);
        autoSaveTimer = setTimeout(autoSaveToLocalStorage, 2000);
        
    } catch (error) {
        console.error('Preview rendering failed:', error);
        document.getElementById('preview').innerHTML = 
            `<p style="color: var(--vibrant-coral);">⚠️ Error rendering preview: ${error.message}</p>`;
    }
});

/**
 * New Document
 */
document.getElementById('btn-new').addEventListener('click', () => {
    if (editor.getValue().trim() !== '') {
        if (confirm('Create a new document? Any unsaved changes will be lost.')) {
            editor.setValue('');
            document.getElementById('filename').value = 'Untitled.md';
            fileHandle = null;
            localStorage.removeItem('andika-autosave-content');
        }
    } else {
        editor.setValue('');
        document.getElementById('filename').value = 'Untitled.md';
        fileHandle = null;
    }
});

/**
 * Save Document
 */
document.getElementById('btn-save').addEventListener('click', async () => {
    try {
        if (!fileHandle) {
            const opts = {
                suggestedName: document.getElementById('filename').value || 'README.md',
                types: [{
                    description: 'Markdown File',
                    accept: {'text/markdown': ['.md', '.markdown']},
                }],
            };
            fileHandle = await window.showSaveFilePicker(opts);
        }
        
        const writable = await fileHandle.createWritable();
        await writable.write(editor.getValue());
        await writable.close();
        document.getElementById('filename').value = fileHandle.name;
        
        // Visual feedback
        const saveBtn = document.getElementById('btn-save');
        saveBtn.style.backgroundColor = '#4CAF50';
        saveBtn.style.color = 'white';
        setTimeout(() => {
            saveBtn.style.backgroundColor = '';
            saveBtn.style.color = '';
        }, 500);
        
    } catch (err) {
        if (err.name !== 'AbortError') {
            console.error('Save failed:', err);
            alert(`Save failed: ${err.message}`);
        }
    }
});

/**
 * Open Document
 */
document.getElementById('btn-open').addEventListener('click', async () => {
    try {
        const pickerOpts = {
            types: [{
                description: 'Markdown File',
                accept: {'text/markdown': ['.md', '.markdown']},
            }],
            multiple: false
        };
        
        [fileHandle] = await window.showOpenFilePicker(pickerOpts);
        const file = await fileHandle.getFile();
        const contents = await file.text();
        
        editor.setValue(contents);
        document.getElementById('filename').value = file.name;
        
    } catch (err) {
        if (err.name !== 'AbortError') {
            console.error('Open failed:', err);
            alert(`Open failed: ${err.message}`);
        }
    }
});

/**
 * Export event listeners
 */
document.getElementById('btn-export-pdf')?.addEventListener('click', exportAsPDF);
document.getElementById('btn-export-html')?.addEventListener('click', exportAsHTML);

/**
 * Help Modal
 */
const helpModal = document.getElementById("help-modal");
const helpBtn = document.getElementById("btn-help");
const closeBtn = document.getElementsByClassName("close-btn")[0];

if (helpBtn && helpModal) {
    helpBtn.onclick = () => { helpModal.style.display = "block"; };
}

if (closeBtn) {
    closeBtn.onclick = () => { helpModal.style.display = "none"; };
}

window.onclick = (event) => {
    if (event.target == helpModal) {
        helpModal.style.display = "none";
    }
};

// ============================================
// 10. INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize UI components
    initAccordion();
    initCheatsheetAccordion();
    initTemplateSearch();
    initTemplateInsertion();
    initDarkMode();
    initTableWizard();
    
    // Check for unsaved work
    checkForAutoSave();
    
    // Set initial word count
    updateWordCount();
    
    // Initialize Mermaid
    mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose',
        flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: 'basis'
        }
    });
    
    console.log('Andika initialized successfully');
    
    // Focus editor
    editor.focus();
});

/**
 * Before unload warning
 */
window.addEventListener('beforeunload', (e) => {
    const content = editor.getValue();
    if (content.trim() !== '' && !fileHandle) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
    }
});