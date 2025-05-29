# HPE Predictive Maintenance Platform

A modern, AI-powered predictive maintenance application built for industrial equipment monitoring and failure prediction. This platform provides real-time machine analytics, intelligent failure predictions, and comprehensive project management capabilities.

![HPE Logo](public/HPE_Logo_Light.png)

## 🚀 Features

### 🏭 **Project Management**
- Create and manage predictive maintenance projects
- Project overview with visual cards and statistics
- Archive and organize historical projects
- Intuitive project creation workflow

### 📊 **Real-Time Data Dashboard**
- Live machine metrics visualization
- Interactive charts powered by Recharts
- Multi-machine monitoring capabilities
- Date range filtering and data analysis
- Comprehensive failure tracking
- Maintenance scheduling and history

### 🤖 **AI Assistant**
- Intelligent chat interface for machine insights
- **Simulation Engine**: Run custom machine parameter simulations
- **Prediction Analytics**: AI-powered failure probability analysis
- **System Health Checks**: Real-time system status monitoring
- Interactive forms for prediction and simulation requests

### 🔧 **Machine Management**
- Machine registration and configuration
- Parameter monitoring (AFR, Current, Pressure, RPM, Temperature, Vibration)
- Machine defaults and customization
- Live sensor data integration

### ⚙️ **Advanced Capabilities**
- Model training and deployment workflows
- File upload and data processing
- Progress tracking for long-running operations
- Dark/Light theme support
- Responsive design for all devices
- Enterprise-grade security and authentication

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality component library built on Radix UI
- **Lucide React** - Beautiful icon library
- **React Router DOM** - Client-side routing
- **React Hook Form** - Performant form handling
- **React Query (TanStack Query)** - Data fetching and state management

### **UI Components & Libraries**
- **Radix UI** - Accessible component primitives
- **Recharts** - Responsive chart library
- **React DatePicker** - Date selection components
- **React Hot Toast** - Toast notifications
- **Sonner** - Toast notification system
- **Next Themes** - Theme management
- **Zod** - TypeScript-first schema validation

### **Development Tools**
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **TypeScript ESLint** - TypeScript-specific linting rules

## 🏗️ Project Structure

```
predictive-maintenance/
├── public/                     # Static assets
│   ├── HPE_Logo_Dark.png      # HPE branding assets
│   ├── HPE_Logo_Light.png
│   └── robots.txt
├── src/
│   ├── components/            # Reusable components
│   │   ├── Layout/           # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── MainLayout.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── Projects/         # Project-specific components
│   │   │   ├── CreateProjectModal.tsx
│   │   │   └── ProjectCard.tsx
│   │   └── ui/              # shadcn/ui components
│   ├── pages/               # Page components
│   │   ├── Chat/           # AI Assistant pages
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── ChatPage.tsx
│   │   │   ├── PredictionForm.tsx
│   │   │   └── SimulationForm.tsx
│   │   ├── DataDashboard/  # Dashboard pages
│   │   │   ├── DataDashboard.tsx
│   │   │   ├── Failures.tsx
│   │   │   ├── LiveDataCharts.tsx
│   │   │   └── Maintenance.tsx
│   │   ├── ManageModels.tsx
│   │   ├── ProjectDetails.tsx
│   │   ├── Settings.tsx
│   │   └── Archived.tsx
│   ├── context/            # React context providers
│   │   ├── ProjectContext.tsx
│   │   └── ThemeContext.tsx
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API service layer
│   │   ├── apiService.ts
│   │   └── request.ts
│   ├── lib/                # Utility functions
│   │   └── utils.ts
│   ├── types.ts            # TypeScript type definitions
│   ├── App.tsx
│   ├── AppRoutes.tsx
│   └── main.tsx
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd predictive-maintanance
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 📊 API Integration

The application integrates with multiple backend services:

### **Machine Data Service** (Port 5000)
- `GET /api/machine_list` - Retrieve list of available machines
- `GET /api/machine_defaults?machine_id={id}` - Get machine default parameters
- `GET /api/project_list` - Get all projects
- `POST /api/projects` - Create new project
- `DELETE /api/projects?name={name}` - Delete project
- `GET /api/live_data?machine_id={id}` - Get real-time sensor data

### **AI Chat Service** (Port 5005)
- `POST /chat` - Send messages to AI assistant
- Supports simulation, prediction, and health check commands

### **File Processing Service** (Port 5010)
- `POST /upload` - Upload training data files
- `GET /progress` - Check training progress
- `POST /run-script` - Execute model training
- `POST /deploy-model` - Deploy trained models

### **Live Data Service**
- `GET /live-data/failures/{machine_id}` - Get failure history
- `GET /live-data/maintenance/{machine_id}` - Get maintenance records

## 💻 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Code Quality
- **ESLint** configured for React and TypeScript
- **TypeScript** strict mode enabled
- **Prettier** formatting (recommended to configure in your editor)

### Component Development
This project uses **shadcn/ui** components. To add new components:

```bash
npx shadcn-ui@latest add [component-name]
```

## 🎨 Theming

The application supports both light and dark themes:
- Theme switching available in the header
- Uses CSS variables for consistent theming
- Built with Tailwind CSS custom color palette
- HPE brand colors integrated throughout

## 🔧 Machine Parameters

The platform monitors these key machine parameters:
- **AFR** (Air-to-Fuel Ratio)
- **Current** (Electrical current in Amperes)
- **Pressure** (System pressure in Pa)
- **RPM** (Rotations per minute)
- **Temperature** (Operating temperature in °C)
- **Vibration** (Maximum vibration levels)

## 🤖 AI Features

### **Simulation Engine**
- Run custom parameter simulations
- Adjust machine parameters to predict outcomes
- Duration-based simulation runs
- Comprehensive result analysis

### **Prediction Analytics**
- AI-powered failure probability analysis
- Multiple failure type detection
- Confidence scoring for predictions
- Actionable maintenance recommendations

### **System Health Monitoring**
- Real-time system status checks
- Agent health monitoring (Data, Prediction, Simulation)
- Version and timestamp tracking
- Comprehensive system diagnostics

## 📱 Responsive Design

- **Mobile-first** approach using Tailwind CSS
- **Responsive grid** layouts for all screen sizes
- **Touch-friendly** interface for mobile devices
- **Optimized performance** for various devices

## 🔒 Security

- **Type-safe** API calls with TypeScript
- **Input validation** using Zod schemas
- **Secure routing** with React Router
- **Error boundaries** for graceful error handling

## 🚀 Deployment

### Build Optimization
- **Vite** provides optimized production builds
- **Code splitting** for improved loading performance
- **Asset optimization** and compression
- **Modern JS** output with legacy fallbacks

### Environment Configuration
Configure your environment variables for different deployment stages:
- API endpoints
- Service URLs
- Authentication settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is proprietary software developed for **Hewlett Packard Enterprise (HPE)**.

## 🙏 Acknowledgments

- **HPE** for providing the requirements and vision
- **shadcn/ui** for the excellent component library
- **Tailwind CSS** for the utility-first styling approach
- **React** and **TypeScript** communities for robust tooling

---

**Built with ❤️ for Industrial Predictive Maintenance**

For questions or support, please contact the development team.
