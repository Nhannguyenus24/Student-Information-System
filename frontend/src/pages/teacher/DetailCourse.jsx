
import CourseSection from '../../sections/dashboard/CourseSection';
import Page from '../../components/Page';

export default function DetailCourse() {
    
    return (
      <Page title="Course detail">
        
        <CourseSection  isTeacherMode />

      </Page>
    );
  }