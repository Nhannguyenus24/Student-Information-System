import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
// components
import LoadingScreen from "../components/LoadingScreen";
// guards
import AuthGuard from "../guards/AuthGuards";
import GuestGuard from "../guards/GuestGuard";
// ----------------------------------------------------------------------

const Loadable = (Component) => {
  const WrappedComponent = (props) => {
    //const { pathname } = useLocation();
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
      </Suspense>
    );
  };

  WrappedComponent.displayName = `Loadable(${Component.name || "Component"})`;

  return WrappedComponent;
};

export default function Router() {
  return useRoutes([
    {
      path: "auth",
      children: [
        { path: "login", element: <GuestGuard><Login /></GuestGuard> },
        // { path: "register", element: <Register /> },
        { path: "forgot-password", element: <GuestGuard><ForgotPassword /></GuestGuard> },
        { path: "reset-password", element: <GuestGuard><ResetPassword /></GuestGuard> },
      ],
    },
    // Main Routes
    {
      path: "*",
      children: [
        { path: "coming-soon", element: <ComingSoon /> },
        { path: "maintenance", element: <Maintenance /> },
        { path: "500", element: <Page500 /> },
        { path: "404", element: <Page404 /> },
        { path: "", element: <GuestPage /> },
        { path: "faqs", element: <FAQs /> },
        { path: "home", element: <GuestPage />},
        { path: "about", element: <AboutUs /> },
        { path: "contact", element: <Contact /> },
        { path: "services", element: <Services /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: "student",
      element: <AuthGuard> <MainLayout /></AuthGuard>,
      children: [
        { path: "", element: <StudentDashboardPage /> },
        { path: "dashboard", element: <StudentDashboardPage /> },
        {
          path: "*",
          element: <Navigate to="/404" replace />,
        },
        {
          path: "registration",
          element: <StudentClassRegistrationPage />,
        },
        {
          path: "classAndAssignment",
          element: <StudentClassesAndAssignmentsPage />,
        },
        {
          path : "course/:id",
          element: <DetailCourse />,
        },
        {
          path : "notification/:id",
          element: <DetailNotification />,
        },
        {
          path : "course",
          element: <StudentCoursePage />,
        },
        {
          path : "submission/:id",
          element: <StudentSubmission />,
        },
        {
          path : "quizResult/:id",
          element: <StudentViewQuiz />,
        },
        {
          path: "quiz/:id",
          element: <StudentTakingQuiz />,
        },
        {
          path: "attemptQuiz/:id",
          element: <StudentAttemptQuiz />,
        },
        {
          path: "calendar",
          element: <StudentCalendar />,
        }
      ],
    },

    {
      path: "teacher",
      element: <AuthGuard> <MainLayout /></AuthGuard>,
      children: [
        { path: "dashboard", element: <TeacherDashboardPage /> },
        {
          path: "course",
          element: <TeacherCoursePage />,
        },
        {
          path: "review",
          element: <TeacherReviewPage />,
        },
        {
          path : "course/:id",
          element: <DetailCourseTeacher />,
        },
        {
          path : "notification/:id",
          element: <CreateNotification />,
        },
        {
          path : "deadline/:id",
          element: <CreateDeadline />,
        },
        {
          path : "upload/:id",
          element: <UploadMaterials />,
        },
        {
          path : "createQuiz/:id",
          element: <CreateQuiz />,
        },
        
      ],
    },
    {
      path: "ministry",
      element: <AuthGuard> <MainLayout /></AuthGuard>,
      children: [
        { path: "studentList", element: <StudentListPage /> },
        { path: "lecturerList", element: <LecturerListPage /> },
        { path: "lecturerProfile/:id", element: <LecturerProfile /> },
        { path: "studentProfile/:id", element: <StudentProfile /> },
        { path: "course", element: <AdminCoursePage /> },
        { path: "notification", element: <NotificationPage /> },
        { path: "createBroadcastNotification", element: <BroadcastNotificationPage /> },
        { path: "addCourse", element: <CourseAddingPage /> },
        { path: "addStudent", element: <AddStudentPage />},
        { path: "addTeacher", element: <AddTeacherPage /> },
      ],
    },
  ]);
}


// AUTHENTICATION
const Login = Loadable(lazy(() => import("../pages/authentication/Login")));
const ForgotPassword = Loadable(lazy(() => import("../pages/authentication/ForgotPassword")));
const ResetPassword = Loadable(lazy(() => import("../pages/authentication/ResetPassword")));


// MAINLAYOUT
const MainLayout = Loadable(lazy(() => import("../layout/MainLayout")));

// GUEST
const GuestPage = Loadable(lazy(() => import("../pages/GuestPage")));
const AboutUs = Loadable(lazy(() => import("../pages/AboutUs")));
const Contact = Loadable(lazy(() => import("../pages/Contact")));
const Services = Loadable(lazy(() => import("../pages/Services")));

// OTHERS
const Page500 = Loadable(lazy(() => import("../pages/Page500")));
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
const ComingSoon = Loadable(lazy(() => import("../pages/ComingSoon")));
const Maintenance = Loadable(lazy(() => import("../pages/Maintenance")));
const FAQs = Loadable(lazy(() => import("../pages/Faqs")));


// STUDENT
const StudentDashboardPage = Loadable(lazy(() => import("../pages/Student/StudentDashboardPage")))
const StudentClassRegistrationPage = Loadable(lazy(() => import("../pages/Student/StudentClassRegistrationPage")))
const StudentClassesAndAssignmentsPage = Loadable(
  lazy(() => import("../pages/Student/StudentClassesAndAssignmentsPage")),
)
const DetailCourse = Loadable(lazy(() => import("../pages/Student/DetailCourse")))
const DetailNotification = Loadable(lazy(() => import("../pages/Student/DetailNotification")))
const StudentCoursePage = Loadable(lazy(() => import("../pages/Student/StudentCoursePage")));
const StudentSubmission = Loadable(lazy(() => import("../pages/Student/StudentSubmission")))
const StudentViewQuiz = Loadable(lazy(() => import("../pages/Student/StudentViewQuiz")))
const StudentTakingQuiz = Loadable(lazy(() => import("../pages/Student/StudentTakingQuiz")))
const StudentAttemptQuiz = Loadable(lazy(() => import("../pages/Student/StudentAttemptQuiz")))
const StudentCalendar = Loadable(lazy(() => import("../pages/Student/StudentCalendar")))
//TEACHER
const TeacherDashboardPage = Loadable(lazy(() => import("../pages/teacher/TeacherDashboardPage")))
const TeacherCoursePage = Loadable(lazy(() => import("../pages/teacher/TeacherCoursePage")))
const TeacherReviewPage = Loadable(lazy(() => import("../pages/teacher/TeacherReviewPage")))
const DetailCourseTeacher = Loadable(lazy(() => import("../pages/teacher/DetailCourse")))
const CreateNotification = Loadable(lazy(() => import("../pages/teacher/CreateNotification")))
const CreateDeadline = Loadable(lazy(() => import("../pages/teacher/CreateDeadline")))
const UploadMaterials = Loadable(lazy(() => import("../pages/teacher/UpLoadMaterial")))
const CreateQuiz = Loadable(lazy(() => import("../pages/teacher/CreateQuiz")))
// MINISTRY
const StudentListPage = Loadable(
  lazy(() => import("../pages/ministry/StudentListPage"))
);
const LecturerListPage = Loadable(
  lazy(() => import("../pages/ministry/LecturerListPage"))
);
const LecturerProfile = Loadable(
  lazy(() => import("../pages/ministry/LecturerProfileEditPage"))
);
const StudentProfile = Loadable(
  lazy(() => import("../pages/ministry/StudentProfileEditPage"))
);
const AdminCoursePage = Loadable(lazy(() => import("../pages/ministry/AdminCoursePage")));
const NotificationPage = Loadable(lazy(() => import("../pages/ministry/NotificationPage")));
const BroadcastNotificationPage = Loadable(lazy(() => import("../pages/ministry/BroadCastNotificationPage")));
const CourseAddingPage = Loadable(lazy(() => import("../pages/ministry/CourseAddingPage")));
const AddStudentPage = Loadable(lazy(() => import("../pages/ministry/AddStudentPage")));
const AddTeacherPage = Loadable(lazy(() => import("../pages/ministry/AddTeacherPage")));