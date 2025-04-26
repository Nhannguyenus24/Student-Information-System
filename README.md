# InfoStudia Student Information System

## Introduction

InfoStudia Student Information System is a comprehensive educational management platform designed with a user-friendly interface that provides familiar functionalities while introducing new features to overcome existing limitations. The system aims to streamline the management of student information, course registration, academic progress tracking, and communication between students, faculty, and administrative staff.

The platform offers a range of features including:

- Student information and academic record management
- Course and curriculum management
- Online attendance tracking with parent notifications
- Test and examination administration
- Academic calendar and scheduling
- Role-based access control
- Notification system for exams, events, and regulations
- Document sharing and course announcements
- Course registration and timetable display
- Course evaluation system
- Detailed reporting and data analysis
- Online fee payment with email notifications

## User Roles

The system supports the following user roles:

1. **Guest** - Can access public pages without login (system introduction, general announcements)
2. **Student** - Can manage personal information, register for courses, view academic records, participate in exams, and evaluate courses
3. **Instructor** - Can manage course materials, create assessments, grade assignments, and track student attendance
4. **Administrative Staff** - Can organize courses, schedule classes, assign instructors, monitor student progress, and handle academic issues

## Technology Stack

### Frontend
- **Framework**: ReactJS
- **UI Library**: Material-UI (MUI)
- **State Management**: Redux
- **Routing**: React Router

### Backend
- **Framework**: NestJS with TypeScript
- **API Documentation**: Swagger

### Database & Storage
- **Primary Database**: MongoDB
- **File Storage**: Azure Storage
- **Image Storage**: Cloudinary (returns image links)

## Project Structure

### Frontend Structure
```
frontend/
├── public/
├── src/
│   ├── App.jsx              # Main application entry point
│   ├── components/          # Reusable UI components
│   ├── constants/           # Contains shared constants used
│   ├── contexts/            # React context providers
│   ├── guards/              # Protects routes from unauthorized access
│   ├── hooks/               # Custom React hooks
│   ├── layouts/             # Page layout components
│   ├── pages/               # Page components
│   ├── routes/              # Routing configuration
│   ├── sections/            # Contains large sections on each page
│   ├── utils/               # Utility functions and helpers
│   ├── assets/              # Static assets (images, icons)
│   └── themes/              # Global styles and theme configuration
└── package.json
```

### Backend Structure
```
backend/
├── src/
│   ├── main.ts              # Entry point of the application
│   ├── app.module.ts        # Root module
│   ├── schemas/             # Data schema
│   ├── BaiKiemTra/          # Test management module
│   ├── DiemDanh/            # Attendance module
│   ├── DiemSo/              # Student score module
│   ├── HocPhi/              # Tuition fee module
│   ├── Khoa/                # Faculty module
│   ├── SinhVien/            # Student management module
│   ├── GiangVien/           # Teacher management module
│   ├── MonHoc/              # Course management module
│   ├── KyLuat/              # Discipline management module
│   ├── LichHoc/             # Schedule management module
│   ├── ThongBao/            # Notification module
│   ├── DanhGia/             # Evaluation module
│   ├── BaoCao/              # Reporting module
│   ├── upload/              # Azure module
├── test/                    # Testing files
└── package.json
```

## Installation and Setup

### Prerequisites
- Node.js (v14.x or higher)
- npm or yarn
- MongoDB
- Azure Storage account
- Cloudinary account

### Frontend Setup

1. Clone the repository:
```bash
git clone https://github.com/Nhannguyenus24/Student-Information-System.git
cd Student-Information-System/frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn run dev
```

The frontend will be available at `http://localhost:5173`.

### Backend Setup

1. Navigate to the backend directory:
```bash
cd ../backend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the backend root directory:
```
AZURE_STORAGE_CONNECTION_STRING=
AZURE_CONTAINER_NAME=
```

4. Start the development server:
```bash
npm run start:dev
# or
yarn start:dev
```

The backend API will be available at `http://localhost:3000/api`.
Swagger documentation will be available at `http://localhost:3000/api/docs`.

## API Documentation

The API documentation is generated using Swagger. Once the backend server is running, you can access the Swagger UI at:

```
http://localhost:3000/api/docs
```

This interface provides a comprehensive view of all available endpoints, request parameters, and response formats, making it easy to test and interact with the API.

## Deployment

### Frontend Deployment
```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `build/` directory.

### Backend Deployment
```bash
npm run build
# or
yarn build
```

The compiled JavaScript files will be output to the `dist/` directory.

To start the production server:
```bash
npm run start:prod
# or
yarn start:prod
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Special thanks to all contributors and stakeholders involved in the development of InfoStudia Student Information System.
