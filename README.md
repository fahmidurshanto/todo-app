# Todo App

A modern, responsive Todo application built with React 19, Redux Toolkit, and TailwindCSS. Features comprehensive task management with dark mode, search, filtering, and persistent local storage.

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup & Run

1. **Clone and Install**
   ```bash
   git clone <your-repo-url>
   cd todo-app
   npm install
   ```

2. **Development Server**
   ```bash
   npm run dev
   ```
   Opens at [http://localhost:5173](http://localhost:5173)

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```
   Opens at [http://localhost:4173](http://localhost:4173)

## Architecture Overview

### System Architecture
- **Frontend**: Single Page Application (SPA) with React 19.1.1
- **State Management**: Redux Toolkit with persistent localStorage
- **Build Tool**: Vite 7.1.2 for fast development and optimized builds
- **Styling**: TailwindCSS 4.1.12 with conditional dark mode classes

### Key Design Patterns
- **Component-based Architecture**: Modular React components
- **Redux Pattern**: Centralized state management with slices
- **Selector Pattern**: Memoized selectors for efficient state computation
- **Conditional Styling**: Theme-aware components with Redux state

### Project Structure
```
src/
├── components/          # Main UI components
│   ├── Header.jsx      # Stats display & dark mode toggle
│   ├── SearchSection.jsx # Search & filter controls
│   └── TaskManager.jsx   # Task management container
├── store/              # Redux configuration
│   ├── store.js        # Store setup with slices
│   └── slices/         # State management slices
│       ├── tasksSlice.js # Task CRUD & filtering
│       └── uiSlice.js    # UI state & theme management
├── utils/              # Utility components
│   ├── TaskList.jsx    # Task list container
│   ├── TaskItem.jsx    # Individual task component
│   ├── TaskModal.jsx   # Add/Edit modal
│   └── DarkModeToggle.jsx # Theme toggle
├── App.jsx             # Root component
└── main.jsx           # Application entry point
```

## Core Features

- ✅ **Task Management**: Create, edit, delete, and toggle completion
- 🔍 **Search & Filter**: Real-time search with status filtering (All/Active/Completed)
- 🌙 **Dark Mode**: Redux-based theme management with localStorage persistence
- 📱 **Responsive Design**: Mobile-first approach with TailwindCSS breakpoints
- ✨ **Animations**: Smooth transitions using Animate.css
- ⌨️ **Accessibility**: Keyboard navigation (Enter to save, Esc to cancel, double-click to edit)
- 💾 **Data Persistence**: localStorage integration for tasks and theme preferences

## Tech Stack

- **React**: 19.1.1 - UI library with hooks and functional components
- **Redux Toolkit**: 2.8.2 - State management with createSlice
- **TailwindCSS**: 4.1.12 - Utility-first CSS framework
- **Vite**: 7.1.2 - Build tool with HMR and fast development
- **Animate.css**: 4.1.1 - CSS animations
- **React Icons**: 5.5.0 - Icon components

## Development

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

### Environment Configuration

Optional environment variables (copy `.env.example` to `.env.local`):
```bash
VITE_APP_NAME=Todo App
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=Modern Todo Application
```

## Deployment

### Vercel Deployment (Recommended)

This app is pre-configured for Vercel with `vercel.json`:

1. **Push to Git repository**
   ```bash
   git add .
   git commit -m "feat: deploy to vercel"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your repository
   - Auto-detects Vite framework
   - Deploy with one click

3. **CLI Deployment**
   ```bash
   npm i -g vercel
   vercel
   ```

See `DEPLOYMENT.md` for detailed deployment guide.

## State Management

### Redux Store Structure

```javascript
// Store State Shape
{
  tasks: {
    tasks: [...],           // Array of task objects
    isLoading: boolean      // Loading state
  },
  ui: {
    searchValue: string,    // Search query
    filterValue: string,    // 'all' | 'active' | 'completed'
    theme: string,          // 'light' | 'dark'
    isModalOpen: boolean,   // Modal visibility
    editingTask: object,    // Task being edited
    // ... other UI states
  }
}
```

### Key Selectors
- `selectFilteredTasks` - Filtered and searched tasks
- `selectTaskCounts` - Task statistics (all/active/completed)
- `selectTheme` - Current theme preference

### Data Flow
1. **Components** dispatch actions to Redux store
2. **Reducers** update state immutably
3. **Selectors** compute derived state
4. **localStorage** persists tasks and theme
5. **Components** re-render on state changes

## Key Implementation Details

### Theme Management
- **Redux-based**: Theme state managed in `uiSlice.js`
- **Conditional Classes**: Uses `theme === 'dark' ? '...' : '...'` pattern
- **Persistence**: localStorage integration with hydration safety
- **DOM Sync**: Automatic HTML class updates via useEffect

### Task Operations
- **CRUD Operations**: Full create, read, update, delete functionality
- **Inline Editing**: Double-click tasks to edit in place
- **Modal Editing**: Comprehensive edit form with validation
- **Bulk Actions**: Clear completed tasks with single action

### Performance Optimizations
- **Memoized Selectors**: Efficient state computation
- **Code Splitting**: Vendor and Redux chunks separated
- **Asset Optimization**: Minified builds with Vite
- **Lazy Loading**: Components loaded on demand

### Accessibility Features
- **Keyboard Navigation**: Enter/Esc for save/cancel
- **Semantic HTML**: Proper heading hierarchy and labels
- **Focus Management**: Logical tab order and focus trapping
- **Screen Reader Support**: ARIA attributes and announcements

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Requirements**: ES2015+ support, CSS Grid, Flexbox

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 5173
   npx kill-port 5173
   npm run dev
   ```

2. **Theme not persisting**
   - Check localStorage permissions
   - Verify browser supports localStorage

3. **Build fails**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Follow commit conventions (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - see LICENSE file for details.

---

**Built with using React, Redux, and TailwindCSS**

