📅 Physical Calendar UI (React + Next.js)
=========================================

A visually rich, interactive **wall-style calendar UI** built using **Next.js, React, Tailwind CSS, and date-fns**.This project focuses on delivering a **realistic physical calendar experience** with smooth animations and intuitive interactions.

🚀 Features
-----------

*   🗓️ **Interactive Calendar Grid**
    
    *   Select single date or date range
        
    *   Click cycle: Start → End → Reset
        
*   ✍️ **Notes System**
    
    *   Add notes to selected dates
        
    *   Stored in **localStorage** (persistent across reloads)
        
*   🎬 **3D Flip Animation**
    
    *   Month navigation with realistic page flip
        
    *   Direction-aware animation (forward/backward)
        
*   🎨 **Modern UI**
    
    *   Tailwind CSS styling
        
    *   Clean card-based layout
        
    *   Responsive design
        

🧠 Key Design Decisions
-----------------------

### 1\. LocalStorage with Lazy Initialization

Instead of loading data in useEffect, we used **lazy initialization**:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   const [notes, setNotes] = useState(() => {    const stored = localStorage.getItem('calendarNotes')    return stored ? JSON.parse(stored) : {}  })   `

✅ Avoids extra re-renders✅ Removes React warnings✅ Improves performance

### 2\. Functional State Updates (Bug Fix)

Handled stale state issue in date selection:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   setSelectedDates(prev => {    // logic using prev state  })   `

✅ Ensures correct range selection✅ Prevents inconsistent UI behavior

### 3\. Controlled 3D Animation

Used rotateX with dynamic transformOrigin:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   transformOrigin: flipDirection === 'forward'    ? 'top center'    : 'bottom center'   `

✅ Realistic page flip effect✅ Direction-aware animation

### 4\. Type Safety (TypeScript Fix)

Handled nullable dates safely:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   date ? format(date, 'yyyy-MM-dd') : ''   `

✅ Prevents runtime crashes✅ Eliminates TypeScript errors

### 5\. Component Structure

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   components/    calendar/      PhysicalCalendar.tsx      CalendarGrid.tsx      DayCell.tsx      HeroImage.tsx   `

*   **PhysicalCalendar** → Main container
    
*   **CalendarGrid** → Month layout
    
*   **DayCell** → Individual day
    
*   **HeroImage** → Month banner
    

🛠️ Tech Stack
--------------

*   ⚛️ React (with Hooks)
    
*   ▲ Next.js (App Router)
    
*   🎨 Tailwind CSS
    
*   📅 date-fns
    
*   🧩 shadcn/ui (optional UI components)
    
*   🔔 sonner (toast notifications, optional)
    

📦 Installation & Setup
-----------------------

### 1\. Clone the repository

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   git clone https://github.com/your-username/calendar-app.git  cd calendar-app   `

### 2\. Install dependencies

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   npm install   `

### 3\. Run the development server

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   npm run dev   `

### 4\. Open in browser

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   http://localhost:3000   `

⚠️ Notes
--------

*   Make sure you run this in a **client-side environment** ('use client')
    
*   localStorage will not work on server-side rendering
    

🔮 Future Improvements
----------------------

*   🔔 Toast notifications on save/delete
    
*   📱 Swipe gestures for mobile navigation
    
*   🌙 Dark mode
    
*   🗂️ Multi-note support per date
    
*   ☁️ Backend integration (Firebase / DB)
    

🙌 Conclusion
-------------

This project demonstrates:

*   Clean React state management
    
*   Real-world UI/UX thinking
    
*   Performance-aware coding practices
    
*   Modern frontend architecture